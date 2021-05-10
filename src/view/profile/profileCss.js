import styled from 'styled-components';

export const TitlePage = styled.div `
    align-items: flex-end;
    justify-content: space-evenly;
    margin: 1rem;
    width: 100%;
    border-bottom: 1px solid rgb(209, 209, 209);
    font-size: 1.5rem;
    color: #6c757d;
`

export const ContainerProfile = styled.div `
    @media (max-width: 500px) {
        input {
            width: 20rem !important;
        }
    }

    .formProfile {
        width: 100%;
        margin: 0.5rem;
        padding: 0.5rem;
        animation: fadeEffect 1s;
    }

    .formProfile input {
        width: 25rem;
    }

    #visualizar {
        margin: 2rem auto;
        animation: fadeEffect 1s;
    }

`