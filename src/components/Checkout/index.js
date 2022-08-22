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
    console.log(auth.currentUser)
    const history = useHistory();
    const dispatch = useDispatch();
    const {cartItems, total} = useSelector(mapSate);
    const cartTotal = total.toFixed(2)
    
    
    
    
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
            history.push('/confirmation')
            dispatch(clearCart())
        }
            
            return (
                <div className="checkout">

            <div className="cart">
                {cartItems.length > 0 ? (
                <table border="0" cellPadding="0" cellSpacing="0">
                    <tbody>
                        <tr>
                            <table border="0" cellPadding="0" cellSpacing="0">
                                <tbody>
                                    {cartItems.map((item,pos) => {
                                        return(
                                    <tr key={pos}>
                                        <td className='cart-Item'>
                                            <Item {...item}/>
                                            
                                        </td>
                                    </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </tr>
                            
                            <tr>
                                
                                    
                                        <tr>
                                            <td className='menu'>
                                               <Button onClick={() => history.push('/search')}>
                                               <i class='fa fa-bars'></i> Menu
                                                </Button> 
                                            </td>
                                            <td className="send">
                                            {cartTotal > 0 &&
                                            <form onSubmit={handleFormSubmit}>
                                                <Button type="submit">
                                                <i class='fa fa-check'></i>
                                                Send Order : £ {cartTotal}
                                                </Button>
                                            </form>
                                            }
                                            </td>
                                        </tr>
                                    
       
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