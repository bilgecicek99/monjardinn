import React, { useState } from "react";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([
    { id: 1, title: "Blog Post 1", content: "Lorem ipsum...", image: "image1.jpg" },
    { id: 2, title: "Blog Post 2", content: "Dolor sit amet...", image: "image2.jpg" },
    { id: 3, title: "Blog Post 3", content: "Consectetur adipiscing elit...", image: "image3.jpg" }
  ]);
  
  const handleClick = (id) => {
    // Tıklanan kartın kimliğine göre doğru blog gönderisi ayrıntılarını gösteren bir bileşenin içeriğini aç
    console.log("Tıklanan kartın kimliği: ", id);
  }

  return (
    <div>
      <h1>Blog</h1>
      <div className="card-container">
        {blogPosts.map(post => (
          <div className="card" key={post.id} onClick={() => handleClick(post.id)}>
            <img src={post.image} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
