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

export const FormProfile = styled.form `
    display: flex;
    align-items: center;
    margin: 2rem;
    padding: 1rem;

    @media (max-width: 500px) {
        margin: 0 1rem 1rem 1rem !important;
        flex-direction: column;
        font-size: smaller;
    }
`