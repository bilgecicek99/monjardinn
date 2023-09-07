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
      console.log(data);
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
    <Carousel>
    {noticelist.map((item, index) => (
      <Carousel.Item key={index}>
        <img
          className="d-block w-100"
          src={item.imageUrl} // Use the correct property name: imageUrl
          alt={item.title}
        />
        <Carousel.Caption>
          <h1 style={{ color: "black", textAlign: "left", fontFamily: "times", fontStyle: "italic" }}>{item.title}</h1>
          <h3 style={{ color: "black", textAlign: "left", fontFamily: "times", fontStyle: "italic", marginTop: "50px" }}>{item.description}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
  
  );
}

export default Carousel1;
