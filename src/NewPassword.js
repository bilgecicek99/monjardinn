import React, { useState, useEffect } from "react";

const NewPassword = () => {
  const [email, setEmail] = useState(""); // State for email address
  const [mailGeldiMi, setMailGeldiMi] = useState(false); // State for tracking if mail is received
  const [counter, setCounter] = useState(60); // State for timer counter

  useEffect(() => {
    let timer;
    if (counter > 0 && !mailGeldiMi) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [counter, mailGeldiMi]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGonderClick = () => {
    // Send email logic here
    // Once email is sent, set mailGeldiMi to true
    setMailGeldiMi(true);
  };

  return (
    <div  style={{ margin: "100px" }}>
      <h1 style={{ textAlign: "center", fontStyle:"italic" }}>Yeni Parolanız Bir Mail Uzaklıkta</h1>
      <div style={{justifyContent: "center",marginTop: "50px",textAlign:"center"  }}>

      <input
        type="email"
        placeholder="E-posta adresiniz"
        value={email}
        onChange={handleEmailChange}
        className="input-action"
      />
      
      {mailGeldiMi ? (
        <p style={{ marginTop: "20px",fontStyle:"italic"}}>Mailiniz gelmedi mi?</p>
      ) : (
        <p style={{ marginTop: "20px",fontStyle:"italic", display:"flex",justifyContent: "center"}}>Mailiniz geldi mi? <div style={{ color:"#893694" ,marginLeft:"10px"}}>{counter} saniye </div> </p>
      )}
         <div style={{ position:"relative", left:"130px"}}>
      <button onClick={handleGonderClick} disabled={mailGeldiMi} className="button-action">
        Gönder
      </button>
      </div>
      </div>
    </div>
  );
};

export default NewPassword;
