import React, { useState } from "react";

export default function EditProduct() {
    
  const [urun, setUrun] = useState({
    resimler: ["resim1.png"],
    stokNo: "123456",
    kdvOrani: "18%",
    urunRengi: "Mavi",
    urunAdi: "Örnek Ürün",
    urunAdedi: 10,
    saksi: "Var",
    barkod: "7891011121314",
    fiyat: "50 TL",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUrun({ ...urun, [name]: value });
  };
  const handleKaydet = () => {
    fetch("http://example.com/kaydet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(urun),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  return(
    <div style={{ marginTop:"100px", display: "flex" }}>
    <div>
      <img src={urun.resimler[0]} alt="Resim 1" />
      
    </div>
    <div style={{ display:"block",marginLeft: "20px" }}>
     <div> <p>Stok No:</p>
     <input
       type="text"
       name="stokNo"
       value={urun.stokNo}
       onChange={handleInputChange}
     /></div>
     <div>      <p>KDV Oranı:</p>
     <input
       type="text"
       name="kdvOrani"
       value={urun.kdvOrani}
       onChange={handleInputChange}
     /></div>
     <div>
     <p>Ürün Rengi:</p>
     <input
       type="text"
       name="urunRengi"
       value={urun.urunRengi}
       onChange={handleInputChange}
     /></div>
     </div>

      <div style={{ marginLeft: "20px" }}>
      <p>Ürün Adı:</p>
      <input
        type="text"
        name="urunAdi"
        value={urun.urunAdi}
        onChange={handleInputChange}
      />
      <p>Ürün Adedi:</p>
      <input
        type="number"
        name="urunAdedi"
        value={urun.urunAdedi}
        onChange={handleInputChange}
      />
      <p>Saksı:</p>
      <input
        type="text"
        name="saksi"
        value={urun.saksi}
        onChange={handleInputChange}
      />
    </div>

    <div style={{ marginLeft: "20px" }}>
      <p>Barkod:</p>
      <input
        type="text"
        name="barkod"
        value={urun.barkod}
        onChange={handleInputChange}
      />
      <p>Fiyat:</p>
      <input
        type="text"
        name="fiyat"
        value={urun.fiyat}
        onChange={handleInputChange}
      />
    </div>
    
    <button onClick={handleKaydet}>Kaydet</button>
  </div>
 


  );

 
}
