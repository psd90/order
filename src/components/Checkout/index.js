import React from 'react';
import { firestore } from './../../firebase/util';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {selectCartItems, selectCartTotal, selectCartItemsCount,} from './../../redux/Cart/cart.selectors';
import {clearCart} from './../../redux/Cart/cart.actions'
import { auth } from './../../firebase/util';
import {createStructuredSelector} from 'reselect';
import './styles.scss';
import Button from './../Forms/Button';
import Item from './Item';
import { useEffect, useState } from 'react';


const mapSate = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
    itemCount: selectCartItemsCount
})
const handleSaveOrder = order => {
    return new Promise((resolve, reject) => {
      firestore
        .collection('orders')
        .doc()
        .set(order)
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  };

const errorMessage = 'You have no items, please add some items to your basket' 
const Checkout = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {cartItems, total, itemCount} = useSelector(mapSate);
    
    useEffect(() => {
        if (itemCount < 1) {
            history.push('/confirmation');
        }
        
    }, [itemCount]);
    
    
    const handleFormSubmit = e => {
        e.preventDefault();
        const timestamps = new Date();
        const configOrder = {
            orderUserID: auth.currentUser.uid,
            orderCreatedDate: timestamps,
            orderTotal: total,
            orderItems: cartItems.map(item => {
                const { documentID, productThumbnail, productName,
                    productPrice, quantity } = item;
                    
                    return {
                        documentID,
                        productThumbnail,
                        productName,
                        productPrice,
                        quantity
                    };
                })
                
            }
            
            handleSaveOrder(configOrder)
            dispatch(clearCart())
        }
            console.log(cartItems)
            
            return (
                <div className="checkout">
            <h1> 
                Basket
            </h1>

            <div className="cart">
                {cartItems.length > 0 ? (
                <table border="0" cellPadding="0" cellSpacing="0">
                    <tbody>
                        <tr>
                        <table className="checkoutHeader" border="0" cellPadding="10" cellSpacing="0">
                        <tbody>
                        <tr>
                            <th>
                                Product
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Quantity
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                Remove
                            </th>
                        </tr>
                        </tbody>
                        </table>
                        </tr>

                        <tr>
                            <table border="0" cellPadding="0" cellSpacing="0">
                                <tbody>
                                    {cartItems.map((item,pos) => {
                                        return(
                                    <tr key={pos}>
                                        <td>
                                            <Item {...item}/>
                                        </td>
                                    </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </tr>
                            
                            <tr>
                                <table align="right" border="0" cellSpacing="0" cellPadding="10">
                                <tr align="right">
                                <td>
                                    <h3>
                                        Total: £{total}
                                    </h3>
                                </td>
                                </tr>
                                <tr>
                                    <table border="0" cellPadding="10" cellSpacing="10">
                                    <tbody>
                                        <tr>
                                            <td>
                                               <Button onClick={() => history.goBack()}>
                                                   Continue Shopping
                                                </Button> 
                                            </td>
                                            <td>
                                            <form onSubmit={handleFormSubmit}>
                                                <Button type="submit">
                                                    Checkout
                                                </Button>
                                            </form>
                                            </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </tr>
                                </table>
                            </tr>
                    </tbody>
                </table>
            ) : (
                <p>
                 {errorMessage}
                </p>
            )}
            </div>
        </div>
    )
}
export default Checkout;