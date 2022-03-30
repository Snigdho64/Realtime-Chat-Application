import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logo } from '../assets/assets'

import FormContainer from '../components/styled/FormContainer'
import { context } from '../context/context'

const Register = () => {
    const [fields, setFields] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const navigate = useNavigate()

    const { username, email, password, confirmPassword } = fields

    const { user, setUser } = useContext(context)

    useEffect(() => {
        if (user) return navigate('/')
    }, [user, navigate])

    const register = async (e) => {
        e.preventDefault()

        if (Object.keys(fields).some((key) => fields[key].trim() === ''))
            return toast.error('All fields are required')

        if (password !== confirmPassword)
            return toast.error(`Passwords do not match`)
        try {
            const { data } = await axios.post('/auth/register', {
                ...fields,
            })
            toast.success(data.message)
            navigate('/setAvatar')
            setUser(data.user)
        } catch (e) {
            const { message, errors } = e.response.data
            if (errors) {
                Object.keys(errors).forEach((key) => toast.error(errors[key]))
            }
            toast.error(message)
        }
    }

    const handleChange = (e) => {
        setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <FormContainer>
            <form onSubmit={register}>
                <div className="brand">
                    <h1>Textify</h1>
                    <img src={logo} alt="logo" />
                </div>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                />
                <button type="submit">Register</button>
                <span>
                    Already Registered ? <Link to="/login">Login</Link>{' '}
                </span>
            </form>
        </FormContainer>
    )
}

export default Register
