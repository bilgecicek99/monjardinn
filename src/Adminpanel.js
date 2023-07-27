import React, { useState ,useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import {
  getUser,
  getToken,resetUserSession
} from "./service/AuthService";

export default function Adminpanel() {


const products = [  
  { id: 1, name: "Mon Jardin", stock: 600, category: "Aranjman", city: "Karşıyaka", image:  process.env.PUBLIC_URL + '/images/pembelale.jpg',  },
  { id: 2, name: "Mon Jardin", stock: 200, category: "Aranjman 2", city: "Çiğli",  image:  process.env.PUBLIC_URL + '/images/pembelale.jpg', },
  { id: 3, name: "Mon Jardin", stock: 800, category: "Aranjman 3", city: "Bornova",  image: process.env.PUBLIC_URL + '/images/pembelale.jpg', },
  { id: 4, name: "Mon Jardin", stock: 900, category: "Aranjman 1", city: "Konak",  image: process.env.PUBLIC_URL + '/images/pembelale.jpg', }
];

const [lastProduct, setLastProduct] = useState([]);
const [lastBlog, setLastBlog] = useState([]);

const navigate = useNavigate();

const logoutHandler = () => {
  resetUserSession();
  navigate("/");
};

const token = getToken();
console.log("token",token);

const fetchLastProduct = async () => {
  try {
    const requestOptions = {
      headers: {
        Authorization: `Bearer  ${token}`
      }
    };
    const response = await fetch(`http://64.227.114.199/api/Dashboard/LastProduct`,requestOptions);
    const data = await response.json();
    console.log("data",data.data)
    const productData= data.data;
    setLastProduct(productData);  
  } catch (error) {
    console.error(error);
  }
};
const fetchLastBlog = async () => {
  try {
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await fetch(`http://64.227.114.199/api/Dashboard/LastBlog`,requestOptions);
    const data = await response.json();
    console.log("data",data.data)
    const blog= data.data;
    setLastBlog(blog);  
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchLastProduct();
  fetchLastBlog();
}, []);

  return (
    <>
      <div  style={{ margin: "100px", display:"flex" }}>
      <div style={{float:"left", width:"25%"}} className='admin-panel-left'>
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
             
              <NavLink className="menu-items-admin-link" to='/AdminProductList' style={{fontStyle:"italic"}}>Stok Kontrol</NavLink>
              <hr/>
              <NavLink className="menu-items-admin-link" to='/AdminSearch' style={{fontStyle:"italic"}}>Arama</NavLink>
              <hr/>
              <NavLink className="menu-items-admin-link" to='/AdminAddProduct' style={{fontStyle:"italic"}}>Yeni Kalem Ekle</NavLink>
              <hr/>
              <NavLink className="menu-items-admin-link" to='/EditCategory' style={{fontStyle:"italic"}}>Kategori Düzenleme</NavLink>  
              <hr/> 
              {token ? 
             <button className='save-button' value="Logout" onClick={logoutHandler}>
          Çıkış Yap   
          </button>  : "" }
             {/* 
               <NavLink className="menu-items-admin-link" to='/AdminAllProductList' style={{fontStyle:"italic"}}>Tüm Ürünler</NavLink>
               <hr/>
             <NavLink className="menu-items-admin-link" to='/Stock' style={{fontStyle:"italic"}}>Stok Ekle/Çıkar</NavLink>
              <hr/>
              
              <NavLink className="menu-items-admin-link" to='/EditBlog' style={{fontStyle:"italic"}}>Blog Düzenleme</NavLink>  
              <hr/> 
              <NavLink className="menu-items-admin-link" to='/Blogdetay' style={{fontStyle:"italic"}}>Çıkış Yap</NavLink>   
              <hr/>
  */}
             
            </div>
        
        </nav>
            </Nav>
          </Navbar.Collapse> 
        </Container>
      </Navbar>
      </div>
      <div style={{float:"right", width:"75%", color:"black",  fontFamily: 'Times New Roman'}} className='admin-panel-right'>
      <div className='admin-first-area' style={{display:"flex", marginTop:"30px"}}>
        <div className='admin-first-area-box' style={{background:"#96C671", display:"flex"}}>
        <div> <img src="/images/shop-box.png" alt="" width={"64"} height={"64"} style={{marginRight:"20px"}} className='admin-first-area-box-icon'/></div> 
        <div style={{display:"block"}}>
          <p>Son Siparişler</p> 
          <p style={{fontStyle:"normal"}}> 46   Sipariş</p>
        </div>
        </div>
        <div className='admin-first-area-box' style={{background:"#78ABBB", display:"flex"}}>
         <div> <img src="/images/comment.png" alt="" width={"64"} height={"64"} style={{marginRight:"20px"}} className='admin-first-area-box-icon'/></div>
         <div style={{display:"block"}}>
            <p>Son Yorumlar</p>
            <p style={{fontStyle:"normal"}}>5  {/*  be'den gelcek*/} Yorum</p>  
          </div>
        </div>
        <div className='admin-first-area-box' style={{background:"#955EA9", display:"flex"}}>          
         <div> <img src="/images/users.png" alt="" width={"64"} height={"64"} style={{marginRight:"20px"}} className='admin-first-area-box-icon'/></div>
         <div style={{display:"block"}}>
            <p> Son Kayıtlar</p>
            <p style={{fontStyle:"normal"}}>10  {/*  be'den gelcek*/} Kayıt</p> 
          </div> 
        </div>
      </div>

      <div className='admin-middle-area' style={{display:"flex",marginTop:"30px"}}> 
       <div>  
       <table>
       <thead>
        <tr>
          <th colSpan={5} style={{background:"white", fontWeight:"400"}}>Son Siparişler</th>
        </tr>
      </thead>
        <tbody>
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
          </tbody>
        </table>
       </div>
   
        <div style={{marginLeft:"50px", marginTop:"15px"}} className='admin-last-product-area'>
        Son Eklenen Ürün
       
        <div style={{border:"1px solid #ccc", padding:"20px", textAlign:"center", fontStyle:"italic",fontFamily:"Times New Roman"}}>
        {lastProduct && lastProduct.fileResponses && lastProduct.fileResponses.length > 0 && (
  <img src={lastProduct.fileResponses[0].fileUrl} alt={lastProduct.name} width={128} height={128} />
)}


        <div style={{display:"flex"}}>
        <div>
        <p> Stok </p> 
        <p style={{fontWeight:"bold"}}> {lastProduct && lastProduct.id}</p>
        <p> KDV Oranı</p>
        <p style={{fontWeight:"bold"}}>  {lastProduct && lastProduct.tax}</p>
        <p> Ürünün Rengi</p>
        <p style={{fontWeight:"bold"}}>  { lastProduct && lastProduct.color}</p>
        </div>

        <div>
        <p> Ürünün Adı</p> 
        <p style={{fontWeight:"bold"}}>  {lastProduct && lastProduct.name}</p>
        <p> Ürünün Adedi</p> 
        <p style={{fontWeight:"bold"}}>  {lastProduct && lastProduct.stock} Adet</p>
        <p > Kategori </p> 
        <p style={{fontWeight:"bold"}}>  {lastProduct && lastProduct.categoryName}</p>
        </div>

        <div>
        <p> İndirim Oranı</p> 
        <p style={{fontWeight:"bold"}}> {lastProduct && lastProduct.discountRate}  </p>
        <p> Ürünün Fiyatı</p> 
        <p style={{fontWeight:"bold"}}>  {lastProduct && lastProduct.price} TL</p>
        </div>
        </div>
        <div>
        <p> Ürünün Açıklaması</p> 
        <p style={{fontWeight:"bold"}}>  {lastProduct && lastProduct.description}</p>
        </div>
        </div>
        </div>
      </div>

      <div className='admin-end-area' style={{ marginTop: "30px" }}>
  <div>
    Son Blog Yazısı
    <div style={{ display: "flex", padding: "20px", border: "1px solid #ccc", width: "100%" }}>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/pembelale.jpg'} alt="j" width={250} height={250} style={{ marginBottom: "10px" }} />
      </div>
      <div style={{ marginLeft: "20px", overflow: "hidden" }}>
        <p style={{ fontWeight: "bold", wordWrap: "break-word" }}>{lastBlog && lastBlog.title}</p>
        <div style={{ maxHeight: "150px", overflowY: "auto" }}>
          <p>{lastBlog && lastBlog.description}</p>
        </div>
      </div>
    </div>
  </div>
</div>





      </div>
      </div>
    </>
  );
}
