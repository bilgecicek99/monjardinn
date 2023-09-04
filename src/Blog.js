import React, { useState, useEffect } from "react";
import WithNavbar from './WithNavbar'; 
import { baseUrl } from './config/Constants';
import { Link } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
  
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    
    <div style={{margin:"0"}}>
    <div className="nav-barblog" style={{maxWidth:"1200px"}}>
    <nav style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
    
     
        <input
        type="text"
        style={{  border: "none",
        borderBottom: "1px solid white",
        outline: "none", outline: "none", fontSize: "16px", padding: "5px 0", background: "transparent", color: "white", width:"70%" }}
        onChange={handleSearch}
      />
      <img
        src="/images/blogsearch.png" // Replace with the actual image path
        alt="Search"
        style={{ marginLeft: "10px", cursor: "pointer", width: "20px", height: "20px" }}
      />         
        
    </nav>
    </div>
    </div>

  );
};

const BlogCard = ({ id, title, image, likes, caption }) => {
  const [liked, setLiked] = useState(false);
  const defaultImage = '/images/monjardinlogo.png';
  const handleLike = () => {
    setLiked(!liked);
   
  };
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <div style={{ margin: "auto", width: "300px", height: "400px", border: "none", borderRadius: "10px", padding: "10px", marginBottom: "20px", background:"#E7D1EA" }}>
    <Link to={`/blogdetail/${id}`} style={{ textDecoration: 'none', color: 'black' }}>

      <img src={image || defaultImage} alt={title} style={{ width: "100%", maxHeight: "60%",justifyContent:"center", objectFit: "cover",borderRadius:"10px",marginTop:"50px" }} />
     <h3 style={{ fontFamily: 'Times New Roman', fontWeight: 'bold' , marginTop:"20px"}}>{title}</h3>
     <p style={{ fontFamily: 'Times New Roman', fontStyle: 'italic',display: "inline-block",
        wordBreak: "break-word",
        tableLayout: "fixed" }}>{truncateText(caption, 100)}</p>
     <hr/>
     <div style={{float:"right"}}>
      <button onClick={handleLike} style={{backgroundColor: 'transparent', border: 'none', width: "32px", height: "32px", marginRight:"20px"}}>
    
      {/* <img src={liked ? '/images/kalp.png' : '/images/kalp.png'} alt="Begen" style={{width: "32px", height: "32px"}} /> */}

    </button>
    {/* <span>{liked ? likes + 1 : likes} </span> */}
    </div>
    </Link>
    </div>
  );
};

const Blog = () => {

      const [blogPosts, setBlogPosts] = useState([]);
      const [filteredPosts, setFilteredPosts] = useState([]);

      const fetchBlogList = async () => {
        try {
          const response = await fetch(baseUrl+`api/Blog/GetAllBlog`);
          if (!response.ok) {
            throw new Error('Bloglar getirilemedi. Lütfen daha sonra tekrar deneyin.');
          }
          const data = await response.json();
          const blogData = data.data;
          setBlogPosts(blogData);
          setFilteredPosts(blogData)
        } catch (error) {
          console.error(error);
          alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
      };
      useEffect(() => {
        fetchBlogList();
      }, []);

      const handleSearch = (searchTerm) => {
        if (searchTerm === "") {
          setFilteredPosts(blogPosts); // Show all posts when search term is empty
        } else {
          const filtered = blogPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredPosts(filtered);
        }
      };
  return (
    <div className="mobile-generic-css" >
    <div style={{ margin: "5%"}}>
  
    <Navbar onSearch={handleSearch} />
      <div style={{display: "flex", flexWrap: "wrap", justifyContent:"center", background: "#D2ADD7", padding:"10px", borderRadius:"10px", maxWidth: "1200px", margin: "0 auto"}}>
      {filteredPosts.length === 0 ? (
          <p style={{color: "white"}}>Blog bulunamadı.</p>
        ) : (
          filteredPosts.map((post) => (
          <div key={post.id} style={{ flexBasis: "20%", flexGrow: 1, padding: "10px",  borderRadius: "10px" }}>
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                image={post.blogDetailFileUrl}
                caption={post.description}
                likes={post.likes}
              />
            </div>)
          ))}
        </div>
      </div>
    </div>
    

  );
};

export default WithNavbar(Blog);
