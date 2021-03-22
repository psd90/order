import React from 'react';
import Menu from './../../assets/curry.jpg'
import CutOff from './../../components/CutOff';
import './styles.scss';


const Directory = props => {
    return (
        <div className="directory">
            <CutOff />
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