import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WithNavbar from '../WithNavbar'; 
import {getEmail, getToken, getUserInfo, setUserInfo,resetUserSession} from "../service/AuthService";
import { baseUrl } from '../config/Constants';
import { useNavigate } from 'react-router-dom';


const Order = () => {
    
  const location = useLocation();
  const { items, totalItems, totalPrice } = location.state || { items: [], totalItems: 0, totalPrice: 0 };
  const [addresses, setAddresses] = useState([]); // Kullanıcının adreslerini saklamak için state
  const [selectedAddress, setSelectedAddress] = useState(null); // Seçili adresi saklamak için state
  const [errorAddressMessage, setErrorAddressMessage] = useState(null);
  const [checked, setChecked] = useState(false); // Checkbox durumunu saklamak için state
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [taksitler, setTaksitler] = useState([
    { taksit: 3, fiyat: 100 }, // 3 aylık taksit seçeneği ve fiyatı
    { taksit: 6, fiyat: 200 }, // 6 aylık taksit seçeneği ve fiyatı
    { taksit: 12, fiyat: 350 } // 12 aylık taksit seçeneği ve fiyatı
  ]);
  const [selectedTaksit, setSelectedTaksit] = useState(null); // Seçilen taksit seçeneğini saklamak için state
  const [isAdsressDetailVisible, setIsAdsressDetailVisible] = useState(false);

  const navigate = useNavigate();

  const goHomePage = () => {
    navigate('/');
  };
  const token = getToken(); 
  const userInfo = getUserInfo(); 
  const userID = userInfo?.userId; 
  let userEmail= getEmail();

  const handleBuyClick = () => {
    const orderData = {
      userId: userID,
      subtotal: totalPrice,
      totalAmount: totalPrice + kargoFiyati,
      totalNumber: totalItems,
      emailOfOrder: userEmail,
      orderDetailRequestModels: sortedItems.map((item) => {
        return {
          productId: item.id,
          productName: item.productDetailResponse.name,
          total: item.total,
          amount: item.productDetailResponse.price,
          userAddressId: item.userAddressId,
          cardNote: item.cardNote,
          shipmentDate: item.shipmentDate,
          address: item.userAddressId,
          shippingFee: item.shipmentFee,
          tax: item.productDetailResponse.tax
        };
      }),
    };
    console.log("orderData: ", JSON.stringify(orderData, null, 2));

   // createOrder(orderData);
    setIsAdsressDetailVisible(true);
  };
 
  const createOrder = async (orderData) => {
    try {
      const token = getToken(); 
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData), 
      };
  
      const response = await fetch(baseUrl+`api/Order/CreateOrder`, requestOptions);
  
      if (response.ok) {
        console.log("Sipariş başarıyla oluşturuldu!");
      } else {
        console.error("Sipariş oluşturulurken hata oluştu!");
      }
    } catch (error) {
      console.error("Sipariş oluşturulurken beklenmeyen bir hata oluştu: ", error);
    }
  };
  
  const kargoFiyati = items.reduce((totalShipmentFee, item) => {
    return totalShipmentFee + item.shipmentFee;
  }, 0);

  const sortedItems = items.sort((a, b) => a.productDetailResponse.name.localeCompare(b.productDetailResponse.name));

  useEffect(() => {
    const token = getToken(); // getToken fonksiyonunuzdan tokeni alın
    const userInfo = getUserInfo(); // getUserInfo fonksiyonunuzdan kullanıcı bilgilerini alın
    const userID = userInfo?.userId; // Kullanıcı ID'sini alın

    
    
    const fetchUserAddress = async () => {
      try {
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await fetch(`${baseUrl}api/UserAddress/GetAllUserAddressByUserId/?userId=${userID}`, requestOptions);
        const data = await response.json();

        if (data.data.length === 0) {
          setErrorAddressMessage("Kayıtlı adres bulunamamıştır.");
        } else {
            setAddresses(data.data);
        }
      } catch (error) {
        console.error("Adres verileri getirilirken hata oluştu: ", error);
        // Hata durumunda bildirim gösterme
        toast.error('Adres verileri getirilirken hata oluştu');
      }
    };

    fetchUserAddress(); // Adresleri getirmek için çağrı yapın

  }, []);
  const handleClosePopup = () => {
    setIsAdsressDetailVisible(false);
  };

  return (
    <div className="mobile-generic-css"  style={{ margin: "5% 10%"}}>
    <ToastContainer />
    
    <div className='order-responsive-main'>
    <div  className='order-responsive-products' >
  {/* Ürünler */}
    <div>
      {sortedItems.length > 0 ? (
        <table className='table table-light'>
         
         <tbody>
  {sortedItems.map(item => (
    <tr key={item.id}>
      <td>
        <img
          src={item.productDetailResponse.fileResponses[0]?.fileUrl || "images/monjardinlogo.png"}
          alt={item.productDetailResponse.name}
          className="basket-image"
        />
      </td>
      <td style={{ fontStyle: "italic", verticalAlign: "middle", padding: 0 }}>{item.productDetailResponse.name}</td>
      <td style={{ fontStyle: "italic", verticalAlign: "middle", padding: 0 }}>{item.total} adet</td>
      <td style={{ fontStyle: "italic", verticalAlign: "middle", padding: 0 }}>{item.productDetailResponse.price} TL</td>
      <td style={{ fontStyle: "italic", verticalAlign: "middle", padding: 0 }}>+ {item.shipmentFee} TL Kargo</td>
    </tr>
  ))}
    </tbody>
       <tfoot>
  <tr>
    <td className="toplamtext">Ara Toplam:</td>
    <td></td>
    <td style={{ fontStyle: "italic", verticalAlign: "middle", width: "150px", fontSize: "18px" }}>{totalItems} adet</td>
    <td></td>
    <td style={{ fontStyle: "italic", verticalAlign: "middle", width: "150px", fontSize: "18px" }}>{totalPrice} TL</td>
  </tr>
  <tr style={{borderBottom: "1px solid #ccc"}}> 
    <td className="toplamtext" >Kargo:</td>
    <td></td>
    <td></td>
    <td></td>
    <td style={{ fontStyle: "italic", verticalAlign: "middle", width: "150px", fontSize: "18px" }}>{kargoFiyati} TL</td>
  </tr>
  <tr>
    <td className="toplamtext">Toplam:</td>
    <td></td>
    <td style={{ fontStyle: "italic", verticalAlign: "middle", width: "150px", fontSize: "18px" }}>{totalItems} adet</td>
    <td></td>
    <td style={{ fontStyle: "italic", verticalAlign: "middle", width: "150px", fontSize: "18px" }}>{totalPrice + kargoFiyati} TL</td>
  </tr>
</tfoot>
</table>
 ) : (
    <p>Sepetinizde ürün bulunmamaktadır.</p>
  )}
    </div>

    {/* Fatura Adresi */}
    <div style={{ marginTop: '20px', border: '.5px solid black', borderRadius: '5px', padding:"5px" }}>
    <select
        onChange={(e) => setSelectedAddress(e.target.value)}
        value={selectedAddress}
        style={{
        width: '100%',
        height: '40px',
        fontSize: '16px',
        border: 'none', // Seçim kutusunun kendisindeki çerçeveyi kaldırmak için
        outline: 'none', // Seçim kutusuna odaklandığında çerçeveyi kaldırmak için
        }}
    >
        <option value={null}>Fatura Adresi Seçiniz</option>
        {addresses.map((address) => (
        <option key={address.id} value={address.id}>
            {address.addressTitle}
        </option>
        ))}
    </select>
    {errorAddressMessage && <p className="message">{errorAddressMessage}</p>}
    </div>
    </div>

    <div className='order-responsive-credit-card' >
    {/* Kart Bilgileri */}
        <div style={{ marginTop: "60px" }}>
    <div style={{ color: "#893694", fontWeight: "bold", fontFamily: "times", fontSize: "20px" }}>Kart Bilgileriniz </div>
    <div style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
        <input
        placeholder="Kart Üzerindeki Ad Soyad"
        type="text"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        style={{ marginLeft: "10px", fontStyle: "italic", color: "black", width: "100%" }}
        />
    </div>
    <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <input
        placeholder="Kart Numarası"
        type="text"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        style={{ marginLeft: "10px", fontStyle: "italic", color: "black", width: "100%" }}
        />
    </div>
    <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <input
        placeholder="Ay/Yıl"
        type="text"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        style={{ marginLeft: "10px", fontStyle: "italic", color: "black", width: "50%" }}
        />
        <input
        placeholder="CVV"
        type="text"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        style={{ marginLeft: "10px", fontStyle: "italic", color: "black", width: "50%" }}
        />
    </div>
        </div>
    {/* Taksit Seçenekleri */}
    <div style={{ marginTop: '50px' }}>
            <div style={{ color: "#893694", fontWeight: "bold", fontFamily: "times", fontSize: "20px" }}>Taksit Seçenekleri </div>
            <div>
            {taksitler.map((taksitOption, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", marginTop: "10px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                <input
                    type="radio"
                    id={`taksit-${taksitOption.taksit}`}
                    name="taksit"
                    value={taksitOption.taksit}
                    checked={selectedTaksit === taksitOption.taksit}
                    onChange={() => setSelectedTaksit(taksitOption.taksit)}
                    style={{ marginRight: "10px" }}
                />
                <label style={{ fontWeight: "bold", fontFamily: "times", fontStyle: "italic", marginRight: "10px" }} htmlFor={`taksit-${taksitOption.taksit}`}>{taksitOption.taksit} Ay Taksit - </label>
                <span style={{ fontStyle: "italic" }}>{taksitOption.fiyat} TL</span>

                </div>
            ))}
            </div>
        </div>

    </div>
    </div>
  
    {/* Sözleşmeler */}
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: '20px' }}>
        <div style={{ boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)", padding: "20px", flex: 1, marginRight: "10px" , overflowY: "auto", maxHeight: "300px"}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
        <div style={{ boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)", padding: "20px", flex: 1,overflowY: "auto", maxHeight: "300px"  }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
 
        </div>
      </div>
      <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
        <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} style={{ marginRight: "10px" }} />
        <p style={{ margin: 0 }}>Sözleşmeleri okudum ve onaylıyorum</p>
      </div>
    

      <button className='satinal-button' style={{float:"right", marginTop:"20px"}} onClick={handleBuyClick}>Satın Al</button>
      {isAdsressDetailVisible && (
        <div className="address-detail-overlay">
          <div className="address-detail-box">
                   <a
                    style={{cursor: "pointer",float:"right",marginTop: "-15px" }}
                    onClick={handleClosePopup}
                  >
                    <img src={"/images/delete.png"} alt="" width={15} height={15} />
                  </a>
                  <div style={{textAlign:"center"}}>
                  <img src={"/images/succesorder.png"} alt="" width="50%"/>
            <p className="address-detail-box-text" style={{marginTop:"25px"}}><span style={{fontStyle:"italic"}}>#d2334 sipariş numaranızdan kontrol edebilirsiniz. </span> </p>
            <button className="basket-no-product-button" style={{float:"right"}} onClick={goHomePage}>
                Alışverişe devam et
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default WithNavbar(Order);

