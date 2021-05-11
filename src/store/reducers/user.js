const INITIAL_STATE = {
    userLogin: false,
    email: "",
    name: "",
    lastName: "",
    birthDate: "",
};

function userReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'REGISTER':
            return { 
                ...state,
                userLogin: true,
                email: action.email,
                name: action.name,
                lastName: action.lastName,
                birthDate: action.birthDate
            }
        case 'LOGIN':
            return { 
                ...state,
                userLogin: true,
                email: action.email,
                name: action.name
            }
        case 'LOGOUT':
            return { 
                ...state,
                userLogin: false,
                email: null,
                name: null,
                lastName: null,
                birthDate: null
            }
        default:    
            return state;
    }
}

export default userReducer;