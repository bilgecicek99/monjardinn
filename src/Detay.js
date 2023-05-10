import React, { useState } from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'


const Detay = (props) => {
  // Ürünün detayları için state kullanımı
  //const [favorited, setFavorited] = useState(false);
 //const [addedToCart, setAddedToCart] = useState(false);
  const [isExistingAddress, setIsExistingAddress] = useState(true);
  //const [newAddress, setNewAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const [selectedDistrict, setSelectedDistrict] = useState("");
const handleSelectDistrict = (event) => {
  setSelectedDistrict(event.target.value);
};

const [newAddress, setNewAddress] = useState("");
const handleAddressChange = (event) => {
  setNewAddress(event.target.value);
};

const [saveAddress, setSaveAddress] = useState(false);
const handleSaveAddress = (event) => {
  setSaveAddress(event.target.checked);
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


  return (
    <div  style={{ margin: "100px" }}>
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Ürün fotoğrafı */}
        <img src={props.foto} alt={props.ad} style={{ width: "200px", marginRight: "16px" }} />

        <div>
        <div style={{display:"block"}}>
         <div>  {/* Ürün adı ve fiyatı */}
         <h2>{props.ad}</h2>
         </div>
         <div> <p>{props.fiyat} TL</p></div>
         <div style={{display:"flex"}}>

      <button className="detay-buton" onClick={handleAddToFavorites} disabled={favorited}>
      <img width={40} height={40}
        src="/images/fav.png"
        alt="Favori İkonu"
        onClick={handleAddToFavorites}
        style={{ cursor: "pointer" }}
      />
      
        {favorited ? "Favorilere Eklendi" : "Favorilere Ekle"}

        
      </button>
      <button className="detay-buton" onClick={handleAddToFavorites} disabled={favorited}>
      <img width={40} height={40}
        src="/images/menu-icon2.png"
        alt="sepet"
        onClick={handleAddToFavorites}
        style={{ cursor: "pointer" }}
      />
      
        {favorited ? "Sepete Eklendi" : "Sepete Ekle"}

        
      </button>
         </div>
        </div>
      
    </div>
  
        </div>
        
      
     

      {/* Ürün detaylı açıklaması */}
      <p>{props.detay}</p>

       {/* Adres seçim alanı */}
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
<div><h3 style={{ marginBottom: "1rem" }}>Adres Seçimi</h3></div>
<div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
<input type="radio" name="address" checked={isExistingAddress} onChange={handleExistingAddress} style={{ marginRight: "0.5rem" }} /> Kayıtlı Adres
{isExistingAddress && (
  <select value={selectedAddress} onChange={handleSelectAddress} style={{ marginLeft: "1rem" }}>
    <option value="">Adres Seçiniz</option>
    <option value="adres1">Adres 1</option>
    <option value="adres2">Adres 2</option>
    <option value="adres3">Adres 3</option>
    {/* Diğer kayıtlı adresler buraya eklenir */}
  </select>
  
)}
</div>
<div style={{ display: "flex", alignItems: "center" }}>
<input type="radio" name="address" checked={!isExistingAddress} onChange={handleNewAddress} style={{ marginRight: "0.5rem" }} /> Yeni Adres
{!isExistingAddress && (
  <div style={{ marginLeft: "1rem" }}>
    <select value={selectedDistrict} onChange={handleSelectDistrict}>
      <option value="">İlçe Seçiniz</option>
      <option value="district1">İlçe 1</option>
      <option value="district2">İlçe 2</option>
      <option value="district3">İlçe 3</option>
      {/* Diğer ilçeler buraya eklenir */}
    </select>
    <div>
      <textarea value={newAddress} onChange={handleAddressChange} rows={3} placeholder="Açık Adresinizi Girin" style={{ marginTop: "1rem", width: "100%" }} />
    </div>
    <div>
    <label style={{ marginTop: "1rem" }}>
        <input type="checkbox" checked={saveAddress} onChange={handleSaveAddress} style={{ marginRight: "0.5rem" }} /> Adresi Kaydet
      </label>
    </div>
  </div>
)}
</div>
</div>
</div>
<div style={{marginTop: "80px"}}>
{/* Diğer alanlar buraya eklenebilir */}

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
            <div>
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
  // Örnek veriler
  const urun = {
    id: 1,
    foto: "/images/sepetbirlikte.png",
    ad: "Orkide",
    fiyat: "800.00 ",
    detay: "Açıklama",
  };

  return <Detay urunId={urun.id} foto={urun.foto} ad={urun.ad} fiyat={urun.fiyat} detay={urun.detay} />;
};

export default UrunDetay;
