const INITIAL_STATE = {
    id: "",
    email: "",
    title: "",
    subTitle: "",
    description: "",
    day: "",
    hour: "",
    priority: false,
    isDone: false,
    isUpdate: false
};

function cardReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'CARD':
            return {
                ...state,
                id: action.id,
                email: action.email,
                isUpdate: action.isUpdate,
                title: action.title,
                subTitle: action.subTitle,
                description: action.description,
                day: action.day,
                hour: action.hour,
                priority: action.priority,
                isDone: action.isDone,
                isUpdate: action.isUpdate
            }
        case 'CARD_UPDATED':
            return {
                ...state,
                isUpdate: false
            }
        default:    
            return state;
    }
}

export default cardReducer;