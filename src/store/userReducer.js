const INITIAL_STATE = {
    userLogin: false,
    id: "",
    name: "",
    lastName: "",
    email: "",
    birthDate: ""
};

function userReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'REGISTER':
            return { 
                userLogin: true,
                id: action.id,
                name: action.name,
                lastName: action.lastName,
                birthDate: action.birthDate,
                email: action.email
            }
        case 'LOGIN':
            return { 
                userLogin: true,
                email: action.email
            }
        case 'LOGOUT':
            return { 
                userLogin: false,
                name: null,
                lastName: null,
                email: null,
                birthDate: null
            }
        default:    
            return state;
    }
}

export default userReducer;