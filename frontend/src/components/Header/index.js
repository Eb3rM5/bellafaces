import React, { Component, isValidElement } from 'react';

import { Container, CartButton, HeaderLoginMessage, SearchField, SearchButton, CartLink, CartBadge } from './styles';
import { FaShoppingBag, FaSearch } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import CartController from '../../controllers/CartController';
import AuthController from '../../controllers/AuthController';

export default class Header extends Component {

    state = {
        controller: CartController
    }

    componentDidMount(){
        CartController.SetHeader(this);
        CartController.GetItems();
    }

    render(){
        return (
            <Container>
                <Link to="/">
                    <img src={process.env.PUBLIC_URL + '/logo.svg'} alt="Bella Faces Cosméticos"></img>
                </Link>

                {
                    AuthController.IsAuthenticated() && (
                        <div className="right">
                            <CartLink to="/cart">
                                <span>
                                    <strong>{CartController.GetAmount()} </strong>
                                    itens no carrinho
                                    </span>
                                <CartButton><FaShoppingBag size={26}/></CartButton>
                            </CartLink>
                        </div>
                    )
                }
            </Container>
        );
    }
}
