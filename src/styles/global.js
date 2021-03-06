import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body{
        min-height: 100vh;
        width: 100%;
        background-color: #0D2636;
        -webkit-font-smoothing: antialiased !important;
    }

    body, input, button{
        color: #222;
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
    }

    button, a{
        cursor: pointer;
    }

    a{
        text-decoration: none;
    }


`;