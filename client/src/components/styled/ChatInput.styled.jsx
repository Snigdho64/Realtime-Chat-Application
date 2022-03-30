import styled from 'styled-components'
import { flex } from '../../utils/styles'

export default styled.div`
    display: grid;
    grid-template-columns: 0.1fr 0.9fr;
    padding: 0 2rem;
    background-color: #080420;
    @media (max-width: 768px) {
        padding: 0 1rem;
        gap: 1rem;
    }
    .buttonContainer {
        ${flex()}
        gap: 1rem;
        height: 60%;
        /* @media (max-width: 768px) {
            height: 100%;
        } */

        .emoji {
            position: relative;
            svg {
                ${flex()}
                font-size: 1.5rem;
                color: #fff000c8;
                cursor: pointer;
            }
            .emoji-picker-react {
                position: absolute;
                top: -350px;
                background-color: #080420;
                box-shadow: 0px 0px 10px 5px #9a86f3;
                border-color: #9a86f3;
                input {
                    color: #fff;
                }
                .emoji-scroll-wrapper::-webkit-scrollbar {
                    background-color: #080420;
                    width: 5px;
                    &-thumb {
                        background-color: #9a86f3;
                    }
                }
                .emoji-categories {
                    button {
                        filter: contrast(0);
                    }
                }
                .emoji-search {
                    background-color: transparent;
                    border-color: #080420;
                }
                .emoji-group:before {
                    background-color: #080420;
                }
            }
        }
    }
    .inputContainer {
        width: 100%;
        height: 60%;
        border-radius: 2rem;
        ${flex()}
        gap:2rem;
        background-color: #ffffff34;
        input {
            width: 90%;
            background-color: transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1rem;
            &::selection {
                background-color: #9a86f3;
            }
        }
        button {
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            ${flex()}
            background-color: #9a86f3;
            border: none;
            svg {
                font-size: 2rem;
                color: white;
            }
        }
        @media (max-width: 768) {
            padding: 0.3rem 1rem;
            svg {
                font-size: 1rem;
            }
        }
    }
`
