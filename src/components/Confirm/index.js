import React from 'react';
import './styles.scss';
import {useHistory} from 'react-router-dom';
import Menu from './../../assets/curry.jpg';

const Confirm = props => {
    const history = useHistory();
    return (
        <div className="directory">
            <div className="wrap">
            <a onClick={() => {history.push('/dashboard')}}> 
            <div
                className="item"
                style ={{
                    backgroundImage: `url(${Menu})`
                }}
                >
                    <h1>
                       Thank you! Your Order Has Been Submitted
                    </h1>
                      View Your Submitted Order
                </div>
            </a> 
            </div>
        </div>
    )
}

export default Confirm;