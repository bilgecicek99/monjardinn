import React, { useState } from "react";

const Arama = () => {
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
    <div style={{margin:"100px"}}>
    
      <form onSubmit={search}>
        <div className="search-area">
          <input
            type="text"
            name="searchTerm"
            placeholder="Arama yapmak için buraya yazın..."
          />
          <button1 type="submit">
            <img src="/images/search.png" alt="" width={"16"} height={"16"} />
          </button1>
        </div>
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
      </div>
      <div className="recommended-products">
        <h3>Beğenebilecekleriniz:</h3>
        <ul style={{ display: "flex" }}>
          {recommendedProducts.map((product) => (
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
          ))}
        </ul>
      </div>
      
    </div>
    </>
  );
};

export default Arama;
