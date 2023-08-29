import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import WithNavbar from './WithNavbar';
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
    style={{
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
  {filteredProducts.slice(0, 4).map((product) => (
    <div
      key={product.id}
      className="product-item col-md-3" // Değişiklik: Sütun sayısı 4 olarak güncellendi
    >
      <div className="product-card">
        <img
          className="product-image"
          style={{ width: "190px", height: "180px" ,objectFit:"contain"}}
          src={product?.fileResponseModel[0]?.fileUrl || process.env.PUBLIC_URL + '/images/monjardinlogo.png'}
          alt={product.name}
        />
        <p className="product-name">{product.name}</p>
        <p className="product-price">{product.price}</p>
      </div>
    </div>
  ))}
</div>

  
<div className="product-grid row">
  {filteredProducts.slice(4).map((product) => (
    <div
      key={product.id}
      className="product-item col-md-3" // Değişiklik: Sütun sayısı 4 olarak güncellendi
    >
      <div className="product-card">
        <img
          className="product-image"
          style={{ width: "190px", height: "180px" ,objectFit: "contain"}}
          src={product?.fileResponseModel[0]?.fileUrl || process.env.PUBLIC_URL + '/images/monjardinlogo.png'}
          alt={product.name}
        />
        <p className="product-name">{product.name}</p>
        <p className="product-price">{product.price}</p>
      </div>
    </div>
  ))}
</div>
</div>


      </div>
    </>
  );
};

export default WithNavbar(Search);
