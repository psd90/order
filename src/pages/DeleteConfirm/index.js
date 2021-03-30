import React from 'react';
import Button from './../../components/Forms/Button'
import {useHistory} from 'react-router-dom'

const DeleteConfirm = () => {

    const history = useHistory()
    return (
        <div>
            <h1>
            Are you sure you want to delete all orders?
            </h1>
            <Button onClick={() => history.push('/stats')}>
                No
            </Button>
            <br />
            <h2>Yes : Please read the warning below</h2>
            <h4>WARNING </h4>
            <h5>
            Use delete only when everyone has collected their orders
            </h5>
            <h5>Delete orders when you want to create a new cut off date</h5>
            <h5>Once you delete the orders you will not be able to see them anymore</h5>
            <h5>The app will remove all current orders and you can start again for your new date</h5>
            <Button onClick={() => history.push('/ordersdelete')}>
                Click here to start the delete process 
            </Button>
        </div>
    )
}

export default DeleteConfirm