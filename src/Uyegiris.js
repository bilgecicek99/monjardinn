import React, { useState } from "react";

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
      <h1>Hoşgeldiniz</h1>
      <form onSubmit={handleSubmit}>
        <label>
          E-posta Adresiniz:
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label>
          Parolanız:
          <input
            type="password"
            placeholder="Parola"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">Gönder</button>
      </form>
      <div>
        <button>Parolamı Unuttum</button>
      </div>
      <hr />
      <div>
        Hesabınız yok mu? <a href="#">Kaydol</a>
      </div>
    </div>
  );
};

export default Uyegiris;
