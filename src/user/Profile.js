import React, { useState, useEffect } from "react";
import WithNavbar from '../WithNavbar'; 
import {getEmail, getToken, getUserInfo, setUserInfo,resetUserSession} from "../service/AuthService";
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../config/Constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Profile = () => {
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [userAddress, setUserAddress] = useState([]);
  const [errorAddressMessage, setErrorAddressMessage] = useState(null);
  const [saveButtonVisibility, setSaveButtonVisibility]= useState(false);

  function enableEditMode() {
    const inputs = document.querySelectorAll('.profile-edit-input-area');
    if(!saveButtonVisibility)
    {
      for (const input of inputs) {
      input.removeAttribute('readonly');
      input.style.border = '1px solid #ccc'; 
    }
    }
    else{
      for (const input of inputs) {
        input.setAttribute('readonly', 'readonly');
        input.style.border = 'none'; 
      }
    }
   
      setSaveButtonVisibility(!saveButtonVisibility);
  }

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


  const updateUser = async () => {
    try {
      
      if (!user.firstName || !user.lastName || !user.phoneNumber) {
        toast.error('Lütfen Tüm Alanları Doldurunuz.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setTimeout(() => {
          window.location.href = '/Profile';
        }, 3000); 
        return; 
      }
      if (user.lastName.length < 2) {
        toast.error("Soyad minimum 2 karakterden oluşmalıdır.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        return; 
      }
      if (user.firstName.length < 2) {
        toast.error("Ad minimum 2 karakterden oluşmalıdır.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        return; 
      }
     
      if (user.phoneNumber.length > 15) {
        toast.error("Telefon numarası en fazla 15 karakterden oluşabilir.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        return;
      }
      
      // Kullanıcı verilerini oluştur
      const userData = {
        ...user, // Kullanıcı nesnesinin tüm alanlarını içeri aktar
        id: userID, // userId değişkeninden gelen id değerini ekle
      };
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      };
  
      // Veriyi gönder ve yanıtı işle
      const response = await fetch(baseUrl + 'api/Auth/UserUpdate', requestOptions);
      const data = await response.json();
      
      if (data.success) {
        // Başarı mesajı göster
        toast.success('Profil Başarıyla Güncellenmiştir', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      
        const inputs = document.querySelectorAll('.profile-edit-input-area');
        for (const input of inputs) {
          input.setAttribute('readonly', 'readonly');
          input.style.border = "none"
        }
        setSaveButtonVisibility(false)
      } else {
        // Başarısız mesajı göster
        toast.error('Profil Güncelleme Başarısız. Lütfen Daha Sonra Deneyiniz.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (error) {
      console.error("Profil güncellerken hata oluştu: ", error);
      toast.error('Lütfen Daha Sonra Deneyiniz.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    
    }
  };
  
  const logoutHandler = () => {
    resetUserSession();
    navigate("/");
  };

    const Address = ({ description, title, corporate, district, quarter, id }) => {
      const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
      const [isAdsressDetailVisible, setIsAdsressDetailVisible] = useState(false);
      const [address, setAddress] = useState({});
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
            if(data.success)
            {
               fetchUserAddress();
            toast.success('Adres Başarıyla Silinmiştir', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            }
            else{
              toast.error(data.message ?? 'Lütfen daha sonra tekrar deneyiniz.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
            }
           
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

      const handleDivClick = async (id) => {
        const requestOptions = {
         
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
         await fetch(baseUrl+`api/UserAddress/GetUserAddressDetailById?id=${id}`,requestOptions)
         .then(response => response.json())
         .then(data => {  
          if(data.success === true){  
            console.log(data.data);  
            setAddress(data.data);
            setIsAdsressDetailVisible(true);
          }
          else{
            toast.error('Lütfen daha sonra tekrar deneyiniz.', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }
        })
        .catch((error) => {
          toast.error('Lütfen daha sonra tekrar deneyiniz.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        });;
      };
      const handleClosePopup = () => {
        setIsAdsressDetailVisible(false);
      };
    
      return (
        <div>
        <div 
        style={styles.card}
       >
          <div style={{ ...styles.cardContent, padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "times" }}>
              <div  onClick={()=>handleDivClick(id)} style={{cursor:"pointer"}}>
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
        {isAdsressDetailVisible && (
        <div className="address-detail-overlay">
          <div className="address-detail-box">
                   <a
                    style={{cursor: "pointer",float:"right",marginTop: "-10px", marginRight: "-4px" }}
                    onClick={handleClosePopup}
                  >
                    <img src={"/images/delete.png"} alt="" width={15} height={15} />
                  </a>
            <p style={{ fontSize: "21px",fontWeight: "bold",marginTop:"25px",fontFamily: "'Times New Roman', Times, serif"}}>{address.addressTitle}</p>
            <p className="address-detail-box-text">{address.nameSurname}</p>
            <p className="address-detail-box-text">{address.phone}</p>
            <p className="address-detail-box-text">{quarter} - {district}/İzmir</p>
            <p className="address-detail-box-text">{address.address}</p>
             {address.corporate && (
              <> 
                 <p className="address-detail-box-text">{address.corparateResponseModel.email}</p>
                 <p className="address-detail-box-text">Firma Adı: {address.corparateResponseModel.companyName}</p>
                 <p className="address-detail-box-text">Vergi No: {address.corparateResponseModel.taxIdentificationNumber}</p>
                 <p className="address-detail-box-text">Vergi Daire: {address.corparateResponseModel.taxOffice}</p>
              </>
             )}
          </div>
        </div>
      )}
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
      boxShadow: "20px 20px 20px rgba(0,0,0,0.25)",
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
  const handleChangePassword = ()=> {
    navigate(`/changepassword`);
  };

  return (
    <div style={{ marginTop: "100px" }}>
              <ToastContainer />

      <h2  style={{ textAlign: "center", fontStyle:"italic",fontFamily:"times"}}>Profilim</h2>
      <div style={{ display: "block", justifyContent: "center",textAlign:"center" }}>
    <div className="profile-card-area">
      <p className="profile-text"><span style={{marginRight:"180px"}}>Adınız:</span>
      <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleInputChange}
                className="profile-edit-input-area"
                readOnly
              />
        </p>
      <hr className="profile-hr" />
      <p className="profile-text"><span style={{marginRight:"160px"}}>Soyadınız:</span>
      <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleInputChange}
                className="profile-edit-input-area"
                readOnly
              />
            </p>
      <hr className="profile-hr" />
      <p className="profile-text"><span style={{marginRight:"98px"}}>Telefon Numaranız: </span>
      <input
      type="text"
      name="phoneNumber"
      value={user.phoneNumber}
      onChange={(e) => {
        const inputValue = e.target.value.replace(/\D/g, ''); // Sadece rakamları korur
        handleInputChange({
          target: {
            name: 'phoneNumber',
            value: inputValue,
          },
        });
      }}
      className="profile-edit-input-area"
      readOnly
      onInput={(e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');

        if (e.target.value.length > 15) {
          e.target.value = e.target.value.slice(0, 15);
        }
      }}
/>
            </p>
      <hr className="profile-hr"  />
      <p className="profile-text"><span style={{marginRight:"120px"}}>Mail Adresiniz: </span> 
  
       <span className="profile-edit-mail-area" style={{color:"#696969"}}>{user.email}  </span>     </p>
       <hr className="profile-hr"  />
      <p className="profile-text"><span style={{marginRight:"165px"}}>Şifreniz: </span> 
  
       <span className="profile-edit-mail-area" style={{color:"#696969"}}> ******  </span> 
       <button className="profile-password" style={{marginLeft:"50px"}} onClick={()=>handleChangePassword()}>Şifreyi Değiştir</button>
    
       </p>
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
      <div style={{float:"right"}}>
       {saveButtonVisibility && <button className="save-button profile-mobile-button" onClick={updateUser}>Kaydet</button>} 
        <button className="profile-save-button profile-mobile-button" id="editButton" onClick={enableEditMode}>Profili Düzenle</button>
        <button className="profile-save-button profile-mobile-button"  onClick={logoutHandler}>Çıkış Yap</button>
      </div>
      {/* <div style={{ display:"flex", flexDirection: "column",marginTop:"20%"}} >
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
     <div> */}
      {/* </div>
      </div>  */}

      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding:"0% 25% 0",marginBottom:"30px",marginTop:"90px" }}>
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
