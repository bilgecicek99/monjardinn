import React from "react";
import Card from './Card'; // Card bileşenini import edin
import Carousel1 from "./Carousel1";




const Girisekran = () => {
  const data = [
    { id: 1, title: 'Kart 1', content: 'İçerik 1', image: '/images/kart1.png'},
    { id: 2, title: 'Kart 2', content: 'İçerik 2', image: '/images/kart2.png' },
    { id: 3, title: 'Kart 3', content: 'İçerik 3', image: '/images/kart3.png' },
    { id: 4, title: 'Kart 4', content: 'İçerik 4', image: '/images/kart4.png' },
    { id: 5, title: 'Kart 5', content: 'İçerik 5', image: '/images/kart5.png' },
    { id: 6, title: 'Kart 6', content: 'İçerik 6', image: '/images/kart6.png' },
    // Diğer kartlar buraya eklenebilir
  ];

  // İlk 12 kartı alın
  const cardList = data.slice(0, 12).map((item) => (
    <Card key={item.id} title={item.title} image={item.image} content={item.content} />
  ));

  return (
    <div style={{ margin: "100px" }}>
        <Carousel1/>
        <Card />
      </div>
   
  );
}

export default Girisekran;
