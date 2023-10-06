import React, { useState, useEffect } from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Link } from 'react-router-dom';
import WithNavbar from './WithNavbar';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from './config/Constants';

const Search = () => {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [previousSearches, setPreviousSearches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState(""); 
  const [colorFilter, setColorFilter] = useState([]);
  const [categories, setCategories] = useState([]);
  const colors = ["Mor", "Pembe", "Lila", "Sarı","Mavi"];


  useEffect(() => {
    fetchCategories();
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      const response = await fetch(baseUrl + 'api/Product/GetAllProducts');
      const data = await response.json();
      const productData = data.data;
      productData.sort((a, b) => {
        if (a.stock === 0 && b.stock !== 0) {
          return 1; 
        } else if (a.stock !== 0 && b.stock === 0) {
          return -1; 
        } else {
          return 0; 
        }
      });
      setProductList(productData);
      setFilteredProducts(productData);
    } catch (error) {
      console.error(error);
    }
  };
  const navigate = useNavigate();
  const goHomePage = () => {
    navigate('/');
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

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmedSearchTerm = searchTerm.trim().toLowerCase()

    const filtered = productList.filter((product) => {
      const productName = product.name ? product.name.toLowerCase() : ''; 
      const productCategory = product.category ? product.category.toLowerCase() : '';
      const productColor = product.color ? product.color.toLowerCase() : '';
      return (

        productName.includes(trimmedSearchTerm) ||
        productCategory.includes(trimmedSearchTerm) ||
        productColor.includes(trimmedSearchTerm)
      );
    });
  
    setFilteredProducts(filtered);
    setPreviousSearches([...previousSearches, trimmedSearchTerm]);
  };

  const [categoryFilter, setCategoryFilter] = useState([]);

  const handleCategoryFilterChange = (event) => {
    const categoryValue = event.target.value;
    let newCategoryFilter;
  
    if (categoryValue === "") {
      if (categoryFilter.length === categories.length) {
        newCategoryFilter = [];
      } else {
        newCategoryFilter = categories.map((category) => `${category.id}`);
      }
    } else {
      if (categoryFilter.includes(categoryValue)) {
        newCategoryFilter = categoryFilter.filter((category) => category !== categoryValue);
      } else {
        newCategoryFilter = [...categoryFilter, categoryValue];
      }
    }
  
    const filteredProduct = productList.filter((product) => {
      const selectedColorsLowercase = colorFilter.map((color) => color.toLowerCase());
      const productColorLowercase = product.color.toLowerCase();
      const colorFilterApplied = colorFilter.length > 0 && (colors.length > colorFilter.length);
      return (
        (newCategoryFilter.length === 0 || newCategoryFilter.includes(`${product.categoryId}`)) &&
        ((!colorFilterApplied) || (colorFilterApplied && selectedColorsLowercase.includes(productColorLowercase))) &&
        (priceFilter === "" || isPriceInRange(product.price, priceFilter))
      );
    });
  
    setCategoryFilter(newCategoryFilter);
    setFilteredProducts(filteredProduct);
  };
    
  const handlePriceFilterChange = (e) => {
    const newPriceFilter = e.target.value;
    setPriceFilter(newPriceFilter);
  
    const filteredProduct = productList.filter((product) => {
      const selectedColorsLowercase = colorFilter.map((color) => color.toLowerCase());
      const productColorLowercase = product.color.toLowerCase();
      const colorFilterApplied = colorFilter.length > 0 && (colors.length > colorFilter.length);
      return (
        (categoryFilter.length === 0 || categoryFilter.includes(`${product.categoryId}`)) &&
        ((!colorFilterApplied) || (colorFilterApplied && selectedColorsLowercase.includes(productColorLowercase))) &&
        (newPriceFilter === "" || isPriceInRange(product.price, newPriceFilter))
      );
    });
  
    setFilteredProducts(filteredProduct);
  };
  const handleColorFilterChange = (event) => {
    const colorValue = event.target.value;
    let newColorFilter;
  
    if (colorValue === "") {
      if (colorFilter.length === colors.length) {
        newColorFilter = [];
      } else {
        newColorFilter = colors;
      }
    } else {
      if (colorFilter.includes(colorValue)) {
        newColorFilter = colorFilter.filter((color) => color !== colorValue);
      } else {
        newColorFilter = [...colorFilter, colorValue];
      }
    }
    const filteredProduct = productList.filter((product) => {
      const selectedColorsLowercase = newColorFilter.map((color) => color.toLowerCase());
      const productColorLowercase = product.color.toLowerCase();
      const colorFilterApplied = newColorFilter.length > 0 && (colors.length > newColorFilter.length);
      return (
        (categoryFilter.length === 0 || categoryFilter.includes(`${product.categoryId}`)) &&
        ((!colorFilterApplied) || (colorFilterApplied && selectedColorsLowercase.includes(productColorLowercase))) &&
        (priceFilter === "" || isPriceInRange(product.price, priceFilter))
      );
    });
  
    setColorFilter(newColorFilter);
    setFilteredProducts(filteredProduct);
  };

  function isPriceInRange(productPrice, selectedPriceRange) {
    if (!selectedPriceRange) {
      return true; 
    }
  
    if (selectedPriceRange === "500+") {
      return productPrice >= 500; 
    }
  
    const [min, max] = selectedPriceRange.split("-").map(Number);
  
    return productPrice >= min && productPrice <= max;
  }
  const isAllColorsSelected = colorFilter.length === colors.length;

  const isAllCategorysSelected = categoryFilter.length === categories.length;


  return (
    <>
      <div style={{textAlign:"center",marginTop:"100px", padding:"0% 5%"}}>
        <form onSubmit={handleSearch}>
          <input type="text"
            id="searchTerm"
            name="searchTerm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch(e); 
            }}
            style={{border:"1px solid #D9D9D9",
              display: 'inline-block', 
              border: 'none',
              borderBottom: '1px solid black',
              outline: 'none',
              fontSize: '16px',
              padding: '5px 0',
              width: '70%', 
              marginRight: '5px',
              fontStyle: 'italic',
            }}
      placeholder="Ürün adını, kategorisini veya rengini giriniz" />
          <img src="/images/search.png"
                alt="Search"
                style={{
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer',
                  verticalAlign: 'middle', }} 
                  onClick={handleSearch} />    
        </form>

        <div style={{ display: "flex",float:"right",marginBottom:"5%",marginTop: "30px" }}>
    <div class="dropdown">
      <button type="button" className='mobile-search-filter' data-bs-toggle="dropdown"style={{background:"transparent",display:"flex",height:"50px"}}>
        <label className="kategori" htmlFor="priceFilter"style={{color:"black"}}>Kategori</label>
        <div style={{ cursor: "pointer" }}>
        <img
          src={"/images/downarrow.png"} 
          alt="Arrow Icon"
          style={{ width: "15px", height: "8px",marginLeft:"25px",marginTop:"5px" }} 
        />
      </div> 
      </button>
      <ul class="dropdown-menu" style={{maxHeight: "450px",overflowX: "hidden",border:"none",boxShadow: "0 6px 20px rgba(56, 125, 255, 0.17)",width:"210px",borderRadius:"0px"}}>
      <li style={{lineHeight:"1px"}}>
       <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
      <input type="checkbox" 
      id="all" 
      name="all" 
      value="" 
      checked={isAllCategorysSelected} 
      onChange={handleCategoryFilterChange} 
      style={{marginRight:"5px"}}/>
      Tümü
    </label>
     <hr/>
      </li>
 	    {categories.map((category) => (
        <li style={{lineHeight:"1px"}}>
          <label key={category.id} style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
          <input type="checkbox" 
          id={category.id} 
          name="category"
          value={category.id}  
          onChange={handleCategoryFilterChange} 
          checked={categoryFilter.includes(`${category.id}`)}
          style={{marginRight:"5px"}} />
          {category.name}
        </label>
        <hr/>
	</li>))}
      </ul>
    </div>
     <hr/>
  <div class="dropdown">
      <button type="button" className='mobile-search-filter' data-bs-toggle="dropdown"style={{background:"transparent",display:"flex",height:"50px"}}>
        <label className="kategori" htmlFor="priceFilter"style={{color:"black"}}>Renk</label>
        <div style={{ cursor: "pointer" }}>
        <img
          src={"/images/downarrow.png"} 
          alt="Arrow Icon"
          style={{ width: "15px", height: "8px",marginLeft:"25px",marginTop:"5px" }} 
        />
      </div> 
      </button>
      <ul class="dropdown-menu" style={{border:"none",boxShadow: "0 6px 20px rgba(56, 125, 255, 0.17)",borderRadius:"0px"}}>
  	<li style={{lineHeight:"1px"}}>
    <label style={{ display: "block", fontFamily: "Times New Roman", fontStyle: "italic", fontSize: "18px" }}>
            <input
              type="checkbox"
              id="all"
              name="color"
              value=""
              onChange={handleColorFilterChange}
              checked={isAllColorsSelected}
              style={{ marginRight: "5px" }}
            />
            Tümü
          </label>
     <hr/>
      </li>
      {colors.map((color) => (
          <li key={color} style={{ lineHeight: "1px" }}>
            <label style={{ display: "block", fontFamily: "Times New Roman", fontStyle: "italic", fontSize: "18px" }}>
              <input
                type="checkbox"
                id={color}
                name="color"
                value={color}
                onChange={handleColorFilterChange}
                checked={colorFilter.includes(color)}
                style={{ marginRight: "5px" }}
              />
              {color}
            </label>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  <hr/>
      <div class="dropdown" >
      <button type="button" className='mobile-search-filter' data-bs-toggle="dropdown"style={{background:"transparent",display:"flex",height:"50px"}}>
        <label className="kategori" htmlFor="priceFilter"style={{color:"black"}}>Fiyat</label>
        <div style={{ cursor: "pointer" }}>
        <img
          src={"/images/downarrow.png"} 
          alt="Arrow Icon"
          style={{ width: "15px", height: "8px",marginLeft:"25px",marginTop:"5px" }} 
        />
      </div> 
      </button>
      <ul class="dropdown-menu" style={{border:"none",boxShadow: "0 6px 20px rgba(56, 125, 255, 0.17)",borderRadius:"0px"}}>
        <li style={{lineHeight:"1px"}}>
          <label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
          <input type="radio" id="all" name="all" value="" onChange={handlePriceFilterChange} checked={priceFilter === ""} style={{marginRight:"5px"}}/>
            Tümü
        </label>
        <hr/>
      </li>
      <li style={{lineHeight:"1px"}}><label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
        <input type="radio" id="0-100" name="0-100" value="0-100" onChange={handlePriceFilterChange} checked={priceFilter === "0-100"} style={{marginRight:"5px"}} />
        0 TL - 100 TL
      </label>
      <hr/>
      </li>
      
      <li style={{lineHeight:"1px"}}><label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
        <input type="radio" id="100-200" name="100-200" value="100-200" onChange={handlePriceFilterChange} checked={priceFilter === "100-200"} style={{marginRight:"5px"}}/>
        100 TL - 200 TL
      </label>
      <hr/>
      </li>
      
      <li style={{lineHeight:"1px"}}><label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
        <input type="radio" id="200-500" name="200-500" value="200-500" onChange={handlePriceFilterChange} checked={priceFilter === "200-500"} style={{marginRight:"5px"}}/>
        200 TL - 500 TL
      </label>
      <hr/>
      </li>

        <li style={{lineHeight:"1px"}}><label style={{display:"block", fontFamily:"Times New Roman", fontStyle:"italic", fontSize:"18px"}}>
          <input type="radio" id="500+" name="500+" value="500+" onChange={handlePriceFilterChange} checked={priceFilter === "500+"} style={{marginRight:"5px"}}/>
          500 TL +
        </label>
        </li>
        </ul>
      </div>
    
  </div>
        {filteredProducts.length === 0 ? (
      <div style={{justifyContent:"center", 
        textAlign: "center", 
        marginTop: "15%", fontSize: "18px", 
        fontFamily:"sans-serif", 
        textSizeAdjust:"bold",
        marginBottom:"15%" }}>
        Ürün bulunamadı.</div> ):
        <div className="recommended-products" style={{marginTop:"150px"}}>
          <div className="product-grid row">
          <div className="product-list">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <Link
                to={`/productinfo/${product.id}`}
                style={{ textDecoration: 'none', color: 'black' }}
              >
        <div className="product-card">
          <img
            className="search-product-image"
            style={{
              width: '250px',
              height: '300px',
              borderRadius: '30px',
              filter: product.stock === 0 ? 'blur(2px)' : 'none',
              objectFit: 'contain',
            }}
            src={
              product?.fileResponseModel[0]?.fileUrl ||
              process.env.PUBLIC_URL + '/images/monjardinlogo.png'
            }
            alt={product.name}
          />
          {product.stock === 0 && (
            <p className='search-tukendi'>Tükendi</p>
          )}
          <h3 className="product-name" style={{ marginTop: '25px', marginBottom: 0, fontFamily: 'times',width:"250px" ,  whiteSpace: 'pre-wrap',textAlign:"left"}}>
            {product.name}
          </h3>
          <p className="product-price" style={{ marginTop: '0px',textAlign:"left" }}>
            {product.price} ₺
          </p>
        </div>
      </Link>
    </div>
  ))}
</div>

          </div>
        </div>}
      </div>
    </>
  );
};

export default WithNavbar(Search);
