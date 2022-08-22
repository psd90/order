import React from 'react';
import {useDispatch} from 'react-redux';
import {removeCartItem, addProduct, reduceCartItem} from './../../../redux/Cart/cart.actions';

const Item = (product) => {
    const dispatch = useDispatch();
    const {
        productName,
        productThumbnail,
        productPrice,
        quantity,
        documentID
    } = product;
    const totalItemCost = (productPrice * quantity).toFixed(2)

    const handleRemoveCartItem = (documentID) => {
        dispatch(
            removeCartItem({
                documentID
            })
        )
    }

    const handleAddProduct = (product) => {
        dispatch(
            addProduct(product)
        )
    }

    const handleReduceItem = (product) => {
        if (quantity > 1)
        dispatch(
            reduceCartItem(product)
        )
    }
    return (
        <table className="cartItem" border="0" cellSpacing="0" cellPadding="10">
            <tbody>
                <tr>
                    <td className='info'>
                        {productName}
                    </td>
                    <td className='info'>
                        £{totalItemCost}
                    </td>
                    <td className='editCart'>
                        <span className="cartBtn"
                        onClick={() => handleReduceItem(product)}>
                        <i class="fa fa-minus-circle fa-3x" aria-hidden="true" ></i>
                        </span>
                        <span className='quantity'>
                        {quantity} 
                        </span>
                        <span className="cartBtn"
                        onClick={() => handleAddProduct(product)}> 
                        <i class="fa fa-plus-circle fa-3x" aria-hidden="true"></i>
                        </span>
                    </td>
                    <td align="center" className='delete'>
                    <span className="cartBtn" onClick={() => handleRemoveCartItem(documentID)}>
                    <i class="fa fa-trash fa-3x" aria-hidden="true"></i>
                    </span>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Item;