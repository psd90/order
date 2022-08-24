import React, {useEffect, useState} from 'react';
import {firestore} from './../../firebase/util';
import OrderCard from './../../components/OrderCard';



const AdminOrders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        firestore.collection('orders')
          .onSnapshot(snapshot => (
              setOrders(snapshot.docs.map(doc => doc.data()))
          ))
    }, [])
     
    return (
        <div className="adminOrders">
            {orders.map(({orderTotal, orderUserID, orderItems, telephoneNumber}) => (
                <OrderCard 
                telephoneNumber= {telephoneNumber}
                orderTotal = {orderTotal}
                orderUserID = {orderUserID}
                orderItems = {orderItems}
                />
            ))}
        </div>
    )
}
export default AdminOrders;