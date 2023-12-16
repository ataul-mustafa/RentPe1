import "./App.css"
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/layout/Home/Home.js';
// import { Categories } from "./components/layout/Home/categories/CategoriesHome";
import { Categories } from "./components/layout/Home/categories/CategoriesHome";
import ProductDetails from "./components/layout/Product/ProductDetails";
import Products from "./components/layout/Product/Products";
import Search from "./components/layout/Product/Search.js";
import Login from "./components/User/loginSignUp";
import { loadUser } from "./actions/userAction";
import store from "./store";
import { useSelector } from "react-redux";  
import UserOptions from './components/layout/Header/UserOptions.js';
import Profile from "./components/User/Profile.js";
import UpdateProfile from './components/User/UpdateProfile.js'
import UpdatePassword from './components/User/UpdatePassword.js'
import ForgotPassword from './components/User/ForgotPassword.js'
import ResetPassword from "./components/User/ResetPassword";
import { getProduct } from "./actions/productAction";
import Cart from './components/Cart/Cart.js'
import Shipping from './components/Cart/Shipping.js'
import ConfirmOrder from "./components/Cart/confirmOrder";
import Payment from "./components/Cart/Payment.js";
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrders from './components/Order/MyOrders.js'
import OrderDetails from './components/Order/OrderDetails.js' 


import Dashboard from './components/vendor/Dashboard.js';
import ProductList from './components/vendor/ProductList.js';
import NewProduct from "./components/vendor/NewProduct";
import UpdateProduct from "./components/vendor/UpdateProduct.js"; 
import OrderList from './components/vendor/OrderList.js';
import ProcessOrder from "./components/vendor/ProcessOrder.js";
import ProductReviews from "./components/vendor/ProductReviews.js";
import CreateAdBanner from "./components/vendor/adBanner/CreateAdBanner";


import AdminDashboard from './components/admin/AdminDashboard.js';
import AllProductList from './components/admin/AllProductList.js';
import UsersList from './components/admin/UsersList.js';
import UpdateUser from './components/admin/UpdateUser.js';
import OrdersList from './components/admin/OrdersList.js';
import AdminProductReviews from "./components/admin/AdminProductReviews.js";
import Header from "./components/layout/Header/Header";
import UserLocation from "./components/User/UserLocation";

 
// import ProtectedRoute from "./ProtectedRoute";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");
 
  async function getStripeApiKey() {
    const { data } = await axios.get("api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

   
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getProduct());
    getStripeApiKey();
  }, [])
  return (
    <div>
      <Router>
        <div className='userProfile'>
          {isAuthenticated && <UserOptions user={user} />}
        </div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />  
          <Route path="/contact" element={<UserLocation />} />
          {/* <ProtectedRoute isAuthenticated={isAuthenticated} exact path="/account" element={<Profile />} /> */}

          {isAuthenticated && <Route exact path="/account" element={<Profile />} />}

          {isAuthenticated && <Route exact path="/me/update" element={<UpdateProfile />} />}
          {isAuthenticated && <Route exact path="/password/update" element={<UpdatePassword />} />}
          {isAuthenticated && <Route exact path="/shipping" element={<Shipping />} />}
          {isAuthenticated && <Route exact path="/order/confirm" element={<ConfirmOrder />} />}
          {isAuthenticated && <Route exact path="/success" element={<OrderSuccess />} />}
          {isAuthenticated && <Route exact path="/orders" element={<MyOrders />} />}
          {isAuthenticated && <Route exact path="/order/:id" element={<OrderDetails />} />}
          {isAuthenticated && <Route exact path="/vendor/dashboard" element={<Dashboard />} />}
          {isAuthenticated && <Route exact path="/vendor/products" element={<ProductList />} />}
          {isAuthenticated && <Route exact path="/vendor/product" element={<NewProduct />} />}
          {isAuthenticated && <Route exact path="/vendor/product/:id" element={<UpdateProduct />} />}
          {isAuthenticated && <Route exact path="/vendor/orders" element={<OrderList />} />}
          {isAuthenticated && <Route exact path="/vendor/reviews" element={<ProductReviews />} />}
          {isAuthenticated && <Route exact path="/vendor/order/:id" element={<ProcessOrder />} />} 
          {isAuthenticated && <Route exact path="/vendor/create/adbanner" element={<CreateAdBanner />} />}
          
          {isAuthenticated && <Route exact path="/admin/orders" element={<OrdersList />} />}
          {isAuthenticated && <Route exact path="/admin/dashboard" element={<AdminDashboard />} />}
          {isAuthenticated && <Route exact path="/admin/products" element={<AllProductList />} />}
          {isAuthenticated && <Route exact path="/admin/users" element={<UsersList />} />}
          {isAuthenticated && <Route exact path="/admin/user/:id" element={<UpdateUser />} />}
          {isAuthenticated && <Route exact path="/admin/reviews" element={<AdminProductReviews />} />}
            
          {isAuthenticated && <Route exact path="/process/payment" element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
          } />}
        </Routes>
      </Router>
    </div >
  );
}



export default App; 