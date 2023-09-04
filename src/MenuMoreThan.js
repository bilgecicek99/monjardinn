  import React, { useState, useEffect } from "react";
  import WithNavbar from './WithNavbar'; 


  const MenuMoreThan = () => {
      const [selectedItem, setSelectedItem] = useState(0);

      const listItems = [{title:'Mesafeli Satış Sözleşmeleri',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}, 
      {title:'Gizlilik Politikası',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}, 
      {title:'KVKK Sözleşmesi',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}, 
      {title:'Teslimat-İade Şartları',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}];
    
      const handleItemClick = (index) => {
        setSelectedItem(index);
      };
    
    return (
      <div style={{ marginTop: "100px" }}>
      
      <div className="container">
        <div className="left-panel">
          <ul style={{paddingLeft:0}}>
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
          <p style={{textAlign:"center"}}>{listItems[selectedItem].description}</p>
        </div>
      </div>

      </div>
    );
  };

  export default WithNavbar(MenuMoreThan);
