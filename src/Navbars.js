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
import { baseUrl } from './config/Constants';

function Navbars() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenufav, setActiveMenufav] = useState(false);
  const [activeMenubasket, setActiveMenubasket] = useState(false);
  const [activeMenuprofile, setActiveMenuprofile] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const navigate = useNavigate();
 const token=getToken();
 const user=getUserInfo();
 console.log("user",user);
  const logoutHandler = () => {
    resetUserSession();
    navigate("/");
  };
  const storedUser = localStorage.getItem('UserAllInfo');
  const userAllInfo = JSON.parse(storedUser);

console.log("userall",userAllInfo);

useEffect(() => {
  const fetchProfilVerileri = async () => {
    try {  
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
     await fetch(baseUrl+`api/User/UserProfile/${user.email}`,requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data && data.data) {
        const { firstname, lastName, phoneNumber, email, dateOfBirth } = data.data;
        const updatedUser = {
          firstName: firstname,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
          dateOfBirth: dateOfBirth
        }
        localStorage.setItem('UserAllInfo', JSON.stringify(updatedUser));

        console.log("uppp",updatedUser);
       
      } else {
        console.error('Profil verileri alınamadı');
      }
      })
      .catch(error => {
        console.error(error);
      });
    } catch (error) {
      console.error("Profil verileri getirilirken hata oluştu: ", error);
    }
  };

  fetchProfilVerileri();
}, []);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
  return (
    <Navbar expand="lg" fixed="top">
                  {isMobile ? <>
                    <Container>
        

          <Nav className="" >
          <div className={`menu-icon ${menuOpen ? 'menu-open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
  <FiMenu />
</div>

            {menuOpen && (
              <div className="menu-items" onClick={() => setMenuOpen(false)}>
                
               {user && (
                  <div className="text-center">
                    <img src="/images/usericon.png" alt="" width={"45"} height={"45"}  style={{marginBottom:"5px"}}/>
                    <p className='menu-items-admin-link'>{userAllInfo.firstName} {userAllInfo.lastName} </p>
                    <p className='menu-items-admin-link'>{user.email}</p>
                  </div>
                )}

                <div className="menu-items-container">
                  <NavLink className="menu-items-link" to='/'>Anasayfa</NavLink>
                  <hr />
                  <NavLink className="menu-items-link" to='/Favorite'>Favoriler</NavLink>
                  <hr />
                  <NavLink className="menu-items-link" to='/Basket'>Sepetim</NavLink>
                  <hr />
                  <NavLink className="menu-items-link" to='/Profile'>Profil</NavLink>
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
                  <img src="/images/morethanicon.png" alt="More Than Icon" width={30} style={{marginRight:"5px"}} />
                  Daha Fazla
                </NavLink>

                  <hr />
                  {/* <NavLink className="menu-items-link" to=''>Ayarlar</NavLink>
                  <hr /> */}
               {token ?  <NavLink className="menu-items-link" to='/' value="Logout" onClick={logoutHandler} >Çıkış Yap</NavLink> : "" }
                </div>
              </div>
            )}
          </Nav>
          <Navbar.Brand style={{ margin:"auto" }}>
          <NavLink className="logo-link" to='/'><h1 className='baslik'>Mon Jardin</h1></NavLink>
        </Navbar.Brand>
      </Container>
                  </> : 
                  <>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Nav className="me-auto navbar-left" >
          <div className={`menu-icon ${menuOpen ? 'menu-open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
  <FiMenu />
</div>

            {menuOpen && (
              <div className="menu-items" onClick={() => setMenuOpen(false)}>
                
               {user && (
                  <div className="text-center">
                    <img src="/images/usericon.png" alt="" width={"45"} height={"45"}  style={{marginBottom:"5px"}}/>
                    <p className='menu-items-admin-link'>{userAllInfo.firstName} {userAllInfo.lastName} </p>
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
                  <img src="/images/morethanicon.png" alt="More Than Icon" width={30} style={{marginRight:"5px"}} />
                  Daha Fazla
                </NavLink>

                  <hr />
                  {/* <NavLink className="menu-items-link" to=''>Ayarlar</NavLink>
                  <hr /> */}
               {token ?  <NavLink className="menu-items-link" to='/' value="Logout" onClick={logoutHandler} >Çıkış Yap</NavLink> : "" }
                </div>
              </div>
            )}
          </Nav>
        

        <Navbar.Brand style={{ margin: "auto" }}>
          <NavLink className="logo-link" to='/'><h1 className='baslik'>Mon Jardin</h1></NavLink>
        </Navbar.Brand>

          <Nav className="me-auto navbar-right">
            <NavLink
              className={`menu-items-icon ${activeMenufav === '/Favorite' ? 'active' : ''}`}
              to='/Favorite'
              onClick={() => setActiveMenufav('/Favorite')}
            >
              <img src={activeMenufav === '/Favorite' ? "/images/selectedfavorite.png" : "/images/menu-icon1.png"} alt="" width={40} height={40} />
            </NavLink>
            <NavLink
              className={`menu-items-icon ${activeMenubasket === '/Basket' ? 'active' : ''}`}
              to='/Basket'
              onClick={() => setActiveMenubasket('2/Basket')}
            >
              <img src={activeMenubasket === '/Basket' ? "/images/selectedbasket.png" : "/images/menu-icon2.png"} alt="" width={35} height={40} />
            </NavLink>
            {token ? 
            <NavLink
              className={`menu-items-icon ${activeMenuprofile === '/Profile' ? 'active' : ''}`}
              to='/Profile'
              onClick={() => setActiveMenuprofile('/Profile')}
            >
              <img src={activeMenuprofile === '/Profile' ? "/images/selecteduser.png" : "/images/menu-icon3.png"} alt="" width={40} height={40} />
            </NavLink>
            : 
            <NavLink
              className={`menu-items-icon ${activeMenuprofile === '/Profile' ? 'active' : ''}`}
              to='/login'
              onClick={() => setActiveMenuprofile('/Profile')}
            >
              <img src={activeMenuprofile === '/Profile' ? "/images/selecteduser.png" : "/images/menu-icon3.png"} alt="" width={40} height={40} />
            </NavLink>
            }
          
          
          </Nav>
      
      </Container>
      </>
      }

    
    </Navbar>
  );
}

export default Navbars;
