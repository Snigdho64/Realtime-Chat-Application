import React, { useState } from 'react'
import { logo, avatar } from '../assets/assets'
import ContactsStyled from './styled/Contacts.styled'

const Contacts = ({ contacts, user, setSelectedContact }) => {
    const [selectedContactIdx, setSelectedContactIdx] = useState()

    const changeChat = (index, contact) => {
        setSelectedContactIdx(index)
        setSelectedContact(contact)
    }

    return (
        <ContactsStyled>
            <div className="brand">
                <img src={logo} alt="logo" />
                <h3>Textify</h3>
            </div>
            <div className="contacts">
                {contacts.map((contact, index) => (
                    <div
                        key={contact._id}
                        className={`contact ${
                            index === selectedContactIdx ? 'selected' : ''
                        }`}
                        onClick={() => changeChat(index, contact)}
                    >
                        <div className="avatar">
                            <img
                                src={`data:image/svg+xml;base64,${contacts.avatar}`}
                                alt="contact avatar"
                                onError={({ target }) => {
                                    target.src = avatar
                                    target.onerror = null
                                }}
                            />
                        </div>
                        <div className="username">
                            <h3>{contact.username}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <div className="currentUser">
                <div className="avatar">
                    <img
                        src={`data:image/svg+xml;base64,${user.avatar}`}
                        alt="user avatar"
                    />
                </div>
                <div className="username">
                    <h3>{user.username}</h3>
                </div>
            </div>
        </ContactsStyled>
    )
}

export default Contacts
