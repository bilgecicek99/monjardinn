import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminAllProductList() {
  const [productList, setProductList] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [previousSearches, setPreviousSearches] = useState([]);

  const fetchProductList = async () => {
    try {

      const response = await fetch(`https://api.monjardin.online/api/Product/GetAllProducts`);
      const data = await response.json();
      console.log("data",data.data)
      const productData= data.data;
      setProductList(productData);  
      setFilteredProducts(productData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const handleSearchTermChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  
    const filteredList = productList.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) 
        /*
        ||
        product.stock.includes(searchTerm)*/
      );
    });
    setFilteredProducts(filteredList);
  };
  

  const handleProductClick = (id) => {
    if (expandedProductId === id) {
    setExpandedProductId(null);
    } else {
    setExpandedProductId(id);
    }
  };
  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };
 
  const sortedProducts = filteredProducts.sort((a, b) => {
    const keyA = sortColumn ? a[sortColumn] : null;
    const keyB = sortColumn ? b[sortColumn] : null;
    if (keyA === null || keyB === null) return 0;
    if (sortOrder === 'asc') {
      if (typeof keyA === 'string' && typeof keyB === 'string') {
        return keyA.localeCompare(keyB);
      } else {
        return keyA - keyB;
      }
    } else {
      if (typeof keyA === 'string' && typeof keyB === 'string') {
        return keyB.localeCompare(keyA);
      } else {
        return keyB - keyA;
      }
    }
  });
  
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Bir önceki sayfaya yönlendirir
  };

  const search = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.searchTerm.value;
    if (searchTerm) {
      setPreviousSearches([...previousSearches, searchTerm]);
      event.target.elements.searchTerm.value = "";
    }
  };
  

  const handleEditClick = (product) => {
    // Edit sayfasına yönlendirme işlemi
    navigate(`/EditProduct/${product.id}`, { state: { product } });
    console.log("product.id",product.id)
  }

return (
  <div  style={{ margin: "50px" }}>
   <h1  className='baslik'>Mon Jardin</h1>

    <button onClick={handleGoBack} className='back-button'><img src="/images/back-button.png" alt="" width={40} height={30}/></button>

    <div className="search-area">
          <form value={searchTerm} onChange={handleSearchTermChange} > 
          <input
            type="text"
            name="searchTerm"
            placeholder="Arama yapmak için buraya yazın..."
            className="admin-search-area"
          />
          <button type="submit" className='search-button'>
            <img src="/images/search.png" alt="" width={32} height={32} />
          </button>
       
          </form>
        </div>
      
    <div style={{marginTop:"50px"}}>
      {productList && (
      <table className='table table-light'>
      <thead>
        <tr>
          
          <th style={{color:"#893694", fontStyle:"italic", fontSize:"18px",fontFamily:"Times New Roman", fontWeight:"300"}}></th>
          <th  style={{color:"#893694", fontStyle:"italic", fontSize:"18px",fontFamily:"Times New Roman", fontWeight:"300"}} onClick={() => handleSort('id')}>Ürün Id</th>
          <th  style={{color:"#893694", fontStyle:"italic", fontSize:"18px",fontFamily:"Times New Roman", fontWeight:"300"}} onClick={() => handleSort('name')}>Ürün Adı</th>
          <th  style={{color:"#893694", fontStyle:"italic", fontSize:"18px",fontFamily:"Times New Roman", fontWeight:"300"}} onClick={() => handleSort('stock')}>Ürün Adedi</th>
          <th  style={{color:"#893694", fontStyle:"italic", fontSize:"18px",fontFamily:"Times New Roman", fontWeight:"300"}} onClick={() => handleSort('price')}>Ürün Fiyatı</th>
          <th  style={{color:"#893694", fontStyle:"italic", fontSize:"18px",fontFamily:"Times New Roman", fontWeight:"300"}} onClick={() => handleSort('categoryName')}>Kategori</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map((product) => (
        
          <React.Fragment key={product.id}>
              {console.log("filte",product)}
            <tr onClick={() => handleProductClick(product.id)} style={{ borderBottom: "1px solid #ccc"}}>
            
              <td> <img src={product.fileResponseModel[0]?.fileUrl} alt={productList.name} width={128} height={128} /></td>
              <td style={{verticalAlign:"middle"}}>{product.id}</td>
              <td style={{verticalAlign:"middle"}}>{product.name}</td>
            
              <td style={{verticalAlign:"middle"}}>{product.stock}</td>
              <td style={{verticalAlign:"middle"}}>{product.price}</td>
              <td style={{verticalAlign:"middle"}}>{product.categoryName}</td> 
              <td style={{verticalAlign:"middle"}}> 
                <button  onClick={() => handleEditClick(product)} style={{height: "auto", width: "auto" , background: "transparent"}}>
                  <img src="/images/edit.png" alt="" width={28} height={28} />
                  </button>
              </td>
              <td style={{verticalAlign:"middle"}}> <img src="/images/openDetail.png" alt="" width={28} height={20} /></td>
            
            </tr>
            {expandedProductId === product.id && (
              <tr>
                <td colSpan="6">
                  <div style={{display:"flex", justifyContent:"center"}}>
          
                    <div style={{display:"flex"}}>
                <div style={{display:"block", fontStyle:"italic", fontFamily:"Times New Roman", marginRight:"50px"}}> <p style={{fontWeight:"bold", textDecoration:"underline"}}>KDV Oranı:</p> <p> {productList.find((p) => p.id === expandedProductId).tax}%</p></div>
                <div style={{display:"block", fontStyle:"italic", fontFamily:"Times New Roman", marginRight:"50px"}}> <p style={{fontWeight:"bold", textDecoration:"underline"}}>İndirim Oranı:</p>  <p> {productList.find((p) => p.id === expandedProductId).discountRate} %</p></div>
                <div style={{display:"block", fontStyle:"italic", fontFamily:"Times New Roman", marginRight:"50px"}}> <p style={{fontWeight:"bold", textDecoration:"underline"}}>İndirim Miktarı:</p>  <p> {productList.find((p) => p.id === expandedProductId).discountedAmount}</p></div>
                    </div>
                  </div>
                
                  <p style={{ fontStyle:"italic", fontFamily:"Times New Roman", display:"flex", justifyContent:"center"}}><p style={{fontWeight:"bold", textDecoration:"underline"}}>Açıklama :</p> {productList.find((p) => p.id === expandedProductId).description}</p>

                </td>
              </tr>
            )}
            
          </React.Fragment>
        ))}
        
      </tbody>
    
    </table>
      )}
    </div>
</div>
)}

/*
 <div className='listedeara'>
      <input type="text" placeholder="Ara..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}/>
      <button onClick={() => setSearchTerm("")}>Temizle</button>
    </div>

 */