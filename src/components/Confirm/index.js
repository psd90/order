import React from 'react';
import './styles.scss';
import {useHistory} from 'react-router-dom';

const Confirm = props => {
    const history = useHistory();
    return (
        <div className="directory">
            <div className="wrap">
            <div
                className="item"
                // style ={{
                //     backgroundImage: `url(${Menu})`
                // }}
                >
                    <h1>
                        Your Order Has Been Submitted
                    </h1>
                   <a onClick={() => {history.push('/dashboard')}}> 
                      View Your Submitted Order
                   </a> 
                </div>
            </div>
        </div>
    )
}

export default Confirm;