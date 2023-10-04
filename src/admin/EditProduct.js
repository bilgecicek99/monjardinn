import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getUser,
  getToken
} from "../service/AuthService";
import { baseUrl } from '../config/Constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();
 // const initialProduct = location.state && location.state.product ? location.state.product : {};
  const initialProduct = location.state && location.state.product ? location.state.product : { id: 10, name: "", price: 0, categoryId: 0 };

  const [product, setProduct] = useState(initialProduct);
  const [productId, setProductId] = useState(product.id);
  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const token = getToken();

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

  const storage = getStorage();


  const handleInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
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
        const response = await fetch(baseUrl+`api/Category/GetMainCategories`);
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

  const handleKaydet =async () => {
    let downloadURL = "";
    if (selectedImage) {
      const storageRef = ref(storage, "images/" + selectedImage.name);
       // Deği
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
  if(!selectedImage && product.fileResponses.length===0)
  {
    toast.error("Lütfen resim ekleyiniz.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
    return null;
  }
  const { fileResponses,labelProducts,productDiscountInfo,categoryName, ...newProduct } = product;
  const token = getToken();
  fetch(baseUrl+"api/Product/UpdateProduct", {
      method: "PUT",
      headers: {
        "Authorization":  `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate('/AdminProductList');
        if(data.success)
        {
           toast.success('Değişiklikler başarıyla kaydedilmiştir.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });}
        else{
          toast.error(data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
        
       
        if (selectedImage) {
        fetch(baseUrl+"api/ProductFile/CreateProductFile", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        
          body: JSON.stringify({ productId:product.id, fileUrl: downloadURL }),
        })
          .then((response) => response.json())
          .then((responseData) => {
            if(responseData.success)
            {
              toast.success(responseData.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
            }
            else{
              toast.error(responseData.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
            }
            // İsteğin sonucunu kullanma
            console.log("foto gitti",responseData);
          })
          .catch((error) => {
            // Hata durumunu işleme
            console.error(error);
          });
        }
        else{
          console.log("Yeni foto yok")
        }
      })
      .catch((error) => {
        //console.error(error)
        const errorMessage = handleFetchError(error);
        console.log(errorMessage);
      });
  };

  const handleDelete = async (id) => {
   // console.log("product id", id);
  
    fetch(baseUrl+`api/Product/DeleteProduct/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
       // console.log(data);
        navigate('/AdminProductList');
      })
      .catch((error) => {
      //  console.error(error)
        const errorMessage = handleFetchError(error);
      //  console.log(errorMessage);
      });
  };
  
  const fetchProduct = async (id) => {
    try {
     // console.log("id", id)
      const response = await fetch(baseUrl+`api/Product/GetProductDetailByProductId/${id}`);
      if (!response.ok) {
        throw new Error('Kategori listesi getirilemedi. Lütfen daha sonra tekrar deneyin.');
      }
      const data = await response.json();
     // console.log("data", data.data)
      const productData = data.data;
      setProduct(productData);
    } catch (error) {
     // console.error(error);
      const errorMessage = handleFetchError(error);
     //alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.'); 
     // console.log(errorMessage);
    }
  };
  
  useEffect(() => {
    fetchProduct(productId);
    fetchCategoryList();
  }, [productId]);
  
  const confirmDelete = () => {
    const result = window.confirm("Ürünü Silmek İstediğinize Emin Misiniz?");
    if (result) {
      handleDelete(productId);
    }
  };
  
  const handleGoBack = () => {
    navigate(-1); // Bir önceki sayfaya yönlendirir
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  

  return(
    <div style={{ marginTop:"50px", paddingLeft:"50px", paddingRight:"50px" }}>
       <ToastContainer />
       <h1  className='baslik'>Mon Jardin</h1>

<button onClick={handleGoBack} className='back-button' style={{marginBottom:"30px"}}><img src="/images/back-button.png" alt="" width={40} height={30}/></button>

         {product && (
        <>
        <div style={{display:"flex"}} className="add-product-area">
        <div>
  {selectedImage ? (
    <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ width: "100px" }} />
  ) : product.fileResponses && product.fileResponses.length > 0 ? (
    <img src={product.fileResponses[0]?.fileUrl} alt={product.name} width={300} height={300} />
  ) : null}
</div>
<input type="file" onChange={handleImageUpload} />

{!selectedImage && !previewImage && (
  <img src={previewImage} alt="Preview" style={{ width: "100px" }} />
)}
            <div style={{ display:"block",marginLeft: "100px" }} className="add-product-area-items">
            
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
                <span style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>KDV Oranı:</span>
              <input
                type="number"
                name="tax"
                value={product.tax}
                onChange={handleInputChange}
                className="edit-input-area"
              /></div>
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
              <span style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>Fiyat:</span>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                className="edit-input-area"
              />
               </div>
               <hr/>


               <div style={{ paddingTop: "20px" }}>
           <span style={{ fontStyle: "italic", fontFamily: "Times New Roman" }}>Kategori:</span>
           <select
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
           
       
            <button onClick={handleKaydet} className="save-button" style={{float:"right", marginTop:"30px"}}>Kaydet</button>
         
        </>
    )}
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