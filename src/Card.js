import React from "react";
import CardItem from "./CardItems";
function Card() {
  return (
    <div className="cards">
      <div className="cards__container">
        
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="images/saksı.png"
              text="kendimize özel çiçek"
              path=""
              desc="gelecek"
            />
            <CardItem
              src="/images/saksı.png"
              text="çiçek gelcek"
              path=""
              desc="çiçek gelcek"
            />
            <CardItem
              src="/images/saksı.png"
              text="saksı"
              path=""
              desc="saksı gelcek"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Card;
