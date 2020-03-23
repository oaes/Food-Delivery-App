import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as 
  Router, 
  Route, 
  Switch,
 Link
} from 'react-router-dom';
import { AuthProvider, PrivateRoute} from './Components/SignUp/useAuth';
import Header from './Components/Header/Header';
import Banner from './Components/Banner/Banner';
import Foods from './Components/Foods/Foods';
import Features from './Components/Features/Features';
import Footer from './Components/Footer/Footer';
import FoodDetails from './Components/FoodDetails/FoodDetails';
import Shipment from './Components/Shipment/Shipment';
import SignUp from './Components/SignUp/SignUp';
import OrderComplete from './Components/OrderComplete/OrderComplete';


function App() {
    
  const [cart , setCart] = useState([]);
  const [deliveryDetails , setDeliveryDetails] = useState({
    todoor:null,road:null, flat:null, businessname:null, address: null
  });
  const deliveryDetailsHandler = (data) => {
      setDeliveryDetails(data)
  }
  const clearCart = () => {
    setCart([])
  }
  const cartHandler = (data) => {
    const alreadyAdded = cart.find(crt => crt.id === data.id );
    const newCart = [...cart,data]
    setCart(newCart);
    if(alreadyAdded){
      const reamingCarts = cart.filter(crt => cart.id !== data);
      setCart(reamingCarts);
    }else{
      const newCart = [...cart,data]
      setCart(newCart);
    }
   
  }

return (
  <AuthProvider>
    <Router>
      <div className="main">
        <Switch>
          <Route exact path="/">
              <Header cart={cart}></Header>
              <Banner></Banner>
              <Foods cart={cart}></Foods>
              <Features></Features>
              <Footer></Footer>
          </Route>
          <Route path="/food/:id">
              <Header cart={cart}></Header>
              <FoodDetails cart={cart} cartHandler={cartHandler}></FoodDetails>
              <Footer></Footer>
          </Route>
          <PrivateRoute path="/checkout">
              <Header cart={cart}></Header>
              <Shipment deliveryDetails={deliveryDetails} deliveryDetailsHandler={deliveryDetailsHandler} cart={cart} clearCart={clearCart}></Shipment>
              <Footer></Footer>
          </PrivateRoute>
          <PrivateRoute path="/order-complete">
            <Header cart={cart}></Header>
            <OrderComplete deliveryDetails={deliveryDetails}></OrderComplete>
            <Footer></Footer>
          </PrivateRoute>
          <Route path="/login">
              <SignUp></SignUp>
          </Route>
        </Switch>
      </div>
    </Router>
  </AuthProvider>
);
}
export default App;
