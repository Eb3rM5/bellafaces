import React, { Component } from 'react';

//import Container from '../../components/Container';
import { Container, ProductList, Total, CommentArea, Title } from './styles';
import CartItem from '../../components/CartItem';

import CartController, { RescaleItemQuantity, DeleteItem } from '../../controllers/CartController';

export default class Cart extends Component {

    state = {
        controller: CartController
    };

    async componentDidMount(){
        CartController.SetCart(this);
        CartController.GetItems();
    }

    async componentWillUnmount(){
        CartController.SetCart(null);
    }

    handleCommentChange = async e => {
        CartController.comments = e.target.value;
    }

    render(){
        return (
            <Container>
                {
                    CartController.GetRawTotal() > 0 ? (
                            <>
                                <ProductList>
                                    <thead>
                                        <tr>
                                            <th />
                                            <th>PRODUTO</th>
                                            <th>QUANTIDADE</th>
                                            <th>SUBTOTAL</th>

                                            <th />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            CartController.cart_items.map(item=>(
                                                <CartItem
                                                    key={String(item.id)}
                                                    item={item}
                                                    onDelete={DeleteItem.bind(CartController, item.id)}
                                                    onDecrease={RescaleItemQuantity.bind(CartController, item, 'del')}
                                                    onIncrease={RescaleItemQuantity.bind(CartController, item, 'add')}
                                                />
                                            ))
                                        }
                                    </tbody>
                                </ProductList>
                                <Title>OBSERVAÇÕES:</Title>
                                <CommentArea onChange={this.handleCommentChange}>
                                </CommentArea>
                                <footer>
                                    <button type='button' onClick={CartController.CompletePurchase}>Finalizar pedido</button>
                                    <Total>
                                        <span>TOTAL</span>
                                        <strong>
                                            {CartController.GetTotal()}
                                        </strong>
                                    </Total>
                                </footer>
                            </>
                        ) : <span>Carrinho vazio</span>

                }

            </Container>
          );
    }

}
