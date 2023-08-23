import React, { useState, useEffect } from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { baseUrl } from './config/Constants';
import { Navigate, useParams } from 'react-router-dom';
import WithNavbar from './WithNavbar'; 
import "./App.css";
import { getEmail, getToken, getUserInfo} from "./service/AuthService";
import { useNavigate } from 'react-router-dom';


const ProductInfo = (props) => {
 // Ürünün detayları için state kullanımı
 //const [favorited, setFavorited] = useState(false);
 //const [addedToCart, setAddedToCart] = useState(false);
  const [isExistingAddress, setIsExistingAddress] = useState(true);
  //const [newAddress, setNewAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [shipmentDate, setShipmentDate] = useState("");
  const [selectedPiece, setSelectedPiece] = useState("");
  const [note, setNote] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const [favorited, setFavorited] = useState(false);
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

  const recommendedProducts = [
    {
      id: 1,
      name: "Mon Jardin",
      price: "800 TL",
      image: "/images/sepetbirlikte.png",
    },
    {
      id: 2,
      name: "Mon Jardin",
      price: "800 TL ",
      image: "/images/sepetbirlikte.png",
    },
    {
      id: 3,
      name: "Mon Jardin",
      price: "800 TL ",
      image: "/images/sepetbirlikte.png",
    },
    // Diğer önerilen ürünler buraya eklenir
  ];
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const handleSelectAddress = (e) => {
    setSelectedAddress(e.target.value);
  };
  const handleSelectShipmetDate = (e) => {
    const selectedDate = e.target.value;
    const formattedDate = new Date(selectedDate).toISOString();
    setShipmentDate(formattedDate);
  };
  const handleSelectPiece = (e) => {
    setSelectedPiece(e.target.value);
  };
  // Sepete ekle butonuna tıklanınca
  const handleAddToCart = () => {
    setAddedToCart(true);
    // Sepete ekleme işlemini burada gerçekleştirin
    // Örneğin: sepeteEkle(props.urunId)
  };

  // Favorilere ekle butonuna tıklanınca
  const handleAddToFavorites = () => {
    setFavorited(true);
    // Favorilere ekleme işlemini burada gerçekleştirin
    // Örneğin: favorilereEkle(props.urunId)
  };

  // Kayıtlı adres seçildiğinde
  const handleExistingAddress = () => {
    setIsExistingAddress(true);
  };

  // Yeni adres seçildiğinde
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
    if(isExistingAddress && selectedAddress)
    {
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
                              shipmentDate: shipmentDate,
                              cardNote: note}),
                            })
        .then((response) => response.json())
        .then((data) => {
          if(data.success)
          {
            alert("Değişiklikler başarıyla kaydedilmiştir.");
            navigate("/Basket")
          }
          //setErrorMessage(data.message);
        })
        .catch((error) => {
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
      const requiredFields = ['nameSurname', 'phone', 'city', 'country', 'districtId','quarterId','address','addressTitle','corporate','shipmentDate','piece'];
      const isEmptyField = requiredFields.some((field) => {
        const value = updatedAddress[field];
        return value === undefined || value === null || value === "" ||(typeof value === 'number' && isNaN(value)) ;
      });
        
      if (isEmptyField) {
        alert('Lütfen Tüm Alanları Doldurunuz.');
      } else {
        if(updatedAddress.corporate)
        {
          const requiredFields = ['taxIdentificationNumber', 'taxOffice', 'companyName'];
          const isEmptyField = requiredFields.some((field) => {
            const value = updatedAddress[field];
            return value === undefined || value === null || value === "" ||(typeof value === 'number' && isNaN(value)) ;
          });
          if (isEmptyField) {
            alert('Lütfen Tüm Alanları Doldurunuz.');
            return "";
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
                  alert("Değişiklikler başarıyla kaydedilmiştir.")
                  setSaveBasket(true)
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
                fetch(baseUrl+"api/Basket/CreateBasket", {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    userId: userID,
                    productId: props.urunId,
                    total: parseInt(address.piece),
                    userAddressId: parseInt(setNewUserAddressId),
                    shipmentDate: new Date(address.shipmentDate).toISOString(),
                    cardNote: address.note
                  }),
                  })
                  .then((response) => response.json())
                  .then((data) => {
                    if(data.success)
                    {
                       navigate('/Basket');
                       alert(data.message);
                    }
                    if(!data.success)
                    {
                      alert(data.message)
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
        if (data.data.length === 0) {
          console.error("Kayıtlı adres bulunamamıştır.");

        } else {
          setUserAddress(data.data);
          console.log('adresler',data.data);
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

const dates = [];
const today = new Date();

for (let i = 0; i < 3; i++) {
  const date = new Date(today);
  date.setDate(today.getDate() + i);
  const formattedDate = date.toISOString().substr(0, 10);
  dates.push(formattedDate);
}

useEffect(() => 
{
  fetchUserAddress();
  fetchDistricts();
},[]);

  return (
    <div  style={{ margin: "100px" }}>
    <div>
      <div style={{ display: "flex", alignItems: "center" ,marginLeft:"6%"}}>
        {/* Ürün fotoğrafı */}
        <img src={props.foto} alt={props.ad} style={{ width: "250px",height:"325px", marginRight: "16%", borderRadius:"15px" }} />

        <div>
          <div style={{display:"block"}}>
            <div>  {/* Ürün adı ve fiyatı */}
              <h2>{props.ad}</h2>
            </div>
           

            <div style={{marginLeft: "2%"}}> <p>{props.fiyat} TL</p></div>
            <button style={{background:"transparent",marginLeft: "-9%"}} onClick={handleAddToFavorites} disabled={favorited}>
                  <img 
                    height= {54}
                    width= {145}
                    src="/images/puan.png"
                    alt="Puan İkonu"
                    onClick={handleAddToFavorites}
                    style={{ cursor: "pointer" }}
                  />
            </button>

              <div style={{marginLeft: "-11%"}}>

                <button className="detay-buton" onClick={handleAddToFavorites} disabled={favorited}>
                  <img width={40} height={40}
                    src="/images/fav.png"
                    alt="Favori İkonu"
                    onClick={handleAddToFavorites}
                    style={{ cursor: "pointer" }}
                  />
      
                {favorited ? "Favorilere Eklendi" : "Favorilere Ekle"}

        
                </button>
                {/* <button className="detay-buton" onClick={handleAddToFavorites} disabled={favorited}>
                  <img width={40} height={40}
                    src="/images/menu-icon2.png"
                    alt="sepet"
                    onClick={handleAddToFavorites}
                    style={{ cursor: "pointer" }}
                  />
      
                  {favorited ? "Sepete Eklendi" : "Sepete Ekle"}

        
                </button> */}
              </div>
            </div>
          </div>
        </div>
        
      
     

      {/* Ürün detaylı açıklaması */}
      <p  style={{marginTop: "6%",marginBottom: "4rem", marginLeft: "6%"}}>{props.detay}</p>

       {/* Adres seçim alanı */}
       <div>
       <div style={{  justifyContent: "space-between" }}>
  <div style={{marginleft: "25%", paddingRight:"17%", paddingLeft:"17%" }}>
    <div style={{ marginLeft:"25%"}}>
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

            <select 
            className="product-detail-form" 
            style={{ width: "48%" }}
            onChange={handleSelectShipmetDate}             
            >
            <option value="">Tarih Seçiniz</option>
            {dates.map((date, index) => (
              <option key={index} value={date}>
                {date}
              </option>
            ))}
          </select>

          <select 
          className="product-detail-form" 
          style={{width:"48%", marginLeft:"4%"}}
          onChange={handleSelectPiece}
          >
            <option value="">Adet Seçiniz</option>
            <option key={1} value="1">1</option>
            <option key={2} value="2">2</option>
            <option key={3} value="3">3</option>
          </select>
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
                type="number"
                name="phone"
                value={address.districtId}
                onChange={handleInputChange}
                className="product-detail-form"
                placeholder="Telefon Numaranız"
                
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

         <select 
         name="shipmentDate"
         value={address.shipmentDate}
         onChange={handleInputChange}
         className="product-detail-form" style={{ width: "48%" }}>
            <option value="">Tarih Seçiniz</option>
            {dates.map((date, index) => (
              <option key={index} value={date}>
                {date}
              </option>
            ))}
          </select>

          <select 
          name="piece"
          value={address.piece}
          onChange={handleInputChange}
          className="product-detail-form" 
          style={{width:"48%", marginLeft:"4%"}}>
            <option value="">Adet Seçiniz</option>
            <option key={1} value="1">1</option>
            <option key={2} value="2">2</option>
            <option key={3} value="3">3</option>
          </select>
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
          </div>
          )}
        </div>
      )}
    </div>
  </div>
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

</div>
<div style={{marginTop: "80px"}}>

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
          />;
};

export default WithNavbar(UrunDetay);
