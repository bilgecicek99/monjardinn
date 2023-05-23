import React, { useState, useEffect } from "react";
import WithNavbar from './WithNavbar'; 
import {getEmail, getToken, setUserDetail} from "./service/AuthService";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
 
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
    password:''
  });

  const navigate = useNavigate();

  useEffect(() => {
    let email= getEmail();
    console.log("x",email);
    let token= getToken();
    console.log("token",token);
    if (!token) {
      // Token yok, login sayfasına yönlendirme yapabilirsiniz
      navigate('/login'); // Gerekli yönlendirme adresini buraya yazın
      return;
    }
  
    // Örnek bir API çağrısı ile kullanıcının profil verilerini getirme
    const fetchProfilVerileri = async () => {
      try {
        // API çağrısını gerçekleştirme
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        
       await fetch(`https://api.monjardin.online/api/User/UserProfile/${email}`,requestOptions)
        .then(response => response.json())
        .then(data => {
          const { firstname, lastName, phoneNumber, email, dateOfBirth } = data.data;
          const updatedUser = {
            firstName: firstname,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            dateOfBirth: dateOfBirth
          }
          setUser(updatedUser);
          setUserDetail(updatedUser);
        })
        .catch(error => {
          // Hata durumunda burada hata işleme yapabilirsiniz
          console.error(error);
        });
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
    <div className="profile-card-area">
      <p className="profile-text">Adı: {user.firstName}</p>
      <hr className="profile-hr" />
      <p className="profile-text">Soyadı: {user.lastName}</p>
      <hr className="profile-hr" />
      <p className="profile-text">Telefon: {user.phone}</p>
      <hr className="profile-hr"  />
      <p className="profile-text">E-posta: {user.email}</p>
      <hr className="profile-hr" />
      <p className="profile-text">Doğum Tarihi {user.birthday}</p>
      <hr className="profile-hr" />
      <div style={{ display:"flex", textAlign:"center"}} >
     <div> <p className="profile-text">Şifre: {user.password}</p></div>
     <div> <button className="profile-password"  onClick={sifreDegistir}>Şifreyi Değiştir</button></div>
      </div>
      <hr className="profile-hr" />
      </div>
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

export default WithNavbar(Profile);
