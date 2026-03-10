import React from "react";
import { router } from "@inertiajs/react";
import FrontendLayout from "@/Layouts/FrontendLayout";
import "../../styles/VinApparel.css";

export default function VinApparel() {
  const handleReturnHome = () => {
    router.get("/");
  };

  return (
    <FrontendLayout title="Vin Apparel">
      <section className="vinapparel-construction-page">
        <div className="vinapparel-construction-container">
          {/* Animated Background Elements */}
          <div className="floating-apparel">
            <div className="apparel apparel1">👕</div>
            <div className="apparel apparel2">🧥</div>
            <div className="apparel apparel3">👖</div>
            <div className="apparel apparel4">🧤</div>
            <div className="apparel apparel5">👷</div>
          </div>

          <div className="vinapparel-construction-content">
            {/* Main Icon with Animation */}
            <div className="vinapparel-icon-container">
              <div className="vinapparel-main-icon">👕</div>
              <div className="construction-tools">
                <span className="tool-icon tool1">🔨</span>
                <span className="tool-icon tool2">🛠️</span>
                <span className="tool-icon tool3">📐</span>
              </div>
            </div>

            {/* Content */}
            <h1 className="vinapparel-construction-title">
              Stitching Quality Workwear! & This Page is Under Construction
            </h1>

            {/* Progress Section */}
            <div className="vinapparel-progress-container">
              <div className="vinapparel-progress-bar">
                <div
                  className="vinapparel-progress-fill"
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
              <p className="cta-text">
                We're tailoring the perfect collection of farming apparel and protective gear!
                Check back soon for durable clothing designed to withstand the toughest farm conditions.
              </p>
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
