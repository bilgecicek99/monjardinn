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


import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import React, { useState } from 'react';
import './index.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <h1 style={{ textAlign: 'center' }} className='baslik'>Mon Jardin</h1>
      <nav>
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <FiMenu />
        </div>
        {menuOpen && (
          <div className="menu-items" onClick={() => setMenuOpen(false)}>
            <NavLink to='/Girisekran'>Anasayfa</NavLink>
            <NavLink to='/AdminLogin'>Giriş Yap</NavLink>
            <NavLink to='/Adminpanel'>Adminpanel</NavLink>       
            <NavLink to='/Productlist'>Ürün Listesi</NavLink>
            <NavLink to='/Liste'>Liste</NavLink>
            <NavLink to='/Detay'>Detay</NavLink>
            <NavLink to='/Sepet'>Sepet</NavLink>
            <NavLink to='/Uyegiris'>Üye Giriş</NavLink>
            <NavLink to='/Kayitol'>Kaydol</NavLink>
            <NavLink to='/Yeniparola'>Parola</NavLink>
            <NavLink to='/Profil'>Profilim</NavLink>

            
            
            
            
            
          </div>
        )}
      </nav>
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


          
        
      </Routes>
    </Router>
  );
} 

export default App;
