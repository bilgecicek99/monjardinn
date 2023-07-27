import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


function Admincard( { cards }) {
  
    const Cardx = ({ fileUrl, name, id, data, click }) => {
      const [isEditing, setIsEditing] = useState(false);
      const [editedName, setEditedName] = useState(name);
      const [previewImage, setPreviewImage] = useState(null);
      const [selectedFile, setSelectedFile] = useState(null);
      const [product, setProduct] = useState("");
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

      
      const handleEditClick = () => {
        setIsEditing(true);
        console.log("item",fileUrl,name,id);

      };
    
      const handleCancelClick = () => {
        setIsEditing(false);
      };
    
      const handleSaveClick =async (event) => {
        event.preventDefault();
      
        const storageRef = ref(storage, "images/" + selectedImage.name);
        let downloadURL = ""; // Deği
        try {
          // Resmi Storage'e yükleyin
          const snapshot = await uploadBytes(storageRef, selectedImage);
      
          // Resmin URL'sini alın
          downloadURL = await getDownloadURL(snapshot.ref);
          console.log("Resim başarıyla yüklendi. URL:", downloadURL);
        } catch (error) {
          console.error("Resim yükleme hatası:", error);
        }

        
        const updatedProduct = {
          ...product,
          name: editedName,
          id: id,
          parentId: null,
          fileurl:downloadURL
        };
        console.log("pro",updatedProduct)
       

        setIsEditing(false);


        fetch("http://64.227.114.199/api/Category/UpdateCategory", {
      method: "PUT",
      headers: {
        "Authorization": "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJlbWFpbCI6ImhpbGFsYmFzdGFuQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJIaWxhbCBCYcWfdGFuIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiYWRtaW4iLCJuYmYiOjE2ODM4OTY2NjMsImV4cCI6MTY4NjA1NjY2MywiaXNzIjoiTW9uSmFyZGluIiwiYXVkIjoiYXBpLm1vbmphcmRpbi5vbmxpbmUifQ.S7mNeJP5KuqRwzPBqCD7N87oZExLjgn0hvgFqWFK-iNCeXlVDcS7uLV1jAxxEcM84i4XcEHBWbAqKBPaG39y1w",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Değişiklikler başarıyla kaydedilmiştir.")
        console.log(data);
      })
      .catch((error) => {
        console.error(error)
        //const errorMessage = handleFetchError(error);
        //console.log(errorMessage);
      });
      };
    
      const handleNameChange = (e) => {
        setEditedName(e.target.value);
       

      };
      const handleImageUpload = async(event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
      
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result);
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
          {previewImage && (
           <img src={previewImage} alt="Preview" style={{ width: "100px" }} />
          )}
          <div style={styles.editButtons}>
            <button onClick={handleSaveClick}className="save-button" style={{float:"right"}} >Kaydet</button>
            
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

export default Admincard;


/*

 <div className="editIconContainer" onClick={handleEditClick}>
            <img src="/images/edit.png" alt="" width={28} height={28}  />
          </div>
          <div style={styles.cardContent}>
            <h3>{editedName}</h3>
          </div>
          <div style={styles.cardImageContainer}>
            <img style={styles.cardImage} src={fileUrl} alt={name} />
          </div>
*/