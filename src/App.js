import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import './index.css';

import {
  getUser,
  getToken,
  setUserSession,
  resetUserSession,
} from "./service/AuthService";

//admin
import AdminSearch from './admin/AdminSearch';
import Adminpanel from './admin/Adminpanel';
import AdminProductList from './admin/AdminProductList'
import AdminAllProductList from './admin/AdminAllProductList'
import AdminAddProduct from './admin/AdminAddProduct'
import AdminAllBlog from './admin/AdminAllBlog';
import EditProduct from './admin/EditProduct';
import EditBlog from './admin/EditBlog';
import EditCategory from './admin/EditCategory';
import EditSlider from './admin/EditSlider';
import AdminpanelWrapper from './admin/AdminpanelWrapper';


//user
import AddUserAddress from './user/AddUserAddress';
import LogIn from './user/LogIn';
import SignUp from './user/SignUp';
import NewPassword from './user/NewPassword';
import ForgotPassword from './user/ForgotPassword';
import Profile from './user/Profile';
import EditUserAddress from './user/EditUserAddress';


import ProductList from './ProductList';
import Home from './Home';
import List from './List';
import ProductInfo from './ProductInfo';
import Basket from './Basket';
import Search from './Search';
import Favorite from './favorite/Favorite';
import Blog from './Blog';
// import CreateYourself from './CreateYourself' 
import Stock from './Stock';
import BlogDetail from './BlogDetail';
import Navbars from './Navbars';
import ProductListByCategory from './ProductListByCategory';
import MenuMoreThan from './MenuMoreThan';
import Contact from './Contact';
import AddBlog from './admin/AddBlog';
import Footer from './footer';
import ChangePassword from './user/ChangePassword';
import ScrollToTop from './ScrollToTop';
import MyOrderDetail from './user/MyOrderDetail';
import Order from './order/Order';


function App() {
  
  const token = getToken();
 
  return (
    <Router>  
       <ScrollToTop/>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/adminpanel" element={<AdminpanelWrapper />} />
        <Route path="/productlist" element={<ProductList/>} />
        <Route path="/list" element={<List/>} />
        <Route path="/list/:categoryId" element={<List/>} />
        <Route path="/productinfo/:id" element={<ProductInfo/>} />
        <Route path="/basket" element={<Basket/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/newpassword" element={<NewPassword/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/changepassword" element={<ChangePassword/>} />


        <Route path="/profile" element={<Profile/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/favorite" element={<Favorite/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/adminSearch" element={<AdminSearch/>} />
        <Route path="/adminproductlist" element={<AdminProductList/>} />
        <Route path="/adminallproductlist" element={<AdminAllProductList/>} />
        <Route path="/adminaddproduct" element={<AdminAddProduct/>} />
        <Route path="/adminallblog" element={<AdminAllBlog/>} />
        <Route path="/orderdetail/:id" element={<MyOrderDetail/>} />


        {/* <Route path="/createyourself" element={<CreateYourself/>} /> */}
        <Route path="/stock" element={<Stock/>} />
        <Route path="/blogdetail/:id" element={<BlogDetail/>} />
        <Route path="/editproduct" element={<EditProduct/>} />
        <Route path="/editblog/:blog" element={<EditBlog/>} />
        <Route path="/adminaddblog" element={<AddBlog/>} />
        <Route path="/editcategory" element={<EditCategory/>} /> 
        <Route path="/editproduct/:product" element={<EditProduct />} />
        <Route path="/addaddress" element={<AddUserAddress />} />
        <Route path="/editaddres/:id" element={<EditUserAddress />} />
        <Route path="/Morethan" element={<MenuMoreThan />} />
        <Route path="/Contact" element={<Contact />} /> 
        <Route path="/editslider" element={<EditSlider/>} />

        <Route path="/productlistbycategory"  element={<ProductListByCategory />} />

        <Route path="/order" element={<Order />} /> 


      </Routes>
      
    </Router>
  );
} 

export default App;

 /*   <Route path="/adminpanel" element={<Adminpanel />} />*/