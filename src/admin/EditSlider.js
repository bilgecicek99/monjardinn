import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
//import Admincard from './Admincard';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getUser,getToken,resetUserSession,getUserInfo } from "../service/AuthService";
import { baseUrl } from '../config/Constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditSlider() {
  const navigate = useNavigate();
  const [noticelist, setNoticeData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [savednotice, setSavedNotice] = useState(null);
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

   
  const fetchSliderList = async () => {
    try {
      const response = await fetch(baseUrl+`api/HomePageBanner/GetAllBanner`);
      if (!response.ok) {
        throw new Error('Duyuru listesi getirilemedi. Lütfen daha sonra tekrar deneyin.');
      }
      const data = await response.json();
      const noticeData = data.data;
      setNoticeData(noticeData);
    } catch (error) {
      console.error(error);
     /* toast.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });*/
     
    }
  };
  useEffect(() => {
     fetchSliderList();
  }, []);


  function Admincard( { cards }) {
  
    const Cardx = ({ imageUrl, title, id, data, click,description }) => {
      const [isEditing, setIsEditing] = useState(false);
      const [editedtitle, setTitle] = useState(title);
      const [editedDescription, setDescription] = useState(description);
      const [previewImageEdit, setPreviewImageEdit] = useState(null);
      const [selectedFile, setSelectedFile] = useState(null);
      const [product, setProduct] = useState("");
      const [selectedImageEdit, setSelectedImageEdit] = useState(null);
   
      
      const handleEditClick = () => {
        setIsEditing(true);
        console.log("item",imageUrl);

      };
      const handleDeleteClick = async (id) =>  {

         fetch(baseUrl+`api/HomePageBanner/DeleteBanner?id=${parseInt(id)}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
         if(data.success)
         {
            toast.success('Başarıyla Silinmiştir.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
          fetchSliderList();
         }

         else{
          toast.error('Lütfen Daha Sonra Tekrar Deneyiniz.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          return; 
         }
        })
        .catch((error) => {
          toast.error('Lütfen Daha Sonra Tekrar Deneyiniz.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          return; 
        });
       

      };
    
      const handleCancelClick = () => {
        setIsEditing(false);
      };
    
      const handleSaveClick =async (event) => {
        console.log("kaydetttt",title,description,id);
    
        let updatedProduct = "";    
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
        
            console.log("selectedImage boş veya tanımsız.");
          }
      
          
          updatedProduct = {
            ...product,
            description: editedDescription,
            id: id,
            title: editedtitle,
            imageUrl:downloadURL,
           
          };
          console.log("prodeğişti",updatedProduct);
         
        }
        else{
         updatedProduct = {
            ...product,
            description: editedDescription,
            id: id,
            title: editedtitle,
            imageUrl:imageUrl
          };
          console.log("prodeğişmedi",updatedProduct);
        }
        setIsEditing(false);

       fetch(baseUrl+"api/HomePageBanner/UpdateBanner", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    }) 
      .then((response) => response.json())
      .then((data) => {
        toast.success('Değişiklikler başarıyla kaydedilmiştir.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        console.log(data);
        fetchSliderList();
      })
      .catch((error) => {
        console.error(error)
        //const errorMessage = handleFetchError(error);
        //console.log(errorMessage);
      });
      };
    
      const handleNameChange = (e) => {
        setTitle(e.target.value);
        console.log("buname",e.target.value);

      };
      // const handleDescription = (e) => {
      //   setDescription(e.target.value);
      //   console.log("budescrip",e.target.value);
      // };
      const maxLength = 70;
      const handleDescription = (e) => {
        const inputValue = e.target.value;
    
        if (inputValue.length <= maxLength) {
          setDescription(inputValue);
        }
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
            value={editedtitle}
            onChange={handleNameChange}
          />
          <div>
           <textarea
            type="text"
            value={editedDescription}
            onChange={handleDescription}    
          />
          <div className="character-count">
            {editedDescription.length}/{maxLength} karakter
          </div>
          </div>
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
            <h3>{editedtitle}</h3>
            <p >{editedDescription}</p>
          </div>
        
          <div style={styles.cardImageContainer}>
            <img style={styles.cardImage} src={imageUrl} alt={title} />
          </div>
          <div style={styles.editIconContainer} onClick={handleEditClick} className="editIconContainer" >
            <img src="/images/edit.png" alt="" width={28} height={28} />
          </div>
         <div style={styles.editIconContainer} onClick={() => handleDeleteClick(id)} className="editIconContainer" >
            <img src="/images/delete.png" alt="" width={28} height={28} />
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
        background: "#D9D9D9",
        color: "black",
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
      },
      cardContent: {
        width: "50%",
        textAlign: "left",
        fontFamily: "Times",
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
              imageUrl={card.imageUrl}
              title={card.title}
              description={card.description}
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
              imageUrl={card.imageUrl}
              title={card.title}
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
    if(!selectedImage || !title || !description) 
    {
        toast.error('Lütfen Tüm Alanları Doldurunuz.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          return;
         
    }
   
    let downloadURL = "";
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



      const notice = {
        imageUrl: downloadURL,
        title: title,
        description: description,
        
      };

      setIsOpen(false);

      fetch(baseUrl+'api/HomePageBanner/CreateBanner', {
        method: 'POST',
        body: JSON.stringify(notice),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(savednotice => {
        setSavedNotice(savednotice);
       fetchSliderList(); // Kategori listesini güncellemek için yeniden verileri çekin
        console.log("günce", noticelist)
      })
      .catch(error => {
        console.error(error);
        toast.success('Kaydetme sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.', {
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
  const maxLength = 70;
  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length <= maxLength) {
      setDescription(inputValue);
    }
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
        right: "20px",
        zIndex: "999",
        float:"right",
        marginTop:"50px"
      }}
      onClick={() => setIsOpen(true)}
    >
      <i className="fas fa-edit" style={{ marginRight: "5px" }}></i> Duyuru Ekle
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
    <textarea
      type="text"
      placeholder="Açıklama"
      value={description}
      onChange={handleChange}
    />
     <div className="character-count">
        {description.length}/{maxLength} karakter
      </div>
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
    <Admincard cards={noticelist} />

  </div>
);
}

export default EditSlider;