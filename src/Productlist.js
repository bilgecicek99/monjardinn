import React from 'react';

export default function Productlist() {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Stok No</th>
            <th>Ürün Adı</th>
            <th>Ürün Adedi</th>
            <th>Ürün Fiyatı</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>123</td>
            <td>Çiçek</td>
            <td>10</td>
            <td>50 tl</td>
          </tr>
          <tr>
            <td>456</td>
            <td>Saksı</td>
            <td>20</td>
            <td>100 tl</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
}
