import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, useNavigate } from 'react-router-dom';

export default function Adminpanel() {
  const navigate = useNavigate();

  const handleStokKontrol = () => {
    navigate('/Productlist');

    // stok kontrol işlemleri burada yapılır
    console.log('Stok kontrolü yapılıyor...');
  }

  return (
    <>
      <div>
        {/* ... */}
      </div>
      <h1 className='adminpanelyazi'> Admin Panel</h1> 
      <button type onClick={handleStokKontrol} className='stokkontrol'>Stok Kontrol</button>
    </>
  );
}
