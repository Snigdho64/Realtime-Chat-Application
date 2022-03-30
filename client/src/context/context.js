import axios from 'axios'
import { io } from 'socket.io-client'
import { createContext, useEffect, useState } from 'react'

const initialState = {
    user: null,
    setUser: () => {},
    contacts: [],
    setContacts: () => {},
    socket: null,
    messages: [],
    setMessages: () => {},
}

axios.defaults.withCredentials = true

export const context = createContext(initialState)

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [contacts, setContacts] = useState([])
    const [socket, setSocket] = useState()
    const [messages, setMessages] = useState([])

    const getUser = async () => {
        setLoading(true)
        // axios.defaults.withCredentials = true
        try {
            const { data } = await axios.get('/auth/login')
            const { user } = data
            return user
        } catch (err) {
            console.log(err.response.data)
            setUser(null)
        }
        setLoading(false)
    }

    useEffect(() => {
        getUser().then((user) => setUser(user))
    }, [])

    useEffect(() => {
        if (user) {
            const socket = io('/')
            socket.emit('addUser', user._id)
            setSocket(socket)
        }
        // if (socket) {
        //     socket.disconnect()
        //     console.log('socket disconnected')
        // }
    }, [user])

    return (
        <context.Provider
            value={{
                user,
                setUser,
                loading,
                contacts,
                setContacts,
                socket,
                messages,
                setMessages,
            }}
        >
            {children}
        </context.Provider>
    )
}

export default ContextProvider
