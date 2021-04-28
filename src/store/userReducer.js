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
                email: action.email,
                id: action.id
            }
        case 'LOGOUT':
            return { 
                userLogin: false,
                name: null,
                lastName: null,
                email: null,
                birthDate: null
            }
        case 'CARD':
            return {
                title: action.title,
                subTitle: action.subTitle,
                description: action.description,
                day: action.day,
                hour: action.hour
            }
        default:    
            return state;
    }
}

export default userReducer;