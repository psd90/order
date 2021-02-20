import React, {useEffect, useState} from 'react';
import { firestore } from '../../firebase/util';



const OrderCard = ({orderTotal, orderUserID, orderItems}) => {

// const productName = orderItems.map(x => x.productName)
// const quantity = orderItems.map(x => x.quantity)

const [userData, setUsername] = useState([])

useEffect(()=> {
   firestore.collection('users').doc(`${orderUserID}`)
    .onSnapshot(snapshot => (
        setUsername(snapshot.data())
    ))
}, [])
const userName = userData.displayName





    return (
        <div className="orderCard">
          <div className="orderDetails">
            <ul>
                <li>
                    <h1>
                        User: {userName}
                    </h1>
                </li>
                <li>     
                {orderItems.map((orderItems)=>{
                    return (
                    <div><h1>{orderItems.productName} x {orderItems.quantity}</h1></div>
                    )}
                    )}
                </li>
                <li>
                    <h1>
                     OrderTotal £: {orderTotal}
                    </h1>
                </li>
                <br></br>
            </ul>
          </div>
        </div>
    )
}
export default OrderCard;