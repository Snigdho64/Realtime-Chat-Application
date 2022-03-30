import { createGlobalStyle, css } from 'styled-components'

export const flex = (dir, justify, align, wrap) => css`
    display: flex;
    flex-flow: ${dir || 'row'} ${wrap || 'nowrap'};
    justify-content: ${justify || 'center'};
    align-items: ${align || 'center'};
`

const GlobalStyle = createGlobalStyle`
body{
    margin: 0;
    padding: 0;
    #root{
        height:100vh;
        width:100vw;
        font:normal 400 1rem 'Roboto';
    }
    *{
        font-family:Roboto;
        margin: 0;
        padding: 0;
        box-sizing:border-box;
    }
    a{text-decoration:none}
    ul,li{
        list-style: none;
    }
    input,button{
        outline: none;
        border: none;
    }
    .Toastify__toast{
        background-color:#4e0eff61;
        color: #fff;
        margin: 1rem;
        border-radius:0.4rem;
        &.Toastify__toast--error{
            background-color:#a9212182;
        }
    }
}
`

export default GlobalStyle
