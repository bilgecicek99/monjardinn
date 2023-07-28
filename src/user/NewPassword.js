import React, { useState, useEffect } from "react";
import { getEmail, getToken, getUserInfo, setUserInfo } from "../service/AuthService";
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../config/Constants';

const NewPassword = () => {
 
  const [newPassword, setNewPassword] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  let token = getToken();
  let userInfo = getUserInfo();

 console.log("user",userInfo.email)

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSend = async () => {
    const requestBody = {  
      newPassword: newPassword,
      email: userInfo.email
    };
    console.log("req",requestBody);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody)
    };
 
    await fetch(baseUrl+`api/Auth/PasswordUpdateWithoutLogin`, requestOptions)
      .then((response) => response.json())
      .then((data) => { 
        console.log("data,",data);
        setErrorMessage(data.message);
        alert("Şifre başarıyla güncellendi")
        navigate("/login")
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.message);
      });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <h1 style={{ textAlign: "center", fontStyle: "italic" }}>Yeni Parolanız Bir Mail Uzaklıkta</h1>
      <div style={{ justifyContent: "center", marginTop: "50px", textAlign: "center" , display:"block"}}>
      <div>
      
         <input
          type="text"
          placeholder="Yeni Şifre"
          value={newPassword}
          onChange={handlePasswordChange}
          className="input-action"
        />
   </div>
    
         <button onClick={handleSend} className="button-action">
            Gönder
          </button>
       </div>
      {errorMessage && <p className="message" style={{marginTop:"20px"}}>{errorMessage}</p>}

    </div>
  );
};

export default NewPassword;

