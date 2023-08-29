import React, { useState,useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { baseUrl } from './config/Constants';
import { useParams } from 'react-router-dom';
import WithNavbar from './WithNavbar'; 

const BlogDetail= () => {
  const [backButtonVisible, setBackButtonVisible] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const [blogDetail, setBlogDetail] = useState([]);

  const goBack = () => {
    navigate('/Blog');
  };

  const fetchBlogDetail = async (id) => {
    try {
      const requestOptions = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
       await fetch(baseUrl+`api/Blog/GetBlogDetailById/${id}`,requestOptions)
       .then(response => response.json())
       .then(data => {  
        setBlogDetail(data.data)
        console.log(data.data);        
       })
       .catch(error => {
         console.error(error);
         //setErrorMessage(error.message);
       });      
  }
  catch (error) {
    //setErrorMessage(error);
    console.error(error)
  }

};

useEffect(() => {
  const fetchData = async () => {
    await fetchBlogDetail(id); 
  };
  fetchData();
}, [id]);

const defaultImage = '/images/monjardinlogo.png';


  return (
    <div className="mobile-generic-css" style={{margin:"8%"}}>
      <nav style={{ backgroundColor: "#893694", padding: "2%" }}>
        {/* {backButtonVisible && (
          <span style={{ cursor: "pointer" }} onClick={goBack}>
          <img src="/images/Vector.png" alt="Blog Resmi" style={{margin: "6px",width: "4%"}}/>
          </span>
        )} */}
      </nav>
      <div style={{ backgroundColor: "#E7D1EA", padding: "4%" }}>
        <h1 style={{float:"left", fontWeight:"bold", fontFamily:"Times New Roman"}}>{blogDetail.title}</h1>
        <div style={{marginTop:"80px", justifyContent:"center", display:"flex"}}>
          <img src={blogDetail?.fileResponses?.[0]?.fileUrl || defaultImage} alt="Blog Resmi" style={{width: "50%",maxHeight: "370px",marginBottom:"3%",borderRadius:"10px", margin: "auto"}}/></div>
          <p style={{ wordWrap: "break-word"}}>{blogDetail.description}
        </p>
      </div>
    </div>
  );
}

export default WithNavbar(BlogDetail);
