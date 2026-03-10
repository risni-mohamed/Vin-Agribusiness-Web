import React, { useState, useEffect } from "react";
import axios from "axios";
import FrontendLayout from "@/Layouts/FrontendLayout";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import "../../styles/Media.css";

export default function Media() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [popupVideo, setPopupVideo] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const UPLOADS_BASE = "/storage/"; // Updated for Laravel storage

  const fetchMedia = async () => {
    try {
      const res = await axios.get("/api/media");
      setMediaList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setMediaList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const filteredMedia = mediaList.filter(item => {
    if (activeFilter === "all") return true;
    return item.media_type === activeFilter;
  });

  const handleReadMore = (mediaItem) => {
    setSelectedMedia(mediaItem);
  };

  const handleClosePopup = () => {
    setSelectedMedia(null);
    setPopupVideo(null);
  };

  const renderMediaRows = (list) =>
    list.map((item) => {
      const fileUrl = item.file ? `${UPLOADS_BASE}${item.file}` : null;
      const isVideo = item.file?.match(/\.(mp4|webm|mov)$/i);

      return (
        <div className="media-row" key={item.id}>
          <div className="media-row-inner">
            {/* Media Section (Left) */}
            <div className="media-row-image">
              {fileUrl ? (
                isVideo ? (
                  <div className="video-wrapper" onClick={() => setPopupVideo(fileUrl)}>
                    <video
                      src={fileUrl}
                      className="row-media"
                      muted
                      loop
                    />
                    <div className="play-overlay">
                      <span className="play-icon">▶</span>
                      <span className="play-text">Click to play</span>
                    </div>
                  </div>
                ) : (
                  <img src={fileUrl} alt={item.title} className="row-media" />
                )
              ) : (
                <div className="no-media-placeholder">
                  <span className="placeholder-icon">📷</span>
                  <span>No Media</span>
                </div>
              )}
            </div>

            {/* Content Section (Right) */}
            <div className="media-row-content">
              <div className="content-header">
                <span className="media-type-badge">
                  {item.media_type === "video" ? "🎥 VIDEO" : "📰 NEWS"}
                </span>
                <span className="media-date">
                  {new Date(item.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              <h3 className="media-row-title">{item.title}</h3>

              {item.description && (
                <p className="media-row-description">{item.description}</p>
              )}

              <div className="media-row-footer">
                <button
                  className="read-more-btn"
                  onClick={() => handleReadMore(item)}
                >
                  Read Full Story →
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });


  return (
    <FrontendLayout title="Media">
      <div className="media-page">
        <div className="page-header">
          <h1>Media & Updates</h1>
          <p className="page-subtitle">Stay informed with our latest news and videos</p>

          <div className="media-social-links">
            <a
              href="https://www.facebook.com/VinAgribusinessPvtLtd"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn facebook"
            >
              <FaFacebookF className="social-icon" />
              <span>Follow us on Facebook</span>
            </a>
            <a
              href="https://www.youtube.com/channel/UCErmqbF2A453eNWfEYMj22Q"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn youtube"
            >
              <FaYoutube className="social-icon" />
              <span>Subscribe on YouTube</span>
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-section">
          <div className="filter-container">
            <button
              className={`filter-tab ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All Media
            </button>
            <button
              className={`filter-tab ${activeFilter === "video" ? "active" : ""}`}
              onClick={() => setActiveFilter("video")}
            >
              Videos
            </button>
            <button
              className={`filter-tab ${activeFilter === "news" ? "active" : ""}`}
              onClick={() => setActiveFilter("news")}
            >
              News
            </button>
          </div>
        </div>

        {/* Media Rows Container */}
        <div className="media-rows-container">
          {loading ? (
            <div className="loading-state">Loading...</div>
          ) : filteredMedia.length > 0 ? (
            <div className="media-rows">
              {renderMediaRows(filteredMedia)}
            </div>
          ) : (
            <div className="no-content">
              <div className="no-content-icon">📰</div>
              <h3>No content available</h3>
              <p>Check back later for updates</p>
            </div>
          )}
        </div>

        {/* Video Popup */}
        {popupVideo && (
          <div className="video-popup" onClick={handleClosePopup}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
              <video
                src={popupVideo}
                controls
                autoPlay
                className="popup-video"
              />
              <button className="close-popup" onClick={handleClosePopup}>
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Full Story Popup */}
        {selectedMedia && (
          <div className="story-popup" onClick={handleClosePopup}>
            <div className="story-popup-container" onClick={(e) => e.stopPropagation()}>
              <button className="close-popup" onClick={handleClosePopup}>
                ✕
              </button>

              <div className="story-popup-content">
                {/* Full Size Media */}
                <div className="story-media-section">
                  {selectedMedia.file ? (
                    selectedMedia.file.match(/\.(mp4|webm|mov)$/i) ? (
                      <video
                        src={`${UPLOADS_BASE}${selectedMedia.file}`}
                        controls
                        autoPlay
                        className="story-full-media"
                      />
                    ) : (
                      <img
                        src={`${UPLOADS_BASE}${selectedMedia.file}`}
                        alt={selectedMedia.title}
                        className="story-full-media"
                      />
                    )
                  ) : (
                    <div className="no-media-full">
                      <span className="placeholder-icon">📷</span>
                      <span>No Media Available</span>
                    </div>
                  )}
                </div>

                {/* Detailed Content */}
                <div className="story-content-section">
                  <div className="story-header">
                    <span className="story-type-badge">
                      {selectedMedia.media_type === "video" ? "🎥 VIDEO" : "📰 NEWS"}
                    </span>
                    <span className="story-date">
                      {new Date(selectedMedia.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <h2 className="story-title">{selectedMedia.title}</h2>

                  {selectedMedia.description && (
                    <div className="story-description">
                      <p>{selectedMedia.description}</p>
                    </div>
                  )}

                  {/* Additional details if available */}
                  {selectedMedia.content && (
                    <div className="story-full-content">
                      <p>{selectedMedia.content}</p>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="story-meta">
                    <div className="meta-item">
                      <strong>Type:</strong> {selectedMedia.media_type}
                    </div>
                    {selectedMedia.author && (
                      <div className="meta-item">
                        <strong>Author:</strong> {selectedMedia.author}
                      </div>
                    )}
                    {selectedMedia.tags && (
                      <div className="meta-item">
                        <strong>Tags:</strong> {selectedMedia.tags}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </FrontendLayout>
  );
}
