import styled from 'styled-components'
import { flex } from '../../utils/styles'

export default styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 0.5fr 3fr 0.5fr;
    gap: 0.1rem;
    @media (max-width: 768px) {
        grid-template-rows: 0.5fr 6fr 1fr;
    }
    .chatHeader {
        ${flex('row', 'space-between')}
        padding: 1rem;
        .currentChat {
            ${flex('row')}
            gap:1rem;
            .avatar {
                img {
                    height: 4vmax;
                }
            }
            .username {
                h3 {
                    color: #fff;
                }
            }
        }
    }
`
