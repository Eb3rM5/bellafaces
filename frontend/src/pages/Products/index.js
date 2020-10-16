import React, { Component } from 'react';

import { MdAddShoppingCart }  from 'react-icons/md';
import { Container, ProductList } from './styles';

import { formatPrice } from '../../util/Format';

import CartController, { AddItem } from '../../controllers/CartController';
import AuthController from '../../controllers/AuthController';

import api from '../../services/api';

export default class Main extends Component {

    state = {
        products: []
    }

    async componentDidMount(){
        const products = await api.get('/products', {
            headers: {
                'Authorization': `Bearer ${AuthController.GetToken()}`
            }
        });

        if (products && products.status === 200){
            this.setState({
                products: products.data.map(product=>{
                    return {...product, price: formatPrice(product.price)}
                })
            })
        }
    }

    render(){
        return (
            <Container>
                <ProductList>
                    {
                        this.state.products.map(product=>(
                            <li key={String(product.id)}>
                                <img src={product.image.url} alt={product.name}/>
                                <strong>{product.name}</strong>
                                <span>{product.price}</span>

                                <button type='button' onClick={AddItem.bind(CartController, product.id)}>
                                    <div>
                                        <MdAddShoppingCart size={16} color="#fff"/>
                                    </div>
                                    <span>
                                        ADICIONAR AO CARRINHO
                                    </span>
                                </button>
                            </li>
                        ))
                    }
                </ProductList>
            </Container>
        );
    }

}

