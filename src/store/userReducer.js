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
                email: action.email,
                name: action.name,
                lastName: action.lastName,
                birthDate: action.birthDate
            }
        case 'LOGIN':
            return { 
                userLogin: true,
                email: action.email
            }
        case 'LOGOUT':
            return { 
                userLogin: false,
                email: null,
                name: null,
                lastName: null,
                birthDate: null
            }
        case 'CARD':
            return {
                userLogin: true,
                email: action.email,
                title: action.title,
                subTitle: action.subTitle,
                description: action.description,
                day: action.day,
                hour: action.hour,
                priority: action.priority,
                isDoneCard: action.isDoneCard
            }
        default:    
            return state;
    }
}

export default userReducer;