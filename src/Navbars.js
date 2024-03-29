import { NavLink, useLocation } from 'react-router-dom';
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
  const currentLocation = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenufav, setActiveMenufav] = useState(false);
  const [activeMenubasket, setActiveMenubasket] = useState(false);
  const [activeMenuprofile, setActiveMenuprofile] = useState(false);
  const [activeMenuBlog, setActiveMenuBlog] = useState(false);
  const [activeMenuSearch, setActiveMenuSearch] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  const navigate = useNavigate();
 const token=getToken();
 const user=getUserInfo();
  const logoutHandler = () => {
    resetUserSession();
    navigate("/");
  };
  const storedUser = localStorage.getItem('UserAllInfo');
  const userAllInfo = JSON.parse(storedUser);
  useEffect(() => {
    // Her sayfa değiştiğinde activeMenu'ları sıfırla
    setActiveMenufav(currentLocation.pathname);
    setActiveMenubasket(currentLocation.pathname);
    setActiveMenuprofile(currentLocation.pathname);
    setActiveMenuBlog(currentLocation.pathname);
    setActiveMenuSearch(currentLocation.pathname);
  }, [currentLocation.pathname]);

  const handleMenuClick = (menu) => {
    setActiveMenufav(menu);
    setActiveMenubasket(menu);
    setActiveMenuprofile(menu);
    setActiveMenuBlog(menu);
    setActiveMenuSearch(menu);
  };


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
    setIsMobile(window.innerWidth <= 992);
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
          
          {/* <Nav className="" > */}
          {/* <div className={`menu-icon ${menuOpen ? 'menu-open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}> */}
            {/* <FiMenu /> */}
              {/* </div> */}

            {/* {menuOpen && (
              <div className="menu-items" onClick={() => setMenuOpen(false)}>
                
               {user && (
                  <div className="text-center">
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
                  <hr /> 
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
                  <hr /> 
               {token ?  <NavLink className="menu-items-link" to='/' value="Logout" onClick={logoutHandler} >Çıkış Yap</NavLink> : "" }
                </div>
              </div>
            )} */}
          {/* </Nav> */}
          <NavLink
                  className={`menu-items-icon ${activeMenuprofile === '/search' ? 'active' : ''}`}
                  to='/search'
                  onClick={() => setActiveMenufav('/search')}
                  style={{color:"black", textDecoration: 'none',marginTop: "8px"}}
                >
                  <img src={activeMenufav === '/search' ? "/images/dolusearch.svg" : "/images/searchpage.png"} alt="" width={18} height={18} style={{marginTop:"20px"}}/>
                  <p className='nav-icon-text' style={{textAlign:"center",marginTop:"0px"}}>Arama</p>
              </NavLink>
            <NavLink
               className={`menu-items-icon ${activeMenuprofile === '/Blog' ? 'active' : ''}`}
                to='/Blog'
                onClick={() => setActiveMenufav('/Blog')}
                style={{color:"black", textDecoration: 'none',marginTop: "8px"}}
              >
                <img src={activeMenufav === '/Blog' ? "/images/dolublog2.svg" : "/images/blogicon.png"} alt="" width={18} height={18} style={{marginTop:"20px"}}/>
                <p className='nav-icon-text' style={{textAlign:"center",marginTop:"0px"}}>Blog</p>

            </NavLink>
          <Navbar.Brand style={{ margin:"auto" }}>          
          <NavLink className="logo-link" to='/'><h1 className='baslik' style={{fontSize:"29px",marginBottom:"6px"}}>Mon Jardin</h1></NavLink>
        </Navbar.Brand>
            <NavLink
              className={`menu-items-icon ${activeMenufav === '/Favorite' ? 'active' : ''}`}
              to='/Favorite'
              onClick={() => setActiveMenufav('/Favorite')}
              style={{color:"black", textDecoration: 'none',marginTop: "4px"}}
            >
              <img src={activeMenufav === '/Favorite' ? "/images/selectedfavorite.png" : "/images/menu-icon1.png"} alt="" width={20} height={20} style={{marginTop:"20px"}}/>
              <p className='nav-icon-text' style={{textAlign:"center",marginTop:"1px"}}>Favori</p>
            </NavLink>
            <NavLink
              className={`menu-items-icon ${activeMenubasket === '/Basket' ? 'active' : ''}`}
              to='/Basket'
              onClick={() => setActiveMenubasket('/Basket')}
              style={{color:"black", textDecoration: 'none'}}
            >
              <img src={activeMenubasket === '/Basket' ? "/images/selectedbasket.png" : "/images/menu-icon2.png"} alt="" width={20} height={25} style={{marginTop:"20px"}}/>
              <p className='nav-icon-text' style={{textAlign:"center",marginTop:"0px"}}>Sepet</p>
            </NavLink>
            {token ? 
            <NavLink
              className={`menu-items-icon ${activeMenuprofile === '/Profile' ? 'active' : ''}`}
              to='/Profile'
              onClick={() => setActiveMenuprofile('/Profile')}
              style={{color:"black", textDecoration: 'none'}}
            >
              <img src={activeMenuprofile === '/Profile' ? "/images/selecteduser.png" : "/images/menu-icon3.png"} alt="" width={20} height={25} style={{marginTop:"20px"}}/>
              <p className='nav-icon-text' style={{textAlign:"center",marginTop:"0px"}}>Profil</p>
            </NavLink>
            : 
            <NavLink
              className={`menu-items-icon ${activeMenuprofile === '/Profile' ? 'active' : ''}`}
              to='/login'
              onClick={() => setActiveMenuprofile('/Profile')}
              style={{color:"black", textDecoration: 'none'}}
            >
              <img src={activeMenuprofile === '/Profile' ? "/images/selecteduser.png" : "/images/menu-icon3.png"} alt="" width={20} height={25} style={{marginTop:"20px"}}/>
              <p className='nav-icon-text' style={{textAlign:"center",marginTop:"0px"}}>Profil</p>
            </NavLink>
            }         

      </Container>
                  </> : 
                  <>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
       

          {/* <Nav className="me-auto navbar-left" > */}
          {/* <div className={`menu-icon ${menuOpen ? 'menu-open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}> */}
      {/* <FiMenu /> */}
    {/* </div> */}

            {/* {menuOpen && (
              <div className="menu-items" onClick={() => setMenuOpen(false)}>
                
               {user && (
                  <div className="text-center">
                    <p className='menu-items-admin-link'>{userAllInfo.firstName} {userAllInfo.lastName} </p>
                    <p className='menu-items-admin-link'>{user.email}</p>
                  </div>
                )}

                <div className="menu-items-container">
                  <NavLink className="menu-items-link" to='/'>Anasayfa</NavLink>
                  <hr />
                  {user ? (
                    <>
                      <NavLink className="menu-items-link" to='/Profile'>Profil</NavLink>
                      <hr />
                    </>
                  ) : null}
                  <NavLink className="menu-items-link" to='/Search'>Arama</NavLink>
                  <hr />
                  {/* <NavLink className="menu-items-link" to='/CreateYourself'>Kendin Yarat</NavLink>
                  <hr /> 
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
                  <hr /> 
               {token ?  <NavLink className="menu-items-link" to='/' value="Logout" onClick={logoutHandler} >Çıkış Yap</NavLink> : "" }
                </div>
              </div>
            )} */}
          {/* </Nav> */}
            <NavLink
                  className={`menu-items-icon ${activeMenuprofile === '/search' ? 'active' : ''}`}
                  to='/search'
                  onClick={() => setActiveMenufav('/search')}
                  style={{color:"black", textDecoration: 'none',marginTop: "8px"}}
                >
                  <img src={activeMenufav === '/search' ? "/images/dolusearch.svg" : "/images/searchpage.png"} alt="" width={30} height={30} />
                  <p className='nav-icon-text' style={{textAlign:"center"}}>Arama</p>
              </NavLink>
            <NavLink
               className={`menu-items-icon ${activeMenuprofile === '/Blog' ? 'active' : ''}`}
                to='/Blog'
                onClick={() => setActiveMenufav('/Blog')}
                style={{color:"black", textDecoration: 'none',marginTop: "8px"}}
              >
                <img src={activeMenufav === '/Blog' ? "/images/dolublog2.svg" : "/images/blogicon.png"} alt="" width={35} height={30} />
                <p className='nav-icon-text' style={{textAlign:"center"}}>Blog</p>

            </NavLink>

        <Navbar.Brand style={{ margin: "auto" }}>
            
          <NavLink className="logo-link" to='/'><h1 className='baslik'>Mon Jardin</h1></NavLink>
        </Navbar.Brand>

          <Nav className="me-auto navbar-right" style={{marginTop:"15px"}}>
            <NavLink
              className={`menu-items-icon ${activeMenufav === '/Favorite' ? 'active' : ''}`}
              to='/Favorite'
              onClick={() => setActiveMenufav('/Favorite')}
              style={{color:"black", textDecoration: 'none',marginTop: "4px"}}
            >
              <img src={activeMenufav === '/Favorite' ? "/images/selectedfavorite.png" : "/images/menu-icon1.png"} alt="" width={40} height={35} />
              <p className='nav-icon-text'>Favoriler</p>
            </NavLink>
            <NavLink
              className={`menu-items-icon ${activeMenubasket === '/Basket' ? 'active' : ''}`}
              to='/Basket'
              onClick={() => setActiveMenubasket('/Basket')}
              style={{color:"black", textDecoration: 'none'}}
            >
              <img src={activeMenubasket === '/Basket' ? "/images/selectedbasket.png" : "/images/menu-icon2.png"} alt="" width={35} height={40} />
              <p className='nav-icon-text'>Sepetim</p>
            </NavLink>
            {token ? 
            <NavLink
              className={`menu-items-icon ${activeMenuprofile === '/Profile' ? 'active' : ''}`}
              to='/Profile'
              onClick={() => setActiveMenuprofile('/Profile')}
              style={{color:"black", textDecoration: 'none'}}
            >
              <img src={activeMenuprofile === '/Profile' ? "/images/selecteduser.png" : "/images/menu-icon3.png"} alt="" width={35} height={40} />
              <p className='nav-icon-text'>Profilim</p>
            </NavLink>
            : 
            <NavLink
              className={`menu-items-icon ${activeMenuprofile === '/Profile' ? 'active' : ''}`}
              to='/login'
              onClick={() => setActiveMenuprofile('/Profile')}
              style={{color:"black", textDecoration: 'none'}}
            >
              <img src={activeMenuprofile === '/Profile' ? "/images/selecteduser.png" : "/images/menu-icon3.png"} alt="" width={40} height={40} />
              <p className='nav-icon-text'>Profilim</p>
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
