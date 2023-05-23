import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import React, { useState } from 'react';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navbars() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <Navbar expand="lg" fixed="top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="navbar-left">
          <Nav className="me-auto">
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
              <FiMenu />
            </div>
            {menuOpen && (
              <div className="menu-items" onClick={() => setMenuOpen(false)}>
                <div className="text-center">
                  <img src="/images/person.png" alt="" width={"45"} height={"45"} />
                  <p className='menu-items-admin-link'>Deniz Şenocak</p>
                  <p className='menu-items-admin-link'>exapmle@gmail.com</p>
                </div>
                <div className="menu-items-container">
                  <NavLink className="menu-items-link" to='/'>Anasayfa</NavLink>
                  <hr />
                  <NavLink className="menu-items-link" to='/Search'>Arama</NavLink>
                  <hr />
                  <NavLink className="menu-items-link" to='/List'>Saksı</NavLink>
                  <hr />
                  <NavLink className="menu-items-link" to='/List'>Kurutulmuş Çicek</NavLink>
                  <hr />
                  <NavLink className="menu-items-link" to='/List'>Çicekler</NavLink>
                  <hr />
                  <NavLink className="menu-items-link" to='/List'>Aranjmanlar</NavLink>
                  <hr />
                  <NavLink className="menu-items-link" to='/List'>Büyük Bitkiler</NavLink>
                  <hr />
                  <NavLink className="menu-items-link" to='/CreateYourself'>Kendin Yarat</NavLink>
                  <hr />
                  <NavLink className="menu-items-link" to='/Blog'>Blog</NavLink>
                  <hr />
                  <NavLink className="menu-items-link" to='/Blog'>Çıkış Yap</NavLink>
                </div>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>

        <Navbar.Brand style={{ margin: "auto" }}>
          <NavLink className="logo-link" to='/Home'><h1 className='baslik'>Mon Jardin</h1></NavLink>
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav" className="navbar-right">
          <Nav className="me-auto">
            <NavLink
              className={`menu-items-icon ${activeMenu === '/Favorite' ? 'active' : ''}`}
              to='/Favorite'
              onClick={() => setActiveMenu('/Favorite')}
            >
              <img src={activeMenu === '/Favorite' ? "/images/selectedfavorite.png" : "/images/menu-icon1.png"} alt="" width={40} height={40} />
            </NavLink>
            <NavLink
              className={`menu-items-icon ${activeMenu === '/Basket' ? 'active' : ''}`}
              to='/Basket'
              onClick={() => setActiveMenu('/Basket')}
            >
              <img src={activeMenu === '/Basket' ? "/images/selectedbasket.png" : "/images/menu-icon2.png"} alt="" width={40} height={40} />
            </NavLink>
            <NavLink
              className={`menu-items-icon ${activeMenu === '/Profile' ? 'active' : ''}`}
              to='/Profile'
              onClick={() => setActiveMenu('/Profile')}
            >
              <img src={activeMenu === '/Profile' ? "/images/selecteduser.png" : "/images/menu-icon3.png"} alt="" width={40} height={40} />
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
