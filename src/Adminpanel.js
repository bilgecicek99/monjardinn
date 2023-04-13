import React from 'react';
import ReactDOM from 'react-dom';

export default function Adminpanel() {

  const handleStokKontrol = () => {
    // stok kontrol işlemleri burada yapılır
    console.log('Stok kontrolü yapılıyor...');
  }

  return (
    <>
      <div>
        {/* ... */}
      </div>
      <button type onClick={handleStokKontrol} className='stokkontrol'>Stok Kontrol</button>
    </>
  );
}

