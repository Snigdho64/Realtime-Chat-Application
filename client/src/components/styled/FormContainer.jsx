import styled from 'styled-components'
import { flex } from '../../utils/styles'

export default styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #121324;
    ${flex()}
    gap:1rem;
    .brand {
        ${flex()}
        img {
            height: 5rem;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }
    form {
        ${flex('column')}
        gap:1rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border-color: #997af0;
            }
        }
        button {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            font-size: 1rem;
            border-radius: 0.4rem;
            font-weight: bold;
            cursor: pointer;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #4e0eff;
                transform: scale(1.05);
            }
        }
        span {
            color: white;
            text-transform: uppercase;
            a {
                color: #4e0eff;
                text-transform: none;
                font-weight: bold;
            }
        }
    }
`
