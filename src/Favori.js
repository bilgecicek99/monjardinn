import React, { useState, useEffect } from "react";

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

  return (
    <div>
      <h1>Favori Ürünler</h1>
      <ul>
        {favoriUrunler.map((urun) => (
          <li key={urun.id}>
            <img src={urun.resim} alt={urun.isim} />
            <p>Ürün Adı: {urun.isim}</p>
            <p>Kategori: {urun.kategori}</p>
            <p>Fiyat: {urun.fiyat} TL</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriListesi;
