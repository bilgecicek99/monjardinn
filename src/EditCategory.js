import React, { useState } from 'react';

function EditCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');

  const handleSave = () => {
    const category = { image, title };
    // Kategori objesini kaydetmek için bir dizi veya veritabanı gibi bir kaynak kullanın.
    setIsOpen(false);
  };

  return (
    <div>
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
          bottom: "20px",
          right: "20px",
          zIndex: "999",
        }}
        onClick={() => setIsOpen(true)}
      >
        <i className="fas fa-edit" style={{ marginRight: "5px" }}></i> Kategori Düzenle
      </button>

      {isOpen && (
        <div className="popup">
          <form>
            <input
              type="text"
              placeholder="Başlık"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </form>
          <button
            style={{
              backgroundColor: "#893694",
              color: "white",
              padding: "8px 16px",
              borderRadius: "5px",
              border: "none",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              marginLeft: "300px",
              height: "50px",
              width: "140px",
            }}
            onClick={handleSave}
          >
            Kaydet
          </button>
        </div>
      )}

      {/* Kategori kartını burada tasarlayın */}
      <div className="category-card" style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid gray",
        borderRadius: "5px",
        padding: "10px",
        margin: "10px",

        backgroundColor: "#893694",
        marginLeft: "1000px",
        marginTop: "400px",
      }}>
        <img src={image} style={{ width: "100%", height: "auto", marginBottom: "10px" }} />
        <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", textAlign: "center" }}>{title}</h2>
      </div>
    </div>
  );
}

export default EditCategory;