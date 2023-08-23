import React, { useState, useEffect } from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import WithNavbar from './WithNavbar'; 
import { baseUrl } from './config/Constants';
import { getToken, getUserInfo } from "./service/AuthService";


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


const Basket = () => {

  const [items, setItems] = useState([]);

  const [totalItems, setTotalItems] = useState(); 
  const [totalPrice, setTotalPrice] = useState();
  let token = getToken();

  const [openDetailsId, setOpenDetailsId] = useState(null);

  let userInfo= getUserInfo();
  let userID= userInfo?.userId;

  const toggleDetails = (itemId) => {
    if (openDetailsId === itemId) {
      setOpenDetailsId(null);
    } else {
      setOpenDetailsId(itemId);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const fetchBaskets = async (id) => {
    try {
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
       await fetch(baseUrl+`api/Basket/BasketOfUser`,requestOptions)
       .then(response => response.json())
       .then(data => {  
        if(data.success)
        {
          setItems(data.data)
          setTotalItems(data.data.length)
          const totalPrice = data.data.reduce((total, item) => {
            const itemPrice = item.productDetailResponse.price;
            const itemTotal = item.total;
            return total + itemPrice * itemTotal;
          }, 0);
          
          setTotalPrice(totalPrice);
        }
        else{
          alert(data.message ?? "Bilinmeyen bir hata ile karşılaşıldı.")
        }
        console.log(data.data);        
       })
       .catch(error => {
         alert(error.message);
       });      
  }
  catch (error) {
    //setErrorMessage(error);
    console.error(error)
  }

};

useEffect(() => {
  const fetchData = async () => {
    await fetchBaskets(); 
  };
  fetchData();
}, []);

const handleDelete = async(id) => {
  try {  
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'DELETE',
    };
    
   await fetch(baseUrl+`api/Basket/DeleteBasket?id=${id}`,requestOptions)
    .then(response => response.json())
    .then(data => {
      if(data.success)
      {
        fetchBaskets();
      }
      else{
        alert(data?.message ?? "Bilinmeyen bir hata ile karşılaşıldı.")
      }
  
    })
    .catch(error => {
      console.error(error);
    });
  } catch (error) {
    console.error("Sepet getirilirken hata oluştu: ", error);
  }
};


const handlePieceSave = async(item, action) => {
  let total = item.total;
  if (action === "increase") {
    total += 1;
  } else if (action === "decrease" && item.total > 0) {
    total -= 1;
  }

  try {
      const basketData = {
        id:item.id,
        userId:userID,
        productId: item.productDetailResponse.id,
        total: total,
        userAddressId: item.userAddressId,
        shipmentDate: item.shipmentDate,
        cardNote: item.cardNote
      };
        
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(basketData)
      };

    await fetch(baseUrl+`api/Basket/UpdateBasket`,requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.success)
        {
          fetchBaskets();
        }
        else{
          alert(data?.message ?? "Bilinmeyen bir hata ile karşılaşıldı.")
        }
    
    })
    .catch(error => {
      console.error(error);
    });
  } catch (error) {
    console.error("Sepet getirilirken hata oluştu: ", error);
  }
};

  return (
    <div  style={{ margin: "100px" }}>
  
      
    <table className='table table-light'>
  <thead>
    <tr>
      <th style={{ color:"#893694", fontStyle:"italic", fontSize:"18px", fontFamily:"Times New Roman", fontWeight:"300"}}></th>
      <th style={{ color:"#893694", fontStyle:"italic", fontSize:"18px", fontFamily:"Times New Roman", fontWeight:"300"}} onClick={() =>('name')}></th>
      <th style={{ color:"#893694", fontStyle:"italic", fontSize:"18px", fontFamily:"Times New Roman", fontWeight:"300"}} onClick={() => ('quantity')}></th>
      <th style={{ color:"#893694", fontStyle:"italic", fontSize:"18px", fontFamily:"Times New Roman", fontWeight:"300"}} onClick={() => ('price')}></th>
    </tr>
  </thead>
  <tbody>
    {items?.map((item) => (
      <React.Fragment key={item.id}>
        <tr>
          <td style={{ width: "80px", verticalAlign: "middle" }}>
            <img src={item?.productDetailResponse?.fileResponses?.[0].fileUrl} alt={item.name} width="45%" height="45%" 
            style={{borderRadius:"10px"}}/>
          </td>
          <td style={{ fontStyle: "italic", fontWeight: "bold", verticalAlign: "middle", width: "150px" }}>
            {item?.productDetailResponse?.name}
          </td>
          <td style={{ fontStyle: "italic", verticalAlign: "middle", width: "100px" }}>{item.total} adet</td>
          <td style={{ fontStyle: "italic", verticalAlign: "middle", width: "150px" }}>{item.productDetailResponse.price} TL</td>
          <td style={{ fontStyle: "italic", fontWeight: "bold", verticalAlign: "middle", width: "20px" }}>
            <a style={{ cursor: "pointer" }} onClick={() => toggleDetails(item.id)}>
              <img src={"/images/opendetail.png"} alt="" width={12} height={12} />
            </a> </td>
          <td style={{ fontStyle: "italic", fontWeight: "bold", verticalAlign: "middle", width: "150px" }}> 
            <a style={{cursor: "pointer" }} onClick={()=>handleDelete(item.id)}>
              <img src={"/images/delete.png"} alt="" width={12} height={12} />
            </a>  
          </td>
        </tr>
        {openDetailsId === item.id && (
            <tr>
              <td colSpan="4" style={{ border: "none"}}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: "16%" }}>
                  <div style={{ marginRight: '20px' }}>
                    <p style={{ fontStyle: "italic", verticalAlign: "middle", width: "150px" }}><strong>Adres <img src="/images/edit.png" alt="" width={16} height={16} /></strong></p>
                    <p style={{ fontStyle: "italic", verticalAlign: "middle", width: "150px" }}>{item?.userAddressDetailResponseModel?.address}</p>
                  </div>
                  <div style={{ marginRight: '20px' }}>
                    <p style={{ fontStyle: "italic", verticalAlign: "middle", width: "150px" }}><strong>Adet</strong></p>
                    <p style={{ fontStyle: "italic", verticalAlign: "middle", width: "150px" }}> 
                      <a style={{cursor: "pointer" }} onClick={()=>handlePieceSave(item, "decrease")}>
                        <img src="/images/minussignicon.png" alt="Decrease" width={16} height={4} style={{ marginRight:"25px" }} />
                      </a>
                      {item.total} adet
                      <a style={{cursor: "pointer" }} onClick={()=>handlePieceSave(item, "increase")}>                  
                        <img src="/images/plusicon.png" alt="Increase" width={16} height={15} style={{ marginLeft:"25px"}} />
                      </a>
                    </p>
                  </div>
                  <div>
                    <p style={{ fontStyle: "italic", verticalAlign: "middle", width: "150px" }}><strong>Not <img src="/images/edit.png" alt="" width={16} height={16} /></strong></p>
                    <p style={{ fontStyle: "italic", verticalAlign: "middle", width: "150px" }}>{item?.cardNote ?? "Not eklemediniz."}</p>
                  </div>
                </div>
                <hr style={{ border:"none" }} />
              </td>
            </tr>
          )}
        <tr>
          <td colSpan="5" style={{ border: "none" }}>
            <hr style={{ color:"black" }} />
          </td>
        </tr>
      </React.Fragment>
    ))}
  </tbody>
  <tfoot>
    <tr>
      <td style={{fontWeight:"bold",fontStyle:"italic",fontFamily:"Times New Roman"}}>Toplam:</td>
      <td></td>
      <td style={{ fontStyle: "italic", verticalAlign: "middle", width: "150px" }}>{totalItems} adet</td>
      <td style={{ fontStyle: "italic", verticalAlign: "middle", width: "150px" }}>{totalPrice} TL</td>
    </tr>
    <tr>
    <td></td>
    <td></td>
    <td></td>
   
      <td colSpan="4">
        <button className='satinal-button'>Satın Al</button>
      </td>
    </tr>
  </tfoot>
</table>

  
      
      <div style={{marginTop: "80px"}}>
      <h1>Birlikte İyi Gider </h1>
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

export default WithNavbar(Basket);
