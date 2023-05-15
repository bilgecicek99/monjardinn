import React, { useState, useEffect } from "react";
import WithNavbar from './WithNavbar'; 

const Address = ({ Image, title, description, price }) => (
  <div className="card" style={{ margin: "20px", display: "flex", padding:"30px"}}>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <img src={Image} alt={title} style={{ margin: "auto", marginLeft: "40px",  }} width={"150px"} height={200} />
      <div style={{ marginRight: "550px" }}>
        <h2 style={{fontFamily:"times new roman",fontWeight:"bold"}}>{title}</h2>
        <p style={{fontFamily:"times new roman",fontStyle:"italic", fontSize:"20px", fontWeight:"lighter"}}>{description}</p>
        </div>
        <p style={{ fontFamily:"times new roman", fontWeight:"lighter",fontStyle:"italic", marginTop:"auto",fontSize:"20px"}}>{price}</p>

    
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

export default WithNavbar(FavoriListesi);
