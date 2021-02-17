import React from 'react';
import {firestore} from './../../firebase/util';



const AdminOrders = () => {
firestore.collection('orders')
.get()
.then((snap) => {
    let allOrders = [];
    snap.forEach((doc) => {
        allOrders.push(doc.data())
    })
    console.log(allOrders)
    return allOrders;
})
    return (
        <div className="adminOrders">
            <h1>
                Customer Order Info
            </h1>
        </div>
    )
}
export default AdminOrders;