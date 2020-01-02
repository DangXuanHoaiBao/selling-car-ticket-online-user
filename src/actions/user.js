/* eslint-disable quotes */
/* eslint-disable no-restricted-globals */
import apiServices from "../helpers/apiServices";
import history from "../helpers/history";
import config from "../config/api-config";
import authHeader from '../helpers/auth-header';
import alertActions from '../actions/alert';


function checkout(token, fare){
    return dispatch => {
   
        fetch(`${apiServices.apiHeroku}/checkout`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token,
                fare
            })
        })
        .then(res => {
            res.json().then(message => {
                alert(message);
                history.push("/");
            })
        })
        .catch(error => console.log(error));
    }
}

function getAllRoutes(){
    function isSuccess(routes){
        return {
            type: "GET_ALL_ROUTES",
            routes
        }
    }
    return dispatch => {
        fetch(`${apiServices.apiHeroku}/get-all-routes`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            res.json().then(routes => {
                if(routes){
                    dispatch(isSuccess(routes))
                }
            })
        })
    }
}

function getRouteByDepartureAndDestination(departure, destination){
    function isSuccess(route){
        return {
            type: "GET_ROUTE_BY_DEPARTURE_AND_DESTINATION",
            route
        }
    }
    return dispatch => {
        fetch(`${apiServices.apiHeroku}/get-route-by-departure-and-destination`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                departure,
                destination
            })
        })
        .then(res => {
            res.json().then(route => {
                if(route){
                    dispatch(isSuccess(route));
                }
            })
        })
    }
}

function createTrip(fareInfo){
    return dispatch => {
        fetch(`${apiServices.apiHeroku}/create-trip`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fareInfo
            })
        })
        .then(res => {
            return console.log(res);
        })
    }
}

function createFare(fareInfo){
    return dispatch => {
        fetch(`${apiServices.apiHeroku}/create-fare`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fareInfo
            })
        })
        .then(res => {
          return console.log(res);  
        })
    }
}

function getTripByDepDesDateAndTime(departure, destination, date, time){
    function isSuccess(bookedChair){
        return {
            type: "GET_TRIP_BY_DEP_DES_DATE_AND_TIME",
            bookedChair
        }
    }
    return dispatch => {
        fetch(`${apiServices.apiHeroku}/get-trip-by-dep-des-date-and-time`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                departure,
                destination,
                date,
                time
            })
        })
        .then(res => {
            res.json().then(trip => {
                if(res.status === 200){
                    dispatch(isSuccess(trip.bookedChair));
                }
                else{
                    dispatch(isSuccess(null))
                }
            })
        })
    }
}

function signUp(fullName, email, password){
    return dispatch => {
        fetch(`${apiServices.apiLocal}/users/sign-up`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName,
                email,
                password
            })
        })
        .then(handleResponse)
        .then(
            res => {
                history.push('/login');
                dispatch(alertActions.success(res.message));
                
    
            }
        ).catch(error => {
            console.log(error);
            dispatch(alertActions.error(error));
            history.push('/sign-up');
        });
    }
}


function login(email, password, rememberUsername){
    function request() { 
        return { 
            type: 'LOGIN_REQUEST' 
        } 
    }
    function isSuccess(data, message){
        return {
            type: 'LOGIN_SUCCESS',
            message,
            data
        }
    }
    function isFail(message){
        return {
            type: 'LOGIN_FAIL',
            message
        }
    }
    return dispatch => {
        dispatch(request());
        if(rememberUsername === true){
            localStorage.setItem('username', email);
        }
        else{
            localStorage.removeItem('username');
        }
        fetch(`${config.apiUrlLocal}/users/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        })
        .then(handleResponse)
        .then(res => {
            localStorage.setItem('data', JSON.stringify(res));
                dispatch(isSuccess(res, "Đăng nhập thành công"));
             
                history.push('/');

        })
        .catch(error => {
            dispatch(alertActions.error(error.message));
            dispatch(isFail(error.message));
        });
    }
}
function logout(){
    localStorage.removeItem('data');
    return {
        type: 'LOGOUT'
    }
}

function updateInfo(newUser){
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/update-info`,{
            method: 'POST',
            headers: {
                ...authHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                newUser
            })
        })
        .then(handleResponse)
        .then(
            res => {
                const data = JSON.parse(localStorage.getItem('data'));
                localStorage.removeItem('data');
                const {fullName, address, gender, phoneNumber, urlImg} = newUser;
                data.user = {...data.user, fullName, address, gender, phoneNumber, urlImg}
                localStorage.setItem('data', JSON.stringify(data));
                dispatch(updateResOfNavigation(data));
                dispatch(alertActions.success(res.message));
            },
            error => {
                dispatch(alertActions.error(error));
            })
        .catch(errors => console.log(errors))
    };
    function updateResOfNavigation(data) { return { type: 'LOGIN_SUCCESS', data: data } }
}

function signUp_Login_With_Google_Facebook(fullName, email, password, urlImg, typeAccount){
    console.log(email);
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/check-to-signup-or-login`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'fullName': fullName,
                'email': email,
                'password': password,
                'urlImg': urlImg,
                'typeAccount': typeAccount
            })
        })
        .then(handleResponse)
        .then(res => {
            localStorage.setItem('data', JSON.stringify(res));
            dispatch(updateResOfNavigation(res));
            history.push('/')
        })
        .catch(error => {
            dispatch(alertActions.error(error.message));
        });
        
    }
    function updateResOfNavigation(data) { return { type: 'LOGIN_SUCCESS', data: data } }
}

function changePassword(oldPassword, newPassword, confirmPassword){
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/change-password`,{
            method: 'POST',
            headers: {
                ...authHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                oldPassword, 
                newPassword, 
                confirmPassword
            })
        })
        .then(handleResponse)
        .then(
            res => {
                dispatch(alertActions.success(res.message));
                history.push('/');
            },
            error => {
                dispatch(alertActions.error(error));
            })
        .catch(errors => console.log(errors))
    };
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

const userActions = {
    checkout,
    getAllRoutes,
    getRouteByDepartureAndDestination,
    createFare,
    createTrip,
    getTripByDepDesDateAndTime,
    signUp,
    login,
    logout,
    updateInfo,
    signUp_Login_With_Google_Facebook,
    changePassword
}

export default userActions;