import React, {useState} from 'react';
import { firestore } from './../../firebase/util';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {selectCartItems, selectCartTotal, selectCartItemsCount,} from './../../redux/Cart/cart.selectors';
import {clearCart} from './../../redux/Cart/cart.actions'
import { auth } from './../../firebase/util';
import {createStructuredSelector} from 'reselect';
import FormInput from '../Forms/FormInput';
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

const errorMessage = 'You have no items in your basket' 
const Checkout = () => {
    console.log(auth.currentUser)
    const history = useHistory();
    const dispatch = useDispatch();
    const [telephone, setTelephone] = useState('');
    const {cartItems, total} = useSelector(mapSate);
    const cartTotal = total.toFixed(2);
   
    
    
    const handleFormSubmit = e => {
        if (!auth.currentUser) {
            alert('Please Login to submit your order')
            history.push('login')
        }
        e.preventDefault();
        const timestamps = new Date();
        const configOrder = {
            orderUserID: auth.currentUser.uid,
            orderCreatedDate: timestamps,
            orderTotal: total,
            telephoneNumber: telephone,
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
            console.log(typeof(telephone))
            const mobileNumberRegex = /^(?:(?:00)?44|0)7(?:[45789]\d{2}|624)\d{6}$/;
            if (telephone.replace(mobileNumberRegex)) {
            handleSaveOrder(configOrder)
            history.push('/confirmation')
            dispatch(clearCart())
            } else {
                alert('Please enter a valid mobile number to complete your order')
            }
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
                                               <i class='fa fa-bars'></i>  &nbsp; Menu
                                                </Button> 
                                            </td>
                                            <FormInput 
                                                type="tel"
                                                name="telephone"
                                                value={telephone}
                                                placeholder="Mobile Number"
                                                handleChange={e => setTelephone(e.target.value)}
                                            />
                                            <td className="send">
                                            {cartTotal > 0 &&
                                            <form onSubmit={handleFormSubmit}>
                                                <Button type="submit">
                                                <i class='fa fa-check'></i> &nbsp;
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
                <p onClick={()=>history.push('/search')}>
                 {errorMessage}
                </p>
            )}
            </div>
        </div>
    )
}
export default Checkout;