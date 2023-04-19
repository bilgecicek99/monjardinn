import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import Anasayfa from './Anasayfa';

import Adminpanel from './Adminpanel';
import AdminLogin from './AdminLogin';
import Productlist from './Productlist';
import Girisekran from './Girisekran';


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
            
            
            
          </div>
        )}
      </nav>
      <Routes>
        <Route path="/Girisekran" element={<Girisekran />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Adminpanel" element={<Adminpanel />} />
        <Route path="/Productlist" element={<Productlist/>} />
          
        
      </Routes>
    </Router>
  );
} 

export default App;
