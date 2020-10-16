import React, { Component } from 'react';

import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';

export default class CartItem extends Component {

    render(){
        const { name, quantity, formattedPrice: price, subtotal, image: { url } } = this.props.item;

        return (
            <tr>
                <td>
                    <img src={url}/>
                </td>
                <td>
                    <strong>{name}</strong>
                    <span>{price}</span>
                </td>
                <td>
                    <div>
                        <button type='button' onClick={this.props.onDecrease}>
                            <MdRemoveCircleOutline size={26} color="#dcafc4"/>
                        </button>
                        <input type="numtext" readOnly value={quantity}/>
                        <button type='button' onClick={this.props.onIncrease}>
                            <MdAddCircleOutline size={26} color="#dcafc4"/>
                        </button>
                    </div>
                </td>
                <td>
                    <strong>{subtotal}</strong>
                </td>
                <td>
                    <button type="button" onClick={this.props.onDelete}>
                        <MdDelete size={26} color="#dcafc4"/>
                    </button>
                </td>
            </tr>
        );
    }
}
