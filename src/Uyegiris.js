import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

const Uyegiris = () => {
  // Define state variables using useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your logic for form submission
    console.log("Form submitted with email:", email, "and password:", password);
  };

  return (
    <div  style={{ margin: "100px" }}>
      <h1 style={{ textAlign: "center", fontStyle:"italic" }}>Hoşgeldiniz</h1>
      <form onSubmit={handleSubmit}>
          <div style={{ display: "block", justifyContent: "center",marginTop: "50px",textAlign:"center"  }}>
        <div >
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={handleEmailChange}
            className="input-action"
          />
        </div>
        <div style={{ marginTop: "20px", marginBottom:"20px"}}>  
          <input
            type="password"
            placeholder="Parola"
            value={password}
            onChange={handlePasswordChange}
            className="input-action"
          />
        </div>
        <div>
      <NavLink  style={{ color: "#893694" , textDecoration:"none", fontStyle:"italic", marginRight:"290px"}} to='/Yeniparola'>Parolamı Unuttum</NavLink>
      </div>
      <div style={{ position:"relative", left:"130px"}}>
        <button type="submit"  className="button-action">Gönder</button>
        </div>
        </div>
        <div style={{ textAlign: "center" , display:"flex", justifyContent:"center", marginTop:"50px",  marginBottom:"50px"}}>
          <hr style={{ width:"20rem"}} />
          <div style={{ marginLeft:"10px", marginRight:"10px",  fontStyle:"italic", fontWeight:"300"}}>veya</div>
          <hr style={{ width:"20rem"}} />
        </div>
        <p style={{ textAlign: "center" , fontStyle:"italic" , fontWeight:"300" }}>Hesabın yok mu?
      <NavLink  style={{ color: "#893694" , textDecoration:"none", fontStyle:"italic", marginLeft:"20px"}} to='/Kayitol'>Kayıt Ol</NavLink>
      </p>
      </form>
    
     
      
    </div>
  );
};

export default Uyegiris;
