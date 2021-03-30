import React from 'react';
import Delete from './../../components/Delete';

const OrdersDelete = () => {
    
    return (
        <div>
            <h1>
             Delete
            </h1>
            <h4>
                Press DELETE to delete all orders
            </h4>
        <Delete />
            <h4>
                Please Refresh/Restart the App any time you press DELETE button
            </h4>
        </div>

    )
}

export default OrdersDelete