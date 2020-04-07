import React,{useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { AuthProvider, PrivateRoute, useAuth } from './Components/SignUp/useAuth';
import './App.css';
import Header from './Components/Header/Header';
import Banner from './Components/Banner/Banner';
import Foods from './Components/Foods/Foods';
import Footer from './Components/Footer/Footer';
import Features from './Components/Features/Features';
import FoodDetails from './Components/FoodDetails/FoodDetails';
import SignUp from './Components/SignUp/SignUp';
import Shipment from './Components/Shipment/Shipment';
import OrderComplete from './Components/OrderComplete/OrderComplete';


function App() {
    
    const [cart , setCart] = useState([]);
    const [orderId , setOrderId] = useState(null);
    
    const [deliveryDetails , setDeliveryDetails] = useState({
      todoor:null,road:null, flat:null, businessname:null, address: null
    });
  
    const [userEmail, setUserEmail] = useState(null);
    const deliveryDetailsHandler = (data) => {
        setDeliveryDetails(data)
    }
    const getUserEmail = (email) => {
      setUserEmail(email)
    }

    const clearCart =  () => {
      const orderedItems = cart.map(cartItem => {
        return {food_id : cartItem.id, quantity: cartItem.quantity}
      })

      const orderDetailsData = { userEmail , orderedItems,  deliveryDetails }
      fetch('https://restaurent-database.herokuapp.com/orders', {
          method : "POST",
          headers: {
              "Content-type" : "application/json"
          },
          body : JSON.stringify(orderDetailsData)
      })
      .then(res => res.json())
      .then(data=> setOrderId(data._id))
      console.log(orderId);

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

    const checkOutItemHandler = (productId, productQuantity) => {
      const newCart = cart.map(item => {
        if(item.id === productId){
            item.quantity = productQuantity;
        }
        return item;
      })

      const filteredCart = newCart.filter(item => item.quantity > 0)
      setCart(filteredCart)
    }
   
  return (
    <AuthProvider>
      <Router>
        <div className="main">
          <Switch>
            <Route exact path="/">
                <Header cart={cart}/>
                <Banner/>
                <Foods cart={cart}></Foods>
                <Features/>
                <Footer/>
            </Route>
            <Route path="/food/:id">
                <Header cart={cart} />
                <FoodDetails cart={cart} cartHandler={cartHandler} />
                <Footer/>
            </Route>
            <Route path="/search=:searchQuery">
                <Header cart={cart}/>
                <Banner/>
                <Features/>
                <Footer/>
            </Route>
            <PrivateRoute path="/checkout">
                <Header cart={cart}/>
                <Shipment deliveryDetails={deliveryDetails} deliveryDetailsHandler={deliveryDetailsHandler} cart={cart} clearCart={clearCart} checkOutItemHandler={checkOutItemHandler} getUserEmail={getUserEmail}/>
                <Footer/>
            </PrivateRoute>
            <PrivateRoute path="/order-complete">
              <Header cart={cart}/>
              <OrderComplete deliveryDetails={deliveryDetails} orderId={orderId}/>
              <Footer/>
            </PrivateRoute>

            <Route path="/login">
                <SignUp/>
            </Route>
        
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;