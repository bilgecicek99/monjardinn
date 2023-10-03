import React, { useState,useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { getToken, setUserSession,setUserInfo } from "../service/AuthService";
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../config/Constants';
import WithNavbar from '../WithNavbar'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogIn = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const handleEmailChange = (e) => {
  setEmail(e.target.value);
};

const handlePasswordChange = (e) => {
  setPassword(e.target.value);
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Form submitted with email:", email, "and password:", password);
};



const handleLoginFormSubmit = () => {
 
  if (!email  || !password) {
    toast.error('Lütfen Tüm Alanları Doldurunuz.', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
    return; 
  }

  fetch(baseUrl+"api/auth/login", {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
  email: email,
  password: password
  }),
  })
  .then((response) => {
    return response.json().then((data) => {
      if (!response.ok) {
        const errorMessage =
          data.message || "Bilinmeyen bir hata oluştu"; 
        if (response.status === 401) {
        
          throw new Error("Yetkisiz erişim. Lütfen giriş yapın.");
        } else if (response.status === 403) {
      
          throw new Error("Bu işlemi gerçekleştirmek için yetkiniz yok.");
        } else {
          throw new Error(errorMessage);
        }
      }
      return data;
    });
  })
  .then((data) => {
    console.log("dataaa", data.claims);
    //console.log("data", data.data.token);

    setUserSession(data.token,email);
    const updatedUser = {
      email: email,
      userId:data.userId
    }
    console.log("updatedUser",updatedUser)
    setUserInfo(updatedUser);
    
    
    toast.error(data.message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
   
    if (data.claims.includes('admin')) {
      // Admin paneline yönlendirme işlemini gerçekleştirin
      console.log("Yönlendirme: Admin Paneli");
       navigate('/adminpanel');
    } else if (data.claims.includes('user')) {
      // Kullanıcı sayfasına yönlendirme işlemini gerçekleştirin
      console.log("Yönlendirme: Kullanıcı Sayfası");
      navigate('/');
    } else {
      // Herhangi bir yönlendirme yapılacaksa anasayfaya yönlendirme işlemini gerçekleştirin
      console.log("Yönlendirme: Anasayfa");
      navigate('/');
    }
   
  })
  .catch((error) => {
    toast.error( "Lütfen Daha Sonra Tekrar Deneyiniz.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
   
    
    console.error("Hata:", error);
  });
  
  
};



return (
  <div style={{ marginTop: "100px" }}>
                <ToastContainer />

    <>
    <h1 style={{ textAlign: "center", fontStyle: "italic" }}>Hoşgeldiniz</h1>

    <form onSubmit={handleSubmit}>
    <div style={{ display: "block", justifyContent: "center", marginTop: "50px", textAlign: "center" }}>
    <div>
    <input
              type="email"
              placeholder="E-posta"
              value={email}
              onChange={handleEmailChange}
              className="input-action"
            />
    </div>
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
    <input
              type="password"
              placeholder="Parola"
              value={password}
              onChange={handlePasswordChange}
              className="input-action"
            />
    </div>
    <div>
    <NavLink style={{ color: "#893694", textDecoration: "none", fontStyle: "italic" }} to='/forgotpassword'>Parolamı Unuttum</NavLink>
    </div>
   
    <div style={{ marginTop:"20px"}}>
    <button type="submit" onClick={handleLoginFormSubmit} className="save-button">Gönder</button>
    </div>
    </div>
    <div style={{ textAlign: "center", display: "flex", justifyContent: "center", marginTop: "50px", marginBottom: "50px" }}>
    <hr style={{ width: "20rem" }} />
    <div style={{ marginLeft: "10px", marginRight: "10px", fontStyle: "italic", fontWeight: "300" }}>veya</div>
    <hr style={{ width: "20rem" }} />
    </div>
    <p style={{ textAlign: "center", fontStyle: "italic", fontWeight: "300",marginBottom:"50px" }}>Hesabın yok mu?
    <NavLink style={{ color: "#893694", textDecoration: "none", fontStyle: "italic", marginLeft: "20px" }} to='/signup'>Kayıt Ol</NavLink>
    </p>
    </form>
    </>
 
  </div>

);
};

export default WithNavbar(LogIn);
