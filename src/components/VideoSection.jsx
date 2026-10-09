import './VideoSection.css';

const VideoSection = () => {
  return (
    <section className="video-section" id="gallery">
      <div className="container">
        <div className="video-content">
          <div className="video-wrapper">
            <div className="video-placeholder">
              <img
                src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=1200&q=80"
                alt="Desert landscape"
              />
              <div className="play-overlay">
                <span className="play-icon">▶</span>
              </div>
            </div>
          </div>

          <div className="video-text">
            <h2>Experience the desert in motion</h2>
            <p>Watch our guided tour preview and see what awaits you in the stunning desert landscapes</p>
          </div>
        </div>

        <div className="stat-callout">
          <div className="stat-number">95%</div>
          <p className="stat-text">Guests say they felt truly connected to nature</p>
        </div>

        <div className="experience-quote">
          <p>"Every visit leaves something behind — calm, wonder, and a story to tell"</p>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
