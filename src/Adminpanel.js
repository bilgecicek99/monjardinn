import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

export default function AdminPanel() {


const products = [  
  { id: 1, name: "Mon Jardin", stock: 600, category: "Aranjman", city: "Karşıyaka", image:  process.env.PUBLIC_URL + '/images/pembelale.jpg',  },
  { id: 2, name: "Mon Jardin", stock: 200, category: "Aranjman 2", city: "Çiğli",  image:  process.env.PUBLIC_URL + '/images/pembelale.jpg', },
  { id: 3, name: "Mon Jardin", stock: 800, category: "Aranjman 3", city: "Bornova",  image: process.env.PUBLIC_URL + '/images/pembelale.jpg', },
  { id: 4, name: "Mon Jardin", stock: 900, category: "Aranjman 1", city: "Konak",  image: process.env.PUBLIC_URL + '/images/pembelale.jpg', }
];



  return (
    <>
      <div  style={{ margin: "100px", display:"flex" }}>
      <div style={{float:"left", width:"25%"}}>
      <Navbar  expand="lg" fixed="top"   >
        <Container>  
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="navbar-admin-left">
            <Nav className="me-auto">
            <nav>
            <div className="menu-items-admin">
            <div className="text-center">
                <img src="/images/person.png" alt="" width={"45"} height={"45"} />
                <p className='menu-items-admin-link'>Deniz Şenocak</p>   {/*  be'den gelcek*/}
                <p className='menu-items-admin-link'>exapmle@gmail.com</p>  {/*  be'den gelcek*/} 
            </div>
              <NavLink className="menu-items-admin-link" to='/AdminSearch' style={{fontStyle:"italic"}}>Admin Arama Sayfası</NavLink>
              <hr/>
              <NavLink className="menu-items-admin-link" to='/AdminProductList' style={{fontStyle:"italic"}}>Stok Kontrol</NavLink>
              <hr/>
              <NavLink className="menu-items-admin-link" to='/Stock' style={{fontStyle:"italic"}}>Stok Ekle/Çıkar</NavLink>
              <hr/>
              <NavLink className="menu-items-admin-link" to='/EditCategory' style={{fontStyle:"italic"}}>Kategori Düzenleme</NavLink>  
              <hr/> 
              <NavLink className="menu-items-admin-link" to='/EditBlog' style={{fontStyle:"italic"}}>Blog Düzenleme</NavLink>  
              <hr/> 
              <NavLink className="menu-items-admin-link" to='/Blogdetay' style={{fontStyle:"italic"}}>Çıkış Yap</NavLink>   
              <hr/>
            </div>
        
        </nav>
            </Nav>
          </Navbar.Collapse> 
        </Container>
      </Navbar>
      </div>
      <div style={{float:"right", width:"75%", color:"black",  fontFamily: 'Times New Roman'}}>
      <div className='admin-first-area' style={{display:"flex", marginTop:"30px"}}>
        <div className='admin-first-area-box' style={{background:"#96C671", display:"flex"}}>
        <div> <img src="/images/shop-box.png" alt="" width={"64"} height={"64"} style={{marginRight:"20px"}} /></div> 
        <div style={{display:"block"}}>
          <p>Son Siparişler</p> 
          <p style={{fontStyle:"normal"}}> 46   Sipariş</p>
        </div>
        </div>
        <div className='admin-first-area-box' style={{background:"#78ABBB", display:"flex"}}>
         <div> <img src="/images/comment.png" alt="" width={"64"} height={"64"} style={{marginRight:"20px"}}/></div>
         <div style={{display:"block"}}>
            <p>Son Yorumlar</p>
            <p style={{fontStyle:"normal"}}>5  {/*  be'den gelcek*/} Yorum</p>  
          </div>
        </div>
        <div className='admin-first-area-box' style={{background:"#955EA9", display:"flex"}}>          
         <div> <img src="/images/users.png" alt="" width={"64"} height={"64"} style={{marginRight:"20px"}} /></div>
         <div style={{display:"block"}}>
            <p> Son Kayıtlar</p>
            <p style={{fontStyle:"normal"}}>10  {/*  be'den gelcek*/} Kayıt</p> 
          </div> 
        </div>
      </div>

      <div className='admin-middle-area' style={{display:"flex",marginTop:"30px"}}>
        <div style={{  }}>Son Siparişler
        {products.map((product) => (
        <React.Fragment key={product.id}>
          <tr style={{ border: "1px solid #ccc", color:"black",  fontStyle:"italic"}}>
          
            <td> <img src={product.image} alt={product.name} width={100} height={100}/></td> 
            <td style={{verticalAlign:"middle"}}>{product.name}</td>
            <td style={{verticalAlign:"middle"}}>{product.stock}</td>
            <td style={{verticalAlign:"middle"}}>{product.city}</td> 
            <td style={{verticalAlign:"middle"}}>{product.category}</td> 
          </tr>
        </React.Fragment>
         ))}
  
        </div>
        <div style={{marginLeft:"50px"}}>
        Son Eklenen Ürün
       
        <div style={{border:"1px solid #ccc", padding:"20px", textAlign:"center", fontStyle:"italic",fontFamily:"Times New Roman"}}>
       
        <img src={process.env.PUBLIC_URL + '/images/pembelale.jpg'} alt="j" width={100} height={100} style={{marginBottom:"10px"}}/>
        <div style={{display:"flex"}}>
        <div>
        <p> Stok No</p> 
        <p style={{fontWeight:"bold"}}> 0001</p>
        <p> KDV Oranı</p>
        <p style={{fontWeight:"bold"}}> %18</p>
        <p> Ürünün Rengi</p>
        <p style={{fontWeight:"bold"}}> Kırmızı</p>
        </div>

        <div>
        <p> Ürünün Adı</p> 
        <p style={{fontWeight:"bold"}}> Orkide</p>
        <p> Ürünün Adedi</p> 
        <p style={{fontWeight:"bold"}}> 15 Adet</p>
        <p > Saksı</p> 
        <p style={{fontWeight:"bold"}}> Evet</p>
        </div>

        <div>
        <p> Ürünün Barkodu</p> 
        <p style={{fontWeight:"bold"}}> 0000000</p>
        <p> Ürünün Fiyatı</p> 
        <p style={{fontWeight:"bold"}}> 800 TL</p>
        </div>
        </div>
        <div>
        <p> Ürünün Açıklaması</p> 
        <p style={{fontWeight:"bold"}}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
        </div>
        </div>
        </div>
      </div>

      <div className='admin-end-area' style={{marginTop:"30px"}}>
        <div>
        Son Blog Yazısı
        <div style={{display:"flex", padding:"20px 20px 0px", border:"1px solid #ccc",}}>
          <div>
            <img src={process.env.PUBLIC_URL + '/images/pembelale.jpg'} alt="j" width={250} height={250} style={{marginBottom:"10px"}}/>
            <p> Blog Başlığı</p> 
          </div>
          <div style={{paddingLeft:"30px"}} >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}
