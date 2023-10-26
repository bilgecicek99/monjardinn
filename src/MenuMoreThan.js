import React, { useState, useEffect } from "react";
import WithNavbar from './WithNavbar'; 

const MenuMoreThan = () => {
  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    // Sayfa yüklendiğinde URL'deki anker kısmını kontrol ederek ilgili öğeyi seç
    const currentHash = window.location.hash;
    const selectedItemIndex = currentHash ? listItems.findIndex(item => `#${item.id}` === currentHash) : 0;
    setSelectedItem(selectedItemIndex);
  }, []); // Boş bağımlılık dizisi sayfa yüklendiğinde bir kez çalışır

  const listItems = [
    {id: 'hakkimizda', title:'Hakkımızda', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
    {id: 'satis-sozlesmesi', title:'Mesafeli Satış Sözleşmeleri', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}, 
    {id: 'gizlilik-politikasi', title:'Gizlilik Politikası', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}, 
    {id: 'teslimat-iade-bildirimi', title:'Teslimat-İade Bildirimi', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
  ];

  const handleItemClick = (index) => {
    setSelectedItem(index);
    // Sayfa içeriği değiştiğinde URL'deki anker kısmını güncelle
    window.location.hash = `#${listItems[index].id}`;
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <div className="container">
        <div className="left-panel">
          <ul style={{ paddingLeft: 0 }}>
            {listItems.map((item, index) => (
              <li
                key={index}
                onClick={() => handleItemClick(index)}
                className={index === selectedItem ? 'selected' : ''}
                style={{textAlign:'left',fontStyle:'italic'}}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="right-panel">
          <h2 style={{textAlign:"center"}}>{listItems[selectedItem].title}</h2>
          <p style={{textAlign:"left"}}>{listItems[selectedItem].description}</p>
        </div>
      </div>
    </div>
  );
};

export default WithNavbar(MenuMoreThan);
