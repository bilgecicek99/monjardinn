import React, { useState } from "react";

const Kayitol = () => {
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
      <h1 style={{ textAlign: "center" }}>
        Sizi de Aramızda Görmekten Mutlu Oluruz
      </h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            placeholder="Ad"
            value={adSoyad}
            onChange={(e) => setAdSoyad(e.target.value)}
          />
          <input
            type="text"
            placeholder="Soyad"
            value={adSoyad}
            onChange={(e) => setAdSoyad(e.target.value)}
          />
        </div>
        <input
          type="tel"
          placeholder="Telefon Numarası"
          value={telefon}
          onChange={(e) => setTelefon(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-posta Adresi"
          value={eposta}
          onChange={(e) => setEposta(e.target.value)}
        />
        <input
          type="password"
          placeholder="Parola"
          value={sifre}
          onChange={(e) => setSifre(e.target.value)}
        />
        <input
          type="password"
          placeholder="Parola Tekrar"
          value={sifreTekrar}
          onChange={(e) => setSifreTekrar(e.target.value)}
        />
        <button type="submit">Gönder</button>
      </form>
      <p style={{ textAlign: "center" }}>Hesabınız varsa giriş yapın</p>
    </div>
  );
};

export default Kayitol;
