import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { context } from '../context/context'
import { flex } from '../utils/styles'

const MessageContainer = ({ messages }) => {
    const { user } = useContext(context)
    const scrollRef = useRef()

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <Styled>
            {messages &&
                messages.length > 0 &&
                messages.map((message, idx) => (
                    <div
                        key={idx}
                        className={`message ${
                            message.sender === user._id ? 'sended' : 'received'
                        }`}
                    >
                        <div className="content">
                            <p>{message.message.text}</p>
                        </div>
                    </div>
                ))}
            <div ref={scrollRef}></div>
        </Styled>
    )
}

export default MessageContainer

const Styled = styled.div`
    padding: 1rem 2rem;
    ${flex('column')}
    gap:1rem;
    max-height: 60vmin;
    overflow: scroll;
    &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
    .message {
        ${flex()}
        width:100%;
        .content {
            max-width: 40%;
            overflow-wrap: break-word;
            padding: 1rem;
            font-size: 1.1rem;
            border-radius: 1rem;
            color: #d1d1d1;
        }
        &.sended {
            justify-content: flex-end;
            .content {
                background-color: #4f04ff21;
            }
        }
        &.received {
            justify-content: flex-start;
            .content {
                background-color: #9900ff20;
            }
        }
    }
`
