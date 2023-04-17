import React, { useState } from 'react';
import AdminLogin from './AdminLogin';

export default function Productlist() {
  const [expandedProductId, setExpandedProductId] = useState(null);

  const handleProductClick = (productId) => {
    if (expandedProductId === productId) {
      // Eğer tıklanan ürün zaten genişletilmişse, kapatın
      setExpandedProductId(null);
    } else {
      // Değilse, tıklanan ürünün genişleme alanını açın
      setExpandedProductId(productId);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Ürün Fotoğrafı</th>
            <th>Stok No</th>
            <th>Ürün Adı</th>
            <th>Ürün Adedi</th>
            <th>Ürün Fiyatı</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={() => handleProductClick(1)}>
            <td><img src="/images/orkide.png" alt="Ürün 1" /></td>
            <td>00001</td>
            <td>Orkide</td>
            <td>15 adet</td>
            <td>800.00TL</td>
          </tr>
          {expandedProductId === 1 && (
            <tr>
              <td colSpan="5">
                {/* Burada genişlemiş ürün alanını oluşturun */}
                <div>KDV Oranı: %18</div>
                <div>Açıklama: Bu ürün çok özeldir</div>
                <div>İndirim: 50.00TL</div>
                <div>Barkod: 1234567890123</div>
              </td>
            </tr>
          )}
          <tr onClick={() => handleProductClick(2)}>
            <td><img src="/images/orkide.png" alt="Ürün 2" /></td>
            <td>00002</td>
            <td>Çiçek</td>
            <td>10 adet</td>
            <td>100.00TL</td>
          </tr>
          {expandedProductId === 2 && (
            <tr>
              <td colSpan="5">
                {/* Burada genişlemiş ürün alanını oluşturun */}
                <div>KDV Oranı: %8</div>
                <div>Açıklama: Bu ürün de güzeldir</div>
                <div>İndirim: Yok</div>
                <div>Barkod: 2345678901234</div>
              </td>
            </tr>
          )}
          {/* Diğer ürünlerin aynı şekilde eklenmesi gerekiyor */}
        </tbody>
      </table>
    </div>
  );
}
