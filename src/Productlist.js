import React, { useState, useEffect } from 'react';

export default function ProductList() {
  const [productList, setProductList] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');


  useEffect(() => {
    setProductList([
      {
        id: 1,
        name: "Orkide",
        image: "/images/orkide.png",
        stockNo: "01",
        quantity: 10,
        price: 800.99,
        taxRate: 18,
        description: " Zarafetin sembolü olan orkide çiçeği narin ve güzel bir çiçektir",
        discount: 0.1,
        barcode: "123456789",
      },
      {
        id: 2,
        name: "Pembe Lale Buketi",
        image: "/images/orkide.png",
        stockNo: "02",
        quantity: 20,
        price: 2999.99,
        taxRate: 18,
        description: "Her lale renginin bir anlamı vardır",
        discount: 0.15,
        barcode: "234567890",
      },
      {
        id: 3,
        name: "Minimalist Lila Buketi",
        image: "/images/orkide.png",
        stockNo: "03",
        quantity: 5,
        price: 5999.99,
        taxRate: 18,
        description: "Canlı hoş doku",
        discount: 0,
        barcode: "345678901",
      },
      {
        id: 4,
        name: "Lilyum Buketi",
        image: "/images/orkide.png",
        stockNo: "04",
        quantity: 15,
        price: 899.99,
        taxRate: 18,
        description: "Lilyum çiçeği doğumu ve masumiyeti simgelemektedir.",
        discount: 0.05,
        barcode: "456789012",
      },
      {
        id: 5,
        name: "Kırçıllı Orkide Aranjamanı",
        image: "/images/orkide.png",
        stockNo: "05",
        quantity: 25,
        price: 99.99,
        taxRate: 18,
        description: "Yaz aylarında özellikle geceleri açık bir pencere önünde tutulması çiçeklenme oranını arttırır.",
        discount: 0.2,
        barcode: "567890123",
      },
    ]);
  }, []);

  useEffect(() => {
    const filteredList = productList.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.stockNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredProducts(filteredList);
  }, [productList, searchTerm]);

  const handleProductClick = (productId) => {
    if (expandedProductId === productId) {
    setExpandedProductId(null);
    } else {
    setExpandedProductId(productId);
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

return (
  <div  style={{ margin: "100px" }}>
    <div className='listedeara'>
      <input type="text" placeholder="Ara..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}/>
      <button onClick={() => setSearchTerm("")}>Temizle</button>
    </div>

    <div>
    <table className='table-light'>
    <thead>
      <tr>
        
        <th style={{color:"#893694", fontStyle:"italic", fontSize:"18px",fontFamily:"Times New Roman", fontWeight:"300"}}>Ürün Resmi</th>
        <th  style={{color:"#893694", fontStyle:"italic", fontSize:"18px",fontFamily:"Times New Roman", fontWeight:"300"}} onClick={() => handleSort('stockNo')}>Stok No</th>
        <th  style={{color:"#893694", fontStyle:"italic", fontSize:"18px",fontFamily:"Times New Roman", fontWeight:"300"}} onClick={() => handleSort('name')}>Ürün Adı</th>
        <th  style={{color:"#893694", fontStyle:"italic", fontSize:"18px",fontFamily:"Times New Roman", fontWeight:"300"}} onClick={() => handleSort('quantity')}>Ürün Adedi</th>
        <th  style={{color:"#893694", fontStyle:"italic", fontSize:"18px",fontFamily:"Times New Roman", fontWeight:"300"}} onClick={() => handleSort('price')}>Ürün Fiyatı</th>
        <th  style={{color:"#893694", fontStyle:"italic", fontSize:"18px",fontFamily:"Times New Roman", fontWeight:"300"}} onClick={() => handleSort('price')}>Kategori</th>
      </tr>
    </thead>
    <tbody>
      {filteredProducts.map((product) => (
        <React.Fragment key={product.id}>
          <tr onClick={() => handleProductClick(product.id)} style={{ borderBottom: "1px solid #ccc"}}>
          
            <td> <img src={product.image} alt={product.name} /></td>
            <td style={{verticalAlign:"middle"}}>{product.stockNo}</td>
            <td style={{verticalAlign:"middle"}}>{product.name}</td>
           
            <td style={{verticalAlign:"middle"}}>{product.quantity}</td>
            <td style={{verticalAlign:"middle"}}>{product.price}</td>
            <td style={{verticalAlign:"middle"}}>{product.price}</td> {/*kategori */}
            <td style={{verticalAlign:"middle"}}> <img src="/images/openDetail.png" alt="" width={28} height={20} /></td>
          
          </tr>
          {expandedProductId === product.id && (
            <tr>
              <td colSpan="6">
                <div style={{display:"flex", justifyContent:"center"}}>
        
                  <div style={{display:"flex"}}>
               <div style={{display:"block", fontStyle:"italic", fontFamily:"Times New Roman", marginRight:"50px"}}> <p>Fiyatı</p> <p> {productList.find((p) => p.id === expandedProductId).price}</p></div>
               <div style={{display:"block", fontStyle:"italic", fontFamily:"Times New Roman", marginRight:"50px"}}> <p>KDV Oranı:</p> <p> {productList.find((p) => p.id === expandedProductId).taxRate}%</p></div>
               <div style={{display:"block", fontStyle:"italic", fontFamily:"Times New Roman", marginRight:"50px"}}> <p>Stok Miktarı: </p>  <p>{productList.find((p) => p.id === expandedProductId).quantity}</p></div>
               <div style={{display:"block", fontStyle:"italic", fontFamily:"Times New Roman", marginRight:"50px"}}> <p>İndirim Oranı:</p>  <p> {productList.find((p) => p.id === expandedProductId).discount * 100}%</p></div>
               <div style={{display:"block", fontStyle:"italic", fontFamily:"Times New Roman", marginRight:"50px"}}> <p>Barkod:</p>     <p> {productList.find((p) => p.id === expandedProductId).barcode}</p></div>
                  </div>
                </div>
                <p style={{ fontStyle:"italic", fontFamily:"Times New Roman", display:"flex", justifyContent:"center"}}>{productList.find((p) => p.id === expandedProductId).description}</p>

              </td>
            </tr>
          )}
          
        </React.Fragment>
      ))}
       
    </tbody>
  
  </table>
    </div>
</div>
)}