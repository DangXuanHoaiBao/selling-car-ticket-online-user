export const getAllRoutes = (state = {}, action) => {
    switch(action.type){
        case "GET_ALL_ROUTES": {
            return {
                ...state,
                routes: action.routes
            }
        }
        default: return state;
    }
}

export const getRouteByDepartureAndDestination = (state = {}, action) => {
    switch(action.type){
        case "GET_ROUTE_BY_DEPARTURE_AND_DESTINATION": {
            return {
                ...state,
                route: action.route
            }
        }
        default: return state;
    }
}

export const getTripByDepDesDateAndTime = (state = {}, action) => {
    switch(action.type){
        case "GET_TRIP_BY_DEP_DES_DATE_AND_TIME": {
            return {
                ...state,
                bookedChair: action.bookedChair
            }
        }
        default: return state;
    }
}

export const getFaresOfUser = (state = {}, action) => {
    switch(action.type){
        case "GET_FARES_OF_USER": {
            return {
                ...state,
                fares: action.fares
            }
        }
        default: return state;
    }
}