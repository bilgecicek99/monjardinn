import Carousel1 from "./Carousel1";
import WithNavbar from './WithNavbar'; 
import { baseUrl } from './config/Constants';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async () => {
    try {
      const response = await fetch(baseUrl+`api/Category/GetMainCategories`);
      if (!response.ok) {
       /* toast.error('Lütfen Daha Sonra Tekrar Deneyiniz', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });*/
        return;
      }
      const data = await response.json();
      const categoryData = data.data;
      console.log(data.data);
      setCategoryList(categoryData);
    } catch (error) {
      console.error(error);
     toast.error('Lütfen Daha Sonra Tekrar Deneyiniz', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return; 
  
     
    }
  };
  useEffect(() => {
    fetchCategoryList();
  }, []);


  function HomeCard({ cards }) {
    const Cardx = ({ fileUrl, name, id, data, click }) => {
      const defaultImageUrl = '/images/monjardinlogo.png';
      console.log(name);
  
      return (<>

        {fileUrl ? (
        <Link to={`/List/${id}`} style={styles.link}>       
              <div className="image-container" style={{ position: 'relative', width: '100%', height: '300px', borderRadius: '30px', paddingBottom: "20px" }}>
                <img
                  className="product-image"
                  style={{ width: '100%', height: '100%', filter: 'blur(2px)' }}
                  src={fileUrl}
                  alt={name}
                />
                <p className="textcard" style={{
                  position: 'absolute',
                  bottom: "30%", left: "50px", // Adjust positioning as needed
                  zIndex: '2', textDecoration: "none",
                  color: "black",
                  fontStyle: "italic",
                  fontWeight: "700",
                  fontFamily: "Times New Roman",
                  fontSize: "30px"
                }}>
                  {name}
                </p>
              </div>
               
        </Link>) : (
            null
          )} </> 
      );
    };
  
    const styles = {
      cardContent: {
        width: "50%",
        textAlign: "center",
        fontStyle: "italic"
      },
      link: {
        textDecoration: 'none',
      },
    };
  
    return (
      <div style={{ padding: "50px" }}>
        <div className="row">
          {cards.map((card) => (
            card.fileUrl && (
              <div className="col-md-6" key={card.id}>
                <div className="card" style={{ display: "flex", border: "none" }}>            
                  <Cardx
                    fileUrl={card.fileUrl}
                    name={card.name}
                    id={card.id}
                    data={card.data}
                  />
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    );
   
  }


  return (
    <div style={{ marginTop: "100px" }}>
              <ToastContainer />

        <Carousel1/>
          <HomeCard cards={categoryList} />
      </div>
   
  );
}

export default WithNavbar(Home);
