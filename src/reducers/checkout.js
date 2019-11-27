const checkoutReducer = (state = {checkoutRequest: false, checkoutSuccess: false}, action) => {
    switch(action.type){
        case 'CHECKOUT_REQUEST': {
            return {
                ...state,
                checkoutRequest: true,
                checkoutSuccess: false
            }
        }
        case 'CHECKOUT_SUCCESS': {
            return {
                ...state,
                checkoutRequest: false,
                checkoutSuccess: true
            }
        }
        default: return state;
    }
}

export default checkoutReducer;