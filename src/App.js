import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import './index.css';

import {
  getUser,
  getToken,
  setUserSession,
  resetUserSession,
} from "./service/AuthService";

import Adminpanel from './Adminpanel';
import ProductList from './ProductList';
import Home from './Home';
import List from './List';
import ProductInfo from './ProductInfo';
import Basket from './Basket';
import LogIn from './LogIn';
import SignUp from './SignUp';
import NewPassword from './NewPassword';
import Profile from './Profile';
import Search from './Search';
import Favorite from './Favorite';
import Blog from './Blog';
import AdminSearch from './AdminSearch';
import AdminProductList from './AdminProductList'
import AdminAllProductList from './AdminAllProductList'
import AdminAddProduct from './AdminAddProduct'

import CreateYourself from './CreateYourself' 
import Stock from './Stock';
import BlogDetail from './BlogDetail';
import EditProduct from './EditProduct';
import EditBlog from './EditBlog';
import EditCategory from './EditCategory';
import Navbars from './Navbars';
import ProductListByCategory from './ProductListByCategory';

function App() {
  
  const token = getToken();
 console.log("token",token);
 
  return (
    
    <Router> 
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/adminpanel" element={<Adminpanel />} />
        <Route path="/productlist" element={<ProductList/>} />
        <Route path="/list" element={<List/>} />
        <Route path="/productinfo" element={<ProductInfo/>} />
        <Route path="/basket" element={<Basket/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/newpassword" element={<NewPassword/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/favorite" element={<Favorite/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/adminSearch" element={<AdminSearch/>} />
        <Route path="/adminproductlist" element={<AdminProductList/>} />
        <Route path="/adminallproductlist" element={<AdminAllProductList/>} />
        <Route path="/adminaddproduct" element={<AdminAddProduct/>} />

        <Route path="/createyourself" element={<CreateYourself/>} />
        <Route path="/stock" element={<Stock/>} />
        <Route path="/blogdetail" element={<BlogDetail/>} />
        <Route path="/editproduct" element={<EditProduct/>} />
        <Route path="/editblog" element={<EditBlog/>} />
        <Route path="/editcategory" element={<EditCategory/>} /> 
        <Route path="/editproduct/:product" element={<EditProduct />} />
        <Route path="/productlistbycategory"  element={<ProductListByCategory />} />

      </Routes>
    </Router>
  );
} 

export default App;

