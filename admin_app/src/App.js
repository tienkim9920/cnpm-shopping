
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { createBrowserHistory } from "history";

import Header from './component/Shared/Header'
import Menu from './component/Shared/Menu';

import Product from './component/Product/Product'
import CreateProduct from './component/Product/CreateProduct'
import UpdateProduct from './component/Product/UpdateProduct'

import Category from './component/Category/Category'
import CreateCategory from './component/Category/CreateCategory'
import DetailCategory from './component/Category/DetailCategory'
import UpdateCategory from './component/Category/UpdateCategory'

import Permission from './component/Permission/Permission'
import CreatePermission from './component/Permission/CreatePermission'
import UpdatePermission from './component/Permission/UpdatePermission'

import User from './component/User/User'
import CreateUser from './component/User/CreateUser'
import UpdateUser from './component/User/UpdateUser'

import Order from './component/Order/Order'
import DetailOrder from './component/Order/DetailOrder'
import ConfirmOrder from './component/Order/ConfirmOrder'
import Delivery from './component/Order/Delivery'
import ConfirmDelivery from './component/Order/ConfirmDelivery'
import CompletedOrder from './component/Order/CompletedOrder'
import CancelOrder from './component/Order/CancelOrder'

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>

      <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">

        <Header />
        <Menu />

        <Switch>
          <Route exact path='/product' component={Product} />
          <Route path='/product/create' component={CreateProduct} />
          <Route path='/product/update/:id' component={UpdateProduct} />

          <Route exact path='/category' component={Category} />
          <Route path='/category/create' component={CreateCategory} />
          <Route path='/category/update/:id' component={UpdateCategory} />
          <Route path='/category/:id' component={DetailCategory} />
          {/* 
          <Route exact path='/producer' component={Category} />
          <Route path='/producer/create' component={CreateCategory} />
          <Route path='/producer/update/:id' component={UpdateCategory} />
          <Route path='/producer/:id' component={DetailCategory} /> */}


          <Route exact path='/permission' component={Permission} />
          <Route path='/permission/create' component={CreatePermission} />
          <Route path='/permission/update/:id' component={UpdatePermission} />

          <Route exact path='/user' component={User} />
          <Route path='/user/create' component={CreateUser} />
          <Route path='/user/update/:id' component={UpdateUser} />

          <Route exact path='/order' component={Order} />
          <Route path='/order/detail/:id' component={DetailOrder} />
          <Route path='/confirmorder' component={ConfirmOrder} />
          <Route path='/delivery' component={Delivery} />
          <Route path='/confirmdelivery' component={ConfirmDelivery} />
          <Route path='/completedorder' component={CompletedOrder} />
          <Route path='/cancelorder' component={CancelOrder} />
        </Switch>;
      </div>

    </Router>



  );
}

export default App;
