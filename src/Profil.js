import React, { useState, useEffect } from "react";

const Profil = () => {
  const [adSoyad, setAdSoyad] = useState(""); // Kullanıcının adı soyadı
  const [telefon, setTelefon] = useState(""); // Kullanıcının telefon numarası
  const [eposta, setEposta] = useState(""); // Kullanıcının e-posta adresi
  const [sifre, setSifre] = useState(""); // Kullanıcının şifresi

  // Kullanıcının adı soyadı, telefon numarası, e-posta adresi ve şifresi gibi verileri burada fetch veya başka bir yöntemle getirebilirsiniz
  useEffect(() => {
    // Örnek bir API çağrısı ile kullanıcının profil verilerini getirme
    const fetchProfilVerileri = async () => {
      try {
        // API çağrısını gerçekleştirme
        const response = await fetch("API_URL");
        const data = await response.json();

        // Kullanıcının profil verilerini state'e set etme
        setAdSoyad(data.adSoyad);
        setTelefon(data.telefon);
        setEposta(data.eposta);
        setSifre(data.sifre);
      } catch (error) {
        console.error("Profil verileri getirilirken hata oluştu: ", error);
      }
    };

    fetchProfilVerileri();
  }, []);

  // Şifre değiştirme işlemini gerçekleştiren fonksiyon
  const sifreDegistir = () => {
    // Şifre değiştirme işlemini burada gerçekleştirin, örneğin API çağrısı ile güncel şifreyi gönderme
    // ve güncelleme işlemini başarılı olduğunda state'i güncelleyerek güncel şifreyi gösterme
    // setSifre(yeniSifre);
  };

  return (
    <div>
      <h1>Profilim</h1>
      <p>Adı Soyadı: {adSoyad}</p>
      <p>Telefon: {telefon}</p>
      <p>E-posta: {eposta}</p>
      <p>Şifre: {sifre}</p>
      <button onClick={sifreDegistir}>Şifreyi Değiştir</button>
      <h2>Kayıtlı Adreslerim</h2>
      {/* Kullanıcının kayıtlı adreslerini burada listeleyebilirsiniz */}
    </div>
  );
};

export default Profil;
