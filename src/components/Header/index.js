import React from 'react';
import { Link } from 'react-router-dom';
import {selectCartItemsCount, selectCartTotal} from './../../redux/Cart/cart.selectors';
import {useSelector} from 'react-redux';
import {checkUserIsAdmin} from './../../Utils';
import './styles.scss';
import mdc from './../../assets/mdc.png'; 

const mapState= (state) => ({
    currentUser: state.user.currentUser,
    totalNumOfCartItems: selectCartItemsCount(state),
    cartTotal: selectCartTotal(state)
});
const Header = () => {
    const {currentUser, totalNumOfCartItems, cartTotal} = useSelector(mapState);
    const isAdmin = checkUserIsAdmin(currentUser)
    const total = cartTotal.toFixed(2)
    if(isAdmin) return (
        <div className="header">
            <div className="wrap">
            <div className="logo">
                    <Link to="/">
                    <img src={mdc} alt="Dhillons"/>
                    </Link>
                </div>
       </div>
    </div>
    )
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/search">
                    <img src={mdc} alt="Dhillons"/>
                    </Link>
                </div>
                
                <div className="callToActions">
                <ul>
                <li>
                        <Link to="/cart">
                                {totalNumOfCartItems > 0  &&
                            <div>
                                £ {total} &nbsp;
                                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                &nbsp; ({totalNumOfCartItems})
                                </div>
                            }
                                </Link>

                </li>

                    {currentUser && [
                            <li>
                            <Link to="/dashboard">
                            More
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