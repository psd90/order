import React from 'react';
import {Link} from 'react-router-dom';
import Menu from './../../assets/mdc.png';
import CutOff from './../../components/CutOff';
import './styles.scss';


const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
                <Link to="/search">
            <div
                className="item"
                style ={{
                    backgroundImage: `url(${Menu})`
                }}
                >
                <CutOff />
                </div>
                      </Link> 
            </div>
        </div>
    )
}

export default Directory;