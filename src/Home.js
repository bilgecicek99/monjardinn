import Carousel1 from "./Carousel1";
import WithNavbar from './WithNavbar'; 
import { baseUrl } from './config/Constants';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Home = () => {

  
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async () => {
    try {
      const response = await fetch(baseUrl+`api/Category/GetMainCategories`);
      if (!response.ok) {
        throw new Error('Kategori listesi getirilemedi. Lütfen daha sonra tekrar deneyin.');
      }
      const data = await response.json();
      const categoryData = data.data;
      setCategoryList(categoryData);
    } catch (error) {
      console.error(error);
      alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
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
          <div key={id} style={styles.card}>
            <div style={styles.cardContent}>
              <p className="textcard">{name}</p>
            </div>
            <div className="cardimage" style={styles.cardImageContainer}>
              {fileUrl ? ( 
                <img style={styles.cardImage} src={fileUrl} alt={name} />
              ) : (
                <img style={styles.cardImage} src={defaultImageUrl} alt="Logo" />
              )}
            </div>
          </div>
        </Link>
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
        height: "auto", 
        textAlign: "center",
        maxWidth: "100%", 
        maxHeight: "200px",
      },
      cardContent: {
        width: "50%",
        textAlign: "center",
        fontStyle: "italic",
        
  
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


  return (
    <div style={{ marginTop: "100px" }}>
        <Carousel1/>
          <HomeCard cards={categoryList} />
      </div>
   
  );
}

export default WithNavbar(Home);
