import React, { useState, useEffect } from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import WithNavbar from './WithNavbar'; 
import { baseUrl } from './config/Constants';
import { getToken, getUserInfo } from "./service/AuthService";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Basket = () => {

  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(); 
  const [totalPrice, setTotalPrice] = useState();
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
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
  const calculateTotals = () => {
    let toplamUrun = 0;
    let toplamFiyat = 0;
  
    for (const urun of items) {
      toplamUrun += urun.total; // Add the quantity of each item to the total count
      toplamFiyat += urun.total * urun.productDetailResponse.price; // Sum up the total price of all items
    }
  
    return { toplamUrun, toplamFiyat };
  };
  const fetchBaskets = async (id) => {
    try {
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      await fetch(baseUrl + `api/Basket/BasketOfUser`, requestOptions)
      .then(response => response.json())
      .then(data => {  
        if(data.success)
        {
          setItems(data.data)
         
      let totalItemCount = 0;
      const totalPrice = data.data.reduce((total, item) => {
        totalItemCount += item.total;
        const itemPrice = item.productDetailResponse.price;
        const itemTotal = item.total;
        return total + itemPrice * itemTotal;
      }, 0);
      setTotalItems(totalItemCount);
      setTotalPrice(totalPrice);  
        }
        else{
         // alert(data.message ?? "Bilinmeyen bir hata ile karşılaşıldı.")
        }
        console.log(data.data);        
       })
       .catch(error => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        
       });      
  }
  catch (error) { 
    console.error(error)
  }

};

useEffect(() => {
  const fetchData = async () => {
    await fetchBaskets(); 
  };
  fetchData();
}, []);

const handleDelete = async (id) => {
  try {
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    };

    const response = await fetch(baseUrl + `api/Basket/DeleteBasket?id=${id}`, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP hata: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      // Silme işlemi başarılı oldu, şimdi sepet verilerini güncelleyin
      const updatedBasket = items.filter(item => item.id !== id);

      // Calculate total items and total price for the updated basket
      let totalItemCount = 0;
      const totalPrice = updatedBasket.reduce((total, item) => {
        totalItemCount += item.total; // Sum up the quantities of all items
        const itemPrice = item.productDetailResponse.price;
        const itemTotal = item.total;
        return total + itemPrice * itemTotal;
      }, 0);

      setItems(updatedBasket);
      setTotalItems(totalItemCount);
      setTotalPrice(totalPrice);
    } else {
      // API'den başarısız bir yanıt geldiyse burada uygun bir işlem yapın
      console.error(data?.message || "Bilinmeyen bir hata ile karşılaşıldı.");
    }
  } catch (error) {
    console.error("Sepet getirilirken veya silinirken hata oluştu: ", error);
  }
  setIsDeleteConfirmationVisible(false);
};


const navigate = useNavigate();
const goHomePage = () => {
  navigate('/');
};
const goLoginPage = () => {
  navigate('/login');
};

const handlePieceSave = async (item, action) => {
  let total = item.total;
  if (action === "increase") {
    total += 1;
  } else if (action === "decrease" && total > 0) {
    total -= 1;
  }
  console.log("Item:", item);
  console.log("Modified Total:", total);
  try {
    const basketData = {
      id: item.id,
      userId: userID,
      productId: item.productDetailResponse.id,
      total: total,
      userAddressId: item.userAddressId,
      shipmentDate: item.shipmentDate,
      cardNote: item.cardNote,
    };
    console.log(basketData);
        
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(basketData),
    };


    await fetch(baseUrl + `api/Basket/UpdateBasket`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        fetchBaskets();
        const { toplamUrun, toplamFiyat } = calculateTotals();
    setTotalItems(toplamUrun);
    setTotalPrice(toplamFiyat);
      } else {
        //alert(data?.message ?? "Bilinmeyen bir hata ile karşılaşıldı.");
      }

    })
    .catch((error) => {
      console.error(error);
    });
} catch (error) {
  console.error("Sepet güncellenirken hata oluştu: ", error);
}
};

  return (
    <div className="mobile-generic-css"  style={{ margin: "5% 20%"}}>
        <ToastContainer />
        {token ? (
     
          <>
          {items?.length > 0 ? (  <table className='table table-light'>
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
                    <td style={{  verticalAlign: "middle", padding:0,width:"250px"}}>
                    <img src={ item?.productDetailResponse?.fileResponses?.[0]?.fileUrl || "images/monjardinlogo.png"}  alt={item.name} className="basket-image" 
                    />
                    </td>
                    <td style={{ fontStyle: "italic", fontWeight: "bold", verticalAlign: "middle", padding:0 }}>
                      {item?.productDetailResponse?.name}
                    </td>
                    <td style={{ fontStyle: "italic", verticalAlign: "middle",  padding:0 }}>{item.total} adet</td>
                    <td style={{ fontStyle: "italic", verticalAlign: "middle",  padding:0 }}>{item.productDetailResponse.price} TL</td>
                    <td style={{ fontStyle: "italic", fontWeight: "bold", verticalAlign: "middle", padding:0  }}> 
                      <a style={{cursor: "pointer" }}  onClick={() => setIsDeleteConfirmationVisible(true)}>
                        <img src={"/images/delete.png"} alt="" className="basket-delete-image" />
                      </a> 
                      {isDeleteConfirmationVisible && (
                              <div className="delete-confirmation-overlay">
                                <div className="delete-confirmation-box">
                                  <p>Silmek istediğinize emin misiniz?</p>
                                  <button onClick={()=>handleDelete(item.id)}>Evet</button>
                                  <button onClick={() => setIsDeleteConfirmationVisible(false)}>Hayır</button>
                                </div>
                              </div>
                            )} 
                    </td>
                  </tr>
                
                  <tr>
                    <td colSpan="5" style={{ border: "none",padding:0 }}>
                      <hr style={{ color:"black" }} />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="toplamtext" >Toplam:</td>
                <td></td>
                <td style={{ fontStyle: "italic", verticalAlign: "middle", width: "150px",fontSize:"18px" }}>{totalItems} adet</td>
                <td style={{ fontStyle: "italic", verticalAlign: "middle", width: "150px" ,fontSize:"18px"}}>{totalPrice} TL</td>
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
            ) : (
            <div style={{ textAlign: 'center',marginTop:"270px" }}>
              <p className="basket-no-product">Sepetinizde ürün bulunmamaktadır.</p>
              <button className="basket-no-product-button" onClick={goHomePage}>
                Alışverişe devam et
              </button>
            </div>
          )}
          </>
          ) : (
          <>
           <div style={{ textAlign: 'center',marginTop:"270px" }}>
              <p className="basket-no-product">Bu özelliği kullanmak için giriş yapmanız gerekmektedir.</p>
              <button className="basket-no-product-button" onClick={goLoginPage}>
              Giriş Yap
              </button>
            </div>
          </>
        )}
  </div>
      
    

    
  );
};

export default WithNavbar(Basket);



 /* {openDetailsId === item.id && (
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
          
          
          
            <td style={{ fontStyle: "italic", fontWeight: "bold", verticalAlign: "middle", width: "20px" }}>
            <a style={{ cursor: "pointer" }} onClick={() => toggleDetails(item.id)}>
              <img src={"/images/opendetail.png"} alt="" width={12} height={12} />
            </a> </td> 
            
            */


               
      /* <div style={{marginTop: "80px"}}>
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