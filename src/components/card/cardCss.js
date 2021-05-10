import styled from 'styled-components';

export const MainCards = styled.div `
    border: 3px solid #007bff;
    border-radius: 10px;
    width: 16rem;
    height: auto;
    margin: 1rem;
    background-color: #afafaf80 !important;
    position: relative;
    box-shadow: 3px 10px 10px -1px rgba(0,0,0,0.75);
    transition: all .4s;

    .priorityCard {
        color: white;
        background-color: #dc3545 !important;
        transition: all .4s;
    }

    p {
        font-size: 12px;
    }
`