import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import SetAvatar from './components/SetAvatar'
import { context } from './context/context'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
    const { user } = useContext(context)

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute user={user}>
                            <Chat />
                        </ProtectedRoute>
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/setAvatar" element={<SetAvatar />} />
            </Routes>
        </Router>
    )
}

export default App
