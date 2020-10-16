import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { IsAuthenticated } from '../controllers/AuthController';

export default function RouteWrapper({
    component: Component,
    isPrivate = false,
    ...rest
}){

    if (!IsAuthenticated() && isPrivate){
        return <Redirect to="/" />;
    }

    if (IsAuthenticated() && !isPrivate){
        return <Redirect to="/products" />;
    }

    return (
        <Route
            {...rest}
            component={Component}
        />
    )

}
