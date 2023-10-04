import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
//import Admincard from './Admincard';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getUser,getToken,resetUserSession,getUserInfo } from "../service/AuthService";
import { baseUrl } from '../config/Constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditCategory() {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [savedCategory, setSavedCategory] = useState(null);
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

   
  const fetchCategoryList = async () => {
    try {
      const response = await fetch(baseUrl+`api/Category/GetMainCategories`);
      if (!response.ok) {
        throw new Error('Kategori listesi getirilemedi. Lütfen daha sonra tekrar deneyin.');
      }
      const data = await response.json();
      const categoryData = data.data;
      setCategoryList(categoryData);
    } catch (error) {
      console.error(error);
      toast.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
     
    }
  };
  useEffect(() => {
    fetchCategoryList();
  }, []);


  function Admincard( { cards }) {
  
    const Cardx = ({ fileUrl, name, id, data, click }) => {
      const [isEditing, setIsEditing] = useState(false);
      const [editedName, setEditedName] = useState(name);
      const [previewImageEdit, setPreviewImageEdit] = useState(null);
      const [selectedFile, setSelectedFile] = useState(null);
      const [product, setProduct] = useState("");
      const [selectedImageEdit, setSelectedImageEdit] = useState(null);
   
      
      const handleEditClick = () => {
        setIsEditing(true);
        console.log("item",fileUrl);

      };
    
      const handleCancelClick = () => {
        setIsEditing(false);
      };
    
      const handleSaveClick =async (event) => {
    
        let updatedProduct = "";    
        console.log(previewImageEdit);
        if(selectedImageEdit===null && !fileUrl)
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
        if(previewImageEdit){
          let downloadURL = "";     
          if (selectedImageEdit) {  
          const storageRef = ref(storage, "images/" + selectedImageEdit.name);    
          try {
            // Resmi Storage'e yükleyin
            const snapshot = await uploadBytes(storageRef, selectedImageEdit);
        
            // Resmin URL'sini alın
            downloadURL = await getDownloadURL(snapshot.ref);
            console.log("Resim başarıyla yüklendi. URL:", downloadURL);
          } catch (error) {
            console.error("Resim yükleme hatası:", error);
          }
          } 
          else {                
            toast.error("Lütfen resim ekleyiniz.", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            return null;
          }
      
          
          updatedProduct = {
            ...product,
            name: editedName,
            id: id,
            parentId: null,
            fileurl:downloadURL
          };
          console.log("pro",updatedProduct);
         
        }
        else{
         updatedProduct = {
            ...product,
            name: editedName,
            id: id,
            parentId: null,
            fileurl:fileUrl
          };
          console.log("pro",updatedProduct);
        }
        setIsEditing(false);

        fetch(baseUrl+"api/Category/UpdateCategory", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success('Değişiklikler Başarıyla Kaydedilmiştir.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        console.log(data);
        fetchCategoryList();
      })
      .catch((error) => {
        console.error(error)
        toast.error('Lütfen Daha Sonra Tekrar Deneyiniz.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        //const errorMessage = handleFetchError(error);
        //console.log(errorMessage);
      });
      };
    
      const handleNameChange = (e) => {
        setEditedName(e.target.value);
       

      };
      const handleImageUpload = async(event) => {
        const file = event.target.files[0];
        setSelectedImageEdit(file);
      
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImageEdit(reader.result);
        };
        reader.readAsDataURL(file);
      };
     
      
      return (
        <div key={id} style={styles.card}>
      {isEditing ? (
        // Düzenleme popup'ı
        <div style={styles.editPopup}>
          <span className="close" onClick={handleCancelClick} style={{color:"white"}}>
              &times;
            </span>
          <input
            type="text"
            value={editedName}
            onChange={handleNameChange}
          />
          <input type="file" onChange={handleImageUpload} />
          {previewImageEdit && (
           <img src={previewImageEdit} alt="Preview" style={{ width: "100px" }} />
          )}
          <div style={styles.editButtons}>
            <button onClick={handleSaveClick}  className="save-button" style={{float:"right"}} >Kaydet</button>
            
          </div>
        </div>
      ) : (
        // Kart içeriği
        <>
        
          <div style={styles.cardContent}>
            <h3>{editedName}</h3>
          </div>
          <div style={styles.cardImageContainer}>
            <img style={styles.cardImage} src={fileUrl} alt={name} />
          </div>
          <div style={styles.editIconContainer} onClick={handleEditClick} className="editIconContainer" >

<img src="/images/edit.png" alt="" width={28} height={28} />
 </div>
        </>
        
      )}
    </div>
      );
};
    
    
    
const styles = {
      card: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundImage: "url('/images/card-background.png')",
        color: "#FFFFFF",
        padding: "40px",
        borderRadius: "12px",
        marginBottom: "50px",
        height: "250px", // set a fixed height for the card
      },
      cardImageContainer: {
        width: "50%",
        textAlign: "center",
        height: "100%", // set the height of the container to match the card's height
      },
      cardImage: {
        width: "100%",
        height: "100%", // set a fixed height for the image
        objectFit:"contain"
      },
      cardContent: {
        width: "50%",
        textAlign: "center",
        fontStyle: "italic",
        height: "100%", // set the height of the content to match the card's height
      },
};
    
return (
    <div style={{padding:"100px"}}> 
    <div>
    <div className="row">
      <div className="col-md-6">
        <div className="card" style={{display:"flex", border:"none"}}>
          {cards.slice(0, Math.ceil(cards.length / 2)).map((card) => (
            <Cardx
              key={card.id}
              fileUrl={card.fileUrl}
              name={card.name}
              width="400px"
              height="300px"
              id={card.id}
              data={card.data}
            />
          ))}
        </div>
      </div>
      <div className="col-md-6">
        <div className="card"style={{display:"flex", border:"none"}}>
          {cards.slice(Math.ceil(cards.length / 2), cards.length).map((card) => (
            <Cardx
              key={card.id}
              fileUrl={card.fileUrl}
              name={card.name}
              description={card.description}
              width="400px"
              height="300px"
              id={card.id}
              data={card.data}

            />
          ))}
        </div>
      </div>
    </div>

      
    
      </div>
      
    </div>
    );
  } 

 
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    console.log("file", file);
  
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };

    reader.readAsDataURL(file);
  };
  

  const handleSave = async(event) => {
    event.preventDefault(); 
    let downloadURL = "";

    if(!selectedImage)
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


    if (selectedImage) {
      const storageRef = ref(storage, "images/" + selectedImage.name);
  
      try {
        const snapshot = await uploadBytes(storageRef, selectedImage);
        downloadURL = await getDownloadURL(snapshot.ref);
        console.log("Resim başarıyla yüklendi. URL:", downloadURL);
      } catch (error) {
        console.error("Resim yükleme hatası:", error);
      }
    } 
    else {

      console.log("selectedImage boş veya tanımsız.");
    }



      const category = {
        fileurl: downloadURL,
        name: title,
        parentId: null
      };

      setIsOpen(false);

      fetch(baseUrl+'api/Category/CreateCategory', {
        method: 'POST',
        body: JSON.stringify(category),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(savedCategory => {
        toast.success('Kategori Başarıyla Kaydedildi', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setSavedCategory(savedCategory);
       fetchCategoryList();
        console.log("günce", categoryList)
      })
      .catch(error => {
        console.error(error);
        toast.error('Lütfen Daha Sonra Tekrar Deneyin.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
       
      });
  };

  const onClose = () => {
    setIsOpen(false);
  };

  
  const handleGoBack = () => {
    navigate(-1); // Bir önceki sayfaya yönlendirir
  };

return (
  <div style={{ marginTop:"50px", paddingLeft:"50px", paddingRight:"50px" }}>
     <ToastContainer />
     <h1  className='baslik'>Mon Jardin</h1>

    <button onClick={handleGoBack} className='back-button' style={{marginBottom:"30px"}}><img src="/images/back-button.png" alt="" width={40} height={30}/></button>

    <button
      style={{
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 10px",
        borderRadius: "5px",
        backgroundColor: "#893694",
        border: "1px solid gray",
        boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
        position: "fixed",
        right: "20px",
        zIndex: "999",
      }}
      onClick={() => setIsOpen(true)}
    >
      <i className="fas fa-edit" style={{ marginRight: "5px" }}></i> Kategori Ekle
    </button>
       
    {isOpen && (
     <div className="popup-container">
     <div className="popup">
       <span className="close" onClick={onClose}>
         &times;
       </span>
       <form onSubmit={handleSave}>
  <div className="input-wrapper">
    <input
      type="text"
      placeholder="Başlık"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  </div>
  <div className="input-wrapper">
    <input type="file" onChange={handleImageUpload} />
    {previewImage && (
      <img src={previewImage} alt="Preview" className="preview-image" />
    )}
  </div>
  <button className="save-button" type="submit">
    Kaydet
  </button>
</form>

     </div>
   </div>
    )}
    <Admincard cards={categoryList} />

  </div>
);
}

export default EditCategory;