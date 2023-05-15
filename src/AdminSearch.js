import React, { useState , useEffect, useRef} from "react";
import Admincard from './Admincard'; // Card bileşenini import edin
import { useNavigate } from 'react-router-dom';
import ProductListByCategory from "./ProductListByCategory";

const AdminSearch= () => {
  const [productList, setProductList] = useState([]);
  const [previousSearches, setPreviousSearches] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Bir önceki sayfaya yönlendirir
  };

  const handleSearchTermChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  
    console.log("sear", searchTerm);
    navigate(`/ProductListByCategory/${searchTerm}`);
  };

  const fetchCategoryList = async () => {
    try {

      const response = await fetch(`https://api.monjardin.online/api/Category/GetMainCategories`);
      const data = await response.json();
      console.log("cateogryyyyyyy",data.data)
      const categoryData= data.data;

      setCategoryList(categoryData);  
      //setFilteredProducts(categoryData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategoryList();
    fetchProductList();
  }, []);
  
  const cards = [
    {
      imageUrl: process.env.PUBLIC_URL + '/images/saksıadmin.png',
      title: "Saksı"
    },
    {
      imageUrl: process.env.PUBLIC_URL + '/images/saksı.png',
      title: "Kurutulmuş Çiçek"
    },
    {
      imageUrl: process.env.PUBLIC_URL + '/images/cicek.png',
      title: "Çiçekler"
    },
    {
      imageUrl: process.env.PUBLIC_URL + '/images/aranjman.png',
      title: "Aranjmanlar"
    },
    {
      imageUrl: process.env.PUBLIC_URL + '/images/buyukcicek.png',
      title: "Büyük Bitki"
    },
    {
      imageUrl: process.env.PUBLIC_URL + '/images/saksı.png',
      title: "Kendin Yap"
    },
  ];

  const fetchProductList = async () => {
    try {

      const response = await fetch(`https://api.monjardin.online/api/Product/GetAllProducts`);
      const data = await response.json();
      console.log("data",data.data)
      const productData= data.data;
      setProductList(productData);  
      console.log("ADMİN SEARCH PRODUCUT",productData);
      //setFilteredProducts(productData);
    } catch (error) {
      console.error(error);
    }
  };
 


  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);
  const myRef = useRef(null);

  const search = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.searchTerm.value;
    if (searchTerm) {
      const filteredProducts = productList.filter((product) => {
        // search for the searchTerm in all properties of the product object
        return Object.values(product).some((property) =>
          property.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      console.log("ajaa",filteredProducts); // You can use the filteredProducts array as you like.
      setPreviousSearches([...previousSearches, searchTerm]);
      setSearchResults(filteredProducts);
      event.target.elements.searchTerm.value = "";
    }
  };
  const clearSearchResults = () => {
    setSearchResults([]);
  };

  const categories = categoryList.map((item) => ({
    title: item.name,
    imageUrl: item.fileurl
  }));
  
  return (
    <div style={{ margin: "100px" }}>
       <h1  className='baslik'>Mon Jardin</h1>

      <button onClick={handleGoBack} className='back-button'><img src="/images/back-button.png" alt="" width={40} height={30}/></button>

      <div className="search-area">
          <form onSubmit={search}> 
          <input
            type="text"
            ref={myRef}
            name="searchTerm"
            placeholder="Arama yapmak için buraya yazın..."
            className="admin-search-area"
          />
            <button type="submit" className='search-button'>
            <img src="/images/search.png" alt="" width={32} height={32} />
          </button>
       
          <Admincard  cards={categories} />
          </form>
        </div>
       {searchResults.length > 0 && (
          navigate('/ProductListByCategory', { state: { productList: searchResults } })
        )} 
      
    </div>  
  );
}

export default AdminSearch;



