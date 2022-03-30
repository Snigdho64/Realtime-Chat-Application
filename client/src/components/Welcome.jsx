import React from 'react'
import styled from 'styled-components'
import { robot } from '../assets/assets'
import { flex } from '../utils/styles'

const Welcome = ({ username }) => {
    return (
        <Styled>
            <img src={robot} alt="robot" />
            <h1>
                Welcome, <span>{username}!</span>{' '}
            </h1>
            <h3>Please select a chat to start a conversation</h3>
        </Styled>
    )
}

const Styled = styled.div`
    ${flex('column')};
    height: 100%;
    text-align: center;
    color: white;

    h3 {
        width: 60%;
        /* word-break: break-all; */
        word-wrap: wrap;
    }
    img {
        height: 20rem;
    }
    span {
        color: #4e0eff;
    }
`

export default Welcome
