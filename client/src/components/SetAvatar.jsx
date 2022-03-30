import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Buffer } from 'buffer'
import { useNavigate } from 'react-router-dom'
import { loader } from '../assets/assets'
import AvatarContainer from './styled/AvatarContainer'
import axios from 'axios'
import { toast } from 'react-toastify'
import { context } from '../context/context'

const SetAvatar = () => {
    const api = `https://api.multiavatar.com`

    const navigate = useNavigate()
    const { setUser } = useContext(context)
    const [isLoading, setIsLoading] = useState(false)
    const [avatars, setAvatars] = useState([])
    const [selectedAvatar, setSelectedAvatar] = useState()

    const getAvatars = useCallback(async () => {
        setIsLoading(true)
        const images = []
        try {
            for (let i = 0; i < 4; i++) {
                const { data } = await axios.get(
                    `${api}/${Math.round(Math.random() * 10000)}`,
                    { withCredentials: false }
                )
                const image = Buffer.from(data).toString('base64')
                images.push(image)
            }
        } catch (error) {
            setIsLoading(false)
            throw new Error(error)
        }
        setIsLoading(false)
        return images
    }, [api])

    useEffect(() => {
        getAvatars()
            .then((images) => {
                setAvatars(images)
            })
            .catch((e) => {
                if (e.response?.data) {
                    return toast.error(e.response?.data?.message)
                }
                return toast.error(e.message)
            })
    }, [getAvatars])

    const setProfilePicture = async () => {
        if (!selectedAvatar) return toast.error('No avatar selected')
        try {
            const {
                data: { user },
            } = await axios.post('/auth/setAvatar', {
                avatar: avatars[selectedAvatar],
            })
            setUser(user)
            toast.success('Avatar set successfully')
            navigate('/')
        } catch (e) {
            toast.error(e.response.data.message)
        }
    }
    console.log(isLoading)
    return isLoading ? (
        <AvatarContainer>
            <img src={loader} alt="loader" className="loader" />
        </AvatarContainer>
    ) : (
        <AvatarContainer>
            <div className="titleContainer">
                <h1>Pick and avatar as your profile picture</h1>
            </div>
            <div className="avatarContainer">
                {avatars.map((avatar, index) => (
                    <div
                        className={`avatar ${
                            selectedAvatar === index ? 'selected' : ''
                        }`}
                        key={index}
                    >
                        <img
                            src={`data:image/svg+xml;base64,${avatar}`}
                            alt="avatar"
                            onClick={() => setSelectedAvatar(index)}
                        />
                    </div>
                ))}
            </div>
            <button onClick={setProfilePicture}>Set as Profile Picture</button>
        </AvatarContainer>
    )
}

export default SetAvatar
