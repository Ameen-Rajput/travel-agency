import React from 'react';
import './Blog.css';

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: 'Best Time to Visit AlUla Desert',
      date: 'December 6, 2025',
      excerpt: 'Discover the perfect season to explore the stunning landscapes of AlUla and make the most of your desert adventure.',
      image: 'https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=800&q=80'
    },
    {
      id: 2,
      title: 'What to Pack for a Desert Tour',
      date: 'December 5, 2025',
      excerpt: 'Essential items and tips to ensure you have a comfortable and memorable desert experience.',
      image: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800&q=80'
    }
  ];

  return (
    <section className="blog-section" id="blog">
      <div className="container">
        <div className="blog-header">
          <h2>Travel Stories from Marwa Travel</h2>
        </div>

        <div className="blog-grid">
          {articles.map(article => (
            <div key={article.id} className="blog-card">
              <div className="blog-image">
                <img src={article.image} alt={article.title} />
              </div>
              <div className="blog-content">
                <div className="blog-date">{article.date}</div>
                <h3>{article.title}</h3>
                <p className="blog-excerpt">{article.excerpt}</p>
                <a href="#" className="read-more">Read more →</a>
              </div>
            </div>
          ))}
        </div>

        <div className="blog-cta">
          <a href="#all-articles">See All Articles →</a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
