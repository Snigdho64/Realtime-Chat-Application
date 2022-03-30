import styled from 'styled-components'
import { flex } from '../../utils/styles'

export default styled.div`
    ${flex('column')}
    width: 100vw;
    height: 100vh;
    gap: 3rem;
    background-color: #131324;
    .titleContainer {
        h1 {
            color: white;
        }
    }
    .avatarContainer {
        width: 100%;
        ${flex('', 'space-evenly')}
        .avatar {
            border: 0.4rem solid transparent;
            border-radius: 50%;
            transition: all 0.3s ease-in-out;
            img {
                width: 15vmax;
                height: 15vmax;
                cursor: pointer;
            }
            &.selected {
                border: 0.4rem solid #4e0eff;
                transform: scale(1.1);
                img {
                }
            }
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
`
