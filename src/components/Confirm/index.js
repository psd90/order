import React from 'react';
import './styles.scss';
import {useHistory} from 'react-router-dom';

const Confirm = props => {
    const history = useHistory();
    console.log(props)
    return (
        <div className="directory">
            <div className="wrap">
            <a onClick={() => {history.push('/dashboard')}}> 
            <div className='thanks'>
            <h3>
                View Orders
            </h3>
            <i class="fa fa-thumbs-up" aria-hidden="true"></i>
            </div>
            </a> 
            <div className='nice'>
            <h1>
                Thank you, your order has been submitted.
            </h1>
            <h3>
                Click on the thumbs-up below to view your orders.
            </h3>
            </div>
            </div>
        </div>
    )
}

export default Confirm;