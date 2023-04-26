import React, { useState } from "react";

const Detay = (props) => {
  // Ürünün detayları için state kullanımı
  //const [favorited, setFavorited] = useState(false);
 //const [addedToCart, setAddedToCart] = useState(false);
  const [isExistingAddress, setIsExistingAddress] = useState(true);
  const [newAddress, setNewAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const [favorited, setFavorited] = useState(false);


  const recommendedProducts = [
    {
      id: 1,
      name: "Ürün 1",
      price: "800 ",
      image: "https://png.pngtree.com/png-vector/20201128/ourlarge/pngtree-vase-png-image_2415411.jpg",
    },
    {
      id: 2,
      name: "Ürün 2",
      price: "800 ",
      image: "https://png.pngtree.com/png-vector/20201128/ourlarge/pngtree-vase-png-image_2415411.jpg",
    },
    {
      id: 3,
      name: "Orkide",
      price: "800 ",
      image: "https://png.pngtree.com/png-vector/20201128/ourlarge/pngtree-vase-png-image_2415411.jpg",
    },
    // Diğer önerilen ürünler buraya eklenir
  ];
 



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

  // Yeni adres girildiğinde
  const handleAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

  return (
    <div  style={{ margin: "100px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Ürün fotoğrafı */}
        <img src={props.foto} alt={props.ad} style={{ width: "200px", marginRight: "16px" }} />

        <div>
          {/* Ürün adı ve fiyatı */}
          <h2>{props.ad}</h2>
          <p>{props.fiyat} TL</p>

          {/* Sepete ekle butonu */}
          <div>
          <div>
      <img
        src="/images/fav.png"
        alt="Favori İkonu"
        onClick={handleAddToFavorites}
        style={{ cursor: "pointer" }}
      />
      <button onClick={handleAddToFavorites} disabled={favorited}>
        {favorited ? "Favorilere Eklendi" : "Favorilere Ekle"}
      </button>
    </div>
    <img
    src="/images/fav.png"
    alt="Favori İkonu"
    onClick={handleAddToFavorites}
    style={{ cursor: "pointer" }}
  />
  <button onClick={handleAddToFavorites} disabled={favorited}>
    {favorited ? "Favorilere Eklendi" : "Favorilere Ekle"}
  </button>
        </div>
        </div>
      </div>

      {/* Ürün detaylı açıklaması */}
      <p>{props.detay}</p>

       {/* Adres seçim alanı */}
       <div>
       <h3>Adres Seçimi</h3>
       <input type="radio" name="address" checked={isExistingAddress} onChange={handleExistingAddress} /> Kayıtlı Adres
       {isExistingAddress && (
         <select value={selectedAddress} onChange={handleSelectAddress}>
           <option value="">Adres Seçiniz</option>
           <option value="adres1">Adres 1</option>
           <option value="adres2">Adres 2</option>
           <option value="adres3">Adres 3</option>
           {/* Diğer kayıtlı adresler buraya eklenir */}
           </select>
           )}
           <input type="radio" name="address" checked={!isExistingAddress} onChange={handleNewAddress} /> Yeni Adres
           {!isExistingAddress && (
           <div>
           <textarea value={newAddress} onChange={handleAddressChange} rows={3} />
           </div>
           )}
           </div>
           <h3>Birlikte İyi Gider</h3>
           <div>
             {recommendedProducts.map((product) => (
               <div key={product.id}>
                 <img src={product.image} alt={product.name} />
                 <h4>{product.name}</h4>
                 <p>Fiyat: {product.price} TL</p>
            </div>
            ))}
         </div>
          </div>
          );
        };
           
const UrunDetay = () => {
  // Örnek veriler
  const urun = {
    id: 1,
    foto: "https://png.pngtree.com/png-vector/20201128/ourlarge/pngtree-vase-png-image_2415411.jpg",
    ad: "Orkide",
    fiyat: "800.00 ",
    detay: "Bu ürünün detaylı açıklaması burada yer alır.",
  };

  return <Detay urunId={urun.id} foto={urun.foto} ad={urun.ad} fiyat={urun.fiyat} detay={urun.detay} />;
};

export default UrunDetay;
