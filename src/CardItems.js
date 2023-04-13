import React from "react";
import { Link } from "react-router-dom";
function CardItem(props) {
  return (
    <>
      <li className="cards__item">
        <Link className="cards__item__link" to={props.path}>
          <figure className="cards__item__pic-wrap" data-category={props.label}>
            <input
              type="image"
              className="cards__item__img"
              img
              src={props.src}
              alt="Travel Image"
            />
          </figure>
          <div className="image__overlay image__overlay--blur">
            <div className="image__title">{props.title}</div>
            <p className="image__description">{props.desc}</p>
          </div>
          <div className="cards__item__info">
            <h5 className="cards__item__text">{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}
export default CardItem;