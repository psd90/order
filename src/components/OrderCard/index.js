import React, {useEffect, useState} from 'react';
import { firestore } from '../../firebase/util';



const OrderCard = ({orderTotal, orderUserID, orderItems, telephoneNumber}) => {

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
                        {userName} &nbsp;
                    </h1>
                    <h3>
                        Mobile &nbsp; 
                        {telephoneNumber}
                    </h3>
                </li>
                <li>     
                {orderItems.map((orderItems)=>{
                    return (
                    <div><h3>{orderItems.quantity} : {orderItems.productName}</h3>
                    </div>
                    )}
                    )}
                </li>
                <li>
                    <h3>
                     £{orderTotal}
                    </h3>
                </li>
                <br></br>
            </ul>
          </div>
        </div>
    )
}
export default OrderCard;