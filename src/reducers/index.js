import {combineReducers} from "redux";
import {
    getAllRoutes,
    getRouteByDepartureAndDestination,
    getTripByDepDesDateAndTime
} from "./user";

export default combineReducers({
    getAllRoutes,
    getRouteByDepartureAndDestination,
    getTripByDepDesDateAndTime
});