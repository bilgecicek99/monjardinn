import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getUser,getToken,resetUserSession,getUserInfo } from "./service/AuthService";
import { baseUrl } from './config/Constants';

function Stock() {
  const [productList, setProductList] = useState([]);

  const token = getToken();


  const handleIncreaseStock = (id) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === id ? { ...product, stock: parseInt(product.stock, 10) + 1 } : product
      )
    );
    console.log(productList)

  };
  
  const handleDecreaseStock = (id) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === id ? { ...product, stock: parseInt(product.stock, 10) - 1 } : product
      )
    );
    console.log(productList)
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Bir önceki sayfaya yönlendirir
  };

  const handleStockUpdate = (product) => {
    console.log("pro",product)
    const { fileResponses,labelProducts,productDiscountInfo,categoryName, ...newProduct } = product;
    console.log("newww",newProduct);
    // console.log("product",product);
    fetch(baseUrl+"api/Product/UpdateProduct", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const fetchProductList = async () => {
    try {
      const response = await fetch(baseUrl+`api/Product/GetAllProducts`);
      const data = await response.json();
      console.log("data",data.data)
      const productData= data.data;
      setProductList(productData);  
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

   
  const handleInputChange = (event, id) => {
    const input = event.target;
    const value = input.value;
  
  if (!isNaN(value)) {
    console.log(value)
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === id ? { ...product, stock: value } : product
      )
    );
  } else { 
    event.preventDefault();
  } 
  };
  
  return (
    <div style={{margin:"50px"}}>
  <h1  className='baslik'>Mon Jardin</h1>

<button onClick={handleGoBack} className='back-button'><img src="/images/back-button.png" alt="" width={40} height={30}/></button>
    <table className='table table-light'>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {productList.map((product) => (
          <tr key={product.id}>
            <td style={{verticalAlign:"middle", width:"300px"}}>
             <img src={product.fileResponseModel[0]?.fileUrl} alt={productList.name} width={128} height={128} />
            </td>
            <td style={{fontStyle:"italic", fontWeight:"bold", verticalAlign:"middle", width:"300px"}}>{product.id}</td>
            
            <td style={{verticalAlign:"middle", width:"500px"}}>
              <button className="stock-button" onClick={() => handleDecreaseStock(product.id)}>-</button>
               <input
                  key={product.id}
                  type="text"
                  name={`productStock_${product.id}`}
                  value={product.stock}
                  onChange={(event) => handleInputChange(event, product.id)}
                  className="stock-count"
                />
              <button className="stock-button" onClick={() => handleIncreaseStock(product.id)}>+</button>
            </td>
            <td style={{verticalAlign:"middle" , fontSize:"30px" , fontWeight:"bold", width:"300px"}}> 
            <img src="/images/check.png" alt="" width={30} height={30}onClick={() => handleStockUpdate(product)} /> </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default Stock;

