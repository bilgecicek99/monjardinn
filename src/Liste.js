import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";



const products = [
    
  { id: 1, name: "Mon Jardin", price: 600, category: "Kategori 1", color: "Mor", size: "Boyut 1", image:  process.env.PUBLIC_URL + '/images/pembelale.jpg',  },
  { id: 2, name: "Mon Jardin", price: 200, category: "Kategori 2", color: "Mor", size: "Boyut 2", image:  process.env.PUBLIC_URL + '/images/pembelale.jpg', },
  { id: 3, name: "Mon Jardin", price: 800, category: "Kategori 3", color: "Pembe", size: "Boyut 3", image: process.env.PUBLIC_URL + '/images/pembelale.jpg', },
  { id: 4, name: "Mon Jardin", price: 900, category: "Kategori 1", color: "Lila", size: "Boyut 3", image: process.env.PUBLIC_URL + '/images/pembelale.jpg', },
  { id: 5, name: "Mon Jardin", price: 800, category: "Kategori 2", color: "Mor", size: "Boyut 3", image:  process.env.PUBLIC_URL + '/images/pembelale.jpg',},
  { id: 6, name: "Mon Jardin", price: 600, category: "Kategori 3", color: "Lila", size: "Boyut 3", image: process.env.PUBLIC_URL + '/images/pembelale.jpg', },
  { id: 7, name: "Mon Jardin", price: 700, category: "Kategori 1", color: "Pembe", size: "Boyut 1", image: process.env.PUBLIC_URL + '/images/pembelale.jpg', },
  { id: 8, name: "Mon Jardin", price: 1000, category: "Kategori 2", color: "Sarı", size: "Boyut 2", image: process.env.PUBLIC_URL + '/images/pembelale.jpg', },
  { id: 9, name: "Mon Jardin", price: 800, category: "Kategori 1", color: "Mor", size: "Boyut 3", image: process.env.PUBLIC_URL + '/images/pembelale.jpg', },
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
  const [showSizeOptions, setShowSizeOptions] = useState(false); // State for showing/hiding price options

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

   // Function to toggle showing/hiding price options
   const toggleSizeOptions = () => {
    setShowSizeOptions(!showSizeOptions);
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
        
        <select id="categoryFilter" value={categoryFilter} onChange={handleCategoryFilterChange} >
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
        <span>&#x25BC;</span>
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
    <span className="arrow" onClick={togglePriceOptions} >
          ▼
        </span>
      <label className="fiyat" htmlFor="priceFilter">
        Fiyat:
        
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
    <span className="arrow"  onClick={toggleSizeOptions}  >
          ▼
        </span>
      Boyut: 
    </label>
    {showSizeOptions && (
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

<div className="row">
  <div className="col-md-4">
    {filteredProducts.slice(0, Math.ceil(filteredProducts.length / 3)).map((product)=>  (
      <li key={product.id} style={{ listStyle: "none" }}>
      <img src={product.image} alt={product.name} width={300} height={350}/>
      <h3 style={{fontStyle:"italic",  fontWeight:"300", fontFamily:"Times New Roman"}}>{product.name}</h3>
    
      <p style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>{product.price} TL</p>
     
      </li>
    ))}
  
  </div>
  <div className="col-md-4">
    {filteredProducts.slice(0, Math.ceil(filteredProducts.length / 3)).map((product)=>  (
      <li key={product.id} style={{ listStyle: "none" }}>
      <img src={product.image} alt={product.name} width={300} height={350}/>
      <h3 style={{fontStyle:"italic" , fontWeight:"300", fontFamily:"Times New Roman"}}>{product.name}</h3>
     
      <p style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>{product.price} TL</p>
     
      </li>
    ))}
  
  </div>
  <div className="col-md-4">
    {filteredProducts.slice(0, Math.ceil(filteredProducts.length / 3)).map((product)=>  (
      <li key={product.id} style={{ listStyle: "none" }}>
      <img src={product.image} alt={product.name} width={300} height={350}/>
      <h3 style={{fontStyle:"italic", fontWeight:"300", fontFamily:"Times New Roman"}}>{product.name}</h3>
      
      <p style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>{product.price} TL</p>
     
      </li>
    ))}
  
  </div>
  </div>
</div>
</div>
);
};

export default Liste;
