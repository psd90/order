import React from 'react';
import Menu from './../../assets/curry.jpg'
import './styles.scss';


const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
            <div
                className="item"
                style ={{
                    backgroundImage: `url(${Menu})`
                }}
                >
                   <a> 
                      View Menu 
                   </a> 
                </div>
            </div>
        </div>
    )
}

export default Directory;