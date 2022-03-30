const { Server } = require('socket.io')

const connectSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            credentials: true,
        },
    })
    global.onlineUsers = new Map()
    io.on('connection', (socket) => {
        console.log('socket connected', socket.id)
        global.chatSocket = socket
        socket.on('addUser', (userId) => {
            onlineUsers.set(userId, socket.id)
            socket.on('disconnect', () => {
                onlineUsers.delete(userId)
                console.log('disconnected', socket.id)
            })
        })
        socket.on('sendMessage', ({ message, to, from }) => {
            const onlineSocket = onlineUsers.get(to)
            if (onlineSocket) {
                socket
                    .to(onlineSocket)
                    .emit('receiveMessage', { message, from })
            }
        })
    })
}

module.exports = connectSocket
