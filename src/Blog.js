import React, { useState } from "react";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // handle search term change here
  };

  return (
    <div  style={{ margin: "100px" }}>
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

const BlogCard = ({ title, image, likes }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    // handle like button click here
  };

  return (
    <div>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <button onClick={handleLike}>
        {liked ? "Beğenmekten Vazgeç" : "Beğen"}
      </button>
      <p>Beğenme Sayısı: {likes}</p>
    </div>
  );
};

const Blog = () => {
  const blogPosts = [
    {
      title: "Blog Yazısı 1",
      image: "https://picsum.photos/200/300",
      likes: 10,
    },
    {
      title: "Blog Yazısı 2",
      image: "https://picsum.photos/200/300",
      likes: 5,
    },
    {
      title: "Blog Yazısı 3",
      image: "https://picsum.photos/200/300",
      likes: 3,
    },
  ];

  return (
    <div>
      <Navbar />
      <div>
        {blogPosts.map((post) => (
          <BlogCard
            key={post.title}
            title={post.title}
            image={post.image}
            likes={post.likes}
          />
        ))}
        
      </div>
    </div>
    

  );
};

export default Blog;
