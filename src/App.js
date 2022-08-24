import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route} from 'react-router-dom';
import {checkUserSession} from './redux/User/user.actions';
import {checkUserIsAdmin} from './Utils';
//hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';
import {firestore} from './firebase/util';
//components
import AdminToolbar from './components/AdminToolbar';
import CatchYou from './components/CatchYou';
//layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import AdminLayout from './layouts/AdminLayout';
import DashboardLayout from './layouts/DashboardLayout';
//pages
import Homepage from './pages/Homepage';
import Search from './pages/Search';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Confirmation from './pages/Confirmation';
import Order from './pages/Order';
import Stats from './pages/Stats';
import TotalStats from './pages/TotalStats';
import DateEdit from './pages/DateEdit';
import DeleteConfirm from './pages/DeleteConfirm';
import OrdersDelete from './pages/OrdersDelete';
import Refresh from './pages/Refresh';
import Success from './pages/Success';
import './default.scss';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
})

const App = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  
  const {currentUser} = useSelector(mapState);
  const [date, setDate] = useState([])
 
  useEffect(() => {   
    firestore
        .collection('date')
        .doc('1KXlQPbP2cxAMiTurXXf')
        .onSnapshot(snapshot => (
            setDate(snapshot.data())
            ))
         }, [])
         
         let s = ''
         if (date.date) {
           s = new Date(date.date.seconds*1000)
         }
         const isAdmin = checkUserIsAdmin(currentUser)
        

    if ((new Date()>s) && !isAdmin){ 
     return (<CatchYou />)
    }else{
  return (
    <div className="App">
      <AdminToolbar />
     <Switch>
      <Route exact path="/" render={() =>(
        <HomepageLayout>
          <Homepage />
        </HomepageLayout>
      )} />
      <Route exact path ="/search" render={() => (
        <MainLayout>
          <Search />
        </MainLayout>
      )}/>
      <Route path ="/search/:filterType" render={() => (
        <MainLayout>
          <Search />
        </MainLayout>
      )}/>
       <Route path ="/product/:productID" render={() => (
        <MainLayout>
          <ProductDetails />
        </MainLayout>
      )}/>
      <Route path ="/cart" render={() => (
        <MainLayout>
          <Cart />
        </MainLayout>
      )}/>
      <Route path ="/confirmation" render={() =>(
        <MainLayout>
          <Confirmation />
        </MainLayout>
      )} />
      <Route path="/registration" render={() => (
        <MainLayout>
          <Registration />
        </MainLayout>
      )} />
      <Route path="/login" 
        render={() => (
          <MainLayout>
            <Login/>
          </MainLayout>
      )} />
      <Route path="/recovery" render ={() => (
      <MainLayout>
        <Recovery />
      </MainLayout>
      )} />
      <Route path="/success" render ={() => (
      <MainLayout>
        <Success />
      </MainLayout>
      )} />
      <Route path="/dashboard" render ={() => (
      <WithAuth>
        <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
      </WithAuth>
      )} />
      <Route path="/order/:orderID" render ={() => (
        <WithAuth>
          <DashboardLayout>
            <Order />
          </DashboardLayout>
        </WithAuth>
      )} />
      <Route path="/admin" render ={() => (
      <WithAdminAuth>
      <AdminLayout>
        <Admin />
      </AdminLayout>
      </WithAdminAuth>
      )} />
      <Route path="/stats" render ={() => (
      <WithAdminAuth>
      <AdminLayout>
        <Stats />
      </AdminLayout>
      </WithAdminAuth>
      )} />
      <Route path="/totalStats" render ={() => (
      <WithAdminAuth>
      <AdminLayout>
        <TotalStats />
      </AdminLayout>
      </WithAdminAuth>
      )} />
      <Route path="/date" render ={() => (
      <WithAdminAuth>
      <AdminLayout>
        <DateEdit />
      </AdminLayout>
      </WithAdminAuth>
      )} />
      <Route path="/deleteconfirm" render ={() => (
      <WithAdminAuth>
      <AdminLayout>
        <DeleteConfirm />
      </AdminLayout>
      </WithAdminAuth>
      )} />
      <Route path="/ordersdelete" render ={() => (
      <WithAdminAuth>
      <AdminLayout>
        <OrdersDelete />
      </AdminLayout>
      </WithAdminAuth>
      )} />
      <Route path="/refresh" render ={() => (
      <WithAdminAuth>
        <Refresh />
      </WithAdminAuth>
      )} />
      </Switch>
    </div>
  );
}
}

export default App;
