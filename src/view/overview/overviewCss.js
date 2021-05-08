import styled from 'styled-components';

export const TitlePage = styled.div `
    @media (max-width: 500px) {
        font-size: 1rem !important;
    }

    align-items: flex-end;
    justify-content: space-evenly;
    margin: 1rem;
    width: 100%;
    border-bottom: 1px solid rgb(209, 209, 209);
    font-size: 1.5rem;
    color: #6c757d;

    button.active {
        opacity: 0.7;
        outline: none;
        border-bottom: 1px solid black;
    }
`
