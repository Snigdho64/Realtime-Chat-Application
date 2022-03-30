import styled from 'styled-components'
import { flex } from '../../utils/styles'

export default styled.div`
    width: 100vw;
    height: 100vh;
    ${flex('column')}
    gap:1rem;
    background-color: #131324;
    .gridContainer {
        border-radius: 1rem;
        width: 85vw;
        height: 85vh;
        display: grid;
        grid-template-columns: 25% 75%;
        background-color: #00000076;
        @media screen and (min-width: 768px) {
            grid-template-columns: 35% 65%;
        }
    }
`
