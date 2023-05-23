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
 
  return (
    
    <Router> 
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Adminpanel" element={<Adminpanel />} />
        <Route path="/ProductList" element={<ProductList/>} />
        <Route path="/List" element={<List/>} />
        <Route path="/ProductInfo" element={<ProductInfo/>} />
        <Route path="/Basket" element={<Basket/>} />
        <Route path="/LogIn" element={<LogIn/>} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/NewPassword" element={<NewPassword/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/Search" element={<Search/>} />
        <Route path="/Favorite" element={<Favorite/>} />
        <Route path="/Blog" element={<Blog/>} />
        <Route path="/AdminSearch" element={<AdminSearch/>} />
        <Route path="/AdminProductList" element={<AdminProductList/>} />
        <Route path="/AdminAllProductList" element={<AdminAllProductList/>} />
        <Route path="/AdminAddProduct" element={<AdminAddProduct/>} />

        <Route path="/CreateYourself" element={<CreateYourself/>} />
        <Route path="/Stock" element={<Stock/>} />
        <Route path="/BlogDetail" element={<BlogDetail/>} />
        <Route path="/EditProduct" element={<EditProduct/>} />
        <Route path="/EditBlog" element={<EditBlog/>} />
        <Route path="/EditCategory" element={<EditCategory/>} /> 
        <Route path="/EditProduct/:product" element={<EditProduct />} />
        <Route path="/ProductListByCategory"  element={<ProductListByCategory />} />

      </Routes>
    </Router>
  );
} 

export default App;

