import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import WithNavbar from './WithNavbar'; 



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



  

const List = () => {
    
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
      <div style={{ display: "flex", alignItems: "center", justifyContent:"space-between" }}>
        <label className="kategori" htmlFor="categoryFilter">Kategori</label>
        <div style={{ marginRight: "8px", cursor: "pointer" }} onClick={handleCategoryFilterToggle}>
          {/* Arrow icon */}
          <span>{categoryFilterOpen ?  "\u25B2" :"\u25BC" }</span>
        </div>   
      </div>
      {categoryFilterOpen && (
        <div style={{marginTop:"5px"}}>
        <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
          <input type="checkbox" id="all" name="all" value="" onChange={handleCategoryFilterChange} style={{marginRight:"5px"}}/>
          Tümü
        </label>
      
        <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
          <input type="checkbox" id="kategori1" name="kategori1" value="Kategori 1" onChange={handleCategoryFilterChange} style={{marginRight:"5px"}} />
          Kategori 1
        </label>
      
        <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
          <input type="checkbox" id="kategori2" name="kategori2" value="Kategori 2" onChange={handleCategoryFilterChange} style={{marginRight:"5px"}}/>
          Kategori 2
        </label>
      
        <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
          <input type="checkbox" id="kategori3" name="kategori3" value="Kategori 3" onChange={handleCategoryFilterChange} style={{marginRight:"5px"}}/>
          Kategori 3
        </label>
      </div>
      
      )}
    <hr />
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent:"space-between" }}>
        <label className="kategori" htmlFor="colorFilter">Renk:</label>
        <div style={{ marginRight: "8px", cursor: "pointer" }} onClick={handleColorFilterToggle}>
          {/* Arrow icon */}
          <span>{categoryFilterOpen ?  "\u25B2" :"\u25BC" }</span>
        </div>   
      </div>
      {showColorFilter && ( 
      <div style={{marginTop:"5px"}}>
        <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
          <input type="checkbox" id="all" name="all" value="" onChange={handleColorFilterChange} style={{marginRight:"5px"}}/>
          Tümü
        </label>
      
        <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
          <input type="checkbox" id="Mor" name="Mor" value="Mor" onChange={handleColorFilterChange} style={{marginRight:"5px"}} />
          Mor
        </label>
      
        <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
          <input type="checkbox" id="Pembe" name="Pembe" value="Pembe" onChange={handleColorFilterChange} style={{marginRight:"5px"}}/>
          Pembe
        </label>
      
        <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
          <input type="checkbox" id="Lila" name="Lila" value="Lila" onChange={handleColorFilterChange} style={{marginRight:"5px"}}/>
          Lila
        </label>
        

        <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
          <input type="checkbox" id="Sarı" name="Sarı" value="Sarı" onChange={handleColorFilterChange} style={{marginRight:"5px"}}/>
          Sarı
        </label>
        
      </div>
      )}
    </div>
    <hr />

    <div>

      <div style={{ display: "flex", alignItems: "center", justifyContent:"space-between" }}>
        <label className="kategori" htmlFor="priceFilter">Fiyat</label>
        <div style={{ marginRight: "8px", cursor: "pointer" }} onClick={togglePriceOptions}>
          {/* Arrow icon */}
          <span>{showPriceOptions ?  "\u25B2" :"\u25BC" }</span>
        </div>   
      </div>
      

      {showPriceOptions && (
     <div style={{marginTop:"5px"}}>
     <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
       <input type="checkbox" id="all" name="all" value="" onChange={handlePriceFilterChange} style={{marginRight:"5px"}}/>
       Tümü
     </label>
   
     <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
       <input type="checkbox" id="0-100" name="0-100" value="0-100" onChange={handlePriceFilterChange} style={{marginRight:"5px"}} />
       0-100
     </label>
   
     <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
       <input type="checkbox" id="100-200" name="100-200" value="100-200" onChange={handlePriceFilterChange} style={{marginRight:"5px"}}/>
       100-200
     </label>
   
     <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
       <input type="checkbox" id="200-500" name="200-500" value="200-500" onChange={handlePriceFilterChange} style={{marginRight:"5px"}}/>
       200-500
     </label>

     <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
       <input type="checkbox" id="500+" name="500+" value="500+" onChange={handlePriceFilterChange} style={{marginRight:"5px"}}/>
       500+
     </label>
   </div>

      )}
    </div>


    <hr />
    <div >
   
    <div style={{ display: "flex", alignItems: "center", justifyContent:"space-between" }}>
        <label className="kategori" htmlFor="sizeFilter">Boyut</label>
        <div style={{ marginRight: "8px", cursor: "pointer" }} onClick={toggleSizeOptions}>
          {/* Arrow icon */}
          <span>{showSizeOptions ?  "\u25B2" :"\u25BC" }</span>
        </div>   
      </div>

     
      
    {showSizeOptions && (
       <div style={{marginTop:"5px"}}>
       <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
         <input type="checkbox" id="Boyut 1" name="Boyut 1" value="Boyut 1" onChange={handleSizeFilterChange} style={{marginRight:"5px"}}/>
         Boyut 1
       </label>
     
       <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
         <input type="checkbox" id="Boyut 2" name="Boyut 2" value="Boyut 2" onChange={handleSizeFilterChange} style={{marginRight:"5px"}} />
         Boyut 2
       </label>
     
       <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
         <input type="checkbox" id="Boyut 3" name="Boyut 3" value="Boyut 3" onChange={handleSizeFilterChange} style={{marginRight:"5px"}}/>
         Boyut 3
       </label>
   
     </div>
    )}
    </div>
    <hr />
    </div>
    <div style={{ flex: "0 0 75%", padding: "10px" }}>

    <div className="row">
      <div className="col-md-4">
        {filteredProducts.slice(0, Math.ceil(filteredProducts.length / 3)).map((product)=>  (
          <li key={product.id} style={{ listStyle: "none" }}>
          <img src={product.image} alt={product.name} width={300} height={350}/>
          <h3 style={{fontStyle:"italic",  fontWeight:"300", fontFamily:"Times New Roman"}}>{product.name}</h3>
          <p style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>{product.category} </p>
          <p style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>{product.color} </p>
          <p style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>{product.size} </p>

          <p style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>{product.price} TL</p>
        
          </li>
        ))}
      
      </div>
      <div className="col-md-4">
        {filteredProducts.slice(0, Math.ceil(filteredProducts.length / 3)).map((product)=>  (
          <li key={product.id} style={{ listStyle: "none" }}>
          <img src={product.image} alt={product.name} width={300} height={350}/>
          <h3 style={{fontStyle:"italic" , fontWeight:"300", fontFamily:"Times New Roman"}}>{product.name}</h3>
          <p style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>{product.category} </p>
          <p style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>{product.color} </p>
          <p style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>{product.size} </p>

          <p style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>{product.price} TL</p>
        
          </li>
        ))}
      
      </div>
      <div className="col-md-4">
        {filteredProducts.slice(0, Math.ceil(filteredProducts.length / 3)).map((product)=>  (
          <li key={product.id} style={{ listStyle: "none" }}>
          <img src={product.image} alt={product.name} width={300} height={350}/>
          <h3 style={{fontStyle:"italic", fontWeight:"300", fontFamily:"Times New Roman"}}>{product.name}</h3>
          <p style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>{product.category} </p>
          <p style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>{product.color} </p>
          <p style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>{product.size} </p>

          <p style={{fontStyle:"italic",fontFamily:"Times New Roman"}}>{product.price} TL</p>
        
          </li>
        ))}
      
      </div>
      </div>
    </div>
    <hr />
  </div>
);
};

export default WithNavbar(List);
