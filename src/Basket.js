import React, { useState } from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import WithNavbar from './WithNavbar'; 


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
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Orkide",
      image: "/images/sepeturun.png",
      quantity: "1 adet",
      price: "800 TL",
    },
    {
      id: 2,
      name: "Orkide",
      image: "/images/sepeturun.png",
      quantity: "1 adet",
      price: "800 TL",
    },
    {
      id: 3,
      name: "Orkide",
      image: "/images/sepeturun.png",
      quantity: "1 adet",
      price: "800 TL",
    },
  ]); // Sepetteki ürünlerin listesi

  const [totalItems, setTotalItems] = useState(3); // Toplam ürün sayısı
  const [totalPrice, setTotalPrice] = useState(2400); // Toplam tutar

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
    {items.map((item) => (
      <React.Fragment key={item.id}>
        <tr>
          <td style={{ width: "80px", verticalAlign: "middle" }}><img src={item.image} alt={item.name} width="50" height="50" /></td>
          <td style={{ fontStyle: "italic", fontWeight: "bold", verticalAlign: "middle", width: "150px" }}>{item.name}</td>
          <td style={{ fontStyle: "italic", verticalAlign: "middle", width: "150px" }}>{item.quantity}</td>
          <td style={{ fontStyle: "italic", verticalAlign: "middle", width: "150px" }}>{item.price}</td>
        </tr>
        <tr>
          <td colSpan="4" style={{ border: "none" }}>
            <hr style={{ borderTop: "1px solid #ddd" }} />
          </td>
        </tr>
      </React.Fragment>
    ))}
  </tbody>
  <tfoot>
    <tr>
      <td style={{fontWeight:"bold",fontStyle:"italic",fontFamily:"Times New Roman"}}>Toplam:</td>
      <td></td>
      <td>{totalItems} adet</td>
      <td>{totalPrice} TL</td>
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

export default WithNavbar(Basket);
