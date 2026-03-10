import React from "react";
import FrontendLayout from "@/Layouts/FrontendLayout";
import "../../styles/About.css";
import aboutHero from "../../assets/aboutHero.png";

export default function About() {
  const businessInfo = [
    { label: "Type of business", value: "An Individual Business" },
    { label: "Date established", value: "April 2011" },
    { label: "Business Registration No.", value: "C.P./C.P.D.S/2/2/6420" },
    { label: "Registration No. of Fertilizer Importation", value: "I/2022/11/67/R" },
    { label: "Registration No. of Formulation of Fertilizer", value: "F/2022/14/47/R" },
    { label: "Registration No. of Seed Act", value: "SA/KUN/03213-IM" },
    { label: "Member of The Ceylon Chamber of Commerce", value: "GS1 Barcodes" }
  ];

  return (
    <FrontendLayout title="About Us">
      <main className="about-main">
        {/* Page Header */}
        <section className="about-header">
          <div className="header-curve"></div>
          <h1>About Vin Agribusiness</h1>
          <p className="about-subtitle">
            Pioneering sustainable agriculture in Sri Lanka through innovation, quality,
            and farmer partnerships since our inception.
          </p>
        </section>

        {/* Main Content */}
        <div className="about-content">
          {/* Our Story Section */}
          <section className="about-story">
            <div className="story-inner">
              {/* Left: Header */}
              <div className="story-left">
                <span className="story-badge">Since 2009</span>
                <h2 className="story-heading">Our<br />Story</h2>
                <div className="story-divider"></div>
                <blockquote className="story-quote">
                  "Growing beyond boundaries with nature, passion, and purpose."
                </blockquote>
                <div className="story-milestones">
                  <div className="milestone">
                    <span className="milestone-year">2009</span>
                    <span className="milestone-label">Founded</span>
                  </div>
                  <div className="milestone">
                    <span className="milestone-year">2011</span>
                    <span className="milestone-label">Registered</span>
                  </div>
                  <div className="milestone">
                    <span className="milestone-year">2022</span>
                    <span className="milestone-label">Expanded</span>
                  </div>
                </div>
              </div>

              {/* Right: Story Paragraphs */}
              <div className="story-right">
                <p className="story-lead">
                  Vin Agribusiness is a company incorporated by professionals
                  in the agriculture industry, with hands-on experience within
                  the specialized Fertilizer, Fruit &amp; Plant, Seeds, Orchid &amp;
                  Ornamental Plant &amp; Other Agri Inputs sector.
                </p>
                <p>
                  Having worked for a multinational company in the agriculture
                  industry, the entrepreneur's thoughts and talents focused on
                  customers to create and cater to the demand in line with the
                  global trend towards healthy food and green global acceptance.
                </p>
                <p>
                  We started our operation in 2009 with local vegetable seeds and
                  seed paddy contract growing systems, and grew into importing
                  vegetable seeds, fertilizers, and orchid plants. Currently we
                  are a pioneer in the fertilizer sector.
                </p>
                <p>
                  The company began with the objective of launching its product
                  segment with a successful retail chain, while creating an
                  eco-friendly and interesting concept where the existing clientele
                  can enjoy a unique experience.
                </p>
                <p>
                  In line with our vision for the future, our enterprise has
                  established its packaging and marketing infrastructure to cater
                  to its demands. Our company is certified to import seeds,
                  fertilizers &amp; plants under the code and conduct of the
                  agriculture industry.
                </p>
              </div>
            </div>
          </section>

          {/* Vision & Mission Section */}
          <section className="about-vm">
            <div className="vm-left">
              <div className="about-vm-side">
                <div className="vm-card-compact vision">
                  <h3>Our Vision</h3>
                  <p>
                    "To be the best company in producing &
                    blending of quality organic and inorganic fertilizers
                    and operate with product diversity adoption technology focusing
                    to ensure the high yielding and profitability for
                    Sri Lankan agricultural sector."
                  </p>
                </div>

                <div className="vm-card-compact mission">
                  <h3>Our Mission</h3>
                  <p>
                    "Introduction of best technologies to
                    stabio most accurate and productive blended
                    fertilizers produce high yielding liquid organic and
                    inorganic compound granules, bio fertilizers with effective organic
                    and semi organic pelleted range using modern technology."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Business Information Section */}
          <section className="business-info-section">
            <div className="business-info-container">
              <h2>Business Information</h2>
              <div className="business-info-grid">
                {businessInfo.map((info, index) => (
                  <div key={index} className="info-card">
                    <div className="info-label">{info.label}</div>
                    <div className="info-value">{info.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="about-stats">
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-circle" data-percent="16">
                  <span className="stat-number">16+</span>
                </div>
                <div className="stat-label">Years of Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-circle" data-percent="25">
                  <span className="stat-number">25+</span>
                </div>
                <div className="stat-label">Products</div>
              </div>
              <div className="stat-item">
                <div className="stat-circle" data-percent="100">
                  <span className="stat-number">100%</span>
                </div>
                <div className="stat-label">Quality Guarantee</div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="about-extra">
            <div className="values-section">
              <h2>Our Values</h2>
              <div className="values-grid">
                <div className="value-item">
                  <span className="value-icon">🌱</span>
                  <h4>Sustainable Farming</h4>
                  <p>Promoting eco-friendly and sustainable agricultural practices</p>
                </div>
                <div className="value-item">
                  <span className="value-icon">🔬</span>
                  <h4>Scientific Approach</h4>
                  <p>Providing farmers with reliable, science-backed solutions</p>
                </div>
                <div className="value-item">
                  <span className="value-icon">💡</span>
                  <h4>Innovation</h4>
                  <p>Investing in research and technological advancement</p>
                </div>
                <div className="value-item">
                  <span className="value-icon">🤝</span>
                  <h4>Partnership</h4>
                  <p>Building long-term relationships with farming communities</p>
                </div>
                <div className="value-item">
                  <span className="value-icon">🌍</span>
                  <h4>Environmental Care</h4>
                  <p>Ensuring environmental stewardship in all operations</p>
                </div>
              </div>
            </div>
          </section>

          {/* Expertise Section */}
          <section className="about-expertise">
            <div className="expertise-content">
              <h2>Our Expertise</h2>
              <div className="expertise-grid">
                <div className="expertise-item">
                  <h3>Agricultural Research</h3>
                  <p>Advanced plant nutrition studies and soil science research</p>
                </div>
                <div className="expertise-item">
                  <h3>International Experience</h3>
                  <p>Global knowledge from China, India, Thailand, and the Turkey</p>
                </div>
                <div className="expertise-item">
                  <h3>Technical Innovation</h3>
                  <p>Drip irrigation, fertigation, and greenhouse farming technologies</p>
                </div>
                <div className="expertise-item">
                  <h3>Business Management</h3>
                  <p>Comprehensive business, HR, and account management expertise</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </FrontendLayout>
  );
}
