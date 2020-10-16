import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Route from './Route';

import Products from '../pages/Products';
import Login from '../pages/Login';
import Cart from '../pages/Cart';

export default function Routes(){
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/products" component={Products} isPrivate/>
            <Route path="/cart" component={Cart} isPrivate/>
        </Switch>
    );
}
