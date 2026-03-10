import React from "react";
import { router } from "@inertiajs/react";
import FrontendLayout from "@/Layouts/FrontendLayout";
import "../../styles/Seeds.css";

export default function Seeds() {
  const handleReturnHome = () => {
    router.get("/");
  };

  return (
    <FrontendLayout title="Seeds">
      <section className="seeds-construction-page">
        <div className="seeds-construction-container">
          {/* Animated Background Elements */}
          <div className="floating-seeds">
            <div className="seed seed1">🌱</div>
            <div className="seed seed2">🌿</div>
            <div className="seed seed3">🍃</div>
            <div className="seed seed4">🪴</div>
            <div className="seed seed5">🌾</div>
          </div>

          <div className="seeds-construction-content">
            {/* Main Icon with Animation */}
            <div className="seeds-icon-container">
              <div className="seeds-main-icon">🌱</div>
              <div className="construction-tools">
                <span className="tool tool1">🔨</span>
                <span className="tool tool2">🛠️</span>
                <span className="tool tool3">📐</span>
              </div>
            </div>

            {/* Content */}
            <h1 className="seeds-construction-title">
              Growing Something Amazing! & This Page is Under Construction
            </h1>

            {/* Progress Section */}
            <div className="seeds-progress-container">
              <div className="seeds-progress-bar">
                <div
                  className="seeds-progress-fill"
                  style={{ width: '45%' }}
                >
                  <div className="progress-glow"></div>
                </div>
              </div>
              <div className="progress-stats">
                <span className="progress-percentage">45%</span>
                <span className="progress-text">Development in Progress</span>
              </div>
            </div>

            {/* Call to Action */}
            <div className="cta-section">
              <p className="cta-text">Be the first to know when we launch!</p>
              <div className="cta-buttons">
                <button className="back-btn" onClick={handleReturnHome}>
                  Return Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FrontendLayout>
  );
}
