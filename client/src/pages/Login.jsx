import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logo } from '../assets/assets'
import FormContainer from '../components/styled/FormContainer'
import { context } from '../context/context'

const Login = () => {
    const [fields, setFields] = useState({
        usernameOrEmail: '',
        password: '',
    })
    const navigate = useNavigate()

    const { usernameOrEmail, password } = useState('')

    const { user, setUser } = useContext(context)

    useEffect(() => {
        if (user) {
            if (!user.avatar?.trim()) {
                navigate('/setAvatar')
            } else {
                navigate('/')
            }
        }
    }, [user, navigate])

    const handleChange = (e) => {
        setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const login = async (e) => {
        e.preventDefault()
        if (Object.keys(fields).some((key) => fields[key].trim() === ''))
            return toast.error('All fields are required')
        try {
            const { data } = await axios.post(
                '/auth/login',
                {
                    ...fields,
                }
            )
            toast.success(data.message)
            setUser(data.user)
            navigate('/')
        } catch (e) {
            const { message, errors } = e.response.data
            if (errors) {
                Object.keys(errors).forEach((key) => toast.error(errors[key]))
            }
            toast.error(message)
        }
    }

    return (
        <FormContainer>
            <form onSubmit={login}>
                <div className="brand">
                    <h1>Textify</h1>
                    <img src={logo} alt="logo" />
                </div>
                <input
                    type="text"
                    placeholder="Username/Email"
                    name="usernameOrEmail"
                    value={usernameOrEmail}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
                <span>
                    Not Registered ? <Link to="/register">Register</Link>{' '}
                </span>
            </form>
        </FormContainer>
    )
}

export default Login
