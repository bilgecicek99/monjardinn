import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import React, { useState,useEffect } from 'react';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {resetUserSession,getToken,getUserInfo} from "./service/AuthService";
import { useNavigate } from 'react-router-dom';

function Navbars() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();
 const token=getToken();
 const user=getUserInfo();
 console.log("user",user);
  const logoutHandler = () => {
    resetUserSession();
    navigate("/");
  };
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
                
               {user && (
  <div className="text-center">
    <img src="/images/person.png" alt="" width={"45"} height={"45"} />
    <p className='menu-items-admin-link'>{user.firstName}</p>
    <p className='menu-items-admin-link'>{user.email}</p>
  </div>
)}

                <div className="menu-items-container">
                  <NavLink className="menu-items-link" to='/'>Anasayfa</NavLink>
                  <hr />
                  <NavLink className="menu-items-link" to='/Search'>Arama</NavLink>
                  <hr />
                  {/* <NavLink className="menu-items-link" to='/CreateYourself'>Kendin Yarat</NavLink>
                  <hr /> */}
                  <NavLink className="menu-items-link" to='/Blog'>Blog</NavLink>
                  <hr />
                  <NavLink className="menu-items-link" to='/Contact'>İletişim</NavLink>
                  <hr /> 
                  <NavLink className="menu-items-link" to='/Morethan'>
                  <div className="more-button-container">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="more-button" />
                      ))}
                      Daha Fazla
                    </div>  </NavLink>
                  <hr />
                  {/* <NavLink className="menu-items-link" to=''>Ayarlar</NavLink>
                  <hr /> */}
               {token ?  <NavLink className="menu-items-link" to='/' value="Logout" onClick={logoutHandler} >Çıkış Yap</NavLink> : "" }
                </div>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>

        <Navbar.Brand style={{ margin: "auto" }}>
          <NavLink className="logo-link" to='/'><h1 className='baslik'>Mon Jardin</h1></NavLink>
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
            {token ? 
            <NavLink
              className={`menu-items-icon ${activeMenu === '/Profile' ? 'active' : ''}`}
              to='/Profile'
              onClick={() => setActiveMenu('/Profile')}
            >
              <img src={activeMenu === '/Profile' ? "/images/selecteduser.png" : "/images/menu-icon3.png"} alt="" width={40} height={40} />
            </NavLink>
            : 
            <NavLink
              className={`menu-items-icon ${activeMenu === '/Profile' ? 'active' : ''}`}
              to='/login'
              onClick={() => setActiveMenu('/Profile')}
            >
              <img src={activeMenu === '/Profile' ? "/images/selecteduser.png" : "/images/menu-icon3.png"} alt="" width={40} height={40} />
            </NavLink>
            }
          
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
