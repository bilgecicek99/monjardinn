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
  
    return (
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
            <div className="menu-items " onClick={() => setMenuOpen(false)}>
              <div className="text-center">
                <img src="/images/person.png" alt="" width={"45"} height={"45"} />
                <p className='menu-items-admin-link'>Deniz Şenocak</p>   {/*  be'den gelcek*/}
                <p className='menu-items-admin-link'>exapmle@gmail.com</p>  {/*  be'den gelcek*/} 
            </div>
            <div className="menu-items-container">
              <NavLink className="menu-items-link" to='/'>Anasayfa</NavLink>
              <hr/>
              <NavLink className="menu-items-link" to='/Search'>Arama</NavLink>
              <hr/>
              <NavLink className="menu-items-link" to='/List'>Saksı</NavLink>
              <hr/>
              <NavLink className="menu-items-link" to='/List'>Kurutulmuş Çicek</NavLink>
              <hr/>
              <NavLink className="menu-items-link" to='/List'>Çicekler</NavLink>
              <hr/>
              <NavLink className="menu-items-link" to='/List'>Aranjmanlar</NavLink>
              <hr/>
              <NavLink className="menu-items-link" to='/List'>Büyük Bitkiler</NavLink>  
              <hr/>
              <NavLink className="menu-items-link" to='/CreateYourself'>Kendin Yarat</NavLink> 
              <hr/>         
              <NavLink className="menu-items-link" to='/Blog'>Blog</NavLink>
              <hr/>
              <NavLink className="menu-items-link" to='/Blog'>Çıkış Yap</NavLink>
              </div>
            </div>
          )}
        </nav>
            </Nav>
          </Navbar.Collapse>
          
          <Navbar.Brand style={{ margin: "auto" }} >
         <NavLink className="logo-link" to='/Home'> <h1  className='baslik'>Mon Jardin</h1></NavLink>
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
    );
  } 
  
  export default Navbars;
  