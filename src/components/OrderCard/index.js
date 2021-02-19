import React, {useEffect} from 'react';
import { firestore } from '../../firebase/util';



const OrderCard = ({orderTotal, orderUserID, orderItems}) => {
const productName = orderItems.map(x => x.productName)
const quantity = orderItems.map(x => x.quantity)

// useEffect(()=> {

//     const user = firestore.collection('users').doc({orderUserID}).get()
//     .then(()=> {
//         console.log(user.data())
//     })
// }, [])





    return (
        <div className="orderCard">
          <div className="orderDetails">
            <ul>
                <li>
                    <h1>
                     OrderTotal £: {orderTotal}
                    </h1>
                </li>
                <li>
                    <h1>
                        User: 
                    </h1>
                </li>
                <li>
                    <h1>
                        {productName} x {quantity}
                    </h1>
                </li>
                <br></br>
            </ul>
          </div>
        </div>
    )
}
export default OrderCard;