import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from './config/Constants';

const Footer = () => {

    const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async () => {
    try {
      const response = await fetch(baseUrl+`api/Category/GetMainCategories`);
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      const categoryData = data.data;
      setCategoryList(categoryData);
    } catch (error) {
      console.error(error);
     toast.error('Lütfen Daha Sonra Tekrar Deneyiniz', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;     
    }
  };
  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <div style={{ height: "270px",marginBottom:"50px" }}>
  <hr />
  <div style={{ display: 'flex', marginTop: "50px", marginBottom: "50px" }}>
    <div className='mobile-footer-div' style={{ marginLeft: "10%" }}>
      <p className='footer-title'>Mon Jardin</p>
      <p className='footer-url'><img src={"/images/footer.png"} className='footer-url-image' /> www.mjcicek.com</p>
      <img src={"/images/iyzico-logo-1.png"} alt=""  />
      <img src={"/images/iyzico-logo-2.png"} alt=""  />
     <div style={{textAlign:"center", marginTop:"10px"}}>
     <img src={"/images/qr.png"} alt=""  style={{marginRight:"40px"}} />
      <img src={"/images/qr.png"} alt=""  />
     </div>
     <div style={{textAlign:"center"}}>
     <img src={"/images/google.png"} alt="" style={{marginTop:"20px", marginRight:"10px"}} />
      <img src={"/images/apple.png"} alt=""  />
</div>
    </div>
    <div className='mobile-footer' style={{ width: 400, marginLeft: "40px" }}>
      <p className='footer-sub-title'>KURUMSAL</p>
      <div style={{ marginLeft: "7px" }}>
      
        <Link to="/Morethan#hakkimizda" className='footer-text'><p className='footer-text'>Hakkımızda</p></Link>
        <Link to="/Morethan#satis-sozlesmesi" className='footer-text'><p className='footer-text'>Mesafeli Satış Sözleşmesi</p></Link>
        <Link to="/Morethan#gizlilik-politikasi" className='footer-text'><p className='footer-text'>Gizlilik Politikası</p></Link>
        <Link to="/Morethan#teslimat-iade-bildirimi" className='footer-text'><p className='footer-text'>Teslimat-İade Bildirimi</p></Link>
       
        <Link to={`/Blog`} className='footer-text'><p className='footer-text'>Blog</p></Link>
        <Link to={`/Contact`} className='footer-text'><p className='footer-text'>İletişim</p></Link>


      </div>
    </div>
    <div>
      <p className='footer-sub-title footer-site-mobile'>SİTE</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: "7px" }}>
        <Link to={`/`} className='footer-text' style={{width: '33.33%',}}><p className='footer-text'>Ana Sayfa</p></Link>
        {categoryList?.length > 0 && categoryList.map((category, index) => (
          <div key={category.id} style={{ width: '33.33%', boxSizing: 'border-box' }}>
            <Link to={`/List/${category.id}`} className='footer-text'><p className='footer-text' style={{ textAlign: 'left', marginLeft: '0' }}>{category.name}</p></Link>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
  );
}

export default Footer;



