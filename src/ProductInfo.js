import React, { useState, useEffect } from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { baseUrl } from './config/Constants';
import { Navigate, useParams } from 'react-router-dom';
import WithNavbar from './WithNavbar'; 
import "./App.css";
import { getEmail, getToken, getUserInfo} from "./service/AuthService";
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const FlowerRating = (props) => {
  const puan = props.puan;

  const roundedPuan = (() => {
    if (puan <= 1.2) {
      return 1;
    } else if (puan <= 1.7) {
      return 1.5;
    } else if (puan <= 2.2) {
      return 2;
    } else if (puan <= 2.7) {
      return 2.5;
    } else if (puan <= 3.2) {
      return 3;
    } else if (puan <= 3.7) {
      return 3.5;
    } else if (puan <= 4.2) {
      return 4;
    } else if (puan <= 4.7) {
      return 4.5;
    } else {
      return 5;
    }
  })();
  const fullFlowerCount = Math.floor(roundedPuan);
  const halfFlowerCount = roundedPuan - fullFlowerCount === 0.5 ? 1 : 0;
  const emptyFlowerCount = 5-(fullFlowerCount+halfFlowerCount);
  console.log(emptyFlowerCount);
  return (
    <div>     
      {Array.from({ length: fullFlowerCount }, (_, index) => (
        <img
          key={`fullFlower-${index}`}
          src="/images/fullflowericon.png"
          alt="Dolu Çiçek İkonu"
          width={30}
          height={30}
        />
      ))}
      {Array.from({ length: halfFlowerCount }, (_, index) => (
        <img
          key={`halfFlower-${index}`}
          src="/images/halfflower.png"
          alt="Yarım Çiçek İkonu"
          width={30}
          height={30}
        />
      ))}
      {Array.from({ length: emptyFlowerCount }, (_, index) => (
        <img
          key={`emptyFlower-${index}`}
          src="/images/emptyflowericon.png"
          alt="Boş Çiçek İkonu"
          width={30}
          height={30}
        />
      ))}
    </div>
  );
};

const ProductInfo = (props) => {
  const [isExistingAddress, setIsExistingAddress] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [shipmentDate, setShipmentDate] = useState(null);

  const [note, setNote] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const [favorited, setFavorited] = useState();
  const [favoriteId, setFavoriteId] = useState("");
  const navigate = useNavigate();
  const [saveBasket, setSaveBasket] = useState(false);
  let setNewUserAddressId = "";
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState('');

  const [address, setAddress] = useState({
    corporate: false,
    secret: false,
    country:"Türkiye",
    city:"İzmir"
  });


  const QuantitySelector = ({ value, onIncrement, onDecrement }) => {
    return (
      <span className="quantity-selector">
        <span onClick={onDecrement}  style={{padding:"10px"}}> 
          <img src="/images/minussignicon.png" alt="Increase" width={10}/></span>
        <span  style={{padding:"10px"}}>{value}</span>
        <span onClick={onIncrement}  style={{padding:"5px"}}>
          <img src="/images/plusicon.png" alt="Increase" width={10} height={10}/>
        </span>
      </span>
    );
  };
  

  const handleSelectDistrict = (event) => {
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
  let userInfo= getUserInfo();
  let userID= userInfo?.userId;
  let token= getToken();
  let userEmail= getEmail();
  const [userAddress, setUserAddress] = useState([]);

  const [newAddress, setNewAddress] = useState("");
  const [district, setDistrict] = useState([]);
  const [quarter, setQuarter] = useState([]);
  const handleAddressChange = (event) => {
    setNewAddress(event.target.value);
  };

  const [saveAddress, setSaveAddress] = useState(false);
  const [corparate, setCorporate] = useState(false);

  const handleSaveAddress = (event) => {
    setSaveAddress(event.target.checked);
  };

  const handleCorporate = (event) => {
    setCorporate(event.target.checked);
  };
  
  const handleSelectAddress = (e) => {
    setSelectedAddress(e.target.value);
  };
 
  const handleSelectShipmetDate = (selectedDate) => {
    console.log(selectedDate);
    setShipmentDate(selectedDate);
  };
  
  const [selectedPiece, setSelectedPiece] = useState(1);

  const handleIncrement = () => {
    setSelectedPiece(selectedPiece + 1);
  };

  const handleDecrement = () => {
    if (selectedPiece > 1) {
      setSelectedPiece(selectedPiece - 1);
    }
  };
  const handleAddToCart = () => {
    setAddedToCart(true);
  };
  const handleAddToFavorites = () => {
    if (!token) {
      toast.error('Ürünü Favorilemek için Giriş Yapmalısınız', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return; 
    }

    if(favorited)
    {     
      console.log(favoriteId);
      fetch(baseUrl+`api/Favorite/DeleteFavorite?id=${parseInt(favoriteId)}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
         if(data.success)
         {
          setFavoriteId("");
         }
         else{
          toast.error('Lütfen Daha Sonra Tekrar Deneyiniz.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          return; 
         }
        })
        .catch((error) => {
          toast.error('Lütfen Daha Sonra Tekrar Deneyiniz.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          return; 
        });
    }
    else{
      const favorite = 
      {
        userId:userID,
        productId:props.urunId
      };
      fetch(baseUrl+'api/Favorite/CreateFavorite', {
        method: 'POST',
        body: JSON.stringify(favorite),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        if(data.success)
           {
            setFavoriteId(data.data);
           }
           else{
            toast.error('Lütfen Daha Sonra Tekrar Deneyiniz.', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            return; 
           }
      })
      .catch(error => {
        toast.error('Lütfen Daha Sonra Tekrar Deneyiniz.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        return; 
      });
    }
    setFavorited(!favorited);
  };

  const handleExistingAddress = () => {
    setIsExistingAddress(true);
  };
  const handleNewAddress = () => {
    setIsExistingAddress(false);
  };

  const handleNote = (e) => {
  setNote(e.target.value)  
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    const processedValue = type === 'checkbox' ? checked : value;
  
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: processedValue,
    }));
  };

  const addToBasket = async(event) => {
    event.preventDefault();

    if (!token) {
      toast.error('Sepetinize Ürün Eklemek için Giriş Yapmalısınız', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return; 
    }
    if(props.stock ===0)
      {
        toast.error('Stokta yeterli ürün bulunmamaktadır.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        return; 
      }

    if (!selectedPiece  || !shipmentDate) {
      toast.error('Lütfen Tüm Alanları Doldurunuz.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }

    if(isExistingAddress)
    {
      if ( !selectedAddress) {
        toast.error('Lütfen Adres Seçimi Yapınız.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        return;
      }
      const year = shipmentDate.getFullYear();
      const month = String(shipmentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it's zero-based
      const day = String(shipmentDate.getDate()).padStart(2, '0');
      const hours = String(shipmentDate.getHours()).padStart(2, '0');
      const minutes = String(shipmentDate.getMinutes()).padStart(2, '0');
      const seconds = String(shipmentDate.getSeconds()).padStart(2, '0');
      const milliseconds = String(shipmentDate.getMilliseconds()).padStart(3, '0');

      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
      fetch(baseUrl+"api/Basket/CreateBasket", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                              userId: userID,
                              productId: props.urunId,
                              total: selectedPiece,
                              userAddressId: selectedAddress,
                              shipmentDate: formattedDate,
                              cardNote: note}),
                            })
        .then((response) => response.json())
        .then((data) => {
          
          if(data.success)
          {
            toast.success('Ürün Sepete Başarıyla Eklenmiştir', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            setTimeout(() => {
              navigate("/Basket");
            }, 2000);
          }
          else{
            toast.error(data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            return; 
          }
          //setErrorMessage(data.message);
        })
        .catch((error) => {
          console.error(error);
          //setErrorMessage(error.message);
        });
    }
    if(!isExistingAddress)
    { 
      const updatedAddress = {
        ...address,
        userId: userInfo.userId,
        districtId:parseInt(selectedDistrict),
        quarterId:parseInt(selectedQuarter),
        secret:!address.secret
      };
      const requiredFields = ['nameSurname', 'phone', 'city', 'country', 'districtId','quarterId','address','addressTitle','corporate'];
      const isEmptyField = requiredFields.some((field) => {
        const value = updatedAddress[field];
        return value === undefined || value === null || value === "" ||(typeof value === 'number' && isNaN(value)) ;
      });
      
      if (isEmptyField) {
        toast.error('Lütfen Tüm Alanları Doldurunuz.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        return; 
      } else {
        if (address.phone.length<10) {
          toast.error('Telefon numarası minimum 11 karakterden oluşmalıdır.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          return;
        }
        if(updatedAddress.corporate)
        {
          const requiredFields = ['nameSurname', 'phone', 'city', 'country', 'districtId','quarterId','address','addressTitle','corporate','taxIdentificationNumber', 'taxOffice', 'companyName','email'];
          const isEmptyField = requiredFields.some((field) => {
            const value = updatedAddress[field];
            return value === undefined || value === null || value === "" ||(typeof value === 'number' && isNaN(value)) ;
          });
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(updatedAddress.email)) {
              toast.error('Lütfen geçerli bir email adresi giriniz.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
              return;
            }
          if (isEmptyField) {
            toast.error('Lütfen Tüm Alanları Doldurunuz.', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            return; 
          }
          if (address.taxIdentificationNumber.length<10) {
            toast.error('Lütfen vergi numarasını minimum 10 haneli olacak şekilde giriniz.', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            return;
          }
        }
        fetch(baseUrl+"api/UserAddress/CreateUserAddress", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedAddress),
        })
          .then((response) => response.json())
          .then((addressdata) => {

            if(addressdata.success)
            {
              setNewUserAddressId=addressdata.data;
              setSaveBasket(true)
            }
            else
            {
              toast.error((addressdata.message ?? addressdata.Errors[0].ErrorMessage) ?? "İşlem gerçekleşirken bir hata ile karşılaşıldı.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
            }

            //setErrorMessage(data.message);
           const requestBody = {
            userId: userInfo.userId,
            taxIdentificationNumber: address.taxIdentificationNumber,
            taxOffice: address.taxOffice,
            companyName: address.companyName,
            userAddressId: addressdata.data,
            email: userEmail,
          };

          if(address.corporate)
          {
            console.log("kurumsal adres kayıt istek atıldı..");

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
              if(data.success)   
              {
                setSaveBasket(true)
              }  
                else{
                  toast.error(data.message ?? "İşlem gerçekleşirken bir hata ile karşılaşıldı.", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                  });
                }
                
              })
            .catch(error => {
              setSaveBasket(false);
              console.error(error);
              //setErrorMessage(error.message);
            });
          }               
          })
          .catch((error) => {
            //setErrorMessage(error.message);
          }).finally(()=>{
            if(setSaveBasket)
            {  
              const year = shipmentDate.getFullYear();
              const month = String(shipmentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it's zero-based
              const day = String(shipmentDate.getDate()).padStart(2, '0');
              const hours = String(shipmentDate.getHours()).padStart(2, '0');
              const minutes = String(shipmentDate.getMinutes()).padStart(2, '0');
              const seconds = String(shipmentDate.getSeconds()).padStart(2, '0');
              const milliseconds = String(shipmentDate.getMilliseconds()).padStart(3, '0');

              const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
                fetch(baseUrl+"api/Basket/CreateBasket", {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    userId: userID,
                    productId: props.urunId,
                    total: selectedPiece,
                    userAddressId: parseInt(setNewUserAddressId),
                    shipmentDate: formattedDate,
                    cardNote: note
                  }),
                  })
                  .then((response) => response.json())
                  .then((data) => {
                    if(data.success)
                    {
                      toast.success('Ürün Sepete Başarıyla Eklenmiştir', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                      setTimeout(() => {
                        navigate("/Basket");
                      }, 2000);
                    }
                    if(!data.success)
                    {
                      console.log(data)
                      toast.error(data.message, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      });
                      return; 
                    }
                    //setErrorMessage(data.message);
                  })
                  .catch((error) => {
                    //setErrorMessage(error.message);
                  });
               }
                   });
      } 
    }
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
          if (data.success) {
            setUserAddress(data.data);

          } else {
            toast.error('Lütfen Daha Sonra Tekrar Deneyiniz.', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            return; 
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

  const fetchFavorite = async (urunId) => {
    try {  
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
    await fetch(baseUrl+`api/Favorite/GetAllFavoriteByUserId/${userID}`,requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const isProductInFavorites = data.data.some(favorite => favorite.productId === urunId);
          setFavorited(isProductInFavorites)
          console.log(isProductInFavorites);
          if(isProductInFavorites)
          {
            const userFavoriteId = data.data.find(favorite => favorite.productId === urunId);
            setFavoriteId(userFavoriteId?.favoriteId);
          }
        } else {
          toast.error('Lütfen Daha Sonra Tekrar Deneyiniz.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          return; 
        }
    
      })
      .catch(error => {
        console.error(error);
      });
    } catch (error) {
      console.error("Favoriler getirilirken hata oluştu: ", error);
    }
  };

  useEffect(() => 
  {
    if(userID)
    {
      fetchUserAddress();
    fetchDistricts();
    fetchFavorite(props.urunId);
    }
    
  },[props]);

  return (
    <div  className="product-info-page"> 
            <ToastContainer />

      <div  className="product-info-area" >
        <div style={{ display: "flex", alignItems: "center"}}>
        <img
        src={props.foto || "/images/monjardinlogo.png"} 
        alt={props.ad}
        className="product-info-img"
      />          <div>
            <div style={{display:"block", fontFamily:"times", fontStyle:"italic"}}>
              <div> 
                <h2>{props.ad}</h2>
              </div>         
              <div > <p>{props.fiyat} TL</p></div>
              <FlowerRating puan={props.puan} />
               
              <div className="detay-buton" onClick={() => handleAddToFavorites()}>
                  <img
                    width={40}
                    height={40}
                    src={favorited ? "/images/selectedfavorite.png" : "/images/fav.png"}
                    alt="Favori İkonu"
                    style={{ cursor: "pointer" }}
                  />
                  {favorited ? (
                    ""
                  ) : (
                    <span style={{  fontFamily: "times", fontSize:"12px" }}>
                      Favorile
                    </span>
                  )}
              </div>

            </div>
            </div>
          </div>
          <p  className="product-info-detay">{props.detay}</p>
          {token ? (<>
          <div className="address-radio">
                  <input
                    type="radio"
                    name="address"
                    checked={isExistingAddress}
                    onChange={handleExistingAddress}
                    style={{color: isExistingAddress ? "#893694" : "initial",width: "15px",
                    height: "15px"}} 
                  />
                  Kayıtlı Adres
                  <input
                    type="radio"
                    name="address"
                    checked={!isExistingAddress}
                    onChange={handleNewAddress}
                    style={{ marginLeft: "5rem",color: !isExistingAddress ? "#893694" : "initial",width: "15px",
                    height: "15px" }}
                  />
                  Yeni Adres Gir
          </div>
          
          <div>
                  {isExistingAddress && (
                    <div>

                        <select
                          type="number"
                          name="userAddressId"
                          value={userAddress.userAddressId}
                          onChange={handleSelectAddress}             
                          className="product-detail-form"
                        >
                          <option value="">Adres Seçiniz</option>
                          {userAddress.length === 0 ? (
                            <option disabled>Kayıtlı Adres Bulunamadı</option>
                          ) : (
                            userAddress.map(address => (
                              <option key={address.userAddressId} value={address.userAddressId}>
                                {address.addressTitle}
                              </option>
                            ))
                          )}
                        </select>     
                  <DatePicker
                    className="product-detail-form"
                    style={{ width: "48%" }}
                    selected={shipmentDate}
                    onChange={handleSelectShipmetDate}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                    placeholderText="Tarih Seçiniz"
                  
                  />
                   <QuantitySelector
                      value={selectedPiece}
                      onIncrement={handleIncrement}
                      onDecrement={handleDecrement}
                    />
                    
                    
                      <textarea
                        value={note}
                        onChange={handleNote}
                        rows={3}
                        placeholder="Not Yazınız..."
                        className="product-detail-form"
                        style={{ height: "100px", resize: "vertical" }}
                      />
                    </div>
                  )}
                  {!isExistingAddress && (
                    <div>
                      <input
                            type="text"
                            name="nameSurname"
                            value={address.name}
                            onChange={handleInputChange}
                            className="product-detail-form"
                            placeholder="Adınız Soyadınız"
                          />
                       <input
                        type="text"
                        name="phone"
                        value={address.districtId}
                        onChange={handleInputChange}
                        className="product-detail-form"
                        placeholder="Telefon Numaranız 05xxxxxxxxx"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/[^0-9]/g, '');
        
                          if (e.target.value.length > 15) {
                            e.target.value = e.target.value.slice(0, 15);
                          }
                        }}
                      />
                          <select
                            name="districtId"
                            value={address.districtId}
                            onChange={handleSelectDistrict}
                            className="product-detail-form" 
                          >
                            <option value="">İlçe Seçiniz</option>
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

                          <select
                            name="quarterId"
                            value={address.quarterId}
                            onChange={handleSelectQuarterChange}
                            className="product-detail-form"
                            >
                            <option value="">Mahalle Seçiniz</option>
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

                          <DatePicker
                    className="product-detail-form"
                    style={{ width: "48%" }}
                    selected={shipmentDate}
                    onChange={handleSelectShipmetDate}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                    placeholderText="Tarih Seçiniz"
                  />

                    
                  

                    <QuantitySelector
                      value={selectedPiece}
                      onIncrement={handleIncrement}
                      onDecrement={handleDecrement}
                    />
                  
                      <input
                            type="text"
                            name="addressTitle"
                            value={address.addressTitle}
                            onChange={handleInputChange}
                            className="product-detail-form"
                            placeholder="Adres Başlığı"
                            
                          />
                        <input
                            type="text"
                            name="address"
                            value={address.address}
                            onChange={handleInputChange}
                            className="product-detail-form"
                            placeholder="Açık Adresi Yazınız..."
                          />
                      <textarea
                        name="note"
                        value={address.note}
                        className="product-detail-form"
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Not Yazınız.."
                        style={{ height: "100px", resize: "vertical" }}

                      />
                      <label style={{ marginTop: "1rem" }}>
                        <input
                          type="checkbox"
                          name="secret"
                          checked={address.secret}
                          onChange={handleInputChange}
                          style={{
                            width: "18px", 
                            height: "18px",
                            borderRadius: "50%", 
                            border: "1px solid #ccc",
                            marginRight: "0.5rem"
                          }}
                        />
                        Adresi Kaydet
                      </label>
                      <label style={{ marginTop: "1rem" , marginLeft:"4%"}}>
                        <input
                          type="checkbox"
                          name="corporate"
                          checked={address.corporate}
                          onChange={handleInputChange}
                          style={{
                            width: "18px", 
                            height: "18px",
                            borderRadius: "80%", 
                            border: "1px solid #ccc",
                            marginRight: "0.5rem",
                          }}
                        />
                        Kurumsal
                      </label>
                      {address.corporate && (
                      <div>
                          <input
                            type="text"
                            name="taxIdentificationNumber"
                            value={address.taxIdentificationNumber}
                            onChange={handleInputChange}
                            className="product-detail-form"
                            placeholder="Vergi Kimlik Numarası"
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, '');
                        
                              if (e.target.value.length < 10) {
                                e.target.setCustomValidity("Minimum 10 rakam girmelisiniz.");
                              } else {
                                e.target.setCustomValidity("");
                              }
                        
                              if (e.target.value.length > 11) {
                                e.target.value = e.target.value.slice(0, 11);
                              }
                            }}
                          />
                            <input
                            type="text"
                            name="taxOffice"
                            value={address.taxOffice}
                            onChange={handleInputChange}
                            className="product-detail-form"
                            placeholder="Vergi Dairesi"
                          />
                            <input
                            type="text"
                            name="companyName"
                            value={address.companyName}
                            onChange={handleInputChange}
                            className="product-detail-form"
                            placeholder="Şirket Adı"
                          />
                            <input
                            type="text"
                            name="email"
                            value={address.email}
                            onChange={handleInputChange}
                            className="product-detail-form"
                            placeholder="Mail Adresi"
                          />
                      </div>
                      )}
                    </div>
                  )}
          </div> </> ):null}


         <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", marginTop: "16px" ,paddingRight:"17%" }}>
          <button 
                onClick={addToBasket}
                style={{ 
                  borderRadius: "12px", 
                  height: "55px", 
                  fontSize: "18px", 
                  fontWeight: "500", 
                  fontStyle: "italic"
                  }}>
                  Sepete Ekle
          </button>
        </div> 
      </div>
    </div>
  ); 
};    
const UrunDetay = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState([]);

  const fetchProductDetail = async (id) => {
    try {
      const requestOptions = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
       await fetch(baseUrl+`api/Product/GetProductDetailByProductId/${id}`,requestOptions)
       .then(response => response.json())
       .then(data => {  
        setProductDetail(data.data)

        console.log(data.data);        
       })
       .catch(error => {
         console.error(error);
         //setErrorMessage(error.message);
       });      
  }
  catch (error) {
    //setErrorMessage(error);
    console.error(error)
  }

};

useEffect(() => {
  const fetchData = async () => {
    await fetchProductDetail(id); 
  };

  fetchData();
}, [id]);


  return <ProductInfo 
          urunId={productDetail.id} 
          foto={productDetail?.fileResponses?.[0]?.fileUrl } 
          ad={productDetail.name} 
          fiyat={productDetail.price} 
          detay={productDetail.description} 
          puan={productDetail.pointAverage}
          stock={productDetail.stock}
          />;
};

export default WithNavbar(UrunDetay);




/* <div style={{marginTop: "80px"}}>

      <h1>Birlikte iyi Gider </h1>
      <Slide slidesToScroll={1} slidesToShow={1} indicators={true} autoplay={true}  duration={1500} responsive={[{  
        breakpoint: 800,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6
        }
      }, {
        breakpoint: 500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }]}>
      {recommendedProducts.map((product) => (
            <div key={product.id}>
            <li
              key={product.id}
              style={{
                marginRight: "16px",
                listStyleType: "none",
                textAlign: "center"
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                width={"200"}
                height={"200"}
              />
              <p>{product.name}</p>
              <p>{product.price}</p>
            </li>
            </div>
          ))}
      </Slide>
      </div> */


           /* <button className="detay-buton" onClick={handleAddToFavorites} disabled={favorited}>
                    <img width={40} height={40}
                      src="/images/menu-icon2.png"
                      alt="sepet"
                      onClick={handleAddToFavorites}
                      style={{ cursor: "pointer" }}
                    />
        
                    {favorited ? "Sepete Eklendi" : "Sepete Ekle"}

          
                  </button> */