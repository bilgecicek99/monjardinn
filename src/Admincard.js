import React from "react";
  

function Admincard() {
  const Cardx = ({ imageUrl, title }) => {
    return (
      <div style={styles.card}>
       
        <div style={styles.cardContent}>
          <h3>{title}</h3>
        </div>
        <div style={styles.cardImageContainer}>
          <img style={styles.cardImage} src={imageUrl} alt={title} />
        </div>
      </div>
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
      marginBottom:"50px"
    },
    cardImageContainer: {
      width: "50%",
      textAlign: "center",
    },
    cardImage: {
      width: "110px",
      height: "130px",
    },
    cardContent: {
      width: "50%",
      textAlign: "center",
      fontStyle:"italic"      },
  };
  const cards = [
    {
      imageUrl: process.env.PUBLIC_URL + '/images/saksıadmin.png',
      title: "Saksı"
    },
    {
      imageUrl: process.env.PUBLIC_URL + '/images/saksı.png',
      title: "Kurutulmuş Çiçek"
    },
    {
      imageUrl: process.env.PUBLIC_URL + '/images/cicek.png',
      title: "Çiçekler"
    },
    {
      imageUrl: process.env.PUBLIC_URL + '/images/aranjman.png',
      title: "Aranjmanlar"
    },
    {
      imageUrl: process.env.PUBLIC_URL + '/images/buyukcicek.png',
      title: "Büyük Bitki"
    },
    {
      imageUrl: process.env.PUBLIC_URL + '/images/saksı.png',
      title: "Kendin Yap"
    },
  ];
  return (
  <div style={{padding:"100px"}}> 
   <div>
   <div className="row">
<div className="col-md-6">
  <div className="card" style={{display:"flex", border:"none"}}>
    {cards.slice(0, Math.ceil(cards.length / 2)).map((card) => (
      <Cardx
        key={card.title}
        imageUrl={card.imageUrl}
        title={card.title}
       
      />
    ))}
  </div>
</div>
<div className="col-md-6">
  <div className="card"style={{display:"flex", border:"none"}}>
    {cards.slice(Math.ceil(cards.length / 2), cards.length).map((card) => (
      <Cardx
        key={card.title}
        imageUrl={card.imageUrl}
        title={card.title}
        description={card.description}
      />
    ))}
  </div>
</div>
</div>

    
   
    </div>
    
  </div>
  );
}

export default Admincard;
