import React, { useState, useEffect } from "react";
import WithNavbar from '../WithNavbar'; 
import { baseUrl } from '../config/Constants';
import { getToken,getUserInfo } from "../service/AuthService";

 
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

  async function sendFavoriteRequest(productId) {
    try {
      const userInfo = await getUserInfo();
      const token = getToken();
  
      const requestBody = {
        productId: productId,
        userId: userInfo.userId,
      };
  
      console.log('Gönderilen istek gövdesi:', JSON.stringify(requestBody));
  
      const response = await fetch(baseUrl + `api/Favorite/CreateFavorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(requestBody),
      });
      const responseData = await response.json();
  
      if (response.ok) {
        const data = await response.json();
        console.log('Favori isteği gönderildi:', data);
      } else {
        console.error('Favori isteği gönderilirken hata oluştu. Durum:', response.status);
        console.error('Hata ayrıntıları:', responseData.error || responseData);
        }
    } catch (error) {
      console.error('Favori isteği gönderilirken hata oluştu:', error);
    }
  }
  
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
    
    <div className="card" style={{ display: "flex", padding: "30px", marginBottom: "10px" }}>
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <img src={Image} alt={title} style={{ marginRight: "10px" }} width={"150px"} height={200} />
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
      <div className="profile-card-area">
        {products.map((product) => (
          <FavoriteCard
            Image={product.productFile}
            key={product.id}
            title={product.productName}
            description={`${product.categoryName}`}
            price={`${product.productPrice} TL`}
            favoriteId={product.favoriteId}
          />
        ))}
        
      </div>

    </div>
  );
};

export default WithNavbar(FavoriListesi);
