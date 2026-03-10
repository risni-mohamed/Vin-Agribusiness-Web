import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaQuoteLeft, FaPaperPlane, FaUserCircle } from "react-icons/fa";
import "../../styles/Feedback.css";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    axios.get("/api/feedbacks/public")
      .then(res => setFeedbacks(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);
    try {
      await axios.post("/api/feedbacks", form);
      setFeedbacks([{ ...form, id: Date.now() }, ...feedbacks]);
      setForm({ name: "", email: "", message: "" });
      setSubmitStatus("success");
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="feedback" className="premium-feedback-section" ref={sectionRef}>
      <div className="feedback-container">

        {/* Left Side: Form */}
        <div className="feedback-form-side reveal-left">
          <div className="form-header-modern">
            <span className="subtitle-badge">We Value Your Voice</span>
            <h2>Share Your Experience</h2>
            <p>Your feedback shapes the future of our agricultural solutions. Let us know how we did.</p>
          </div>

          <div className="modern-form-wrapper">
            <form className="modern-feedback-form" onSubmit={handleSubmit}>
              <div className="input-row">
                <div className="modern-input-group">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <label>Full Name</label>
                  <span className="focus-border"></span>
                </div>
                <div className="modern-input-group">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <label>Email Address</label>
                  <span className="focus-border"></span>
                </div>
              </div>

              <div className="modern-input-group textarea-group">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <label>Your Message</label>
                <span className="focus-border"></span>
              </div>

              <button
                type="submit"
                className={`modern-submit-btn ${isSubmitting ? 'loading' : ''} ${submitStatus || ''}`}
                disabled={isSubmitting}
              >
                <span className="btn-content">
                  {submitStatus === 'success' ? 'Message Sent!' :
                    submitStatus === 'error' ? 'Error Sending' :
                      <>Send Message <FaPaperPlane className="send-icon" /></>}
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Testimonials */}
        <div className="feedback-testimonials-side reveal-right">
          <div className="testimonials-header-modern">
            <h3>Valuable Feedbacks</h3>
            <div className="header-line"></div>
          </div>

          <div className="modern-testimonials-list">
            {feedbacks.length > 0 ? (
              feedbacks.map((f, i) => (
                <div key={f.id || i} className="modern-testimonial-card" style={{ animationDelay: `${i * 0.1}s` }}>
                  <FaQuoteLeft className="quote-mark" />
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} className="star-icon">★</span>
                    ))}
                  </div>
                  <p className="testimonial-text">"{f.message}"</p>
                  <div className="testimonial-author-modern">
                    <div className="author-avatar-modern">
                      <FaUserCircle />
                    </div>
                    <div className="author-details-modern">
                      <h4>{f.name}</h4>
                      <span className="customer-badge">Verified Customer</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-feedback-modern">
                <p>Be the first to share your experience with us!</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}