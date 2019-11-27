function checkoutSuccess(){
    return {
        type: 'CHECKOUT_SUCCESS'
    }
}

function checkoutRequest(){
    return {
        type: 'CHECKOUT_REQUEST'
    }
}

function checkout(token){
    return dispatch => {
        dispatch(checkoutRequest());
        fetch('http://localhost:3001/checkout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token
            })
        })
        .then(res => {
            dispatch(checkoutSuccess());
        })
        .catch(error => console.log(error));
    }
}

export default checkout;