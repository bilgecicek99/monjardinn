import React, { useState, useEffect } from "react";
import { getEmail, getToken, getUserInfo, setUserInfo } from "../service/AuthService";
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../config/Constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WithNavbar from '../WithNavbar'; 

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const navigate = useNavigate();
    let userInfo= getUserInfo();
    let token= getToken();


    const handlePasswordChangeOld = (event) => {
        setOldPassword(event.target.value);
      }; 

      const handlePasswordChangeNew = (event) => {
        setNewPassword(event.target.value);
      };
    
      const updatePassword = async() => {
        try {
          if (!oldPassword || !newPassword) {
            toast.error('Lütfen mevcut şifre ve yeni şifre alanlarını doldurunuz.', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            return;
          }
          if (newPassword.length < 5) {
            toast.error('Yeni şifre minimum 5 karakter olmalıdır.', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            return;
          } 
          const requestBody = {
            userId: userInfo.userId,
            newPassword: newPassword,
            oldPassword: oldPassword
          };
       
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
          };
          
          await fetch(baseUrl + `api/Auth/PasswordUpdate`, requestOptions)
          .then(async (response) => {
            const data = await response.json();
            if (data.success === true) {
              toast.success('Şifreniz başarıyla değiştirilmiştir.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
              
              setTimeout(() => {
                navigate("/profile");
              }, 3000);
            } else {
              toast.error(data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
            }
          })
          .catch((error) => {
            toast.error(error.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          });
        
        
          
        } 
        catch (error) {
          console.error("Profil verileri getirilirken hata oluştu: ", error);
        }
        };

  return (
    <div style={{ marginTop: "150px",marginBottom:"200px" }}>
         <ToastContainer />
      <div style={{ justifyContent: "center", marginTop: "50px", textAlign: "center" , display:"block"}}>
      <div>
      
         <input
          placeholder="Mevcut Şifre"
          type="password"
          value={oldPassword}
          onChange={handlePasswordChangeOld}
          className="input-action"
        /></div>
        <div>
            <input
            type="password"
            placeholder="Yeni Şifre"
            value={newPassword}
            onChange={handlePasswordChangeNew}
            className="input-action"
            style={{marginTop:"20px"}}
            />
        </div>
    
         <button onClick={updatePassword} className="button-action">
            Kaydet
          </button>
       </div>


    </div>
  );
};

export default WithNavbar(ChangePassword);

