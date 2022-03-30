import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ user, children }) => {
    const isAuthenticated = user || (user && Object.keys(user).length > 0)

    if (!isAuthenticated) {
        return <Navigate to={'/login'} />
    }

    return children
}

export default ProtectedRoute
