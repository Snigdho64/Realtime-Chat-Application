import axios from 'axios'

export const getContacts = async () => {
    try {
        const {
            data: { users },
        } = await axios.get('/auth/allUsers')
        return users
    } catch (error) {
        console.log(error.message)
        throw new Error(error)
    }
}

export const logoutUser = async () => {
    try {
        const { data } = await axios.get('/auth/logout')
        return data
    } catch (error) {
        console.log(error.message)
    }
}

export const getCurrentChatMessages = async (currentChatId) => {
    const { data } = await axios.get(`/message/allMessages/${currentChatId}`)
    const messages = data.messages.map((message) => ({
        message: message.message,
        sender: message.sender,
    }))
    return messages
}
