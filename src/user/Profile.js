import React, { useState, useEffect } from "react";
import WithNavbar from '../WithNavbar'; 
import {getEmail, getToken, getUserInfo, setUserInfo} from "../service/AuthService";
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../config/Constants';

const Profile = () => {
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [userAddress, setUserAddress] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [errorAddressMessage, setErrorAddressMessage] = useState(null);


  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
    password:''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handlePasswordChangeNew = (event) => {
    setNewPassword(event.target.value);
  };

  const handlePasswordChangeOld = (event) => {
    setOldPassword(event.target.value);
  }; 
  const navigate = useNavigate();
  let userInfo= getUserInfo();
  let userID= userInfo?.userId;
  let email= getEmail();
  let token= getToken();
  
   const fetchUserAddress = async () => {
      try {  
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        
       await fetch(baseUrl+`api/UserAddress/GetAllUserAddressByUserId/?userId=${userID}`,requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.data.length === 0) {
            setErrorAddressMessage("Kayıtlı adres bulunamamıştır.");

          } else {
            setUserAddress(data.data);
          }
       
        })
        .catch(error => {
          // Hata durumunda burada hata işleme yapabilirsiniz
          console.error(error);
        });
      } catch (error) {
        console.error("Adres verileri getirilirken hata oluştu: ", error);
      }
  };
  useEffect(() => {
   
    if (!token) {
     navigate('/login'); 
      return;
    }

    const fetchProfilVerileri = async () => {
      try {  
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        
       await fetch(baseUrl+`api/User/UserProfile/${email}`,requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data && data.data) {
          const { firstname, lastName, phoneNumber, email, dateOfBirth } = data.data;
          const updatedUser = {
            firstName: firstname,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            dateOfBirth: dateOfBirth
          }
          localStorage.setItem('UserAllInfo', JSON.stringify(updatedUser));

          console.log("uppp",updatedUser);
          setUser(updatedUser);
        } else {
          console.error('Profil verileri alınamadı');
        }
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
    fetchUserAddress();
  }, []);


  const updatePassword = async() => {
  try {
    if (!oldPassword || !newPassword) {
     
      alert('Lütfen mevcut şifre ve yeni şifre alanlarını doldurunuz.');
      return;
    }
    
    
    const requestBody = {
      userId: userInfo.userId,
      newPassword: newPassword,
      oldPassword: oldPassword
    };
 
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    };
    
    await fetch(baseUrl+`api/Auth/PasswordUpdate`, requestOptions)
      .then(response => response.json())
      .then(data => {
        setErrorMessage(data.message);
      })
      .catch(error => {
        // Hata durumunda burada hata işleme yapabilirsiniz
        console.error(error);
        setErrorMessage(error.message);
      });
    
  } catch (error) {
    console.error("Profil verileri getirilirken hata oluştu: ", error);
  }
  };

  const updateUser = async() => {
    try {
      
      const userData = {
        ...user, // user nesnesinin tüm alanlarını içeri aktar
        id: userID // userId değişkeninden gelen id değerini ekle
      };
      
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      };
      
      await fetch(baseUrl+`api/Auth/UserUpdate`, requestOptions)
        .then(response => response.json())
        .then(data => {
          //setErrorMessage(data.message);
          alert(data.message)
        })
        .catch(error => {
          console.error(error);
          setErrorMessage(error.message);
        });
      
    } catch (error) {
      console.error("Profil güncellerken hata oluştu: ", error);
    }
    };
   

    const Address = ({ description, title, corporate, district, quarter, id }) => {
      const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
    
      const handleDelete = async () => {
        // Silme işlemi burada yapılacak
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: 'DELETE',
        };
    
        await fetch(baseUrl + `api/UserAddress/DeleteUserAddress?id=${id}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            fetchUserAddress();
            alert(data.message);
          })
          .catch((error) => {
            // Hata durumunda burada hata işleme yapabilirsiniz
            console.error(error);
          });
    
        // Silme işlemi tamamlandığında onay kutusunu gizle
        setIsDeleteConfirmationVisible(false);
      };
    
      const handleEdit = (id) => {
        navigate(`/editaddres/${id}`, { state: { id } });
      };
    
      return (
        <div style={styles.card}>
          <div style={{ ...styles.cardContent, padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "times" }}>
              <div>
                <h4 style={{ fontStyle: "normal", fontWeight: "bold" }}>{title}</h4>
                <p style={{ color: "#6F6D6D", fontSize: "18px", fontStyle: "italic" }}>{quarter} - {district}/İzmir</p>
              </div>
              <div style={{ display: "flex" }}>
                <a style={{ margin: "0 20px", cursor: "pointer" }} onClick={() => handleEdit(id)}>
                  <img src={"/images/addressedit.png"} alt="" width={18} height={18} />
                </a>
    
                <div>
                  <a
                    style={{ margin: "0 3px", cursor: "pointer" }}
                    onClick={() => setIsDeleteConfirmationVisible(true)} // Silme onay kutusunu göster
                  >
                    <img src={"/images/delete.png"} alt="" width={13} height={13} />
                  </a>
    
                 
                  {isDeleteConfirmationVisible && (
                    <div className="delete-confirmation-overlay">
                      <div className="delete-confirmation-box">
                        <p>Silmek istediğinize emin misiniz?</p>
                        <button onClick={handleDelete}>Evet</button>
                        <button onClick={() => setIsDeleteConfirmationVisible(false)}>Hayır</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
      //padding: "20px",
      borderRadius: "12px",
      marginBottom:"30px",
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
  
  const handleAddAddress = (userInfo) => {
    navigate("/addaddress");
  }


  return (
    <div style={{ marginTop: "100px" }}>
      <h2  style={{ textAlign: "center", fontStyle:"italic",fontFamily:"times"}}>Profilim</h2>
      <div style={{ display: "block", justifyContent: "center",textAlign:"center" }}>
    <div className="profile-card-area">
      <p className="profile-text">Adı: 
      <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleInputChange}
                className="edit-input-area"
              />
        </p>
      <hr className="profile-hr" />
      <p className="profile-text">Soyadı: 
      <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleInputChange}
                className="edit-input-area"
              />
            </p>
      <hr className="profile-hr" />
      <p className="profile-text">Telefon: 
      <input
                type="number"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleInputChange}
                className="edit-input-area"
              />
            </p>
      <hr className="profile-hr"  />
      <p className="profile-text">E-posta:  
  
       <span className="edit-input-area">{user.email}  </span>     </p>
      {/* 
      <hr className="profile-hr" />
      <p className="profile-text">Doğum Tarihi:
      <span className="edit-input-area">{user.dateOfBirth}  </span>     </p>
  */}
      {/* <input
                type="text"
                name="dateOfBirth"
                value={user.dateOfBirth}
                onChange={handleInputChange}
                className="edit-input-area"
                disabled={true}
              /> */}
      <hr className="profile-hr" />
      <button className="save-button" onClick={updateUser}>Kaydet</button>
      <div style={{ display:"flex", flexDirection: "column",marginTop:"3%"}} >
     <div> <p className="profile-text"> Mevcut Şifre: <input
          type="text"
          value={oldPassword}
          onChange={handlePasswordChangeOld}
          className="password-input"
          placeholder="Mevcut Şifre"
        /></p>
      </div>
      <div> 
        <p className="profile-text"> Yeni Şifre:
         <input
         style={{marginLeft:"20px"}}
          type="text"
          value={newPassword}
          onChange={handlePasswordChangeNew}
          className="password-input"
          placeholder="Yeni Şifre"
        /></p>
      </div>
     <div> 
      <button className="profile-password" onClick={updatePassword}>Şifreyi Değiştir</button>
      </div>
      </div>
      {errorMessage && <p className="message">{errorMessage}</p>}

      <hr className="profile-hr" />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding:"0% 25% 0",marginBottom:"30px" }}>
        <h3 style={{ textAlign: "left", fontStyle: "italic", margin: 0,  fontFamily:"times",fontWeight:"bold" }}>Kayıtlı Adreslerim</h3>
        <a
          style={{ margin: "0 3px", color: "#893694", fontStyle: "italic", textAlign: "right", cursor: "pointer", fontFamily:"times", fontSize:"18px" }}
          onClick={() => handleAddAddress()}
        >
          Adres Ekle
        </a>
      </div>
      {errorAddressMessage && <p className="message">{errorAddressMessage}</p>}
      <div  className="profile-card-area" >
    <div className="card" style={{ border:"none"}}>
      {userAddress.map((card) => (
        <Address
          key={card.userAddressId}
          id={card.userAddressId}
          title={card.addressTitle}
          district={card.districtName}
          quarter={card.quarterName}
        />
      ))}
    </div>
  </div>
    </div>
    </div>
  );
};

export default WithNavbar(Profile);
