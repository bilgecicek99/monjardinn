import React, { useState,useEffect } from "react";
import WithNavbar from './WithNavbar'; 
import { baseUrl } from './config/Constants';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const List = () => {
    
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProduct,setFilteredProduct]= useState([]);
  const { categoryId } = useParams();

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
  const [isCategoryVisible, setISCategoryVisible] = useState(false);
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

  let filteredProducts = products.filter((product) => {
    return (
      (categoryFilter === "" || product.categoryId === parseInt(categoryFilter)) &&
      (colorFilter === "" || product.color === colorFilter) &&
      (priceFilter === "" || product.price <= parseInt(priceFilter)) &&
      (sizeFilter === "" || product.size === sizeFilter)
    );
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (categoryId) {
          await fetchProducts(categoryId);
        } else {
          await fetchProducts();
          setISCategoryVisible(true);
        }
        await fetchCategories();
      } catch (error) {
        console.error('Bilinmeyen bir hata gerçekleşti:', error);
      }
    };
    fetchData();
  }, [categoryId]);
  
  const fetchProducts = async (categoryId = null) => {
    try {
      await fetch(baseUrl + 'api/Product/GetAllProducts')
        .then((response) => response.json())
        .then((data) => {
          if (data && data.data) {
            data.data.sort((a, b) => {
              if (a.stock === 0 && b.stock !== 0) {
                return 1; 
              } else if (a.stock !== 0 && b.stock === 0) {
                return -1; 
              } else {
                return 0; 
              }
            });
            const allProducts = data.data.map(product => ({
              ...product,
              stock: product.stock || 0, // Add stock property, default to 0
            }));
          
            if (categoryId) {
              filteredProducts = allProducts.filter(product => product.categoryId === parseInt(categoryId));
              setProducts(filteredProducts);
              setFilteredProduct(filteredProduct);
            } else {
              setProducts(allProducts);
            }
          } else {
            console.error('Ürünler alınamadı.');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error('Ürünler getirilirken hata ile karşılaşıldı: ', error);
    }
  };

  const fetchCategories = async () => {
    try {
      await fetch(baseUrl + 'api/Category/GetMainCategories')
        .then((response) => response.json())
        .then((data) => {
          if (data && data.data) {
            setCategories(data.data);
          } 
          else {
            console.error('Kategoriler alınamadı.');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error('Kategoriler getirilirken hata ile karşılaşıldı: ', error);
    }
  };
  

  return (
    <div className="kategori1">
   <div style={{ display: "flex", alignItems: "center",float:"right", marginRight:"8%",marginBottom:"2%" }}>
   {isCategoryVisible && <div class="dropdown">
      <button type="button" data-bs-toggle="dropdown"style={{background:"transparent",display:"flex",height:"50px"}}>
        <label className="kategori" htmlFor="priceFilter"style={{color:"black"}}>Kategori</label>
        <div style={{ cursor: "pointer" }}>
        <img
          src={"/images/downarrow.png"} 
          alt="Arrow Icon"
          style={{ width: "15px", height: "8px",marginLeft:"25px",marginTop:"5px" }} 
        />
      </div> 
      </button>
      <ul class="dropdown-menu" style={{border:"none",boxShadow: "0 6px 20px rgba(56, 125, 255, 0.17)",width:"210px"}}>
 	    {categories.map((category) => (
        <li style={{lineHeight:"1px"}}>
          <label key={category.id} style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
          <input type="checkbox" id={`kategori${category.id}`} name={`kategori${category.id}`} value={category.id} onChange={handleCategoryFilterChange} style={{marginRight:"5px"}} />
          {category.name}
        </label>
        <hr/>
	</li>))}
      </ul>
    </div>}
    {isCategoryVisible && <hr/>}
  <div class="dropdown">
      <button type="button" data-bs-toggle="dropdown"style={{background:"transparent",display:"flex",height:"50px"}}>
        <label className="kategori" htmlFor="priceFilter"style={{color:"black"}}>Renk</label>
        <div style={{ cursor: "pointer" }}>
        <img
          src={"/images/downarrow.png"} 
          alt="Arrow Icon"
          style={{ width: "15px", height: "8px",marginLeft:"25px",marginTop:"5px" }} 
        />
      </div> 
      </button>
      <ul class="dropdown-menu" style={{border:"none",boxShadow: "0 6px 20px rgba(56, 125, 255, 0.17)"}}>
  	<li style={{lineHeight:"1px"}}>
       <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
      <input type="checkbox" id="all" name="all" value="" onChange={handleColorFilterChange} style={{marginRight:"5px"}}/>
      Tümü
    </label>
     <hr/>
      </li>
  <li style={{lineHeight:"1px"}}>
    <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
      <input type="checkbox" id="Mor" name="Mor" value="Mor" onChange={handleColorFilterChange} style={{marginRight:"5px"}} />
      Mor
    </label>
	<hr/>
      </li>
    
  <li style={{lineHeight:"1px"}}>
    <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
      <input type="checkbox" id="Pembe" name="Pembe" value="Pembe" onChange={handleColorFilterChange} style={{marginRight:"5px"}}/>
      Pembe
    </label>
   <hr/>
      </li>
    
  <li style={{lineHeight:"1px"}}>
    <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
      <input type="checkbox" id="Lila" name="Lila" value="Lila" onChange={handleColorFilterChange} style={{marginRight:"5px"}}/>
      Lila
    </label>
 	<hr/>
      </li>

      <li style={{lineHeight:"1px"}}>
    <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
      <input type="checkbox" id="Sarı" name="Sarı" value="Sarı" onChange={handleColorFilterChange} style={{marginRight:"5px"}}/>
      Sarı
    </label>
      </li>
      </ul>
    </div>
  <hr/>
      <div class="dropdown" >
      <button type="button" data-bs-toggle="dropdown"style={{background:"transparent",display:"flex",height:"50px"}}>
        <label className="kategori" htmlFor="priceFilter"style={{color:"black"}}>Fiyat</label>
        <div style={{ cursor: "pointer" }}>
        <img
          src={"/images/downarrow.png"} 
          alt="Arrow Icon"
          style={{ width: "15px", height: "8px",marginLeft:"25px",marginTop:"5px" }} 
        />
      </div> 
      </button>
      <ul class="dropdown-menu" style={{border:"none",boxShadow: "0 6px 20px rgba(56, 125, 255, 0.17)"}}>
        <li style={{lineHeight:"1px"}}>
          <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
          <input type="checkbox" id="all" name="all" value="" onChange={handlePriceFilterChange} style={{marginRight:"5px"}}/>
            Tümü
        </label>
        <hr/>
      </li>
      <li style={{lineHeight:"1px"}}><label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
        <input type="checkbox" id="0-100" name="0-100" value="0-100" onChange={handlePriceFilterChange} style={{marginRight:"5px"}} />
        0 TL - 100 TL
      </label>
      <hr/>
      </li>
      
      <li style={{lineHeight:"1px"}}><label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
        <input type="checkbox" id="100-200" name="100-200" value="100-200" onChange={handlePriceFilterChange} style={{marginRight:"5px"}}/>
        100 TL - 200 TL
      </label>
      <hr/>
      </li>
      
      <li style={{lineHeight:"1px"}}><label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
        <input type="checkbox" id="200-500" name="200-500" value="200-500" onChange={handlePriceFilterChange} style={{marginRight:"5px"}}/>
        200 TL - 500 TL
      </label>
      <hr/>
      </li>

      <li style={{lineHeight:"1px"}}><label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
        <input type="checkbox" id="500+" name="500+" value="500+" onChange={handlePriceFilterChange} style={{marginRight:"5px"}}/>
        500 TL +
      </label>
      </li>
      </ul>
    </div>
  
</div>
    <div style={{ flex: "0 0 100%" }}>
  <div className="container" style={{margin:"8%"}}>
    {filteredProducts.length === 0 ? (
      <div style={{marginLeft:"20%", justifyContent:"center", textAlign: "center", marginTop: "20%", fontSize: "18px", fontFamily:"sans-serif", textSizeAdjust:"bold" }}>
        Ürün bulunmamaktadır.
      </div>
    ) : (
      <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredProducts.map((product, index) => (
          <div key={product.id} className="col-md-3">
            <li style={{ listStyle: "none" }}>
              <Link to={`/productinfo/${product.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <img
                  style={{
                    borderRadius: "15px",
                    height: "250px",
                    width: "200px",
                    maxHeight: "100%",
                    filter: product.stock === 0 ? "blur(2px)" : "none",
                  }}
                  src={product?.fileResponseModel[0]?.fileUrl || process.env.PUBLIC_URL + '/images/monjardinlogo.png'}
                  alt={product.name}
                />
                {product.stock === 0 && <p style={{ backgroundColor: "#893694", color: "white", borderRadius: "8px", padding: "4px 8px", fontFamily: "sans-serif", fontWeight: "lighter", width: "200px",  textAlign: "center" }}>Tükendi</p>}
                <h3 style={{ fontStyle: "italic", fontWeight: "300", fontFamily: "Times New Roman" }}>{product.name}</h3>
                <p style={{ fontStyle: "italic", fontFamily: "Times New Roman" }}>{product.category}</p>
                <p style={{ fontStyle: "italic", fontFamily: "Times New Roman" }}>{product.color}</p>
                <p style={{ fontStyle: "italic", fontFamily: "Times New Roman" }}>{product.size}</p>
                <p style={{ fontStyle: "italic", fontFamily: "Times New Roman" }}>{product.price} TL</p>
              </Link>
            </li>
            {(index + 1) % 4 === 0 && <div className="w-100"></div>}
          </div>
        ))}
      </div>
    )}
  </div>
</div>

  </div>
);
};

export default WithNavbar(List);
