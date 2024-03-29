import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {checkUserIsAdmin} from './../../Utils'
import './styles.scss';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const AdminToolbar = props => {
    const {currentUser} = useSelector(mapState);

    const isAdmin = checkUserIsAdmin(currentUser)
    if(!isAdmin) return null;
    return (
        <div className="adminToolbar">
            <ul>
                <li>
                    <Link to="/admin">
                    Menu
                    </Link>
                </li>
                <li>
                    <Link to="/date">
                    Date
                    </Link>
                </li>
                <li>
                    <Link to="/totalStats">
                    Prepare
                    </Link>
                </li>
                <li>
                    <Link to="/stats">
                    Pack
                    </Link>
                </li>
                <li>
                    <Link to="/deleteconfirm">
                    Delete
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default AdminToolbar;