import React, { useState } from "react";

function Stokeklecikar() {
  const [products, setProducts] = useState([
    { id: 1, name: "Ürün 1", image: "/images/orkide.png", stockCode: "000001", stockCount: 15 },
    { id: 2, name: "Ürün 2", image: "/images/orkide.png", stockCode: "000001", stockCount: 15 },
    { id: 3, name: "Ürün 3", image: "/images/orkide.png", stockCode: "000001", stockCount: 15 },
    { id: 4, name: "Ürün 3", image: "/images/orkide.png", stockCode: "000001", stockCount: 15 },
    { id: 5, name: "Ürün 3", image: "/images/orkide.png", stockCode: "000001", stockCount: 15 },
    { id: 6, name: "Ürün 3", image: "/images/orkide.png", stockCode: "000001", stockCount: 15 },
    { id: 7, name: "Ürün 3", image: "/images/orkide.png", stockCode: "000001", stockCount: 15 },
  ]);

  const handleIncreaseStock = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, stockCount: product.stockCount + 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleDecreaseStock = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId && product.stockCount > 0) {
        return { ...product, stockCount: product.stockCount - 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  return (
    <div style={{margin:"100px"}}>
    <table className='table table-light'>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td style={{verticalAlign:"middle", width:"300px"}}>
              <img src={product.image} alt={product.name} />
            </td>
            <td style={{fontStyle:"italic", fontWeight:"bold", verticalAlign:"middle", width:"300px"}}>{product.stockCode}</td>
            
            <td style={{verticalAlign:"middle", width:"500px"}}>
              <button className="stock-button" onClick={() => handleDecreaseStock(product.id)}>-</button>
              <span className="stock-count"> {product.stockCount} </span>
              <button className="stock-button" onClick={() => handleIncreaseStock(product.id)}>+</button>
            </td>
            <td style={{verticalAlign:"middle" , fontSize:"30px" , fontWeight:"bold", width:"300px"}}> + </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default Stokeklecikar;

