import { formatPrice } from '../util/Format';
import api from '../services/api';

import AuthController from './AuthController';

class CartController {

    cart_items = [];
    total = 0;
    comments = '';

    CompletePurchase = async e => {
        const response = await api.post('/orders', {
            total_order: this.GetRawTotal(),
            comments: this.comments,
            products: this.cart_items.map(item=>({
                product_id: item.id,
                unit_price: item.price,
                total_price: item.price * item.quantity,
                quantity: item.quantity
            }))
        }, {
            headers: {
                'Authorization': `Bearer ${AuthController.GetToken()}`
            }
        })

        this.GetItems();
    }

    SetCart(cart){
        this.cart = cart;
    }

    SetHeader(header){
        this.header = header;
    }

    GetAmount(){
        return this.cart_items.length > 0 ?
                    this.cart_items.reduce((i, item)=>
                            i += (item.quantity), 0)
                            : 0;
    }

    RefreshCart(){
        this.cart && this.cart.setState({
            controller: this
        })
    }

    RefreshHeader(){
        this.header && this.header.setState({
            controller: this
        })
    }

    IndexOf(id){
        return this.cart_items.findIndex((item)=>{
            return item.id === id;
        });
    }

    async AddItem(id){
        const index = this.IndexOf(id);

        if (index === -1){
            await api.post(`/customers/cart/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${AuthController.GetToken()}`
                }
            });
        } else {
            await api.put(`/customers/cart/${id}`, {
                quantity: (this.cart_items[index].quantity + 1)
            }, {
                headers: {
                    'Authorization': `Bearer ${AuthController.GetToken()}`
                }
            });
        }

        this.GetItems();
        this.RefreshHeader();
    }

    async GetItems(){
        let response = await api.get(`/customers/${AuthController.GetId()}`, {
            headers: {
                'Authorization': `Bearer ${AuthController.GetToken()}`
            }
        });

        console.log(response)
        if (response && response.status === 200){
            let { cart_items } = response.data;

            this.cart_items = await Promise.all(cart_items.map(async (item)=>{
                const { product_id, quantity } = item;

                let product = await api.get(`/products/${product_id}`, {
                    headers: {
                        'Authorization': `Bearer ${AuthController.GetToken()}`
                    }
                });

                if (product && product.status === 200){
                    product = product.data;

                    product.subtotal = formatPrice(product.price * quantity);
                    product.formattedPrice = formatPrice(product.price);
                    product.quantity = quantity;

                    return product;
                }

                this.total = this.GetTotal();

                return null;
            }));

            this.RefreshHeader();
            this.RefreshCart();

            return this.cart_items;
        }

        this.total = 0;
        this.cart_items = []

        return this.cart_items;
    }

    async RescaleItemQuantity(item, operation){
        let { id, quantity } = item;

        switch (operation){
            case 'add':
                quantity++;
                break;
            case 'del':
                --quantity;
                break;
        }

        if (quantity < 1) return;

        const response = await api.put(`/customers/cart/${id}`,
                                            {
                                                quantity
                                            }
                                        , {
                                            headers: {
                                                'Authorization': `Bearer ${AuthController.GetToken()}`
                                            }
                                        });
        if (response && response.status === 200){
            quantity = response.data.quantity;

            item.subtotal = formatPrice(item.price * quantity);
            item.quantity = quantity;

            this.total = this.GetTotal();

            this.RefreshCart();
            this.RefreshHeader();
        }

    }
    async DeleteItem(id) {

        const response = await api.put(`/customers/cart/${id}`,
            {
                quantity: 0
            }
        );

        if (response && response.status === 200){
            this.cart_items = this.cart_items.filter(
                (item)=>item.id !== id
            );

            this.total = this.GetTotal();

            this.RefreshCart();
            this.RefreshHeader();
        }
    }

    GetRawTotal(){
        return this.cart_items.length > 0 ?
        this.cart_items.reduce((i, item)=>
                i += (item.price * item.quantity), 0)
                : 0;
    }

    GetTotal(){
        return formatPrice(this.GetRawTotal());
    }

}

const controller = new CartController();

export default controller;
export const { AddItem, DeleteItem, RescaleItemQuantity, ContainsItem } = controller;
