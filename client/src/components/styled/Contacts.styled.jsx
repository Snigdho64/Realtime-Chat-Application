import styled from 'styled-components'
import { flex } from '../../utils/styles'

export default styled.div`
    width: 100%;
    min-width: 150px;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 4fr 1fr;
    background-color: #080420;
    .brand {
        ${flex()}
        gap:1rem;
        img {
            height: 2rem;
        }
        h3 {
            color: #fff;
        }
    }
    .contacts {
        width: 100%;
        max-height: 40vh;
        overflow-y: auto;
        ${flex('column', 'space-evenly')}
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .contact {
            ${flex('', 'space-evenly')}
            min-height: 5rem;
            width: 90%;

            gap: 1rem;
            border-radius: 0.2rem;
            padding: 0.4rem;
            cursor: pointer;
            transition: all 0.3s linear;
            .avatar {
                img {
                    height: 4vmax;
                }
            }
            .username {
                width: 70%;
                h3 {
                    color: #fff;
                    font: 300 1.2rem 'Helvetica Neue';
                }
            }
            &.selected {
                background-color: #9a86f3;
                h3 {
                    color: green;
                    font-weight: bold;
                }
            }
        }
    }
    .currentUser {
        ${flex()}
        background-color: #0d0d30;
        gap: 2rem;
        padding: 0.1rem;
        .avatar {
            img {
                height: 5vmax;
                max-inline-size: 100%;
            }
        }
        .username {
            color: #fff;
        }
    }
    @media (max-width: 768px) {
        gap: 0.5rem;
        .contacts {
            .contact {
                .username {
                    h3 {
                        font-size: 1rem;
                    }
                }
            }
        }
        .currentUser {
            .username {
                h3 {
                    font-size: 1rem;
                }
            }
        }
    }
`
