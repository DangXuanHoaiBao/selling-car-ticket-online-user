/* eslint-disable quotes */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const IsNotLogin = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !localStorage.getItem('data')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)

const IsLogin = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('data')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)



const Private = {
    IsLogin,
    IsNotLogin
};
export default Private;