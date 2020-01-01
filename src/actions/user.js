import apiServices from "../helpers/apiServices";

function checkout(token){
    return dispatch => {
   
        fetch(`${apiServices.apiLocal}/checkout`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token
            })
        })
        .then(res => {
           return console.log(res);
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
        fetch(`${apiServices.apiLocal}/get-all-routes`, {
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
        fetch(`${apiServices.apiLocal}/get-route-by-departure-and-destination`, {
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
        fetch(`${apiServices.apiLocal}/create-trip`, {
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
        fetch(`${apiServices.apiLocal}/create-fare`, {
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
        fetch(`${apiServices.apiLocal}/get-trip-by-dep-des-date-and-time`, {
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
                const bookedChair = trip.bookedChair;
                if(trip){
                    dispatch(isSuccess(bookedChair));
                }
            })
        })
    }
}

const userActions = {
    checkout,
    getAllRoutes,
    getRouteByDepartureAndDestination,
    createFare,
    createTrip,
    getTripByDepDesDateAndTime
}

export default userActions;