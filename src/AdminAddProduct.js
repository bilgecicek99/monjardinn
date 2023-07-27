import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminAddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const firebaseConfig = {
    apiKey: "AIzaSyBVljeCIm_rhZBx0522TXkNa4G4ufKoMLY",
    authDomain: "monjardin-7cc13.firebaseapp.com",
    projectId: "monjardin-7cc13",
    storageBucket: "monjardin-7cc13.appspot.com",
    messagingSenderId: "81286471664",
    appId: "1:81286471664:web:51a5c1de2c61b4551b4735",
    measurementId: "G-5BW4TRMJDR"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app); 

  const storage = getStorage();

  const handleImageUpload = async(event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
  
    if (name === 'price' || name === 'tax' || name === 'categoryId'  || name === 'discountedAmount'  || name === 'discountRate') {
      processedValue = parseInt(value, 10);
      if (isNaN(processedValue)) {
        processedValue = 0;
      }
    }
  
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: processedValue,
    }));
  };
  
  
  function handleFetchError(error) {
    if (error.response && error.response.status === 500) {
      return <p>Daha sonra tekrar deneyiniz.</p>;
    } else {
      return <p>Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.</p>;
    }
  }
  
  const fetchCategoryList = async () => {
      try {
        const response = await fetch(`http://64.227.114.199/api/Category/GetMainCategories`);
        if (!response.ok) {
          throw new Error('Kategori listesi getirilemedi. Lütfen daha sonra tekrar deneyin.');
        }
        const data = await response.json();
       // console.log("cateogryyyyyyy",data.data)
        const categoryData= data.data;
       // console.log("category",categoryData);
        setCategories(categoryData);
        //setFilteredProducts(categoryData);
      } catch (error) {
       // console.error(error);
        const errorMessage = handleFetchError(error);
       // alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        //console.log(errorMessage);
      }
  };

  const handleKaydet = async(event) => {
      event.preventDefault();
      // Check if any required fields are empty
      const requiredFields = ['name', 'tax', 'color', 'price', 'categoryId','discountRate','discountedAmount'];
      const isEmptyField = requiredFields.some((field) => {
        const value = product[field];
        return value === undefined || value === null || value === "";
      });
        
      if (isEmptyField) {
        alert('Lütfen Tüm Alanları Doldurunuz.');
      } else {

        let downloadURL = "";
      if (selectedImage) {

      // Storage'de kaydedilecek referansı oluşturun
      const storageRef = ref(storage, "images/" + selectedImage.name);
      try {
        // Resmi Storage'e yükleyin
        const snapshot = await uploadBytes(storageRef, selectedImage);
    
        // Resmin URL'sini alın
        downloadURL = await getDownloadURL(snapshot.ref);
        console.log("Resim başarıyla yüklendi. URL:", downloadURL);
      } catch (error) {
        console.error("Resim yükleme hatası:", error);
      }

     } 
     else {
        console.log("selectedImage boş veya tanımsız.");
      }
    
      const { fileResponses, labelProducts, productDiscountInfo, categoryName, ...newProduct } = product;
      const updatedProduct = {
        ...newProduct,
        stock: 0
      };
      console.log("newww", updatedProduct);
  
      fetch("http://64.227.114.199/api/Product/CreateProduct", {
        method: "POST",
        headers: {
          "Authorization": "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJlbWFpbCI6ImhpbGFsYmFzdGFuQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJIaWxhbCBCYcWfdGFuIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiYWRtaW4iLCJuYmYiOjE2ODM4OTY2NjMsImV4cCI6MTY4NjA1NjY2MywiaXNzIjoiTW9uSmFyZGluIiwiYXVkIjoiYXBpLm1vbmphcmRpbi5vbmxpbmUifQ.S7mNeJP5KuqRwzPBqCD7N87oZExLjgn0hvgFqWFK-iNCeXlVDcS7uLV1jAxxEcM84i4XcEHBWbAqKBPaG39y1w",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Değişiklikler başarıyla kaydedilmiştir.")
          navigate('/AdminProductList');
         

          // Başka bir endpointe fetch isteği yapma
          fetch("http://64.227.114.199/api/ProductFile/CreateProductFile", {
            method: "POST",
            headers: {
              "Authorization": "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJlbWFpbCI6ImhpbGFsYmFzdGFuQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJIaWxhbCBCYcWfdGFuIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiYWRtaW4iLCJuYmYiOjE2ODM4OTY2NjMsImV4cCI6MTY4NjA1NjY2MywiaXNzIjoiTW9uSmFyZGluIiwiYXVkIjoiYXBpLm1vbmphcmRpbi5vbmxpbmUifQ.S7mNeJP5KuqRwzPBqCD7N87oZExLjgn0hvgFqWFK-iNCeXlVDcS7uLV1jAxxEcM84i4XcEHBWbAqKBPaG39y1w",
              'Content-Type': 'application/json',
            },
          
            body: JSON.stringify({ productId: data.data, fileUrl: downloadURL }),
          })
            .then((response) => response.json())
            .then((responseData) => {
              // İsteğin sonucunu kullanma
              console.log("foto gitti",responseData);
            })
            .catch((error) => {
              // Hata durumunu işleme
              console.error(error);
            });
        

        })
        .catch((error) => {
          //console.error(error)
          const errorMessage = handleFetchError(error);
          //console.log(errorMessage);
        });
      }
     // console.log("productSDSFDDGJJ",product);
     
    };

  useEffect(() => {
    fetchCategoryList();
  }, []);
 
  const handleGoBack = () => {
    navigate(-1); // Bir önceki sayfaya yönlendirir
  };


  return(
    <div style={{ marginTop:"50px", paddingLeft:"50px", paddingRight:"50px" }}>
       <h1  className='baslik'>Mon Jardin</h1>
      <button onClick={handleGoBack} className='back-button' style={{marginBottom:"30px"}}><img src="/images/back-button.png" alt="" width={40} height={30}/></button>
      <>
        <div style={{display:"flex"}}>
            <div >
              <input type="file" onChange={handleImageUpload} />
              {previewImage && (
                <img src={previewImage} alt="Preview" style={{ width: "200px" }} />
              )}
             </div>
            <div style={{ display:"block",marginLeft: "100px" }}>
            <div style={{paddingTop:"20px"}}> 
              <span style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Ürün Adı:</span>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                className="edit-input-area"
              />
              </div>
              <hr/>
              <div style={{paddingTop:"20px"}}>
              <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>KDV Oranı:</span>
              <input
                type="number"
                name="tax"
                value={product.tax >= 0 ? product.tax : ''}
                min="0"
                onChange={handleInputChange}
                className="edit-input-area"
              />
            </div>
            <hr/>
            

              <div style={{paddingTop:"20px"}}>
              <span style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Ürün Rengi:</span>
              <input
                type="text"
                name="color"
                value={product.color}
                onChange={handleInputChange}
                className="edit-input-area"
              /></div>
              <hr/>
          
           
              
       
        
              <div style={{paddingTop:"20px"}}>
              <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>Fiyat:</span>
              <input
                type="number"
                name="price"
                value={product.price >= 0 ? product.price : ''}
                min="0"
                onChange={handleInputChange}
                className="edit-input-area"
              />
            </div>
            <hr/>
            

            <div style={{paddingTop:"20px"}}>
            <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>İndirim Oranı:</span>
            <input
              type="number"
              name="discountRate"
              value={product.discountRate >= 0 ? product.discountRate : ''}
              min="0"
              onChange={handleInputChange}
              className="edit-input-area"
            />
          </div>
          <hr/>

            <div style={{paddingTop:"20px"}}>
               <span style={{fontStyle:"italic", fontFamily:"Times New Roman"}}>İndirim Miktarı:</span>
               <input
                 type="number"
                 name="discountedAmount"
                 value={product.discountedAmount >= 0 ? product.discountedAmount : ''}
                 min="0"
                 onChange={handleInputChange}
                 className="edit-input-area"
               />
             </div>
             <hr/>
             


               <div style={{ paddingTop: "20px" }}>
           <span style={{ fontStyle: "italic", fontFamily: "Times New Roman" }}>Kategori:</span>
           <select
            type="number"
              name="categoryId"
             value={product.categoryId}
              onChange={handleInputChange}
              className="edit-input-area"
            >
              <option value="">Kategori Seçin</option>
              {categories.length === 0 ? (
                <option disabled>Categories is empty</option>
              ) : (
                categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>

           </div>
          
        
         
           
          </div>
          </div>
            <div style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Açıklaması:</div>
              <textarea
                type="text"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                style={{ padding:"10px", width:"100%" }}
              />
           
       
            <button onClick={handleKaydet} className="save-button" style={{float:"right", marginTop:"30px"}}>Yeni Ürün Ekle</button>
         
        </>
    
    
    </div>
 


  );

 
}


/*
 <div style={{padding:"20px"}}> 
              <span style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Ürün Adedi:</span>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleInputChange}
                className="edit-input-area"
              />
               </div>
               <hr/>


            <button  onClick={() => confirmDelete(product.id)} className="save-button" style={{float:"right", marginTop:"30px", marginRight:"20px"}}>Sil</button>

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
              <div style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Kategori:</div>
              <input
                type="text"
                name="categoryName"
                value={product.categoryName}
                onChange={handleInputChange}
                className="edit-input-area"
              />
               </div>
*/