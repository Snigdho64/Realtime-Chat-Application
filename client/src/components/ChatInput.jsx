import React, { useState } from 'react'
import { BsEmojiSmileFill } from 'react-icons/bs'
import { IoMdSend } from 'react-icons/io'
import Picker from 'emoji-picker-react'
import ChatInputStyled from './styled/ChatInput.styled'

const ChatInput = ({ message, setMessage, sendMessage }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const handleEmojiClick = (e, emojiObject) => {
        setMessage((prev) => `${prev + emojiObject.emoji}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        sendMessage(message)
    }

    return (
        <ChatInputStyled>
            <div
                className="buttonContainer"
                // onClick={() => setShowEmojiPicker((p) => !p)}
            >
                <div className="emoji">
                    <BsEmojiSmileFill
                        onClick={() => setShowEmojiPicker((p) => !p)}
                    />
                    {showEmojiPicker && (
                        <Picker onEmojiClick={handleEmojiClick} />
                    )}
                </div>
            </div>
            <form onSubmit={submitHandler} className="inputContainer">
                <input
                    type="text"
                    placeholder="type your message..."
                    onChange={(e) => setMessage(e.target.value)}
                    onClick={() => setShowEmojiPicker(false)}
                    value={message}
                />
                <button type="submit">
                    <IoMdSend />
                </button>
            </form>
        </ChatInputStyled>
    )
}

export default ChatInput
