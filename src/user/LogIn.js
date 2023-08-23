import React, { useState,useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { getToken, setUserSession,setUserInfo } from "../service/AuthService";
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../config/Constants';

const LogIn = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
const [errorMessage, setErrorMessage] = useState(null);

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
        const errorMessage = data.message || "Bilinmeyen bir hata oluştu";
        throw new Error(errorMessage);
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
    setErrorMessage(data.message);
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
    setErrorMessage(error.message);
    console.error("Hata:", error);
  });
  
  
};



return (
  <div style={{ marginTop: "100px" }}>
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
    {errorMessage && <p className="message">{errorMessage}</p>}
    <div style={{ marginTop:"20px"}}>
    <button type="submit" onClick={handleLoginFormSubmit} className="save-button">Gönder</button>
    </div>
    </div>
    <div style={{ textAlign: "center", display: "flex", justifyContent: "center", marginTop: "50px", marginBottom: "50px" }}>
    <hr style={{ width: "20rem" }} />
    <div style={{ marginLeft: "10px", marginRight: "10px", fontStyle: "italic", fontWeight: "300" }}>veya</div>
    <hr style={{ width: "20rem" }} />
    </div>
    <p style={{ textAlign: "center", fontStyle: "italic", fontWeight: "300" }}>Hesabın yok mu?
    <NavLink style={{ color: "#893694", textDecoration: "none", fontStyle: "italic", marginLeft: "20px" }} to='/signup'>Kayıt Ol</NavLink>
    </p>
    </form>
    </>
 
  </div>

);
};

export default LogIn;