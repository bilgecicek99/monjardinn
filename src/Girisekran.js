import React from "react";
import Card from './Card';
import {  Col, Row, Carousel } from 'antd';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App = () => (
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);



const data = [
  { id: 1, title: 'Saksı', content: 'İçerik 1', image: '/images/saksı.png'},
  { id: 2, title: 'Kurutulmuş Çiçek', content: 'İçerik 2' },
  { id: 3, title: 'Büyük Bitki', content: 'İçerik 3' },
  { id: 4, title: 'Kart 4', content: 'İçerik 4' },
  { id: 5, title: 'Kart 5', content: 'İçerik 5' },
  { id: 6, title: 'Kart 6', content: 'İçerik 6' },
];



const Girisekran = () => {
  return (
    <div>
      <App />
      <Row gutter={3}>
       
      </Row>
    </div>
  );
}


export default Girisekran;
