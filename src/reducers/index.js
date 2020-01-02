/* eslint-disable quotes */
import {combineReducers} from "redux";
import {
    getAllRoutes,
    getRouteByDepartureAndDestination,
    getTripByDepDesDateAndTime,
    login,
    getFaresOfUser,
    getAllComments
} from "./user";
import alert from './alert';

export default combineReducers({
    getAllRoutes,
    getRouteByDepartureAndDestination,
    getTripByDepDesDateAndTime,
    login,
    alert,
    getFaresOfUser,
    getAllComments
});