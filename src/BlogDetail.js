import React, { useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';



export default function BlogDetail() {
  const [backButtonVisible, setBackButtonVisible] = useState(true);
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/Blog');
    console.log("Geri gidiyorum!");
  };

  return (
    <div style={{margin:"100px"}}>
      <nav style={{ backgroundColor: "#893694", padding: "10px" }}>
        {backButtonVisible && (
          <span style={{ cursor: "pointer" }} onClick={goBack}>
          <img src="/images/Vector.png" alt="Blog Resmi" />
          </span>
        )}
      </nav>
      <div style={{ backgroundColor: "#E7D1EA", padding: "10px" }}>
        <h1 style={{float:"left", fontWeight:"bold", fontFamily:"Times New Roman"}}>Yeni Atölyeler</h1>
        <div style={{marginTop:"80px"}}><img src="/images/blog1.png" alt="Blog Resmi" /></div>
        <p>Eğer çiçek aranjmanlarına ilginiz varsa sizi de aramızda görmek <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p> <p>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p> <p>quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. <p>Excepteur sint occaecat cupidatat non proident, </p>sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}
