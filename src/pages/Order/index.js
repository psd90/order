import React, { useEffect } from 'react';
import {firestore} from './../../firebase/util';
import { useParams, useHistory } from 'react-router-dom';
import { getOrderDetailsStart } from './../../redux/Orders/orders.actions';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetails from './../../components/OrderDetails';
import Button from './../../components/Forms/Button';

const mapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails
});

const Order = () => {
  const { orderID } = useParams();
  const dispatch = useDispatch();
  const { orderDetails } = useSelector(mapState);
  const { orderTotal } = orderDetails;

  useEffect(() => {

    dispatch(
      getOrderDetailsStart(orderID)
    );

  }, []);


  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    firestore.collection('orders').doc(`${orderID}`).delete().then(()=>{
      history.push('/dashboard')
    })
}

  return (
    <div>

      <h1>
        Order ID: #{orderID}
      </h1>

      <OrderDetails order={orderDetails} />

      <h3>
        Total: £ {orderTotal}
      </h3>
      <div>
        <form onSubmit={handleSubmit}>
    <Button type="submit">
      Delete Order
    </Button>
    </form>
    </div>
      
    </div>
  )

}

export default Order;