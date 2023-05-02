import React, { useState } from "react";
import Admincard from './Admincard'; // Card bileşenini import edin






const Adminarama= () => {
  const data = [
    { id: 1, title: 'Kart 1', content: 'İçerik 1', image: '/images/kart1.png'},
    { id: 2, title: 'Kart 2', content: 'İçerik 2', image: '/images/kart2.png' },
    { id: 3, title: 'Kart 3', content: 'İçerik 3', image: '/images/kart3.png' },
    { id: 4, title: 'Kart 4', content: 'İçerik 4', image: '/images/kart4.png' },
    { id: 5, title: 'Kart 5', content: 'İçerik 5', image: '/images/kart5.png' },
    { id: 6, title: 'Kart 6', content: 'İçerik 6', image: '/images/kart6.png' },
    // Diğer kartlar buraya eklenebilir
  ];
  const [previousSearches, setPreviousSearches] = useState([]);

  const search = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.searchTerm.value;
    if (searchTerm) {
      setPreviousSearches([...previousSearches, searchTerm]);
      event.target.elements.searchTerm.value = "";
    }
  };

  return (
    <div style={{ margin: "100px" }}>
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
        <Admincard />
        </form>
      </div>
      
      </div>
      
   
  );
}

export default Adminarama;
