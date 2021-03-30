import React from 'react';
import {Link} from 'react-router-dom';
import Menu from './../../assets/curry.jpg'
import CutOff from './../../components/CutOff';
import './styles.scss';


const Directory = props => {
    return (
        <div className="directory">
            <CutOff />
            <div className="wrap">
                <Link to="/search">
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
                      </Link> 
            </div>
        </div>
    )
}

export default Directory;