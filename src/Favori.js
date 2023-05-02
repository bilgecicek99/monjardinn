import React, { useState, useEffect } from "react";

const Address = ({ Image, title, description, price }) => (
  <div className="card" style={{ margin: "20px", display: "flex" }}>
  <div><img src={Image} alt={title} style={{ margin:"auto"}} /></div>
   <div> <h2>{title}</h2>
    <p>{description}</p>
    <p>{price}</p>
    </div>
  </div>
);

const FavoriListesi = () => {
  const [favoriUrunler, setFavoriUrunler] = useState([]);

  useEffect(() => {
    // API'den favori ürünleri al ve setFavoriUrunler ile durumu güncelle
    const fetchFavoriUrunler = async () => {
      try {
        const response = await fetch("https://api.example.com/favori-urunler");
        const data = await response.json();
        setFavoriUrunler(data);
      } catch (error) {
        console.error("Favori ürünler alınamadı:", error);
      }
    };

    fetchFavoriUrunler();
  }, []);

  const cards = [
    {
      Image:"/images/favoriurun.png",
      description: 'Aranjman',
      title: "Orkide",
      price: "800 TL"
    },
    {
      Image:"/images/favoriurun.png",
      description: 'Aranjman',
      title: "Orkide",
      price: "800 TL"
    },
    {
      Image:"/images/favoriurun.png",
      description: 'Aranjman',
      title: "Orkide",
      price: "800 TL"
    },
    {
      Image:"/images/favoriurun.png",
      description: 'Aranjman',
      title: "Orkide",
      price: "800 TL"
    },
    {
      Image:"/images/favoriurun.png",
      description: 'Aranjman',
      title: "Orkide",
      price: "800 TL"
    },
    {
      Image:"/images/favoriurun.png",
      description: 'Aranjman',
      title: "Orkide",
      price: "800 TL"
    },
    {
      Image:"/images/favoriurun.png",
      description: 'Aranjman',
      title: "Orkide",
      price: "800 TL"
    }
  ];

  return (
    <div style={{ margin: "100px" }}>
     
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px", textAlign: "center" }}>
        
        <ul>
          {favoriUrunler.map((urun) => (
            <li key={urun.id} style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <div><img src={urun.res} alt={urun.isim} style={{ width: "100px", height: "100px", marginRight: "20px" }} /> </div>
            <div>
            <h3 style={{ marginBottom: "5px", display:"block" }}>{urun.isim}</h3>
            <p style={{ marginBottom: "5px", display:"block"}}>Kategori: {urun.kategori}</p>
            <p style={{ marginBottom: "5px", display:"block" }}>Fiyat: {urun.price} TL</p>
          </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="profile-card-area">
      
        {cards.map((card) => (
          <Address
          Image={card.Image}
            key={card.title}
            title={card.title}
            description={card.description}
            price={card.price}
          />
        ))}
       
      </div>
    </div>
  );
};

export default FavoriListesi;
