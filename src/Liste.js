import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";



const products = [
    
  { id: 1, name: "Mon Jardin", price: 600, category: "Kategori 1", color: "Mor", size: "Boyut 1", image: "https://w7.pngwing.com/pngs/694/87/png-transparent-page-not-found-illustration-thumbnail.png"  },
  { id: 2, name: "Mon Jardin", price: 200, category: "Kategori 2", color: "Mor", size: "Boyut 2", image: "https://w7.pngwing.com/pngs/694/87/png-transparent-page-not-found-illustration-thumbnail.png" },
  { id: 3, name: "Mon Jardin", price: 800, category: "Kategori 3", color: "Pembe", size: "Boyut 3", image: "https://w7.pngwing.com/pngs/694/87/png-transparent-page-not-found-illustration-thumbnail.png" },
  { id: 4, name: "Mon Jardin", price: 900, category: "Kategori 1", color: "Lila", size: "Boyut 3", image: "https://w7.pngwing.com/pngs/694/87/png-transparent-page-not-found-illustration-thumbnail.png" },
  { id: 5, name: "Mon Jardin", price: 800, category: "Kategori 2", color: "Mor", size: "Boyut 3", image: "https://w7.pngwing.com/pngs/694/87/png-transparent-page-not-found-illustration-thumbnail.png" },
  { id: 6, name: "Mon Jardin", price: 600, category: "Kategori 3", color: "Lila", size: "Boyut 3", image: "https://w7.pngwing.com/pngs/694/87/png-transparent-page-not-found-illustration-thumbnail.png" },
  { id: 7, name: "Mon Jardin", price: 700, category: "Kategori 1", color: "Pembe", size: "Boyut 1", image: "https://w7.pngwing.com/pngs/694/87/png-transparent-page-not-found-illustration-thumbnail.png" },
  { id: 8, name: "Mon Jardin", price: 1000, category: "Kategori 2", color: "Sarı", size: "Boyut 2", image: "https://w7.pngwing.com/pngs/694/87/png-transparent-page-not-found-illustration-thumbnail.png" },
  { id: 9, name: "Mon Jardin", price: 800, category: "Kategori 1", color: "Mor", size: "Boyut 3", image: "https://w7.pngwing.com/pngs/694/87/png-transparent-page-not-found-illustration-thumbnail.png" },
  // Diğer ürünler
];



  

const Liste = () => {
    
  //const [categoryFilter, setCategoryFilter] = useState("");
  //const [colorFilter, setColorFilter] = useState("");
  //const [priceFilter, setPriceFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [showColorFilter, setShowColorFilter] = useState(false); // Define showColorFilter state and its setter
  const [colorFilter, setColorFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categoryFilterOpen, setCategoryFilterOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState(""); // State for price filter
  const [showPriceOptions, setShowPriceOptions] = useState(false); // State for showing/hiding price options
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const handleSizeFilterChange = (event) => {
    // Handle change event for select element
    const selectedSize = event.target.value;
    // ... do something with selectedSize
  };

  // Function to handle price filter change
  const handlePriceFilterChange = (e) => {
    setPriceFilter(e.target.value);
  };

  // Function to toggle showing/hiding price options
  const togglePriceOptions = () => {
    setShowPriceOptions(!showPriceOptions);
  };

  // Price options array
  const priceOptions = [
    { label: "0 - 100", value: "0-100" },
    { label: "100 - 200", value: "100-200" },
    { label: "200 - 500", value: "200-500" },
    { label: "500 ve üzeri", value: "500+" }
  ];


  // Function to handle toggling the options
  const handleCategoryFilterToggle = () => {
    setCategoryFilterOpen(!categoryFilterOpen);
  }

  // Function to handle changing the selected category
  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  }
 

  const handleColorFilterToggle = () => {
    setShowColorFilter(!showColorFilter);
  };

  const handleColorFilterChange = (event) => {
    setColorFilter(event.target.value);
  };

  


  

  

  const filteredProducts = products.filter((product) => {
    return (
      (categoryFilter === "" || product.category === categoryFilter) &&
      (colorFilter === "" || product.color === colorFilter) &&
      (priceFilter === "" || product.price <= parseInt(priceFilter)) &&
      (sizeFilter === "" || product.size === sizeFilter)
    );
  });

  return (
    <div className="kategori1" style={{ display: "flex" }}>
    <div style={{ flex: "0 0 25%", padding: "10px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "8px", cursor: "pointer" }} onClick={handleCategoryFilterToggle}>
          {/* Arrow icon */}
          <span>&#x25BC;</span>
        </div>
        <label className="kategori" htmlFor="categoryFilter">Kategori:</label>
      </div>
      {/* Options */}
      {categoryFilterOpen && (
        <select id="categoryFilter" value={categoryFilter} onChange={handleCategoryFilterChange}>
          <option value="">Tümü</option>
          <option value="Kategori 1">Kategori 1</option>
          <option value="Kategori 2">Kategori 2</option>
          <option value="Kategori 3">Kategori 3</option>
          {/* Diğer kategori seçenekleri */}
        </select>
      )}

 
  
      <div className="renk1">
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={handleColorFilterToggle}>
        {/* Arrow icon */}
        {showColorFilter ? <span>&#x25BC;</span> : <span>&#x25B6;</span>}
        <label className="renk" htmlFor="colorFilter" style={{ marginLeft: "4px" }}>Renk:</label>
      </div>
      {/* Color options */}
      {showColorFilter && (
        <select id="colorFilter" value={colorFilter} onChange={handleColorFilterChange}>
          <option value="">Tümü</option>
          <option value="Mor">Mor</option>
          <option value="Pembe">Pembe</option>
          <option value="Lila">Lila</option>
          <option value="Sarı">Sarı</option>
          {/* Diğer renk seçenekleri */}
        </select>
      )}
    </div>
    <div className="fiyat1" style={{ position: "relative" }}>
      <label className="fiyat" htmlFor="priceFilter">
        Fiyat:
        <span
          className="arrow"
          onClick={togglePriceOptions}
          style={{
            position: "absolute",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer"
          }}
        >
          ▼
        </span>
      </label>
      {showPriceOptions && (
        <select
          id="priceFilter"
          value={priceFilter}
          onChange={handlePriceFilterChange}
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            right: "0",
            zIndex: "1"
          }}
        >
          <option value="">Tümü</option>
          {priceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
    <div className="boyut1" style={{ marginBottom: "10px" }}>
    <label className="boyut" htmlFor="sizeFilter">
      Boyut: <FaCheck onClick={() => setIsOptionsVisible(!isOptionsVisible)} />
    </label>
    {isOptionsVisible && (
      <select id="sizeFilter" value={sizeFilter} onChange={handleSizeFilterChange}>
        <option value="Boyut 1">Boyut 1</option>
        <option value="Boyut 2">Boyut 2</option>
        <option value="Boyut 3">Boyut 3</option>
        {/* Diğer boyut seçenekleri */}
      </select>
    )}
  </div>
</div>
<div style={{ flex: "0 0 75%", padding: "10px" }}>

<ul style={{display:"flex" }}>
{filteredProducts.map((product) => (
<li key={product.id}>
<img src={product.image} alt={product.name} />
<h3>{product.name}</h3>
<p>Kategori: {product.category}</p>
<p>Renk: {product.color}</p>
<p>Fiyat: {product.price} TL</p>
<p>Boyut: {product.size}</p>
</li>
))}
</ul>
</div>
</div>
);
};

export default Liste;
