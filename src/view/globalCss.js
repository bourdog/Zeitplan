import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle `
html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Source Sans Pro !important;
}

body,
input,
textarea,
button {
  font: 400 16px "Inter", sans-serif;
}

button {
    cursor: pointer;
}
a {
    color: inherit;
    text-decoration: none;
}
//navbar
#navbarLogin {
    background-color: black !important;
}

#navbarLogo {
    margin-left: 8rem;
    margin-right: 55%;
}
//button without font style
.buttonNotItalic {
    font-style: normal !important;
}

@media (max-width: 768px) {
    #navbarLogo {
        margin-left: 2rem;
        margin-right: 1rem;
    }
}
`