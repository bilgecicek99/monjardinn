import React, { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { baseUrl } from './config/Constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Carousel1() {
  const [noticelist, setNoticeData] = useState([]);

  const fetchSliderList = async () => {
    try {
      const response = await fetch(baseUrl + `api/HomePageBanner/GetAllBanner`);
      if (!response.ok) {
        throw new Error('Duyuru listesi getirilemedi. Lütfen daha sonra tekrar deneyin.');
      }
      const data = await response.json();
      const noticeData = data.data;
      setNoticeData(noticeData);
    } catch (error) {
      console.error(error);
      /*toast.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });*/
    }
  };

  useEffect(() => {
    fetchSliderList();
  }, []); // Fetch the data when the component mounts

  return (
<Carousel controls={false}>
  {noticelist.map((item, index) => (
    <Carousel.Item key={index}>
      <img
        className="d-block w-100"
        src={item.imageUrl}
        alt={item.title}
      />
      <Carousel.Caption style={{ float: "left" }} className="mobile-carousel">
        <div style={{ color: "black", textAlign: "left", fontFamily: "times", fontStyle: "italic", bottom: "0px", left: "0px"}}>
          <h1 className="carousel-title" style={{ fontSize: "55px",float:"left" }}>{item.title}</h1><br/>
          <h3 className="carousel-desc" style={{ marginTop: "20px", fontSize: "24px",float:"left",width: "280px" }}>{item.description}</h3>
        </div>
      </Carousel.Caption>
    </Carousel.Item>
  ))}
</Carousel>
  
  );
}

export default Carousel1;
