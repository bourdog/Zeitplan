import styled from 'styled-components';

export const BodyMain = styled.main `

    @media (max-width: 450px) {
    #mobileView h5, h6, p{
        font-size: 10px !important;
    }
    .reminder  {
        padding: 2px 0;
        margin: 2px 0;
    }

    /* --- Modal --- */
    #headerModal{
        background-color: black;
    }

    #closerButton {
        color: white;
    }

    #createModalLabel {
        color: white;
    }

    #formCreateModal {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.5rem;
    }
    /* --- /Modal --- */
}
`

export const Reminders = styled.div `
    align-items: flex-end;
    margin-top: 1rem;
    width: 100%;
    border-bottom: 1px solid rgb(209, 209, 209);
    font-size: 1.5rem;
    color: #6c757d;

    @media (max-width: 450px) {
        flex-wrap: wrap;
        justify-content: center !important;
        margin: 0 auto !important;
    }
`
export const MainContainerContents = styled.div `
    height: 100vh;
    margin: 1rem auto;
    padding: 3rem;
    align-items: flex-start;

    .checkboxDivDone {
        display: flex;
        align-items: center;

        .labelCheckbox {
            font-size: small;
            font-weight: bold;
            margin-bottom: 0 !important;
        }
        .checkboxHome {
            margin-left: 0.5rem;
        }

    }
`