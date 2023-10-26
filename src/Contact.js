import React, { useState, useEffect } from "react";
import WithNavbar from './WithNavbar'; 
import GoogleMapReact from 'google-map-react';

const contactSections = [
  {
    title:'Adres',
    description: 'DR MUSTAFA ENVER BEY CADDESİ NO :34/C KONAK –ALSANCAK /İZMİR'
  },
  {
    title: 'Telefon Numarası',
    description: '0232 421 04 70-4217694'
  },
  {
    title: 'Vergi Dairesi',
    description: 'KORDON 9500084035'
  },
  {
    title: 'Ticaret Sicil No',
    description: '87362'
  },
  {
    title: 'Kep Adresi',
    description: 'yesildenizcicekcilik@hs01.kep.tr'
  },
  {
    title: 'Mersis Numarası ',
    description: '0950008403500015'
  },
  {
    title: 'Sorumlu Kişi',
    description: 'Ali Deniz'
  },
  {
    title: 'İletişim',
    description: '0532 311 31 38'
  },
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