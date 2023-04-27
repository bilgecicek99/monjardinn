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

  const Address = ({ description, title }) => {
    return (
      <div style={styles.card}>
       
        <div style={styles.cardContent}>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </div>
    );
  };
  
  const styles = {
    card: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      background: "white",
      color: "black",
      padding: "20px",
      borderRadius: "12px",
      marginBottom:"50px",
      border:"1px solid #D9D9D9",
      boxShadow: "20px 20px 20px rgba(0,0,0,0.25)"
    },
    cardContent: {
      width: "100%",
      textAlign: "left",
      fontStyle:"italic",
      fontSize:"13px"  
     },
  };
  const cards = [
    {
      description: 'Manavakuyu/İzmir',
      title: "Ev"
    },
    {
      description: 'Manavakuyu/İzmir',
      title: "İş"
    },
    {
      description: 'Manavakuyu/İzmir',
      title: "Ofis"
    }
  ];

  return (
    <div style={{ margin: "100px" }}>
      <h1  style={{ textAlign: "center", fontStyle:"italic" }}>Profilim</h1>
      <div style={{ display: "block", justifyContent: "center",marginTop: "50px",textAlign:"center" }}>

      <p className="profile-text">Adı Soyadı: {adSoyad}</p>
      <hr className="profile-hr" />
      <p className="profile-text">Telefon: {telefon}</p>
      <hr className="profile-hr"  />
      <p className="profile-text">E-posta: {eposta}</p>
      <hr className="profile-hr" />
      <div style={{ display:"flex", textAlign:"center", justifyContent:"center"}} >
     <div> <p className="profile-text-password">Şifre: {sifre}</p></div>
     <div> <button className="profile-password"  onClick={sifreDegistir}>Şifreyi Değiştir</button></div>
      </div>
      <hr className="profile-hr" />
      <h2  style={{ textAlign: "center", fontStyle:"italic" }}>Kayıtlı Adreslerim</h2>
     
      <div  className="profile-card-area" >
    <div className="card" style={{ border:"none"}}>
      {cards.map((card) => (
        <Address
          key={card.title}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  </div>
    </div>
    </div>
  );
};

export default Profil;
