import React, { useState } from "react";
const recommendedProducts = [
  {
    id: 1,
    name: "Ürün 1",
    price: "800 ",
    image: "https://png.pngtree.com/png-vector/20201128/ourlarge/pngtree-vase-png-image_2415411.jpg",
  },
  {
    id: 2,
    name: "Ürün 2",
    price: "800 ",
    image: "https://png.pngtree.com/png-vector/20201128/ourlarge/pngtree-vase-png-image_2415411.jpg",
  },
  {
    id: 3,
    name: "Orkide",
    price: "800 ",
    image: "https://png.pngtree.com/png-vector/20201128/ourlarge/pngtree-vase-png-image_2415411.jpg",
  },
  // Diğer önerilen ürünler buraya eklenir
];




const Sepet = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      ad: "Ürün 1",
      resim: "https://png.pngtree.com/png-vector/20201128/ourlarge/pngtree-vase-png-image_2415411.jpg",
      adet: 2,
      fiyat: 50,
    },
    {
      id: 2,
      ad: "Ürün 2",
      resim: "https://png.pngtree.com/png-vector/20201128/ourlarge/pngtree-vase-png-image_2415411.jpg",
      adet: 1,
      fiyat: 75,
    },
    {
      id: 3,
      ad: "Ürün 3",
      resim: "https://png.pngtree.com/png-vector/20201128/ourlarge/pngtree-vase-png-image_2415411.jpg",
      adet: 3,
      fiyat: 30,
    },
  ]); // Sepetteki ürünlerin listesi

  const [totalItems, setTotalItems] = useState(6); // Toplam ürün sayısı
  const [totalPrice, setTotalPrice] = useState(300); // Toplam tutar

  return (
    <div>
      <h1>Sepet</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <img src={item.resim} alt={item.ad} width="50" height="50" />
            <span>{item.ad} - </span>
            <span>{item.adet} adet - </span>
            <span>{item.adet * item.fiyat} TL</span>
          </li>
        ))}
      </ul>
      <p>Toplam Ürün Sayısı: {totalItems}</p>
      <p>Toplam Tutar: {totalPrice} TL</p>
    </div>
  );
};

export default Sepet;
