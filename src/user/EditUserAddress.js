import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { getUser,getToken,resetUserSession,getUserInfo } from "../service/AuthService";
import WithNavbar from '../WithNavbar'; 
import { baseUrl } from '../config/Constants';

const EditUserAddress = () => {
  const navigate = useNavigate();
  const location = useLocation();
 const id = location.state && location.state.id ? location.state.id : {};

  const [errorMessage, setErrorMessage] = useState(null);

   const [address, setAddress] = useState({});

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const processedValue = type === 'checkbox' ? checked : value;
  
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: processedValue,
    }));
  };
  
  

  useEffect(() => {
    
  }, []);

  let token = getToken();
  let userInfo=getUserInfo();


  const handleKaydet = async(event) => {
      event.preventDefault();
    
    const { email, userAddressId,corparateResponseModel,taxIdentificationNumber,taxOffice, adress, ...rest } = address;
    const updatedAddress = {
      ...rest,
      userId: userInfo.userId,
      address: address.adress,
      id: address.userAddressId,
    
    };

  
      fetch(baseUrl+"api/UserAddress/UpdateUserAddress", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAddress),
      })
        .then((response) => response.json())
        .then((data) => {
          setErrorMessage(data.message);
        
         const requestBody = {
          userId: userInfo.userId,
          taxIdentificationNumber: address.taxIdentificationNumber,
          taxOffice: address.taxOffice,
          companyName: address.companyName,
          userAddressId: address.userAddressId,
          email: address.email,
          id: address.corparateResponseModel.corparateAddressId
        };
     
        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(requestBody)
        };
        
        fetch(baseUrl+`api/CorparateAddress/UpdateCorparateAddress`, requestOptions)
          .then(response => response.json())
          .then(data => {
            setErrorMessage(data.message);
              alert("Değişiklikler başarıyla kaydedilmiştir.")
              navigate("/profile")
          })
          .catch(error => {
            console.error(error);
            setErrorMessage(error.message);
          });
         

        })

       
        .catch((error) => {
          setErrorMessage(error.message);
        });
      
     
    };

    const fetchAddressDetail = async (id) => {
      try {
        const requestOptions = {
         
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
         await fetch(baseUrl+`api/UserAddress/GetUserAddressDetailById?id=${id}`,requestOptions)
         .then(response => response.json())
         .then(data => {  
          console.log("data",data) 
          if(data.success === false){
         
            setAddress({
              taxOffice: null,
              companyName: null,
              email: null,
              taxIdentificationNumber: null,
            });

          }
          else{
            const updatedAddress = {
              ...data.data,
              taxOffice: data.data.corparateResponseModel.taxOffice,
              companyName: data.data.corparateResponseModel.companyName,
              email: data.data.corparateResponseModel.email,
              taxIdentificationNumber: data.data.corparateResponseModel.taxIdentificationNumber,
  
            };
            setAddress(updatedAddress);
          }
         

         })
         .catch(error => {
           console.error(error);
           setErrorMessage(error.message);
         });      
    }
    catch (error) {
      setErrorMessage(error);
    }

  };
 
    useEffect(() => {
      fetchAddressDetail(id);
    }, [id]);



  return(
    <div style={{ margin: "100px" }}>
    <h1  style={{ textAlign: "center", fontStyle:"italic" }}>Adres Güncelle</h1>
    <div style={{ display: "flex", justifyContent: "center",marginTop: "50px" }}>
      
          <div >
            <div style={{ display:"block" }}>
            <div> 
              <span style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Ad Soyad:</span>
              <input
                type="text"
                name="nameSurname"
                value={address.nameSurname}
                onChange={handleInputChange}
                className="edit-input-area"
              />
              </div>
              <hr className="profile-hr" />

              <div >
              <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>Telefon:</span>
              <input
                type="number"
                name="phone"
                value={address.phone}
              
                onChange={handleInputChange}
                className="edit-input-area"
              />
            </div>
            <hr className="profile-hr" />
            

              <div >
              <span style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Şehir:</span>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleInputChange}
                className="edit-input-area"
              /></div>
               <hr className="profile-hr" />        
    
              <div >
              <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>Ülke:</span>
              <input
                type="text"
                name="country"
                value={address.country}
              
                onChange={handleInputChange}
                className="edit-input-area"
              />
            </div>
            <hr className="profile-hr" />
            

            <div >
              <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>Semt:</span>
              <input
                type="text"
                name="district"
                value={address.district}
           
                onChange={handleInputChange}
                className="edit-input-area"
              />
            </div>
            <hr className="profile-hr" />
            


            <div>
              <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>Bölge:</span>
              <input
                type="text"
                name="quarter"
                value={address.quarter}
            
                onChange={handleInputChange}
                className="edit-input-area"
              />
            </div>
            <hr className="profile-hr" />
            


            <div>
              <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>Adres:</span>
              <input
                type="text"
                name="address"
                value={address.address}
              
                onChange={handleInputChange}
                className="edit-input-area"
              />
            </div>
            <hr className="profile-hr" />
            


            <div>
              <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>Adres Başlığı:</span>
              <input
                type="text"
                name="addressTitle"
                value={address.addressTitle}
            
                onChange={handleInputChange}
                className="edit-input-area"
              />
            </div>
            <hr/>
            <div >
              <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>Kurumsal Adres:</span>
              <input
                type="checkbox"
                name="corporate"
                checked={address.corporate}
                onChange={handleInputChange}
                className="edit-input-area"
              />
            </div>
            <hr className="profile-hr" />
            {address.corporate && (
            <div>

            <div>
              <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>taxIdentificationNumber:</span>
              <input
                type="text"
                name="taxIdentificationNumber"
                value={address.taxIdentificationNumber}
              
                onChange={handleInputChange}
                className="edit-input-area"
              />
            </div>
            <hr className="profile-hr" />

            <div>
              <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>taxOffice:</span>
              <input
                type="text"
                name="taxOffice"
                value={address.taxOffice}
              
                onChange={handleInputChange}
                className="edit-input-area"
              />
            </div>
            <hr className="profile-hr" />

            <div>
              <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>companyName:</span>
              <input
                type="text"
                name="companyName"
                value={address.companyName}
              
                onChange={handleInputChange}
                className="edit-input-area"
              />
            </div>
            <hr className="profile-hr" />

            <div>
              <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>email:</span>
              <input
                type="text"
                name="email"
                value={address.email}
              
                onChange={handleInputChange}
                className="edit-input-area"
              />
            </div>
            <hr className="profile-hr" />
          </div>
          )}
            <div >
              <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>Gizli Kalsın:</span>
              <input
                type="checkbox"
                name="secret"
                checked={address.secret}
                onChange={handleInputChange}
                className="edit-input-area"
              />
            </div>
            <hr className="profile-hr" />
          </div>
          <button onClick={handleKaydet} className="save-button" style={{ marginTop:"30px", float:"right"}}>Kaydet</button>
          </div>
          {errorMessage && <p className="message">{errorMessage}</p>}

          </div>
  
       <div>
         
     </div>
    
    
    </div>
 


  );

 
}
export default WithNavbar(EditUserAddress);
