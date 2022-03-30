import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { avatar } from '../assets/assets'
import { context } from '../context/context'
import { getCurrentChatMessages } from '../utils/helper'
import ChatInput from './ChatInput'
import Logout from './Logout'
import MessageContainer from './MessageContainer'
import ChatContainerStyled from './styled/ChatContainer.styled'

const ChatContainer = ({ currentChat }) => {
    const { user, socket, messages, setMessages } = useContext(context)
    const [message, setMessage] = useState('')
    const sendMessage = async (message) => {
        try {
            // DATABASE
            await axios.post('/message/sendMessage', {
                message: message,
                to: currentChat._id.toString(),
            })
            setMessages((p) => [
                ...p,
                {
                    message: { text: message },
                    sender: user._id.toString(),
                },
            ])
            // SOCKET
            socket.emit('sendMessage', {
                message,
                to: currentChat._id.toString(),
                from: user._id.toString(),
            })
            setMessage('')
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getCurrentChatMessages(currentChat._id.toString())
            .then((messages) => setMessages(() => [...messages]))
            .catch((err) => {
                toast.error(err.message)
            })
    }, [currentChat, setMessages])

    useEffect(() => {
        socket.on('receiveMessage', ({ message, from }) => {
            setMessages((p) => [
                ...p,
                { message: { text: message }, sender: from },
            ])
        })
    }, [setMessages, socket])

    return (
        <ChatContainerStyled>
            <div className="chatHeader">
                <div className="currentChat">
                    <div className="avatar">
                        <img
                            src={`data:image/svg+xml;base64,${currentChat.src}`}
                            alt="chat avatar"
                            onError={({ target }) => {
                                target.src = avatar
                                target.onerror = null
                            }}
                        />
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout />
            </div>

            <MessageContainer messages={messages} />

            <ChatInput
                sendMessage={sendMessage}
                message={message}
                setMessage={setMessage}
            />
        </ChatContainerStyled>
    )
}

export default ChatContainer
