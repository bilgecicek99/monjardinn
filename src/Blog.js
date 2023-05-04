import React, { useState } from "react";

const Navbar = () => {
  
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // handle search term change here
    
  };

  return (
    
    <div style={{margin:"100px"}}>
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

const BlogCard = ({ title, image, likes, caption }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    // handle like button click here
  };

  return (
    <div style={{ margin: "auto", width: "300px", height: "400px", border: "none", borderRadius: "10px", padding: "10px", marginBottom: "20px", background:"#E7D1EA" }}>
      <img src={image} alt={title} style={{ maxWidth: "100%", maxHeight: "60%", objectFit: "cover" }} />
     <h3 style={{ fontFamily: 'Times New Roman', fontWeight: 'bold' }}>{title}</h3>
     <p style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>{caption}</p>
     <hr/>
     <div style={{float:"right"}}>
      <button onClick={handleLike} style={{backgroundColor: 'transparent', border: 'none', width: "32px", height: "32px", marginRight:"20px"}}>
    
      <img src={liked ? '/images/kalp.png' : '/images/kalp.png'} alt="Begen" style={{width: "32px", height: "32px"}} />

    </button>
    <span>{liked ? likes + 1 : likes} </span>
    </div>
    </div>
  );
};

const Blog = () => {
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

  return (
    <div style={{  }}>
    <div style={{margin:"100px"}}>
     
      <Navbar />
      <div style={{display: "flex", flexWrap: "wrap", justifyContent:"center", background: "#D2ADD7", padding:"10px", borderRadius:"10px", maxWidth: "800px", margin: "0 auto"}}>
        {blogPosts.map((post) => (
          <div key={post.title} style={{ flexBasis: "35%", flexGrow: 1, padding: "10px",  borderRadius: "10px" }}>
          <BlogCard
            key={post.title}
            title={post.title}
            image={post.image}
            caption={post.caption}
            likes={post.likes}
            
          />
          
                </div>
                
        ))}
        </div>
      </div>
    </div>
    

  );
};

export default Blog;
