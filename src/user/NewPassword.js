import React, { useState, useEffect } from "react";
import { getEmail, getToken, getUserInfo, setUserInfo } from "../service/AuthService";
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../config/Constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewPassword = () => {
 
  const [newPassword, setNewPassword] = useState(""); 
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
        if(data.success)
        {
          toast.success('Şifre Başarıyla Güncellendi', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
    
      
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
       else{
        toast.error(data.message??"Lütfen daha sonra tekrar deneyiniz.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
       }
       
      })
      .catch((error) => {
        console.error(error);
      
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <div style={{ marginTop: "100px" }}>
         <ToastContainer />
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


    </div>
  );
};

export default NewPassword;

