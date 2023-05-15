import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

export default function EditProduct() {
  
  const navigate = useNavigate();

  const location = useLocation();
  const initialProduct = location.state && location.state.product ? location.state.product : {};
  const [product, setProduct] = useState(initialProduct);
  const [productId, setProductId] = useState( product.id );

  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };
  const handleKaydet = () => {
    console.log("productSDSFDDGJJ",product);
    const { fileResponses,labelProducts,productDiscountInfo,categoryName, ...newProduct } = product;
console.log("newww",newProduct);
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

  const handleDelete =async (id) => {
    console.log("product ididddd",id);
    
    fetch(`https://api.monjardin.online/api/Product/DeleteProduct/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJlbWFpbCI6ImhpbGFsYmFzdGFuQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJIaWxhbCBCYcWfdGFuIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiYWRtaW4iLCJuYmYiOjE2ODM4OTY2NjMsImV4cCI6MTY4NjA1NjY2MywiaXNzIjoiTW9uSmFyZGluIiwiYXVkIjoiYXBpLm1vbmphcmRpbi5vbmxpbmUifQ.S7mNeJP5KuqRwzPBqCD7N87oZExLjgn0hvgFqWFK-iNCeXlVDcS7uLV1jAxxEcM84i4XcEHBWbAqKBPaG39y1w",
      },
   
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate('/AdminProductList');
      }
      )
      .catch((error) => console.error(error));
      
  };

  const fetchProduct = async (id) => {
    try {
      console.log("idddd1",id)
      const response = await fetch(`https://api.monjardin.online/api/Product/GetProductDetailByProductId/${id}`);
      const data = await response.json();
      console.log("data",data.data)
      const productData= data.data;
      setProduct(productData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // productId'yi kullanarak ilgili ürünü getirin ve setProduct ile state'i güncelleyin
    fetchProduct(productId);
  }, [productId]);


  const handleGoBack = () => {
    navigate(-1); // Bir önceki sayfaya yönlendirir
  };
  return(
    <div style={{ marginTop:"50px", paddingLeft:"50px", paddingRight:"50px" }}>
       <h1  className='baslik'>Mon Jardin</h1>

<button onClick={handleGoBack} className='back-button'><img src="/images/back-button.png" alt="" width={40} height={30}/></button>

         {product && (
        <>
        <div style={{display:"flex"}}>
            <div >
            {product.fileResponses && product.fileResponses.length > 0 && (
    <img src={product.fileResponses[0]?.fileUrl} alt={product.name}  width={300} height={300}/>
  )}            </div>
            <div style={{ display:"block",marginLeft: "20px" }}>
            <div style={{padding:"20px"}}> 
              <div style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Ürün Id:</div>
            <input
              type="text"
              name="id"
              value={product.id}
              onChange={handleInputChange}
              className="edit-input-area"
              />

              </div>
            <div style={{padding:"20px"}}>      
              <div style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>KDV Oranı:</div>
            <input
              type="text"
              name="tax"
              value={product.tax}
              onChange={handleInputChange}
              className="edit-input-area"
            /></div>
            <div style={{padding:"20px"}}>
            <div style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Ürün Rengi:</div>
            <input
              type="text"
              name="color"
              value={product.color}
              onChange={handleInputChange}
              className="edit-input-area"
            /></div>
                <div style={{padding:"20px"}}> 
              <div style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Kategori:</div>
              <input
                type="text"
                name="categoryName"
                value={product.categoryName}
                onChange={handleInputChange}
                className="edit-input-area"
              />
               </div>
            </div>
            <div style={{ display:"block", marginLeft: "20px" }}>
              <div style={{padding:"20px"}}> 
              <div style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Ürün Adı:</div>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                className="edit-input-area"
              />
              </div>
              <div style={{padding:"20px"}}> 
              <div style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Ürün Adedi:</div>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleInputChange}
                className="edit-input-area"
              />
               </div>
              <div style={{padding:"20px"}}> 
              <div style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Saksı:</div>
              <input
                type="text"
                name="saksi"
                value={product.saksi}
                onChange={handleInputChange}
                className="edit-input-area"
              />
               </div>
           
            </div>
            <div style={{ display:"block",marginLeft: "20px" }}>
            <div style={{padding:"20px"}}> 
              <div style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>QR :</div>
              <input
                type="text"
                name="barcode"
                value={product.barcode}
                onChange={handleInputChange}
                className="edit-input-area"
              />
               </div>
              <div style={{padding:"20px"}}> 
              <div style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Fiyat:</div>
              <input
                type="text"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                className="edit-input-area"
              />
               </div>
              <div style={{padding:"20px"}}> 
              <div style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>İndirim:</div>
              <input
                type="text"
                name="discountRate"
                value={product.discountRate}
                onChange={handleInputChange}
                className="edit-input-area"
              />
               </div>
            
            </div>
           

        </div>
        <div style={{ display:"block",marginTop: "50px"}}>
            <div style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Açıklaması:</div>
              <textarea
                type="text"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                style={{ padding:"10px", width:"100%" }}
              />
            </div>
        
            <button onClick={handleKaydet} className="save-button" style={{float:"right", marginTop:"30px"}}>Kaydet</button>
            <button  onClick={() => handleDelete(product.id)} className="save-button" style={{float:"right", marginTop:"30px", marginRight:"20px"}}>Sil</button>
         
        </>
    )}
  </div>
 


  );

 
}
