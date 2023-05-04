import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import Anasayfa from './Anasayfa';

import Adminpanel from './Adminpanel';
import AdminLogin from './AdminLogin';
import Productlist from './Productlist';
import Girisekran from './Girisekran';
import Liste from './Liste';
import Detay from './Detay';
import Sepet from './Sepet';
import Uyegiris from './Uyegiris';
import Kayitol from './Kayitol';
import Yeniparola from './Yeniparola';
import Profil from './Profil';
import Arama from './Arama';
import Favori from './Favori';
import Blog from './Blog';
import Adminarama from './Adminarama';
import Adminstokkontrol from './Adminstokkontrol'
import Kendinyarat from './Kendinyarat' 
import Blogdetay from './Blogdetay';


import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import React, { useState } from 'react';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Stokeklecikar from './Stokeklecikar';

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
            <NavLink className="menu-items-link" to='/Girisekran'>Anasayfa</NavLink>
            <NavLink className="menu-items-link" to='/AdminLogin'>Giriş Yap</NavLink>
            <NavLink className="menu-items-link"  to='/Adminpanel'>Adminpanel</NavLink>       
            <NavLink className="menu-items-link" to='/Productlist'>Ürün Listesi</NavLink>
            <NavLink className="menu-items-link" to='/Liste'>Liste</NavLink>
            <NavLink className="menu-items-link" to='/Detay'>Detay</NavLink>
            <NavLink className="menu-items-link" to='/Sepet'>Sepet</NavLink>
            <NavLink className="menu-items-link" to='/Uyegiris'>Üye Giriş</NavLink>
            <NavLink className="menu-items-link" to='/Kayitol'>Kaydol</NavLink>
            <NavLink className="menu-items-link" to='/Yeniparola'>Parola</NavLink>
            <NavLink className="menu-items-link" to='/Profil'>Profilim</NavLink>
            <NavLink className="menu-items-link" to='/Arama'>Arama</NavLink>
            <NavLink className="menu-items-link" to='/Favori'>Favori</NavLink>   
            <NavLink className="menu-items-link" to='/Blog'>Blog Sayfası</NavLink>
            <NavLink className="menu-items-link" to='/Adminarama'>Admin Arama Sayfası</NavLink>
            <NavLink className="menu-items-link" to='/Adminstokkontrol'>Admin Stok Kontrol Sayfası</NavLink>
            <NavLink className="menu-items-link" to='/Kendinyarat'>Kendin Yarat</NavLink>
            <NavLink className="menu-items-link" to='/Stokeklecikar'>Stok Ekle/Çıkar</NavLink>
            <NavLink className="menu-items-link" to='/Blogdetay'>Blog Detay</NavLink>
          
          
            
             
          </div>
        )}
      </nav>
          </Nav>
        </Navbar.Collapse>
        
        <Navbar.Brand style={{ margin: "auto" }} >
       <NavLink className="menu-items-link" to='/Girisekran'> <h1  className='baslik'>Mon Jardin</h1></NavLink>
      </Navbar.Brand>
       
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-right">
          <Nav className="me-auto">
          <NavLink className="menu-items-icon" to='/Uyegiris'> <img src="/images/menu-icon1.png" alt=""width={40}height={40}/></NavLink>
          <NavLink className="menu-items-icon" to='/Uyegiris'> <img src="/images/menu-icon2.png" alt=""width={40}height={40}/></NavLink>
          <NavLink className="menu-items-icon" to='/Uyegiris'> <img src="/images/menu-icon3.png" alt=""width={40}height={40}/></NavLink>

           
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
    
      <Routes>
        <Route path="/Girisekran" element={<Girisekran />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Adminpanel" element={<Adminpanel />} />
        <Route path="/Productlist" element={<Productlist/>} />
        <Route path="/Liste" element={<Liste/>} />
        <Route path="/Detay" element={<Detay/>} />
        <Route path="/Sepet" element={<Sepet/>} />
        <Route path="/Uyegiris" element={<Uyegiris/>} />
        <Route path="/Kayitol" element={<Kayitol/>} />
        <Route path="/Yeniparola" element={<Yeniparola/>} />
        <Route path="/Profil" element={<Profil/>} />
        <Route path="/Arama" element={<Arama/>} />
        <Route path="/Favori" element={<Favori/>} />
        <Route path="/Blog" element={<Blog/>} />
        <Route path="/Adminarama" element={<Adminarama/>} />
        <Route path="/Adminstokkontrol" element={<Adminstokkontrol/>} />
        <Route path="/Kendinyarat" element={<Kendinyarat/>} />
        <Route path="/Stokeklecikar" element={<Stokeklecikar/>} />
        <Route path="/Blogdetay" element={<Blogdetay/>} />
        

    



          
        
      </Routes>
    </Router>
  );
} 

export default App;
