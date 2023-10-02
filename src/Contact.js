import React, { useState, useEffect } from "react";
import WithNavbar from './WithNavbar'; 
import GoogleMapReact from 'google-map-react';

const contactSections = [
  {
    title:'Adres',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  '
  },
  {
    title: 'Telefon Numarası',
    description: '0 212 331 0 200'
  },
  {
    title: 'Vergi Dairesi',
    description: '313 055 7669'
  },
  {
    title: 'Vergi Numarası',
    description: '711896'
  },
  {
    title: 'Kep Adresi',
    description: 'dsm@hs02.kep.tr'
  },
  {
    title: 'Mersis Numarası ',
    description: '0313055766900016'
  },
  {
    title: 'Sorumlu Kişi',
    description: 'Yasin Canki'
  }
];


const Contact = () => {
  const AnyReactComponent = ({ text }) => (
    <div className="marker-container">
      <i className="fa fa-map-marker marker-style" />
      <div className="marker-text">{text}</div>
    </div>
  );

  const defaultProps = {
    center: {
      lat: 38.433791,
      lng: 27.140573,
    },
    zoom: 17,
  };

  return (
    <div className="contact-page contact-page-mobile-css">
      <h2 className="contact-heading">İletişim</h2>
      <div className="map-container" style={{ width: '100%', height: '300px' }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBhjpHEwaGz30W8C5zVHSWJd2T79LOQKwg' }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                  >
                    <AnyReactComponent
                      lat={38.433791}
                      lng={ 27.140573}
                      text="Mon Jardin Flowers & Event"
                    />
                  </GoogleMapReact>
                </div>
                <div style={{marginTop:"50px"}}>
      {contactSections.map((section, index) => (
        <div key={index} className="contact-section">
          <h2 className="contact-subheading">{section.title}</h2>
            <p style={{marginLeft:"10%"}}>{section.description}</p>
        </div>
      ))}</div>
    </div>
  );
};

export default WithNavbar(Contact);