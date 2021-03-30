import React from 'react';
import { useHistory } from 'react-router';
import {firestore} from './../../firebase/util';
import Button from './../Forms/Button';

const Delete = () => {
    const history = useHistory();

    const handleSubmit = e => {
        e.preventDefault();
        
        history.push('/refresh')
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
                DELETE
            </Button>
            </form>

        </div>
    )
}

export default Delete