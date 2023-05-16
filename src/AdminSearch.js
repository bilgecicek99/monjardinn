import React, { useState , useEffect, useRef} from "react";
import { useNavigate } from 'react-router-dom';
import ProductListByCategory from "./ProductListByCategory";

const AdminSearch= () => {
  const [productList, setProductList] = useState([]);
  const [previousSearches, setPreviousSearches] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


function Admincard( { cards }) {
  const navigate = useNavigate();
  const [searchResultsCategory, setSearchResultsCategory] = useState([]);

  const handleNavigate = (searchResultsCategory) => {
    console.log("geld")
    navigate('/ProductListByCategory', { state: { productList: searchResultsCategory } })
  };
  

  
  const Cardx = ({ imageUrl, title, id, data }) => {
    
    const categoriesFilter = (categoryId) => {
      console.log("categoryId",categoryId)
      //event.preventDefault();
     // const categoryId = event.target.elements.categoryId.value; // Kategori kimliğini al
      if (categoryId) {
        const filteredProducts = productList.filter((product) => {
          return product.categoryId === categoryId; // Kategori kimliğine göre filtreleme yap
        });
        setSearchResultsCategory(filteredProducts);
        console.log("productList",productList)
        console.log("searchResultsCategory",filteredProducts)
       categoryId = "";
       handleNavigate(filteredProducts);
      }
    };
   
    
    return (
      <div style={styles.card} onClick={() => {categoriesFilter(id);
     
       }}>
        <div style={styles.cardContent}>
          <h3>{title}</h3>
        </div>
        <div style={styles.cardImageContainer}>
          <img style={styles.cardImage} src={imageUrl} alt={title} />
        </div>
      </div>
    );
  };
  
  const styles = {
    card: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundImage: "url('/images/card-background.png')",
      color: "#FFFFFF",
      padding: "40px",
      borderRadius: "12px",
      marginBottom: "50px",
      height: "250px", // set a fixed height for the card
    },
    cardImageContainer: {
      width: "50%",
      textAlign: "center",
      height: "100%", // set the height of the container to match the card's height
    },
    cardImage: {
      width: "auto",
      height: "100%", // set a fixed height for the image
    },
    cardContent: {
      width: "50%",
      textAlign: "center",
      fontStyle: "italic",
      height: "100%", // set the height of the content to match the card's height
    },
  };
  
  return (
  <div style={{padding:"100px"}}> 
   <div>
   <div className="row">
    <div className="col-md-6">
      <div className="card" style={{display:"flex", border:"none"}}>
        {cards.slice(0, Math.ceil(cards.length / 2)).map((card) => (
          <Cardx
            key={card.title}
            imageUrl={card.imageUrl}
            title={card.title}
            width="400px"
            height="300px"
            id={card.id}
            data={card.data}
          />
        ))}
      </div>
    </div>
    <div className="col-md-6">
      <div className="card"style={{display:"flex", border:"none"}}>
        {cards.slice(Math.ceil(cards.length / 2), cards.length).map((card) => (
          <Cardx
            key={card.title}
            imageUrl={card.imageUrl}
            title={card.title}
            description={card.description}
            width="400px"
            height="300px"
            id={card.id}
            data={card.data}

          />
        ))}
      </div>
    </div>
  </div>

    
   
    </div>
    
  </div>
  );
}

  const handleGoBack = () => {
    navigate(-1); // Bir önceki sayfaya yönlendirir
  };

  const handleSearchTermChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  
    //console.log("sear", searchTerm);
    navigate(`/ProductListByCategory/${searchTerm}`);
  };

  const fetchCategoryList = async () => {
    try {

      const response = await fetch(`https://api.monjardin.online/api/Category/GetMainCategories`);
      if (!response.ok) {
        throw new Error('Kategori listesi getirilemedi. Lütfen daha sonra tekrar deneyin.');
      }
      const data = await response.json();
     
    
      const categoryData= data.data;
      console.log("cateogryyyyyyy",categoryData)
      setCategoryList(categoryData);  
      //setFilteredProducts(categoryData);
    } catch (error) {
      console.error(error);
      alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');

    }
  };
  const fetchProductList = async () => {
    try {

      const response = await fetch(`https://api.monjardin.online/api/Product/GetAllProducts`);
      if (!response.ok) {
        throw new Error('Kategori listesi getirilemedi. Lütfen daha sonra tekrar deneyin.');
      }
      const data = await response.json();
     // console.log("data",data.data)
      const productData= data.data;
      setProductList(productData);  
     // console.log("ADMİN SEARCH PRODUCUT",productData);
      //setFilteredProducts(productData);
    } catch (error) {
      console.error(error);
      alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');

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
     // console.log("ajaa",filteredProducts); // You can use the filteredProducts array as you like.
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
    imageUrl: item.fileurl,
    id:item.id
  }));
  
  

  /*
  const handleClickx = (event) => {
    // İşlem yapmak istediğiniz kodu buraya ekleyin
    console.log("Tıklanan kategori:");
   // event.preventDefault();
    const categoryId = event.target.elements.categoryId.value; // Kategori kimliğini al
    if (categoryId) {
      const filteredProducts = productList.filter((product) => {
        return product.categoryId === categoryId; // Kategori kimliğine göre filtreleme yap
      });
      setSearchResultsCategory(filteredProducts);
      console.log("searchResultsCategory",searchResultsCategory)
      event.target.elements.categoryId.value = "";
    }
  };
  */
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



