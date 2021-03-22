import React from 'react';
import {firestore} from './../../firebase/util';
import Button from './../../components/Forms/Button';

const Delete = () => {

    const handleSubmit = e => {
        e.preventDefault();
        firestore.collection('orders')
        .onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) => {
                firestore.collection('orders').doc(doc.id).delete()
            })
          })
    }



    alert("Clicking Delete Will Remove All Current Orders!")
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <Button type="submit">
                DELETE ALL ORDERS
            </Button>
            </form>

        </div>
    )
}

export default Delete