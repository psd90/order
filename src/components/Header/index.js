import React from 'react';
import { Link } from 'react-router-dom';
import {signOutUserStart} from './../../redux/User/user.actions';
import {selectCartItemsCount} from './../../redux/Cart/cart.selectors';
import {useSelector, useDispatch} from 'react-redux';
import {checkUserIsAdmin} from './../../Utils';
import './styles.scss';
import Logo from './../../assets/Logo.png'; 

const mapState= (state) => ({
    currentUser: state.user.currentUser,
    totalNumOfCartItems: selectCartItemsCount(state)
});

const Header = props => {
    const dispatch = useDispatch();
    const {currentUser, totalNumOfCartItems} = useSelector(mapState);
    const isAdmin = checkUserIsAdmin(currentUser)
    const signOut = () => {
        dispatch(signOutUserStart());
    }
    if(isAdmin) return (
        <div className="header">
            <div className="wrap">
            <div className="logo">
                    <Link to="/">
                    <img src={Logo} alt="Dhillons"/>
                    </Link>
                </div>
       </div>
    </div>
    )
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
                                Menu
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="callToActions">
                <ul>
                    <li>
                        <Link to="/cart">
                        Cart ({totalNumOfCartItems})
                        </Link>
                    </li>
                    {currentUser && [
                            <li>
                            <Link to="/dashboard">
                             My Account
                            </Link>
                           </li>
                    ]}
                    {!currentUser && [
                    
                        <li>
                            <Link to="/login">
                            Login
                            </Link>
                        </li>
                    
                ]}
                </ul>
                    
                </div>
            </div>
        </header>
    )
    
}

Header.defaultProps = {
    currentUser:null
};



export default Header;