import React, { useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';



export default function Blogduzenle() {
  const [backButtonVisible, setBackButtonVisible] = useState(true);
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/Blog');
    console.log("Geri gidiyorum!");
  };

  return (
    <div style={{margin:"100px"}}>
    <nav style={{ backgroundColor: "transparent", position: "fixed", top: 0, left: 0, right: 0, zIndex: 1, display: "flex", justifyContent: "space-between", padding: "10px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {backButtonVisible && (
          <span style={{ cursor: "pointer" }} onClick={goBack}>
            <img src="/images/Vector.png" alt="Blog Resmi" />
          </span>
        )}
      
      </div>
      <div style={{ display: "flex", marginRight:"1500px" }}>
      <h3 style={{ margin: "70px 40px 70px 0", color:"#893694", fontWeight:"bold",fontFamily:"Times New Roman", fontSize: "20px", cursor: "pointer" }}>Workshoplar</h3>
      <h3 style={{ margin: "70px 40px", color:"#893694", fontWeight:"bold", fontFamily:"Times New Roman", fontSize: "20px", cursor: "pointer" }}>Aranjmanlar</h3>
      <h3 style={{ margin: "70px 40px", color:"#893694", fontWeight:"bold", fontFamily:"Times New Roman", fontSize: "20px", cursor: "pointer" }}>Son Yayınlananlar</h3>
      <h3 style={{ margin: "70px 0px 70px 40px", color:"#893694", fontWeight:"bold", margintfontFamily:"Times New Roman", fontSize: "20px", cursor: "pointer" }}>Popüler Yazılar</h3>
      </div>
    </nav>
      <div style={{ backgroundColor: "#E7D1EA", padding: "40px" }}>
        <h1 style={{float:"left",fontSize:"40px", fontWeight:"bold", fontFamily:"Times New Roman", border:"1px solid black"}}>BAŞLIK</h1>
        <div style={{marginTop:"80px", position:"relative"}}><img src="/images/blogduzen.png" alt="Blogduzen alt" /> 
        <img src="/images/cam.png" alt="Blogduzen ust" style={{position:"absolute", top:"50%", left:"35%" , transform:"translate(-50%, -50%)"}}/> 
        </div>
        <div style={{border:"2px solid black", padding:"20px", width:"72%", height:"150px"}}>
        <p> Metni giriniz.</p>
        </div>
      </div>
    </div>
  );
}
