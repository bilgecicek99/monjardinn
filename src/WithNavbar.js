import React from 'react';
import Navbars from './Navbars'; // Navbar bileşeni burada yer alacak

const WithNavbar = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      const isNavbarVisible = true; // Navbar'ın görüntülenip görüntülenmeyeceğini kontrol eden bir durum
      return (
        <>
          {isNavbarVisible && <Navbars />} {/* Navbar'ın görüntülenmesini sağlayan koşul */}
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default WithNavbar;
