import React from 'react';
import { Link } from 'react-router-dom';
import {signOutUserStart} from './../../redux/User/user.actions'
import {useSelector, useDispatch} from 'react-redux';
import './styles.scss';
import Logo from './../../assets/Logo.png'; 

const mapState= ({user}) => ({
    currentUser: user.currentUser
})

const Header = props => {
    const dispatch = useDispatch();
    const {currentUser} = useSelector(mapState);
    const signOut = () => {
        dispatch(signOutUserStart());
    }
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                    <img src={Logo} alt="Dhillons"/>
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/search">
                                Searach
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="callToActions">

                    {currentUser && (
                        <ul>
                            <li>
                            <Link to="/dashboard">
                            My Account
                            </Link>
                           </li>
                            <li>
                                <a onClick ={() => signOut()}>
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



export default Header;