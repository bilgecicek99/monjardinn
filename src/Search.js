import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
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
  
  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      const response = await fetch(baseUrl + 'api/Product/GetAllProducts');
      const data = await response.json();
      const productData = data.data;
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

  return (
    <>
      <div className="search-area">
        <form onSubmit={handleSearch} style={{ paddingTop: '10%', paddingBottom: '3%' }}>
        <input
    type="text"
    id="searchTerm"
    name="searchTerm"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)} 
    style={{border:"1px solid #D9D9D9",

      display: 'inline-block', 
      border: 'none',
      borderBottom: '1px solid black',
      outline: 'none',
      fontSize: '16px',
      padding: '5px 0',
      width: '30%', 
      marginRight: '5px',
      fontStyle: 'italic',
    }}
    placeholder="Ürün adını, kategorisini veya rengini giriniz"
  />
  <img
    src="/images/search.png"
    alt="Search"
    style={{
      width: '16px',
      
      height: '16px',
      cursor: 'pointer',
      verticalAlign: 'middle',
    }}
    onClick={handleSearch} 
  />



        
        </form>
        <div className="recommended-products">
  
        <div className="product-grid row">
        {filteredProducts.map((product) => (
  <div key={product.id} className="product-item col-md-3">
    <Link
      to={`/productinfo/${product.id}`} // Updated to directly use product.id
      style={{ textDecoration: 'none', color: 'black' }}
    >
        <div className="product-card">
          <img
            className="product-image"
            style={{
              width: "250px",
              height: "300px",
              borderRadius:"30px",
              filter: product.stock === 0 ? "blur(2px)" : "none",
              
             // objectFit: "contain",
             // border: "1px solid #D9D9D9",
              //boxShadow: "10px 10px 10px rgba(0,0,0,0.25)"
            }}
            src={
              product?.fileResponseModel[0]?.fileUrl ||
              process.env.PUBLIC_URL + '/images/monjardinlogo.png'
            }
            alt={product.name}
          />
            {product.stock === 0 && <p style={{ backgroundColor: "#893694", color: "white", borderRadius: "8px", padding: "4px 8px", fontFamily: "sans-serif", fontWeight: "lighter",textAlign: "center",width:"250px", marginLeft:"50px" }}>Tükendi</p>}
          <h3 className="product-name" style={{ marginTop: "25px",marginBottom:0,fontFamily:"times" }}>
            {product.name}
          </h3>
          <p className="product-price" style={{ marginTop: "0px" }}>
            {product.price} ₺
          </p>
        
        </div>
      </Link>
    </div>
  ))}
</div>

  

</div>


      </div>
    </>
  );
};

export default WithNavbar(Search);
