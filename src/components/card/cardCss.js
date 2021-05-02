import styled from 'styled-components';

export const MainCards = styled.div `
    width: 16rem;
    height: auto;
    margin: 1rem;
    background-color: #afafaf80 !important;
    position: relative;
    box-shadow: 3px 10px 10px -1px rgba(0,0,0,0.75);

    .priorityCard {
        color: white;
        background-image: linear-gradient(
            to bottom, red, rgb(170, 0, 0)
        ) !important;
        transition: all .4s;
    }

    .addIsDone {
        border-bottom: 3px solid rgb(0, 255, 0);
        transition: all .4s;
    }

    p {
        font-size: 12px;
    }
`