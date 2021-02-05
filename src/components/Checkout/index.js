import React from 'react';
import {useSelector} from 'react-redux';
import {selectCartItems} from './../../redux/Cart/cart.selectors';
import {createStructuredSelector} from 'reselect';
import './styles.scss';
import Button from './../Forms/Button';
import Item from './Item';

const mapSate = createStructuredSelector({
    cartItems: selectCartItems
})

const errorMessage = 'You have no items, please add some items to your basket' 
const Checkout = ({}) => {
    const {cartItems} = useSelector(mapSate);


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
                                        Total:
                                    </h3>
                                </td>
                                </tr>
                                <tr>
                                    <table border="0" cellPadding="10" cellSpacing="10">
                                    <tbody>
                                        <tr>
                                            <td>
                                               <Button>
                                                   Continue Shopping
                                                </Button> 
                                            </td>
                                            <td>
                                                <Button>
                                                    Checkout
                                                </Button>
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