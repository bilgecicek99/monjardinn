import React from "react";
  

function Admincard( { cards }) {
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
      marginBottom: "50px",
      height: "250px", // set a fixed height for the card
    },
    cardImageContainer: {
      width: "50%",
      textAlign: "center",
      height: "100%", // set the height of the container to match the card's height
    },
    cardImage: {
      width: "auto",
      height: "100%", // set a fixed height for the image
    },
    cardContent: {
      width: "50%",
      textAlign: "center",
      fontStyle: "italic",
      height: "100%", // set the height of the content to match the card's height
    },
  };
  
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
            width="400px"
            height="300px"
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
