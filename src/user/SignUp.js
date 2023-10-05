import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getToken, setUserSession, setUserInfo } from "../service/AuthService";
import { baseUrl } from '../config/Constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName  || !lastName || !passwordAgain || !password || !phone  || !email) {
      toast.error('Lütfen Tüm Alanları Doldurunuz.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return; 
    }


    if (password !== passwordAgain) {
      toast.error("Parolalar Eşleşmiyor", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      
      return;
    }

    let requestBody = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phone,
      email: email.toLowerCase(),
      password: password
    };
    
    if (birthday.trim() !== "") {
      requestBody.dateOfBirth = birthday;
    }
    if (password.length < 5) {
      toast.error("Şifre minimum 5 karakterden oluşmalıdır.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return; 
    }
    if(phone.length < 11)
    {
      toast.error("Telefon numarası minimum 11 karakterden oluşmalıdır.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
    if (phone.length > 15) {
      toast.error("Telefon numarası en fazla 15 karakterden oluşabilir.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
    
    if (lastName.length < 2) {
      toast.error("Soyad minimum 2 karakterden oluşmalıdır.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return; 
    }
    if (firstName.length < 2) {
      toast.error("Ad minimum 2 karakterden oluşmalıdır.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return; 
    }

    console.log("requestBody",requestBody);
    fetch(baseUrl+"api/auth/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      })
      .then((response) => {
        return response.json().then((data) => {
          if (!response.ok) {
            console.log("datajjjj",data.message);
            toast.error(data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          return;
            
          }
          return data;
        });
      })
      .then((data) => {
        
        toast.success(data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        const updatedUser = {
          firstName: firstName,
          email: email,
        }
        setUserInfo(updatedUser);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        console.log("dataaa",data);
      })
      .catch((error) => {
        console.log("error",error);
       /* toast.error("Lütfen Daha Sonra Tekrar Deneyiniz.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        */
      });
  };

  return (
    <div  style={{ marginTop: "100px" }}>
                      <ToastContainer />

      <h1 style={{ textAlign: "center", fontStyle:"italic" }}>
        Sizi de Aramızda Görmekten Mutlu Oluruz
      </h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", justifyContent: "center",marginTop: "50px"  }}>
         <div style={{ marginRight: "20px"}}> 
          <input
            type="text"
            placeholder="Ad"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input-action"
            style={{ width: "170px"}}
          />
          </div>
          <div>
          <input
            type="text"
            placeholder="Soyad"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input-action"
            style={{ width: "170px"}}
          />
          </div>
        </div>
        <div style={{ display: "block", justifyContent: "center", textAlign:"center" }}>
          <div style={{ marginTop: "20px"}}>
        <input
          type="text"
          placeholder="Telefon Numarası 05xxxxxxxxx"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input-action"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');

            if (e.target.value.length > 15) {
              e.target.value = e.target.value.slice(0, 15);
            }
          }}
        />
        </div>
        <div  style={{ marginTop: "20px"}} >
        <input
          type="email"
          placeholder="E-posta Adresi"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-action"
        />
        </div>
        <div  style={{ marginTop: "20px"}}>
        <input
          type="password"
          placeholder="Parola"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-action"
        />
        </div>
        <div  style={{ marginTop: "20px"}}>
        <input
          type="password"
          placeholder="Parola Tekrar"
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
          className="input-action"
        />
        </div>
        <div  style={{ marginTop: "20px"}}>
        <input
          type="date"
          placeholder="Doğum Tarihi"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="input-action"
        />
        </div>
        <div style={{ marginTop: "20px"}}>
        <button type="submit" className="button-action">Gönder</button>
        </div>


       <div style={{ textAlign: "center" , display:"flex", justifyContent:"center", marginTop:"50px",  marginBottom:"50px"}}>
          <hr style={{ width:"20rem"}} />
          <div style={{ marginLeft:"10px", marginRight:"10px",  fontStyle:"italic", fontWeight:"300"}}>veya</div>
          <hr style={{ width:"20rem"}} />
        </div>
        </div>
        <p style={{ textAlign: "center" , fontStyle:"italic" , fontWeight:"300" }}>Hesabınız var mı?
      <NavLink  style={{ color: "#893694" , textDecoration:"none", fontStyle:"italic", marginLeft:"20px"}} to='/login'>Giriş Yap</NavLink>
      </p> 
      </form>
     
    </div>
  );
};

export default SignUp;
