import React, { useState, useEffect } from "react";

const Yeniparola = () => {
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
    <div>
      <h1>Yeni Parolanız Bir Mail Uzaklıkta</h1>
      <input
        type="email"
        placeholder="E-posta adresiniz"
        value={email}
        onChange={handleEmailChange}
      />
      {mailGeldiMi ? (
        <p>Mailiniz gelmedi mi?</p>
      ) : (
        <p>Mailiniz geldi mi? Sayaç: {counter} saniye</p>
      )}
      <button onClick={handleGonderClick} disabled={mailGeldiMi}>
        Gönder
      </button>
    </div>
  );
};

export default Yeniparola;
