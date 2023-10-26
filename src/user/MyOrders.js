import React, { useState,useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { getToken, setUserSession,setUserInfo } from "../service/AuthService";
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../config/Constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyOrders = ({ id, createdDate, productnames }) => {
  const navigate = useNavigate();

    const styles = {
        card: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            background: "white",
            color: "black",
            //padding: "20px",
            borderRadius: "12px",
            marginBottom:"30px",
            border:"1px solid #D9D9D9",
            boxShadow: "20px 20px 20px rgba(0,0,0,0.25)",
          },
        cardContent: {
          width: "100%",
          textAlign: "left",
          fontStyle:"italic",
          fontSize:"13px"  
         },
         ellipses: {
            position: "absolute",
            top: "10px", 
            right: "10px", 
            cursor: "pointer",
            fontSize: "24px",
            color: "#893694", 
          },
      };
      
      const handleDivClick = async (id) => {
       navigate(`/orderdetail/${id}`)
      };


return (
  <div>
    <>
    <div style={styles.card}>
        <div style={{ ...styles.cardContent, padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "times" }}>
              <div>
                <h4 style={{ fontStyle: "normal", fontWeight: "bold" }}>{createdDate}</h4>
                <p style={{ color: "#6F6D6D", fontSize: "18px", fontStyle: "italic" }}>
                  {productnames.join(" - ")} 
                </p>             
               </div>
               <div style={{ display: "flex" }}>
                  <a style={{ cursor: "pointer" }} onClick={() => handleDivClick(id)}>
                    <div style={{display:"flex"}}>
                    <img src="/images/pointicon.png" alt="" width={7} height={7} />
                    <img src="/images/pointicon.png" alt="" width={7} height={7} style={{marginLeft:"1px"}}/>
                    <img src="/images/pointicon.png" alt="" width={7} height={7} style={{marginLeft:"1px"}}/></div>                
                </a>
                </div>
            </div>
          </div>  
    </div>
        </>
  </div>

);
};

export default MyOrders;
