import styled from 'styled-components';

export const ContainerLogin = styled.div `
    @media (max-width: 450px) {
        body {
            font-size: smaller !important;
        }

        input[type="text"],
        input[type="password"] {
            width: 4rem;
        }
    }

`

export const Box = styled.form `
    width: 23rem;
    background: #000000;
    text-align: center;
    transition: 0.4s;
    margin-top: 6rem;
    border-radius: 30px;
    padding: 1rem 3rem;

    h1 {
        color: white;
        text-transform: uppercase;
        font-weight: 500;
    } 
    input[type="text"],
    input[type="password"]{
        border: 0;
        background: none;
        display: block;
        margin: 1.5rem auto;
        text-align: center;
        border: 2px solid #3498db;
        padding: 0.5rem;
        width: 13rem;
        outline: none;
        color: white;
        border-radius: 24px;
        transition: all 0.4s;
        &:focus {
            border-color: #2ecc71;
            width: calc(90% + 0.1rem);
        }
    }
    button {
        border: 0;
        background: none;
        display: block;
        margin: 1.5rem auto;
        text-align: center;
        border: 2px solid #2ecc71;
        padding: 1rem 3rem;
        outline: none;
        color: white;
        border-radius: 24px;
        transition: 0.4s;
        cursor: pointer;
        &:hover {
            background: #2ecc71
        }
    }
    .create {
        text-decoration: underline
    }
    span {
        color: red;
    }
`
