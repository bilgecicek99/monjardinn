import React, { useState,useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { getToken, setUserSession } from "./service/AuthService";
import {getUser} from "./service/AuthService";
import { useLocation, useNavigate } from 'react-router-dom';

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
 
  fetch("https://api.monjardin.online/api/auth/login", {
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
    console.log("data", data.message);
    console.log("data", data.data.user);
    console.log("data", data.data.token);

    setUserSession(data.data.token);
   let x= getToken();
   console.log("x",x);
  
    setErrorMessage(data.message);
    navigate('/');
  })
  .catch((error) => {
    setErrorMessage(error.message);
    console.error("Hata:", error);
  });
  
  
};

useEffect(() => {
  const storedToken = getToken();
  if (storedToken) {
    setUserSession(storedToken);
    navigate('/');
  }
}, []);
const user=getUser();

return (
  <div style={{ margin: "100px" }}>
  {user === null ?  
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
    <NavLink style={{ color: "#893694", textDecoration: "none", fontStyle: "italic", marginRight: "290px" }} to='/Yeniparola'>Parolamı Unuttum</NavLink>
    </div>
    {errorMessage && <p className="message">{errorMessage}</p>}
    <div style={{ position: "relative", left: "130px" }}>
    <button type="submit" onClick={handleLoginFormSubmit} className="button-action">Gönder</button>
    </div>
    </div>
    <div style={{ textAlign: "center", display: "flex", justifyContent: "center", marginTop: "50px", marginBottom: "50px" }}>
    <hr style={{ width: "20rem" }} />
    <div style={{ marginLeft: "10px", marginRight: "10px", fontStyle: "italic", fontWeight: "300" }}>veya</div>
    <hr style={{ width: "20rem" }} />
    </div>
    <p style={{ textAlign: "center", fontStyle: "italic", fontWeight: "300" }}>Hesabın yok mu?
    <NavLink style={{ color: "#893694", textDecoration: "none", fontStyle: "italic", marginLeft: "20px" }} to='/Kayitol'>Kayıt Ol</NavLink>
    </p>
    </form>
    </>
  : 
  ''}
 
  </div>

);
};

export default LogIn;