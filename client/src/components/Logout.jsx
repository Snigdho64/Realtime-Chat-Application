import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { context } from '../context/context'
import { logoutUser } from '../utils/helper'
import { BiPowerOff } from 'react-icons/bi'

const Logout = () => {
    const { setUser } = useContext(context)
    const logout = async () => {
        logoutUser().then((data) => {
            if (data.success) {
                setUser(null)
                toast.success(data.message)
            }
        })
    }

    return (
        <Button onClick={logout}>
            <BiPowerOff />
        </Button>
    )
}

export default Logout

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    svg {
        font-size: 1.3rem;
        color: #ebe7ff;
    }
    &:hover {
        background-color: #fe0404b8;
    }
`
