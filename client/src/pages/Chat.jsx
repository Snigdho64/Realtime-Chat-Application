import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ChatContainer from '../components/ChatContainer'
import Contacts from '../components/Contacts'
import ChatStyled from '../components/styled/Chat.styled'
import Welcome from '../components/Welcome'
import { context } from '../context/context'
import { getContacts } from '../utils/helper'

const Chat = () => {
    const { contacts, setContacts, user } = useContext(context)

    const [selectedContact, setSelectedContact] = useState()

    useEffect(() => {
        getContacts()
            .then((contacts) => setContacts(contacts))
            .catch((e) => toast.error(e))
    }, [setContacts])
    console.log(selectedContact)
    return (
        <ChatStyled>
            <div className="gridContainer">
                <Contacts
                    contacts={contacts}
                    user={user}
                    setSelectedContact={setSelectedContact}
                />
                {selectedContact ? (
                    <ChatContainer currentChat={selectedContact} />
                ) : (
                    <Welcome username={user.username} />
                )}
            </div>
        </ChatStyled>
    )
}

export default Chat
