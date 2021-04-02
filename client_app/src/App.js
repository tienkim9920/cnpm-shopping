import './CSS/animate.css';
import './CSS/helper.css';
import './CSS/magnific-popup.css';
import './CSS/material-design-iconic-font.min.css';
import './CSS/meanmenu.css';
import './CSS/nice-select.css';
import './CSS/slick.css';
import './CSS/venobox.css';
import './CSS/style.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Share/Header';
import Home from './Home/Home';
import Footer from './Share/Footer';
import Shop from './Shop/Shop';
import Detail_Product from './DetailProduct/Detail_Product';
import Cart from './Cart/Cart';
import Checkout from './Checkout/Checkout';
import Favorite from './Favorite/Favorite';
import About from './About/About';
import Contact from './Contact/Contact';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import OrderSuccess from './Order/OrderSuccess';
import OrderFail from './Order/OrderFail';
import History from './History/History';
import DetailHistory from './History/Component/DetailHistory';
import Profile from './Profile/Profile';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      
        <Header />

        <Switch>

          <Route exact path="/" component={Home} />
          <Route path="/shop/:id" component={Shop} />
          <Route path="/detail/:id" component={Detail_Product} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/favorite" component={Favorite} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/success" component={OrderSuccess} />
          <Route path="/fail" component={OrderFail} />
          <Route path="/history" component={History} />
          <Route path="/profile/:id" component={Profile} />

        </Switch>

        <Footer />


      </BrowserRouter>

    </div>
  );
}

export default App;
