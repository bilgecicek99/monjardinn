import React, { useState,useEffect } from "react";
import WithNavbar from '../WithNavbar'; 
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../config/Constants';

const Navbar = () => {
  
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // handle search term change here
    
  };

  return (
    
    <div style={{margin:"0"}}>
    <div className="nav-barblog">
    <nav>
    
      <ul>
        <li>Workshoplar</li>
        <li>Aranjmanlar</li>
        <li>Son Yayınlananlar</li>
        <li>Popüler Yazılar</li>
        <li>
          <input
            type="text"
            placeholder="Ara..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </li>
      </ul>
    </nav>
    </div>
    </div>

  );
};

const BlogCard = ({ id,title, image, likes, caption }) => {
  const navigate = useNavigate();
  const handleEditClick = (blog) => {
    console.log("blog", blog);
    // Edit sayfasına yönlendirme işlemi
    navigate(`/editblog/${blog}`, { state: { blog } });
  };
  
  
  
  return (
    <div style={{ margin: "auto", width: "300px", height: "400px", border: "none", borderRadius: "10px", padding: "10px", marginBottom: "20px", background:"#E7D1EA" }}>
      <button  onClick={() => handleEditClick(id)} style={{height: "auto", width: "auto" , background: "transparent"}}>
                  <img src="/images/edit.png" alt="" width={28} height={28} />
                  </button>
      <img src={image} alt={title} style={{ maxWidth: "100%", maxHeight: "60%", objectFit: "cover" }} />
     <h3 style={{ fontFamily: 'Times New Roman', fontWeight: 'bold' }}>{title}</h3>
     <p style={{ fontFamily: 'Times New Roman', fontStyle: 'italic', whiteSpace: 'pre-wrap' }}>{caption}</p>
     <hr/>
     <div style={{float:"right"}}>
    </div>
    </div>
  );
};

const AdminAllBlog = () => {
  const [allBlog, setAllBlog] = useState([]);

  const blogPosts = [
    {
      title: "Yeni Atölyeler",
      image: "/images/blog2.png",
      likes: 10,
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Yeni Atölyeler",
      image: "/images/blog1.png",
      likes: 5,
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Yeni Atölyeler",
      image: "/images/blog2.png",
      likes: 3,
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Yeni Atölyeler",
      image: "/images/blog1.png",
      likes: 3,
    },
    {
      title: "Yeni Atölyeler",
      image: "/images/blog2.png",
      likes: 3,
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Yeni Atölyeler",
      image: "/images/blog1.png",
      likes: 3,
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  useEffect(() => {
     
    const fetchAllBlog = async () => {
      try {
        
        const response = await fetch(baseUrl+`api/Blog/GetAllBlog`);
        const data = await response.json();
        console.log("data", data.data);
        const blog = data.data;
        setAllBlog(blog);
      } catch (error) {
        console.error("fetchBlog hatası:", error);
        // Hata durumunda yapılacak işlemler
      }
    };
  
    fetchAllBlog();
  }, []);

  
  return (
    <div style={{  }}>
    <div style={{margin:"100px"}}>
     
      <Navbar />
      <div style={{display: "flex", flexWrap: "wrap", justifyContent:"center", background: "#D2ADD7", padding:"10px", borderRadius:"10px", maxWidth: "800px", margin: "0 auto"}}>
        {allBlog.map((post) => (
          <div key={post.title} style={{ flexBasis: "35%", flexGrow: 1, padding: "10px",  borderRadius: "10px" }}>
          <BlogCard
            key={post.title}
            title={post.title}
            id={post.id}
            image={post.image}
            caption={post.description}
            likes={post.likes}
            
          />
          
                </div>
                
        ))}
        </div>
      </div>
    </div>
    

  );
};

export default WithNavbar(AdminAllBlog);
