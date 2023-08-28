import React, { useState, useEffect } from "react";
import WithNavbar from '../WithNavbar'; 
import { baseUrl } from '../config/Constants';
import { getToken,getUserInfo } from "../service/AuthService";
import { Link } from 'react-router-dom';

const FavoriListesi = () => {
  
  const [products, setProducts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const token = getToken();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await getUserInfo();
        setUserInfo(user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.userId === null) {
      console.error('Kullanıcı kimliği (userId) null. Favori ürünler alınamıyor.');
      return; // Favori ürünleri alma işlemini burada durdur.
    }

    if (userInfo && userInfo.userId) {
      const fetchFavoriUrunler = async () => {
        try {
          const response = await fetch(baseUrl + `api/Favorite/GetAllFavoriteByUserId/${userInfo.userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error('Favori ürünler getirilemedi. Lütfen daha sonra tekrar deneyin.');
          }

          const data = await response.json();
          const favoriUrunData = data.data;
          setProducts(favoriUrunData);

          console.log('Favori ürünler:', favoriUrunData);
        } catch (error) {
          console.error(error);
          alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
      };

      fetchFavoriUrunler();
    }
  }, [userInfo, token]);

  const fetchFavoriUrunler = async () => {
    try {
      const response = await fetch(baseUrl + `api/Favorite/GetAllFavoriteByUserId/${userInfo.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Favori ürünler getirilemedi. Lütfen daha sonra tekrar deneyin.');
      }

      const data = await response.json();
      const favoriUrunData = data.data;
      setProducts(favoriUrunData);

      console.log('Favori ürünler:', favoriUrunData);
    } catch (error) {
      console.error(error);
      alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };
  
  async function deleteFavori(favoriId) {
    try {
      const token = getToken();
      const userInfo = await getUserInfo();
      console.log("id",favoriId)
      const response = await fetch(baseUrl + `api/Favorite/DeleteFavorite?id=${favoriId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        console.log('Favori başarıyla silindi.');
        fetchFavoriUrunler();
      } else {
        const responseData = await response.json();
        console.error('Favori silme işlemi sırasında hata oluştu. Durum:', response.status);
        console.error('Hata ayrıntıları:', responseData.error || responseData);
      }
    } catch (error) {
      console.error('Favori silme işlemi sırasında hata oluştu:', error);
    }
  }
  
  const FavoriteCard = ({ Image, title, description, price,favoriteId }) => (
    
    <div className="card" style={{ display: "flex", padding: "30px", marginBottom: "30px",border:"1px solid #D9D9D9",
    boxShadow: "20px 20px 20px rgba(0,0,0,0.25)" }}>
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <img src={Image} alt={title} style={{ marginRight: "10px" , width: "150px", height: "200px", objectFit: "contain"  }}  />
        <div style={{ textAlign: "left" }}>
          <h2 style={{ fontFamily: "times new roman", fontWeight: "bold" }}>{title}</h2>
          <p style={{ fontFamily: "times new roman", fontStyle: "italic", fontSize: "20px", fontWeight: "lighter" }}>{description}</p>
          <p style={{ fontFamily: "times new roman", fontWeight: "lighter", fontStyle: "italic", fontSize: "20px" }}>{price}</p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      <img
        src="/images/selectedfavorite.png"
        alt=""
        style={{ marginRight: "10px" }}
        width="30px"
        height="30px"
        onClick={() => deleteFavori(favoriteId)}
      />
      </div>
    </div>
  </div>
  
  );

  return (
    <div className="favori-page">
      <div className="favorite-card-area">
        {products.map((product) => (
        <Link to={`/productinfo/${product.productId}`} style={{ textDecoration: 'none', color: 'black' }}>
          <FavoriteCard
            Image={product.productFile ? product.productFile : "images/monjardinlogo.png"}
            key={product.id}
            title={product.productName}
            description={`${product.categoryName}`}
            price={`${product.productPrice} TL`}
            favoriteId={product.favoriteId}
          />
          </Link>
        ))}
        
      </div>

    </div>
  );
};

export default WithNavbar(FavoriListesi);
