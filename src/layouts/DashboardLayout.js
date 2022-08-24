import React from 'react';

import Header from './../components/Header';
import Footer from './../components/Footer';

const DashBoardLayout = props => {



  return (
    <div className="dashboardLayout">
      <Header {...props} />
      <div className="controlPanel">
        <div className="content">
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoardLayout;