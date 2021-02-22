import React, {useEffect, useState} from 'react';
import { firestore } from '../../firebase/util';



const OrderStats = ({productName}) => {
    const [orders, setOrders] = useState([])
    const name = productName


    useEffect(() => {
        firestore.collection('orders')
          .onSnapshot(snapshot => (
              setOrders(snapshot.docs.map(doc => doc.data()))
              ))
            }, [])
            
            let total = 0;
            orders.map(({orderItems})=> {
                orderItems.map(({productName, quantity})=> {
                        if(productName==name){
                            total += quantity
                        }
                        console.log(name, quantity, "total->", total)
                    
                })
                return total;
            })
           console.log(total)

    return (
        <div className="orderStats">
          <h1>
              : {total}
          </h1>
        </div>
    )
}
export default OrderStats;