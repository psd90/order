import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import './styles.scss';
import Logo from './../../assets/Logo.png'; 
import {auth} from './../../firebase/util'

const Header = props => {
    const {currentUser} = props;
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                    <img src={Logo} alt="Dhillons"/>
                    </Link>
                </div>
                <div className="callToActions">

                    {currentUser && (
                        <ul>
                            <li>
                            <Link to="/dashboard">
                            My Account
                            </Link>
                           </li>
                            <li>
                                <a onClick ={() => auth.signOut()}>
                                    LOGOUT
                                </a>
                            </li>
                        </ul>
                    )}
                    {!currentUser && (
                    <ul>
                        <li>
                            <Link to="/registration">
                            sign up
                            </Link>
                        </li>
                        <li>
                            <Link to="/login">
                            Login
                            </Link>
                        </li>
                    </ul>
                )}
                </div>
            </div>
        </header>
    )
    
}

Header.defaultProps = {
    currentUser:null
};

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})

export default connect(mapStateToProps, null)(Header);