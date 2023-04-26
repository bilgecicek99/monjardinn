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
  <div>
    <div className='listedeara'>
      <input
        type="text"
        placeholder="Ara..."
        value={searchTerm}
        onChange={(event) => setSearchTerm 
(event.target.value)}
/>
<button onClick={() => setSearchTerm("")}>Temizle</button>
</div>

<div>
  <table>
    <thead>
      <tr>
      <th onClick={() => handleSort('id')}>ID</th>
      <th>Ürün Resmi</th>
      <th onClick={() => handleSort('name')}>Ürün Adı</th>
      <th onClick={() => handleSort('stockNo')}>Stok No</th>
      <th onClick={() => handleSort('quantity')}>Stok Miktarı</th>
      <th onClick={() => handleSort('price')}>Fiyat</th>
      </tr>
    </thead>
    
    <tbody>
      {filteredProducts.map((product) => (
        <tr key={product.id} onClick={() => handleProductClick(product.id)}>
        
          <td>{product.id}</td>
          <td>
            <img src={product.image} alt={product.name} />
          </td>
          <td>{product.name}</td>
          <td>{product.stockNo}</td>
          <td>{product.quantity}</td>
          <td>{product.price}</td>
        </tr>
      ))}
      {expandedProductId && (
        <tr>
          <td colSpan="6">
            <div>
              <h3>{productList.find((p) => p.id === expandedProductId).name}</h3>
              <img
                src={productList.find((p) => p.id === expandedProductId).image}
                alt={productList.find((p) => p.id === expandedProductId).name}
              />
              <p>{productList.find((p) => p.id === expandedProductId).description}</p>
              <p>Fiyat: {productList.find((p) => p.id === expandedProductId).price}</p>
              <p>KDV Oranı: {productList.find((p) => p.id === expandedProductId).taxRate}%</p>
              <p>Stok Miktarı: {productList.find((p) => p.id === expandedProductId).quantity}</p>
              <p>Indirim Oranı: {productList.find((p) => p.id === expandedProductId).discount * 100}%</p>
              <p>Barkod: {productList.find((p) => p.id === expandedProductId).barcode}</p>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
</div>
)}