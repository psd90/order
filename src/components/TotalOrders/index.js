import React, {useEffect, useState} from 'react';
import {firestore} from './../../firebase/util';
import OrderStats from './../../components/OrderStats';



const AdminOrders = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        firestore.collection('products')
          .onSnapshot(snapshot => (
              setItems(snapshot.docs.map(doc => doc.data()))
          ))
    }, [])
     
    return (
        <div className="totalOrders">
            <div>
                    {items.map((items)=>{
                        return (
                            <div>
                                <h1>
                                    {items.productName}
                                    <br></br>
                                    
                                    <OrderStats 
                                     productName = {items.productName}       
                                     />
                                </h1>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}
export default AdminOrders;