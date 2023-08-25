import React, { useState, useEffect } from "react";
import WithNavbar from './WithNavbar'; 


const contactSections = [
  {
    title: 'Tel:',
    description: '0 212 331 0 200'
  },
  {
    title: 'Maslak V.D.:',
    description: '313 055 7669'
  },
  {
    title: 'Ticaret Sicil No:',
    description: '711896'
  },
  {
    title: 'Kep Adresi:',
    description: 'dsm@hs02.kep.tr'
  },
  {
    title: 'Mersis Numarası: ',
    description: '0313055766900016'
  },
  {
    title: 'Sorumlu Kişi:',
    description: 'Yasin Canki'
  }
];


const Contact = () => {

  return (
    <div className="contact-page mobile-generic-css">
      <h1 className="contact-heading">İletişim</h1>
      <div style={{padding:"3% 2% 2% 2%"}}>
        <h2 className="contact-subheading" style={{paddingBottom:"2%"}}>Adres</h2>
        <p>DSM Grup Danışmanlık İletişim ve Satış Ticaret A.Ş. Maslak Mahallesi Saat Sokak Spine Tower No:5 İç Kapı No:19 Sarıyer/İstanbul</p>
      </div>
      {contactSections.map((section, index) => (
        <div key={index} className="contact-section">
          <h2 className="contact-subheading">{section.title}</h2>
            <p>{section.description}</p>
        </div>
      ))}

      <p style={{padding:"2% 2% 0 2%"}}>Üyesi olduğumuz İstanbul Ticaret Odası’nın üyeleri için geçerli davranış kurallarına www.ito.org.tr adresinden ulaşılabilir.</p>
      <p style={{padding:"0 2% 0 2%"}}>DSM Grup Danışmanlık İletişim ve Satış Tic. A.Ş.'ye yapılacak yasal bildirimler ve arabuluculuk başvuruları için Kayıtlı Elektronik Posta aracılığıyla dsm.hukuk@hs02.kep.tr adresine gönderimde bulunabilirsiniz.</p>

    </div>
  );
};

export default WithNavbar(Contact);