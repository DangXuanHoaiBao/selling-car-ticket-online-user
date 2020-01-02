import apiServices from "../helpers/apiServices";
import history from "../helpers/history";

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

function signUp(email, password){
    return dispatch => {
        fetch(`${apiServices.apiLocal}/users/sign-up`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(res => {
            res.json().then(message => {
                alert(message);
                if(res.status === 200){
                    history.push("/login")
                }
                else{
                    history.push("/sign-up")
                }
            })
        })
    }
}

function login(email, password){
    return dispatch => {
        fetch(`${apiServices.apiLocal}/users/login`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(res => {
            res.json().then(data=>{
                if(res.status === 200){
                    console.log(data.user);
                    localStorage.setItem("username", data.user.username);
                    history.push("/");
                }
            })
        })
        .catch(error => {
            // dispatch(alertActions.error(error.message));
            // dispatch(isFail(error.message));
            console.log(error)
        });
    }
}

const userActions = {
    checkout,
    getAllRoutes,
    getRouteByDepartureAndDestination,
    createFare,
    createTrip,
    getTripByDepDesDateAndTime,
    signUp,
    login
}

export default userActions;