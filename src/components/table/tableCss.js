import styled from 'styled-components';

export const ContainerTable = styled.div`
    @media (max-width: 500px) {
        font-size: 1rem !important;
    }

    align-items: flex-end;
    justify-content: space-evenly;
    margin: 1rem;
    width: 100%;
    border-bottom: 1px solid rgb(209, 209, 209);
    font-size: 1rem;
    color: #6c757d;

    .aCumprir{
    border-bottom: 3px solid rgb(45, 141, 231) !important;
    }

    .atrasados {
        border-bottom: 3px solid red !important;
    }

    .jaFeitos {
        border-bottom: 3px solid rgb(0, 255, 0) !important;
    }

    .total {
        border-bottom: 3px solid black !important;
    }

`