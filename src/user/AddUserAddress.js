import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { getUser,getToken,resetUserSession,getUserInfo } from "../service/AuthService";
import WithNavbar from '../WithNavbar'; 
import { baseUrl } from '../config/Constants';

const AddUserAddress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState(null);

   const [address, setAddress] = useState({
    corporate: false,
    secret: false,
    country:"Türkiye",
    city:"İzmir"
    // Diğer giriş alanları ve varsayılan değerleri
  });

  const [district, setDistrict] = useState([]);
  const [quarter, setQuarter] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState('');

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    // String değerleri boolean değere dönüştürme
    const processedValue = type === 'checkbox' ? checked : value;
  
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: processedValue,
    }));
  };

  const fetchDistricts = async () => {
    try {
      const response = await fetch(baseUrl+`api/Quarter/GetQuartersByDistrictGroup`);
      if (!response.ok) {
        throw new Error('Bölgeler listesi getirilemedi.');
      }
      const data = await response.json();
    
      const districtData= data.data;
   
      setDistrict(districtData);
     
    } catch (error) {
      
      console.error("Bölgeler getirlirken hatayla karşılaşıldı.");
    }
};

  useEffect(() => {

    fetchDistricts();
  }, []);

  let token = getToken();
  let userInfo=getUserInfo();

  const handleKaydet = async(event) => {
      event.preventDefault();
      const updatedAddress = {
        ...address,
        userId: userInfo.userId,
        districtId:parseInt(selectedDistrict),
        quarterId:parseInt(selectedQuarter)
      };
      const requiredFields = ['nameSurname', 'phone', 'city', 'country', 'districtId','quarterId','address','addressTitle','corporate'];
      const isEmptyField = requiredFields.some((field) => {
        const value = updatedAddress[field];
         console.log(field,value)
        return value === undefined || value === null || value === "" ||(typeof value === 'number' && isNaN(value)) ;
      });
        
      if (isEmptyField) {
        console.log(updatedAddress);
        alert('Lütfen Tüm Alanları Doldurunuz.');
      } else {
  
      fetch(baseUrl+"api/UserAddress/CreateUserAddress", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAddress),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data",data);
          setErrorMessage(data.message);
        
         const requestBody = {
          userId: userInfo.userId,
          taxIdentificationNumber: address.taxIdentificationNumber,
          taxOffice: address.taxOffice,
          companyName: address.companyName,
          userAddressId: data.data,
          email: address.email,

        };
     
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(requestBody)
        };
        
        fetch(baseUrl+`api/CorparateAddress/CreateCorparateAddress`, requestOptions)
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
      }
     
    };

    const handleSelectDistrictChange = (event) => {
      const selectedDistrict = event.target.value;
      setSelectedDistrict(selectedDistrict);
        if(parseInt(selectedDistrict)>0)
        {
          const selectedDistrictObject = district.find((district) => district.districtId === parseInt(selectedDistrict));
          setQuarter(selectedDistrictObject.quarterResponseModels);
          setSelectedQuarter('');
        }
         else{
          setSelectedQuarter('');
          setQuarter([]);
        }
      };
      const handleSelectQuarterChange = (event) => {
      const selectedQuarter = event.target.value;
      setSelectedQuarter(selectedQuarter);
    };
  return(
    <div style={{ margin: "100px" }}>
    <h1  style={{ textAlign: "center", fontStyle:"italic" }}>Adres Ekle</h1>
    <div style={{ display: "flex", justifyContent: "center",marginTop: "50px" }}>
          <div >
            <div style={{ display:"block" }}>
            <div> 
              <span style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Ad Soyad:</span>
              <input
                type="text"
                name="nameSurname"
                value={address.name}
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
              <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>Ülke:</span>
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleInputChange}
                className="edit-input-area"
                disabled={true}
                style={{backgroundColor:"transparent"}}
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
                disabled={true}
                style={{backgroundColor:"transparent"}}
              /></div>
               <hr className="profile-hr" />        

            

            <div>
              <span style={{fontStyle: "italic", fontFamily: "Times New Roman"}}>İlçe:</span>
              <select
                name="districtId"
                value={address.districtId}
                onChange={handleSelectDistrictChange}
                className="edit-input-area"
                style={{ paddingLeft: "8px" }}
              >
                 <option value="">İlçe Seçin</option>
                  {district.length === 0 ? (
                    <option disabled>İçe bulunamadı.</option>
                  ) : (
                    district.map(d => (
                      <option key={d.districtId} value={d.districtId}>
                        {d.districtName}
                      </option>
                    ))
                  )}
              </select>
              <hr className="profile-hr" />
            </div>
  

            <div>
              <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>Mahalle:</span>
              <select
                name="quarterId"
                value={address.quarterId}
                onChange={handleSelectQuarterChange}
                className="edit-input-area"
                style={{paddingLeft:"8px"}}
              >
                 <option value="">Mahalle Seçin</option>
                  {quarter.length === 0 ? (
                    <option disabled>Mahalle bulunamadı.</option>
                  ) : (
                    quarter.map(q => (
                      <option key={q.id} value={q.id}>
                        {q.name}
                      </option>
                    ))
                  )}
              </select>
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
              <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>Şirket Adı:</span>
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
              <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>Email:</span>
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
           
          
          </div>
          <button onClick={handleKaydet} className="save-button" style={{ marginTop:"30px", float:"right"}}>Yeni Adres Ekle</button>
          </div>
          {errorMessage && <p className="message">{errorMessage}</p>}

          </div>
  
       <div>
         
     </div>
    
    
    </div>
 


  );

 
}
export default WithNavbar(AddUserAddress);


/*
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
*/