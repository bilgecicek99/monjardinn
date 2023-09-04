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
  const [oldCorparateValue,setOldCorparateValue] = useState(Boolean);

   const [address, setAddress] = useState({
    country:"Türkiye",
    city:"İzmir",
    secret:false
   });

   const [district, setDistrict] = useState([]);
   const [quarter, setQuarter] = useState([]);
 
   const [selectedDistrict, setSelectedDistrict] = useState('');
   const [selectedQuarter, setSelectedQuarter] = useState('');

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
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

  let token = getToken();
  let userInfo=getUserInfo();


  const handleKaydet = async(event) => {
    event.preventDefault();
    
    const { email, userAddressId,corparateResponseModel,taxIdentificationNumber,taxOffice, adress, ...rest } = address;
    const updatedAddress = {
      ...rest,
      userId: userInfo.userId,
      address: address.address,
      id: address.userAddressId,
      districtId: parseInt(selectedDistrict),
      quarterId: parseInt(selectedQuarter),
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
          if(address.corporate)
          { 
            const requestBody = {
              userId: userInfo.userId,
              taxIdentificationNumber: address?.taxIdentificationNumber,
              taxOffice: address?.taxOffice,
              companyName: address.companyName,
              userAddressId: address.userAddressId,
              email: address.email,
              id: address.corparateResponseModel?.corparateAddressId
            };
            const requestOptions = {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(requestBody)
            };
            if(oldCorparateValue)
            {             
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
            }
            else{
              requestOptions.method = 'POST';
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
            }   
          }
        })
        .catch((error) => {
          setErrorMessage(error.message);
        }).finally(()=>{
          navigate("/profile")
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
              taxOffice: data.data?.corparateResponseModel?.taxOffice,
              companyName: data.data?.corparateResponseModel?.companyName,
              email: data.data?.corparateResponseModel?.email,
              taxIdentificationNumber: data.data?.corparateResponseModel?.taxIdentificationNumber,
            };
            setAddress(updatedAddress);
            setOldCorparateValue(data.data.corporate);
            
            setSelectedDistrict(updatedAddress.districtId);

            fetch(baseUrl+`api/Quarter/GetQuartersByDistrictGroup`).then(districtResponse => districtResponse.json())
            .then(districtData => { 

              const districts= districtData.data;
   
              setDistrict(districts);

              const selectedDistrictObject = districtData.data.find((d) => d.districtId === updatedAddress.districtId);
              setQuarter(selectedDistrictObject?.quarterResponseModels || []);
              setSelectedQuarter(updatedAddress.quarterId);
            });
            
           
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
    const fetchData = async () => {
      //await fetchDistricts(); 
      await fetchAddressDetail(id); 
    };
  
    fetchData();
  }, [id]);

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
    <div style={{ marginTop: "100px" }}>
    <h2  style={{ textAlign: "center", fontStyle:"italic" ,fontFamily:"times"}}>Adres Güncelle</h2>
    <div style={{  justifyContent: "center",marginTop: "20px" }}>
      
          <div >
            <div className="profile-card-area">
            
              <p className="profile-text">Ad Soyad:
              <input
                type="text"
                name="nameSurname"
                value={address.nameSurname}
                onChange={handleInputChange}
                className="edit-input-area"
              />
             </p>
              <hr className="profile-hr" />

              
              <p  className="profile-text">Telefon:
              <input
                type="number"
                name="phone"
                value={address.phone}
              
                onChange={handleInputChange}
                className="edit-input-area"
              />
            </p>
            <hr className="profile-hr" />

            
              <p  className="profile-text">Ülke:
              <input
                type="text"
                name="country"
                value={address.country}             
                onChange={handleInputChange}
                disabled={true}
                className="edit-input-area"
                style={{backgroundColor:"transparent"}}
              /></p>
          
            <hr className="profile-hr" />

             
              <p  className="profile-text">Şehir:
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleInputChange}
                disabled={true}
                className="edit-input-area"
                style={{backgroundColor:"transparent"}}
              /></p>
               <hr className="profile-hr" />        
       

          
              <p  className="profile-text">İlçe:
              <select
                name="districtId"
                value={selectedDistrict}
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
              </select></p>
          
            <hr className="profile-hr" />

           
              <p  className="profile-text">Mahalle:
              <select
                name="quarterId"
                value={selectedQuarter}
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
              </select></p>
           
            <hr className="profile-hr" />
            

            
              <p  className="profile-text">Adres Başlığı:
              <input
                type="text"
                name="addressTitle"
                value={address.addressTitle}
            
                onChange={handleInputChange}
                className="edit-input-area"
              />
           </p>
            <hr/>

          
              <p  className="profile-text">Adres:
              <input
                type="text"
                name="address"
                value={address.address}
            
                onChange={handleInputChange}
                className="edit-input-area"
              /></p>
            
            <hr/>


          
              <p  className="profile-text">
              <input
                type="checkbox"
                name="corporate"
                checked={address.corporate}
                onChange={handleInputChange}
                className="edit-input-area"
                style={{marginRight:"5px"}}
              />
              Kurumsal Adres</p>
            
            <hr className="profile-hr" />
            {address.corporate && (
            <div>

          
              <p  className="profile-text">Vergi Numarası:
              <input
                type="text"
                name="taxIdentificationNumber"
                value={address.taxIdentificationNumber}
              
                onChange={handleInputChange}
                className="edit-input-area"
              /></p>
           
            <hr className="profile-hr" />

         
              <p  className="profile-text">Vergi Dairesi:
              <input
                type="text"
                name="taxOffice"
                value={address.taxOffice}
              
                onChange={handleInputChange}
                className="edit-input-area"
              />
          </p>
            <hr className="profile-hr" />

            
              <p className="profile-text" >Şirket İsmi:
              <input
                type="text"
                name="companyName"
                value={address.companyName}
              
                onChange={handleInputChange}
                className="edit-input-area"
              /></p>
            
            <hr className="profile-hr" />

           
              <p  className="profile-text">Mail Adresi:
              <input
                type="text"
                name="email"
                value={address.email}
              
                onChange={handleInputChange}
                className="edit-input-area"
              /></p>
            
            <hr className="profile-hr" />
          </div>
          )}
            {/* <div >
              <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>Gizli Kalsın:</span>
              <input
                type="checkbox"
                name="secret"
                checked={address.secret}
                onChange={handleInputChange}
                className="edit-input-area"
              />
            </div>

            <hr className="profile-hr" /> */}
                      <button onClick={handleKaydet} className="save-button" style={{ marginTop:"30px", float:"right",marginBottom:"30px"}}>Kaydet</button>

          </div>
          </div>
          {errorMessage && <p className="message">{errorMessage}</p>}

          </div>
  
       <div>
         
     </div>
    
    
    </div>
 


  );

}
export default WithNavbar(EditUserAddress);
