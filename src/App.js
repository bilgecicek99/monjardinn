import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import React, { useState } from 'react';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


import AdminPanel from './AdminPanel';
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
import CreateYourself from './CreateYourself' 
import Stock from './Stock';
import BlogDetail from './BlogDetail';
import EditProduct from './EditProduct';
import EditBlog from './EditBlog';
import EditCategory from './EditCategory';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    
    <Router> 
       <Navbar  expand="lg" fixed="top"   >
      <Container>
   
        
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
       
      <Navbar.Collapse id="basic-navbar-nav" className="navbar-left">
          <Nav className="me-auto">
          <nav>
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <FiMenu />
        </div>
        {menuOpen && (
          <div className="menu-items" onClick={() => setMenuOpen(false)}>
            <NavLink className="menu-items-link" to='/'>Anasayfa</NavLink>
            <NavLink className="menu-items-link"  to='/AdminPanel'>Admin Panel</NavLink>       
            <NavLink className="menu-items-link" to='/ProductList'>Ürün Listesi</NavLink>
            <NavLink className="menu-items-link" to='/List'>List</NavLink>
            <NavLink className="menu-items-link" to='/ProductInfo'>Product Info</NavLink>
            <NavLink className="menu-items-link" to='/Basket'>Basket</NavLink>
            <NavLink className="menu-items-link" to='/LogIn'>Üye Giriş</NavLink>
            <NavLink className="menu-items-link" to='/SignUp'>Kaydol</NavLink>
            <NavLink className="menu-items-link" to='/NewPassword'>Parola</NavLink>
            <NavLink className="menu-items-link" to='/Profile'>Profilim</NavLink>
            <NavLink className="menu-items-link" to='/Search'>Search</NavLink>
            <NavLink className="menu-items-link" to='/Favorite'>Favorite</NavLink>   
            <NavLink className="menu-items-link" to='/Blog'>Blog Sayfası</NavLink>
            <NavLink className="menu-items-link" to='/AdminSearch'>Admin Search</NavLink>
            <NavLink className="menu-items-link" to='/AdminProductList'>Admin Product List</NavLink>
            <NavLink className="menu-items-link" to='/CreateYourself'>Kendin Yarat</NavLink>
            <NavLink className="menu-items-link" to='/Stock'>Stok Ekle/Çıkar</NavLink>
            <NavLink className="menu-items-link" to='/BlogDetail'>Blog Detay</NavLink>
            <NavLink className="menu-items-link" to='/EditBlog'>Blog Duzenle</NavLink>
            <NavLink className="menu-items-link" to='/EditProduct'> Ürün Düzenle</NavLink>         
          </div>
        )}
      </nav>
          </Nav>
        </Navbar.Collapse>
        
        <Navbar.Brand style={{ margin: "auto" }} >
       <NavLink className="menu-items-link" to='/Home'> <h1  className='baslik'>Mon Jardin</h1></NavLink>
      </Navbar.Brand>
       
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-right">
          <Nav className="me-auto">
            <NavLink className="menu-items-icon" to='/Favorite'> <img src="/images/menu-icon1.png" alt=""width={40}height={40}/></NavLink>
            <NavLink className="menu-items-icon" to='/Basket'> <img src="/images/menu-icon2.png" alt=""width={40}height={40}/></NavLink>
            <NavLink className="menu-items-icon" to='/Profile'> <img src="/images/menu-icon3.png" alt=""width={40}height={40}/></NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
    
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/AdminPanel" element={<AdminPanel />} />
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
        <Route path="/CreateYourself" element={<CreateYourself/>} />
        <Route path="/Stock" element={<Stock/>} />
        <Route path="/BlogDetail" element={<BlogDetail/>} />
        <Route path="/EditProduct" element={<EditProduct/>} />
        <Route path="/EditBlog" element={<EditBlog/>} />
        <Route path="/EditCategory" element={<EditCategory/>} />       
      </Routes>
    </Router>
  );
} 

export default App;
