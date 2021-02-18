import React from 'react';
import {firestore} from './../../firebase/util';
import {useDispatch} from 'react-redux';

  new Promise((resolve, reject) => {
      firestore.collection('orders')
    .get()
    .then(snap => {
    const data = [
        ...snap.docs.map(doc => {
            return {
                ...doc.data()
            }
        })
    ]
    console.log(data)
    return data
    })
    .catch(err => {
    reject(err)
    })
    })
    


const AdminOrders = () => {
    return (
        <div className="adminOrders">
            <h1>
                Customer Order Info
            </h1>
        </div>
    )
}
export default AdminOrders;