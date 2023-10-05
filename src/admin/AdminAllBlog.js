import React, { useState,useEffect } from "react";
import WithNavbar from '../WithNavbar'; 
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../config/Constants';
import { getToken } from "../service/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ onSearch }) => {
  
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    
    <div style={{margin:"0"}}>
    <div className="nav-baradminblog" style={{maxWidth:"1200px"}}>
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
     
        <input
        type="text"
        style={{  border: "none",
        borderBottom: "1px solid white",
        outline: "none", outline: "none", fontSize: "16px", padding: "5px 0", background: "transparent", color: "white", width:"70%" }}
        onChange={handleSearch}
      />
      <img
        src="/images/blogsearch.png" 
        alt="Search"
        style={{ marginLeft: "10px", cursor: "pointer", width: "20px", height: "20px" }}
      />         
        
    </nav>
    </div>
    </div>

  );
};


const AdminAllBlog = () => {
  const [allBlog, setAllBlog] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchAllBlog = async () => {
    try {
      
      const response = await fetch(baseUrl+`api/Blog/GetAllBlog`);
      const data = await response.json();
      if(data.success)
      {
        const blog = data.data;
        setAllBlog(blog);
        setFilteredPosts(blog)
      }
      
    } catch (error) {
      console.error("fetchBlog hatası:", error);
      // Hata durumunda yapılacak işlemler
    }}
  useEffect(() => {
        fetchAllBlog()
  }
  ,[]);

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredPosts(allBlog); // Show all posts when search term is empty
      
    } else {
      const filtered = allBlog.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };
  
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Bir önceki sayfaya yönlendirir
  };

  const gotoBlogSavePage = () => {
    navigate('/adminaddblog');
  }

  const BlogCard = ({ id,title, image, likes, caption }) => {
    const navigate = useNavigate();
    const token = getToken();
    const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
  
    const defaultImage = '/images/monjardinlogo.png';
  
    const handleEditClick = (blog) => {
      console.log("blog", blog);
      // Edit sayfasına yönlendirme işlemi
      navigate(`/editblog/${blog}`, { state: { blog } });
    };
    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    };
  
    function showToast(message, duration = 3000) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  
    const handleDeleteClick = (id) => {
      fetch(baseUrl+`api/Blog/DeleteBlog?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.success)
          {
            toast.success(data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
            fetchAllBlog();
  
          }
          else{
            showToast(data.message??'Lütfen Daha Sonra Tekrar Deneyiniz');
          }
        })
        .catch((error) => {
          showToast('Lütfen Daha Sonra Tekrar Deneyiniz');
        });
        setIsDeleteConfirmationVisible(false);
  
    }
    
    return (
      <div style={{ 
        margin: "auto", 
        width: "300px", 
        height: "400px", 
        border: "none", 
        borderRadius: "10px", 
        padding: "10px", 
        marginBottom: "20px", 
        background:"#E7D1EA" }}>
               <ToastContainer />
          <div style={{ float: "right" }}>
            <button  onClick={() => handleEditClick(id)} style={{height: "auto", width: "auto" , background: "transparent"}}>
                <img src="/images/edit.png" alt="" width={28} height={28} />
            </button>
            <button style={{height: "auto", width: "auto" , background: "transparent"}}>
                <img onClick={() => setIsDeleteConfirmationVisible(true)} src={"/images/delete.png"} alt="" width={23} height={23}/>
            </button>
            {isDeleteConfirmationVisible && (
                <div className="delete-confirmation-overlay">
                  <div className="delete-confirmation-box">
                    <p>Silmek istediğinize emin misiniz?</p>
                    <button onClick={()=> handleDeleteClick(id)}>Evet</button>
                    <button onClick={() => setIsDeleteConfirmationVisible(false)}>Hayır</button>
                  </div>
                </div>
              )}
          </div>
        <img src={image || defaultImage} alt={title} style={{ width: "100%", height: "200px",justifyContent:"center", objectFit: "cover",borderRadius:"10px",objectFit:"contain" }} />
        <h3 style={{ fontFamily: 'Times New Roman', fontWeight: 'bold' }}>{title}</h3>
        <p style={{ fontFamily: 'Times New Roman', fontStyle: 'italic',display: "inline-block",
          wordBreak: "break-word",
          tableLayout: "fixed" }}>{truncateText(caption, 100)}</p>      <hr/>
       <div style={{float:"right"}}>
      </div>
      </div>
    );
  };

  return (
    <div  style={{ margin: "50px" }}>
      <h1  className='baslik'>Mon Jardin</h1>
      <ToastContainer />

      <button onClick={handleGoBack} className='back-button'><img src="/images/back-button.png" alt="" width={40} height={30}/></button>

      <button
      style={{
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 10px",
        borderRadius: "5px",
        backgroundColor: "#893694",
        border: "1px solid gray",
        boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
        right: "20px",
        zIndex: "999",
        float:"right",
        marginTop:"15px"
      }}
      onClick={gotoBlogSavePage}
    >
      <i className="fas fa-edit" style={{ marginRight: "5px" }}></i> Blog Ekle
    </button>
    <div style={{margin:"40px"}}>
     
    <Navbar onSearch={handleSearch} />
    <div style={{display: "flex", flexWrap: "wrap", justifyContent:"center", background: "#D2ADD7", padding:"10px", borderRadius:"10px", maxWidth: "1200px", margin: "0 auto"}}>
        { filteredPosts.length === 0 ? (
          <p style={{color: "white"}}>Blog bulunamadı.</p>
        ) : (filteredPosts.map((post) => (
          <div key={post.id} style={{ flexBasis: "20%", flexGrow: 1, padding: "10px",  borderRadius: "10px" }}>
          <BlogCard
            key={post.title}
            title={post.title}
            id={post.id}
            image={post.blogDetailFileUrl}
            caption={post.description}
            likes={post.likes}
            
          />
          
        </div>
                
        )))}
       
        </div>
      </div>
    </div>
    

  );
};

export default AdminAllBlog;
