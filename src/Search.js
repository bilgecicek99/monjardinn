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
  
  useEffect(() => {
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
      <div style={{textAlign:"center",marginTop:"100px", padding:"0% 5%"}}>
        <form onSubmit={handleSearch}>
          <input type="text"
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
        {filteredProducts.length === 0 ? (
      <div style={{justifyContent:"center", textAlign: "center", marginTop: "15%", fontSize: "18px", fontFamily:"sans-serif", textSizeAdjust:"bold" }}>
        Ürün bulunamadı.</div> ):
        <div className="recommended-products">
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
            className="product-image"
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
          <h3 className="product-name" style={{ marginTop: '25px', marginBottom: 0, fontFamily: 'times',width:"250px" }}>
            {product.name}
          </h3>
          <p className="product-price" style={{ marginTop: '0px' }}>
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
