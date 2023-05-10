import React, { useState } from "react";

function CreateYourself() {
  const [selectedPot, setSelectedPot] = useState(null);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [selectedHelperPlant, setSelectedHelperPlant] = useState(null);

  const potOptions = [
    {
      id: 1,
      name: "Mon Jardin",
      price: "800.00",
      image: "/images/gri.png",
    },
    {
      id: 2,
      name: "Mon Jardin",
      price: "800.00",
      image: "/images/gri.png",
    },
    {
      id: 3,
      name: "Mon Jardin",
      price: "800.00",
      image: "/images/gri.png",
    },
    {
        id: 4,
        name: "Mon Jardin",
        price: "800.00",
        image: "/images/gri.png",
      },
      {
        id: 5,
        name: "Mon Jardin",
        price: "800.00",
        image: "/images/gri.png",
      },
  ];

  const flowerOptions = [
    {
      id: 1,
      name: "Mon Jardin",
      price:  "800.00",
      image: "/images/gri.png",
    },
    {
      id: 2,
      name: "Mon Jardin",
      price:  "800.00",
      image: "/images/gri.png",
    },
    {
      id: 3,
      name: "Mon Jardin",
      price:  "800.00",
      image: "/images/gri.png",
    }, {
        id: 4,
        name: "Mon Jardin",
        price:  "800.00",
        image: "/images/gri.png",
      }, {
        id: 5,
        name: "Mon Jardin",
        price:  "800.00",
        image: "/images/gri.png",
      },
  ];

  const helperPlantOptions = [
    {
      id: 1,
      name: "Mon Jardin",
      price: "800.00",
      image: "/images/gri.png",
    },
    {
      id: 2,
      name: "Mon Jardin",
      price: "800.00",
      image: "/images/gri.png",
    },
    {
      id: 3,
      name: "Mon Jardin",
      price: "800.00",
      image: "/images/gri.png",
    },
    {
        id: 4,
        name: "Mon Jardin",
        price: "800.00",
        image: "/images/gri.png",
      },
      {
        id: 5,
        name: "Mon Jardin",
        price: "800.00",
        image: "/images/gri.png",
      },
  ];

  const handlePotSelect = (option) => {
    setSelectedPot(option);
  };

  const handleFlowerSelect = (option) => {
    setSelectedFlower(option);
  };

  const handleHelperPlantSelect = (option) => {
    setSelectedHelperPlant(option);
  };

  const renderProduct = (product) => {
    return (
      <div key={product.id}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.price}</p>
      </div>
    );
  };

  return (
    <div style={{ margin: "100px", position:"absolute"}}>
    <div>
    <h2 style={{fontFamily: 'times new roman', fontWeight: 'bold', fontStyle: 'italic'}}>Saksı Tercihiniz</h2>
      <div style={{ display: "flex" }}>
        {potOptions.map((option) => (
          <div key={option.id} style={{ margin: "20px" }}>
            <img
              src={option.image}
              alt={option.name}
              onClick={() => {}}
  style={{
    border: selectedPot && selectedPot.id === option.id ? "2px solid blue" : "none",
    cursor: "default"
  }}
            />
            <h3 style={{ margin: "10px 0", fontFamily: 'times new roman', fontStyle: 'italic' }}>{option.name}</h3>
            <p style={{ margin: 0, fontFamily: 'times new roman', fontStyle: 'italic' }}>{option.price}</p>
          </div>
        ))}
      </div>
      {selectedPot && (
        <div>
          <h3>{selectedPot.name}</h3>
          <p>{selectedPot.price}</p>
          <img src={selectedPot.image} alt={selectedPot.name} />
          {/*
            Saksı seçimi tamamlandığında burada ilgili saksıya ait diğer bilgileri veya
            seçenekleri gösterebilirsiniz.
          */}
        </div>
        )}
      </div>
      <div>
      <h2 style={{fontFamily: 'times new roman', fontWeight: 'bold', fontStyle: 'italic'}}>Çiçek Tercihiniz</h2>
      <div style={{ display: "flex" }}>
        {flowerOptions.map((option) => (
          <div key={option.id} style={{ margin: "20px" }}>
            <img
              src={option.image}
              alt={option.name}
              onClick={() => {}}
  style={{
    border: selectedPot && selectedPot.id === option.id ? "2px solid blue" : "none",
    cursor: "default"
  }}
            />
            <h3 style={{ margin: "10px 0", fontFamily: 'times new roman', fontStyle: 'italic' }}>{option.name}</h3>
            <p style={{ margin: 0, fontFamily: 'times new roman', fontStyle: 'italic' }}>{option.price}</p>
          </div>
        ))}
      </div>
      {selectedFlower && (
        <div>
          <h3>{selectedFlower.name}</h3>
          <p>{selectedFlower.price}</p>
          <img src={selectedFlower.image} alt={selectedFlower.name} />
          {/*
            Çiçek seçimi tamamlandığında burada ilgili çiçeğe ait diğer bilgileri veya
            seçenekleri gösterebilirsiniz.
          */}
        </div>
        )}
      </div>
      <div>
      <h2 style={{fontFamily: 'times new roman', fontWeight: 'bold', fontStyle: 'italic'}}>Yardımcı Bitki Tercihiniz</h2>
  <div style={{ display: "flex" }}>
    {helperPlantOptions.map((option) => (
      <div key={option.id} style={{ margin: "20px" }}>
        <img
          src={option.image}
          alt={option.name}
          onClick={() => {}}
  style={{
    border: selectedPot && selectedPot.id === option.id ? "2px solid blue" : "none",
    cursor: "default"
  }}
        />
        <h3 style={{ margin: "10px 0", fontFamily: 'times new roman', fontStyle: 'italic' }}>{option.name}</h3>
        <p style={{ margin: 0, fontFamily: 'times new roman', fontStyle: 'italic' }}>{option.price}</p>
      </div>
    ))}
  </div>
  {selectedHelperPlant && (
    <div>
      <h3>{selectedHelperPlant.name}</h3>
      <p>{selectedHelperPlant.price}</p>
      <img src={selectedHelperPlant.image} alt={selectedHelperPlant.name} />
      {/*
        Yardımcı bitki seçimi tamamlandığında burada ilgili bitkiye ait diğer bilgileri veya
        seçenekleri gösterebilirsiniz.
      */}
    </div>


        )}
      </div>
    </div>
  );
        }
        export default CreateYourself;
