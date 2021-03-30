import React from 'react';
import './styles.scss';
import CutOff from './../CutOff';
import userIMG from './../../assets/user.png';

const UserProfile = props => {
  const { currentUser } = props;
  const { displayName } = currentUser;

  return (

    <div className="userProfile">
      <ul>
        <li>
          <div className="img">
            <img src={userIMG} />
          </div>
        </li>
        <li>
          <span className="displayName">
            {displayName && displayName}
          </span>
        </li>
      </ul>
    <CutOff />
    </div>
  );
}

export default UserProfile;