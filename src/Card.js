  import React from "react";

  function Card() {
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
        width: "50%",
        height: "auto",
      },
      cardContent: {
        width: "50%",
        textAlign: "center",
        fontStyle:"italic"      },
    };
    const cards = [
      {
        imageUrl: process.env.PUBLIC_URL + '/images/saksı.png',
        title: "Saksı"
      },
      {
        imageUrl: process.env.PUBLIC_URL + '/images/saksı.png',
        title: "Çicekler"
      },
      {
        imageUrl: process.env.PUBLIC_URL + '/images/saksı.png',
        title: "Büyük bitki"
      },
      {
        imageUrl: process.env.PUBLIC_URL + '/images/saksı.png',
        title: "Kurutulmuş çicek"
      },
      {
        imageUrl: process.env.PUBLIC_URL + '/images/saksı.png',
        title: "Aranjmanlar"
      },
      {
        imageUrl: process.env.PUBLIC_URL + '/images/saksı.png',
        title: "Kendin Yap"
      },
    ];
    return (
    <div style={{padding:"50px"}}> 
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

  export default Card;
