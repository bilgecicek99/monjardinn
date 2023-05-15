import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Stock() {
 /* const [products, setProducts] = useState([
    { id: 1, name: "Ürün 1", image: "/images/orkide.png", stockCode: "000001", stockCount: 15 },
    { id: 2, name: "Ürün 2", image: "/images/orkide.png", stockCode: "000001", stockCount: 15 },
    { id: 3, name: "Ürün 3", image: "/images/orkide.png", stockCode: "000001", stockCount: 15 },
    { id: 4, name: "Ürün 3", image: "/images/orkide.png", stockCode: "000001", stockCount: 15 },
    { id: 5, name: "Ürün 3", image: "/images/orkide.png", stockCode: "000001", stockCount: 15 },
    { id: 6, name: "Ürün 3", image: "/images/orkide.png", stockCode: "000001", stockCount: 15 },
    { id: 7, name: "Ürün 3", image: "/images/orkide.png", stockCode: "000001", stockCount: 15 },
  ]);
  */

  const [productList, setProductList] = useState([]);



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
    fetch("https://api.monjardin.online/api/Product/UpdateProduct", {
      method: "PUT",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJlbWFpbCI6ImhpbGFsYmFzdGFuQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJIaWxhbCBCYcWfdGFuIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiYWRtaW4iLCJuYmYiOjE2ODM4OTY2NjMsImV4cCI6MTY4NjA1NjY2MywiaXNzIjoiTW9uSmFyZGluIiwiYXVkIjoiYXBpLm1vbmphcmRpbi5vbmxpbmUifQ.S7mNeJP5KuqRwzPBqCD7N87oZExLjgn0hvgFqWFK-iNCeXlVDcS7uLV1jAxxEcM84i4XcEHBWbAqKBPaG39y1w",
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
      const response = await fetch(`https://api.monjardin.online/api/Product/GetAllProducts`);
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

