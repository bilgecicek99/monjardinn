import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../config/Constants';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {getToken} from "../service/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditBlog() {

  const location = useLocation();
  const [blog, setBlog] = useState(location.state.blog);
  
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
const [selectedImage, setSelectedImage] = useState(null);

const navigate = useNavigate();
const [previewImage, setPreviewImage] = useState(null);


useEffect(() => {
    const fetchBlogById = async () => {
      try {
  
        const response = await fetch(baseUrl+`api/Blog/GetBlogDetailById/${blog}`);
        
        // Başarılı yanıtın kontrolü
        if (response.ok) {
          const data = await response.json();
          const productData = data.data;
          setBlog(productData);
        } else {
          showToastError("Sunucudan geçersiz bir yanıt alındı.")
          // throw new Error("Sunucudan geçersiz bir yanıt alındı.");
        }
      } catch (error) {
        showToastError("Sunucudan geçersiz bir yanıt alındı.")
        // console.error("fetch hatası:", error);
        // Kullanıcıya hata mesajını göstermek veya uygun bir işlem yapmak için gerekli kodları burada ekleyebilirsiniz
      }
    };
    fetchBlogById();
  }, []);



  const handleGoBack = () => {
    navigate(-1); // Bir önceki sayfaya yönlendirir
  };

  function showToastError(message, duration = 3000) {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }

  function showToastSuccess(message, duration = 2000) {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }

  const handleKaydet =async () => {

    const requiredFields = ['title', 'description'];

    const isNonBlogEmpty = requiredFields.some((field) => {
      const value = blog[field];
      return value === undefined || value === null || value === '' || (typeof value === 'number' && isNaN(value));
    });

    if (isNonBlogEmpty) {
      showToastError('Lütfen Başlık ve Açıklama Alanlarını Doldurunuz.');
      return;
    }

    const descriptionValue = blog['description'];
    if (typeof descriptionValue === 'string' && descriptionValue.length < 200) {
      showToastError('Açıklama alanı en az 200 karakter olmalıdır.');
      return;
    }

    let downloadURL = "";
    if (selectedImage) {
      const storageRef = ref(storage, "images/" + selectedImage.name);
       // Deği
      try {
        // Resmi Storage'e yükleyin
        const snapshot = await uploadBytes(storageRef, selectedImage);
    
        // Resmin URL'sini alın
        downloadURL = await getDownloadURL(snapshot.ref);
      } catch (error) {
        showToastError('Resim yüklenirken hata ile karşılaşıldı.');

    }
  } 

  function handleFetchError(error) {
    if (error.response && error.response.status === 500) {
      return <p>Daha sonra tekrar deneyiniz.</p>;
    } else {
      return <p>Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.</p>;
    }
  }

  const token = getToken();
  fetch(baseUrl+"api/Blog/UpdateBlog", {
      method: "PUT",
      headers: {
        "Authorization":  `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    })
      .then((response) => response.json())
      .then((data) => {
        showToastSuccess('Değişiklikler başarıyla kaydedilmiştir.');
        setTimeout(() => {
          navigate("/adminallblog");
        }, 2000);

        if (selectedImage) {
          if(blog.fileResponses.length>0)
          {
            fetch(baseUrl+"api/BlogDetail/UpdateBlogDetail", {
              method: "PUT",
              headers: {
              Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            
              body: JSON.stringify({ id:blog.fileResponses[0].id,blogId:blog.id, fileUrl: downloadURL }),
            })
              .then((response) => response.json())
              .then((responseData) => {

              })
              .catch((error) => {
                showToastError('Resim yüklenirken hata ile karşılaşıldı.');
              });
          }
         else{
          fetch(baseUrl + "api/BlogDetail/CreateBlogDetail", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ blogId: blog.id, fileUrl: downloadURL }),
          })
            .then((response) => response.json())
            .then(responseData => {
             
            })
            .catch((error) => {
              showToastError('Resim yüklenirken hata ile karşılaşıldı.');
            }); 
         }
           
        }
      })
      .catch((error) => {
       const errorMessage = handleFetchError(error);
      });
  };
  const handleInputChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
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
  

  return (
    <div style={{margin:"100px"}}>
            <ToastContainer />
  <button onClick={handleGoBack} className='back-button' style={{marginBottom:"30px"}}><img src="/images/back-button.png" alt="" width={40} height={30}/></button>

      <div style={{ backgroundColor: "#E7D1EA", padding: "40px" }}>
      <h1 style={{float:"left",fontSize:"40px", fontWeight:"bold", fontFamily:"Times New Roman", border:"1px solid black"}}>
        <input
                type="text"
                name="title"
                value={blog.title}
                onChange={handleInputChange}
                className="edit-input-area"
                style={{background:"transparent"}}

              />
          
        </h1>
        <div style={{marginTop:"80px", position:"relative"}}>
        <div>
  {selectedImage ? (
    <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ width: "100px" }} />
  ) : blog.fileResponses && blog.fileResponses.length > 0 ? (
    <img src={blog.fileResponses[0]?.fileUrl} alt={blog.name} width={300} height={300} />
  ) : null}
</div>
<input type="file" onChange={handleImageUpload} />

{!selectedImage && !previewImage && (
  <img src={previewImage} alt="Preview" style={{ width: "100px" }} />
)}

          <img src="/images/blogduzen.png" alt="Blogduzen alt" width={200} height={200}/> 
          <img src="/images/cam.png" alt="Blogduzen ust" style={{position:"absolute", top:"50%", left:"35%" , transform:"translate(-50%, -50%)"}}/> 
        </div>
          <textarea
                name="description"
                style={{width: "100%", maxWidth:"1250px",height:"auto",height: "150px", border: "2px solid black", background: "transparent", marginTop: "25px"}}
                rows="10"
                cols="40"
                value={blog.description}
                onChange={handleInputChange}
              />
      </div>
      <button onClick={handleKaydet} className="save-button" style={{float:"right", marginTop:"30px"}}>Kaydet</button>

    </div>
  );
}
