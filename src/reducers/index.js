import {combineReducers} from "redux";
import {
    getAllRoutes,
    getRouteByDepartureAndDestination,
    getTripByDepDesDateAndTime,
    getFaresOfUser
} from "./user";

export default combineReducers({
    getAllRoutes,
    getRouteByDepartureAndDestination,
    getTripByDepDesDateAndTime,
    getFaresOfUser
});