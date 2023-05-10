import React, { useState } from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
const Search = () => {
  const [previousSearches, setPreviousSearches] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([
    {
      id: 1,
      image: "/images/gri.png",
      name: "Mon Jardin",
      price: "800.00 TL"
    },
    {
      id: 2,
      image: "/images/gri.png",
      name: "Mon Jardin",
      price: "800.00 TL"
    },
    {
      id: 3,
      image: "/images/gri.png",
      name: "Mon Jardin",
      price: "800.00 TL"
    },
    {
      id: 4,
      image: "/images/gri.png",
      name: "Mon Jardin",
      price: "800.00 TL"
    },
    {
      id: 5,
      image: "/images/gri.png",
      name: "Mon Jardin",
      price: "800.00 TL"
    }
  ]);
  const slideImages = [
    'images/slide_2.jpg',
    'images/slide_3.jpg',
    'images/slide_4.jpg'
  ];
  
  const search = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.searchTerm.value;
    if (searchTerm) {
      setPreviousSearches([...previousSearches, searchTerm]);
      event.target.elements.searchTerm.value = "";
    }
  };

  return (
    
    <>
     <div className="search-area">
      <form onSubmit={search}>
       
          <input
            type="text"
            name="searchTerm"
            placeholder="Arama yapmak için buraya yazın..."
          />
          <button1 type="submit">
            <img src="/images/search.png" alt="" width={"16"} height={"16"} />
          </button1>
      
      </form>
      <div id="search-results"></div>
      <div className="previous-searches">
        <h3>Önceden Aradıklarınız:</h3>
        <ul style={{ display: "flex" }}>
          {previousSearches.map((searchTerm, index) => (
            <li
              key={index}
              style={{ marginRight: "8px", listStyleType: "none" }}
            >
              {searchTerm}
            </li>
          ))}
        </ul>
        <div className="slide-container">
      <Slide slidesToScroll={1} slidesToShow={1} indicators={true} autoplay={true}  duration={1500} responsive={[{  
        breakpoint: 800,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6
        }
      }, {
        breakpoint: 500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }]}>
      {recommendedProducts.map((product) => (
            <div>
            <li
              key={product.id}
              style={{
                marginRight: "16px",
                listStyleType: "none",
                textAlign: "center"
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                width={"200"}
                height={"200"}
              />
              <p>{product.name}</p>
              <p>{product.price}</p>
            </li>
            </div>
          ))}
      </Slide>
    </div>
      </div>
      <div className="recommended-products">
        <h3>Beğenebilecekleriniz:</h3>
        <ul style={{ display: "flex" }}>
          {recommendedProducts.map((product) => (
            <div>
            <li
              key={product.id}
              style={{
                marginRight: "16px",
                listStyleType: "none",
                textAlign: "center"
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                width={"100"}
                height={"100"}
              />
              <p>{product.name}</p>
              <p>{product.price}</p>
            </li>
            </div>
          ))}
        </ul>
      </div>
        </div>
    </>
  );
};

export default Search;
