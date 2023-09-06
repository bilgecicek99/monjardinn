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
        toast.error('Lütfen Daha Sonra Tekrar Deneyiniz', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        return;
      }
      const data = await response.json();
      const categoryData = data.data;
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


  function HomeCard( { cards }) {
  
    const Cardx = ({ fileUrl, name, id, data, click }) => {
      const defaultImageUrl = '/images/monjardinlogo.png';
    
      return (
        <Link to={`/List/${id}`} style={styles.link}>
          <div key={id} className="cardx">
            <div style={styles.cardContent}>
              <p className="textcard">{name}</p>
            </div>
            <div className="cardImageContainer">
              {fileUrl ? ( 
                <img  className="home-card-image"  src={fileUrl} alt={name} />
              ) : (
                <img className="home-card-image" src={defaultImageUrl} alt="Logo" />
              )}
            </div>
          </div>
        </Link>
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
    <div style={{padding:"50px"}}> 
    <div>
    <div className="row">
      <div className="col-md-6">
        <div className="card" style={{display:"flex", border:"none"}}>
          {cards.slice(0, Math.ceil(cards.length / 2)).map((card) => (
            <Cardx
              key={card.id}
              fileUrl={card.fileUrl}
              name={card.name}
              
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


  return (
    <div style={{ marginTop: "100px" }}>
              <ToastContainer />

        <Carousel1/>
          <HomeCard cards={categoryList} />
      </div>
   
  );
}

export default WithNavbar(Home);
