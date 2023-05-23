import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getToken, setUserSession,setUserDetail } from "./service/AuthService";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (password !== passwordAgain) {
      setErrorMessage("Parolalar eşleşmiyor");
      return;
    }

    let requestBody = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phone,
      email: email,
      password: password
    };
    
    if (birthday.trim() !== "") {
      requestBody.dateOfBirth = birthday;
    }
    if (password.length < 5) {
      setErrorMessage("Şifre minimum 5 karakterden oluşmalıdır.");
      return; 
    }
    
    if (lastName.length < 2) {
      setErrorMessage("Soyad minimum 2 karakterden oluşmalıdır.");
      return; 
    }
    if (firstName.length < 2) {
      setErrorMessage("Ad minimum 2 karakterden oluşmalıdır.");
      return; 
    }

    console.log("requestBody",requestBody);
    fetch("https://api.monjardin.online/api/auth/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      })
      .then((response) => {
        return response.json().then((data) => {
          if (!response.ok) {
            console.log("datajjjj",data.Message);
            const errorMessage = data.Message || "Bilinmeyen bir hata oluştu";
            throw new Error(errorMessage);
          }
          return data;
        });
      })
      .then((data) => {
        setErrorMessage(data.message);
        const updatedUser = {
          firstName: firstName,
          email: email,
        }
        setUserDetail(updatedUser);
        navigate('/login');
        console.log("dataaa",data);
      })
      .catch((error) => {
        console.log("error",error);
        setErrorMessage(error.message);
        console.error("Hata:", error);
      });
  };

  return (
    <div  style={{ margin: "100px" }}>
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
            style={{ width: "200px"}}
          />
          </div>
          <div>
          <input
            type="text"
            placeholder="Soyad"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input-action"
            style={{ width: "200px"}}
          />
          </div>
        </div>
        <div style={{ display: "block", justifyContent: "center", textAlign:"center" }}>
          <div style={{ marginTop: "20px"}}>
        <input
          type="tel"
          placeholder="Telefon Numarası"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input-action"
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
        <div style={{ marginTop: "20px", position:"relative", left:"130px"}}>
        <button type="submit" className="button-action">Gönder</button>
        </div>

      {errorMessage && <p className="message">{errorMessage}</p>}

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
