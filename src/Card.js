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
                text="Saksı"
                path=""
                desc="yükleniyor"
              />
              <CardItem
                src="/images/saksı.png"
                text="Kurutulmuş Çiçek"
                path=""
                desc="yükleniyor"
              />
              <CardItem
                src="/images/saksı.png"
                text="Büyük Bitki"
                path=""
                desc="yükleniyor"
              />
            </ul>
            <ul className="cards__items">
              <CardItem
                src="/images/saksı.png"
                text="Aranjmanlar"
                path=""
                desc="yükleniyor"
              />
              <CardItem
                src="/images/saksı.png"
                text="Kendin Yap"
                path=""
                desc="yükleniyor"
              />
              <CardItem
                src="/images/saksı.png"
                text="x"
                path=""
                desc="yükleniyor"
              />
            </ul>
          </div>
        </div>
      </div>
    );
  }

  export default Card;
