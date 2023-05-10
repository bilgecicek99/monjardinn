import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

const SignUp = () => {
  const [adSoyad, setAdSoyad] = useState("");
  const [telefon, setTelefon] = useState("");
  const [eposta, setEposta] = useState("");
  const [sifre, setSifre] = useState("");
  const [sifreTekrar, setSifreTekrar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kayıt formunu gönderme işlemleri burada gerçekleştirilir
    // Örneğin, bir API çağrısı yapabilir veya form verilerini başka bir yere gönderebilirsiniz
    console.log("Form gönderildi!");
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
            value={adSoyad}
            onChange={(e) => setAdSoyad(e.target.value)}
            className="input-action"
            style={{ width: "200px"}}
          />
          </div>
          <div>
          <input
            type="text"
            placeholder="Soyad"
            value={adSoyad}
            onChange={(e) => setAdSoyad(e.target.value)}
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
          value={telefon}
          onChange={(e) => setTelefon(e.target.value)}
          className="input-action"
        />
        </div>
        <div  style={{ marginTop: "20px"}} >
        <input
          type="email"
          placeholder="E-posta Adresi"
          value={eposta}
          onChange={(e) => setEposta(e.target.value)}
          className="input-action"
        />
        </div>
        <div  style={{ marginTop: "20px"}}>
        <input
          type="password"
          placeholder="Parola"
          value={sifre}
          onChange={(e) => setSifre(e.target.value)}
          className="input-action"
        />
        </div>
        <div  style={{ marginTop: "20px"}}>
        <input
          type="password"
          placeholder="Parola Tekrar"
          value={sifreTekrar}
          onChange={(e) => setSifreTekrar(e.target.value)}
          className="input-action"
        />
        </div>
        <div style={{ marginTop: "20px", position:"relative", left:"130px"}}>
        <button type="submit" className="button-action">Gönder</button>
        </div>
       <div style={{ textAlign: "center" , display:"flex", justifyContent:"center", marginTop:"50px",  marginBottom:"50px"}}>
          <hr style={{ width:"20rem"}} />
          <div style={{ marginLeft:"10px", marginRight:"10px",  fontStyle:"italic", fontWeight:"300"}}>veya</div>
          <hr style={{ width:"20rem"}} />
        </div>
        </div>
        <p style={{ textAlign: "center" , fontStyle:"italic" , fontWeight:"300" }}>Hesabınız var mı?
      <NavLink  style={{ color: "#893694" , textDecoration:"none", fontStyle:"italic", marginLeft:"20px"}} to='/Uyegiris'>Giriş Yap</NavLink>
      </p> 
      </form>
     
    </div>
  );
};

export default SignUp;
