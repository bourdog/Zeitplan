const INITIAL_STATE = {
    id: "",
    email: "",
    isDelete: false,
    isUpdate: false
};

function cardReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'CARD_UPDATE':
            return {
                ...state,
                id: action.id,
                email: action.email,
                isDelete: false,
                isUpdate: true
            }
        case 'CARD_UPDATED':
            return {
                ...state,
                isUpdate: false
            }
        case 'CARD_DELETE':
                return {
                    ...state,
                    id: action.id,
                    email: action.email,
                    isDelete: true,
                }
        case 'CARD_DELETED':
            return {
                ...state,
                isDelete: false
            }
        default:    
            return state;
    }
}

export default cardReducer;