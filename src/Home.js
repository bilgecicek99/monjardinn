import React from "react";
import Card from './Card';
import Adminpanel from "./Adminpanel";


const Home = () => {
    const data = [
        { id: 1, title: 'Saksı', content: 'İçerik 1' },
        { id: 2, title: 'Kurutulmuş Çiçek', content: 'İçerik 2' },
        { id: 3, title: 'Büyük Bitki', content: 'İçerik 3' },
        { id: 4, title: 'Kart 4', content: 'İçerik 4' },
        { id: 5, title: 'Kart 5', content: 'İçerik 5' },
        { id: 6, title: 'Kart 6', content: 'İçerik 6' },
      ];
      const cardList = data.map((item) => (
        <Card key={item.id} title={item.title} content={item.content} />
      ));
      
      
  
  return (
    <>
    <form onSubmit="search()">
    <div className="search-area">
    <input type="text" placeholder="Arama yapmak için buraya yazın..."/>
   
    <button1 type="submit"> <img src="/images/search.png" alt="" width={"16"} height={"16"} /></button1>
    </div>
     </form>
  <div id="search-results"></div> 
  <div>
  <Card/>
</div>
  </>

 

  
  );
};



export default Home;