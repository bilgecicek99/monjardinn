import React, { useState, useEffect } from "react";
import { getEmail, getToken, getUserInfo, setUserInfo } from "../service/AuthService";
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../config/Constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ForgotPassword = () => {
  const [email, setEmail] = useState(""); 
  const [code, setCode] = useState(""); 
  const [responseCode, setResponseCode] = useState(""); 
  const [mailGeldiMi, setMailGeldiMi] = useState(false); 
  const [counter, setCounter] = useState(60); 
  const [send, setSend] = useState(true); 
  const navigate = useNavigate();
  let token = getToken();
/*
  useEffect(() => {
    let interval; 
    if (mailGeldiMi && counter > 0) {
      interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mailGeldiMi, counter]);
  */
  function isValidEmail(email) {
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const handleCodeSend = (e) => {
    if(responseCode === code){
      navigate('/newpassword'); 
    }
    else{
      toast.error("Kod yanlış veya eksik lütfen tekrar deneyiniz", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const handleGonderClick = async () => {
    
    if (!email) {
      toast.error('Lütfen Tüm Alanları Doldurunuz.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
  
    if (!isValidEmail(email)) {
      toast.error('Geçerli bir e-posta adresi giriniz.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }

   setSend(false);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await fetch(baseUrl+`api/Auth/ForgotPassword?email=${email}`, requestOptions)
      .then((response) => response.json())
      .then((data) => { 
        console.log("data,",data);
        if(data.success===false){
          console.log("jhjkh");
          toast.error(data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          setTimeout(() => {
            window.location.reload();
          },1000);
        
          
        return;
        }
        else{
          setMailGeldiMi(true);
          setCounter(60); // Reset the counter to 60 seconds
        
          toast.error(data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          setResponseCode(data.data);
          const updatedUser = {
            email: email,
          }
          setUserInfo(updatedUser);
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
      return;
     
        
      });
  };

  return (
    <div style={{ marginTop: "100px" }}>
                            <ToastContainer />

      <h1 style={{ textAlign: "center", fontStyle: "italic" }}>Yeni Parolanız Bir Mail Uzaklıkta</h1>
      <div style={{ justifyContent: "center", marginTop: "50px", textAlign: "center" }}>
       
        {mailGeldiMi ? (
          <div style={{ marginTop: "20px", fontStyle: "italic", justifyContent: "center" }}>
           <div>Lütfen mailinize gelen kodu giriniz: </div>
           <input
          type="number"
          placeholder="Kod"
          value={code}
          onChange={handleCode}
          className="input-action"
        />
      <div>
         <button  onClick={handleCodeSend}  className="button-action">
           Kodu Gönder
          </button>
          </div>
         
          </div>
          
        ) : (
          <div style={{ marginTop: "20px", fontStyle: "italic" }}></div>
        )} 

        {send ? ( 
          <>
          <input
          type="email"
          placeholder="E-posta adresiniz"
          value={email}
          onChange={handleEmailChange}
          className="input-action"
          />
        <div style={{marginTop:"20px"}} >
          <button onClick={handleGonderClick} disabled={mailGeldiMi} className="save-button">
            
            Gönder
          </button>
        </div> 
        </>)
        : 
       <div></div>
        }

      
      </div>
    </div>
  );
};

export default ForgotPassword;


/*
  Mailiniz gelmedi mi? <div style={{ color: "#893694", marginLeft: "10px" }}>{counter} saniye</div>{" "} 
*/