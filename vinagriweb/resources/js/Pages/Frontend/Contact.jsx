import React, { useRef, useState } from "react";
import FrontendLayout from "@/Layouts/FrontendLayout";
import "../../styles/NewContact.css";
import emailjs from "@emailjs/browser";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { BsGlobe2 } from "react-icons/bs";

export default function ContactPage() {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const formData = new FormData(form.current);
    const payload = {
      name: formData.get("user_name"),
      email: formData.get("user_email"),
      message: formData.get("message"),
    };

    try {
      // 1. Send to email service
      await emailjs.sendForm(
        "service_yl4zzr4",
        "template_b6tkzch",
        form.current,
        { publicKey: "jvsQzGH6hxksO4V-8" }
      );

      // 2. Save to database
      await axios.post("/api/feedbacks", payload);

      setStatus("Message sent successfully ✅");
      form.current.reset();
    } catch (error) {
      console.error("FAILED...", error);
      setStatus("Failed to send ❌ Try again later.");
    }
  };

  return (
    <FrontendLayout title="Contact Us">
      <div className="nice-contact-page">
        {/* ===== Header Section ===== */}
        <div className="contact-header">
          <div className="contact-header-overlay">
            <h1>Contact Vin Agribusiness</h1>
            <p>
              Have a question or need help? Send us a message or reach us through
              our contact channels below.
            </p>
          </div>
        </div>

        {/* ===== Main Section ===== */}
        <main className="contact-main-section">
          <section className="contact-content-wrapper">
            <div className="contact-info-side">
              <div className="contact-info-header">
                <span className="contact-info-badge">Get In Touch</span>
                <h2>Contact Information</h2>
                <p className="contact-info-intro">We'd love to hear from you. Reach out through any of the channels below and we'll get back to you as soon as possible.</p>
              </div>
              <div className="contact-info-grid">
                <div className="contact-info-card">
                  <div className="contact-icon phone">
                    <FaPhoneAlt />
                  </div>
                  <div className="contact-text">
                    <h3>Phone Numbers</h3>
                    <a href="tel:+940372228554" className="contact-link">+94 37 222 8554</a>
                    <span className="contact-subtitle">Office Line</span>
                    <a href="tel:+94706645007" className="contact-link">+94 70 664 5007</a>
                    <a href="tel:+94706645013" className="contact-link">+94 70 664 5013</a>
                    <span className="contact-subtitle">Hot Lines</span>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-icon email">
                    <FaEnvelope />
                  </div>
                  <div className="contact-text">
                    <h3>Email Address</h3>
                    <a href="mailto:info@vinagribusiness.com" className="contact-link">info@vinagribusiness.com</a>
                    <span className="contact-subtitle">We reply within 24 hours</span>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-icon social">
                    <BsGlobe2 />
                  </div>
                  <div className="contact-text">
                    <h3>Social Media</h3>
                    <a href="https://www.facebook.com/VinAgribusinessPvtLtd" target="_blank" rel="noopener noreferrer" className="contact-link social-link">
                      <FaFacebookF className="social-icon-small" /> Facebook
                    </a>
                    <a href="https://www.youtube.com/channel/UCErmqbF2A453eNWfEYMj22Q" target="_blank" rel="noopener noreferrer" className="contact-link social-link">
                      <FaYoutube className="social-icon-small youtube" /> YouTube
                    </a>
                    <a href="https://wa.me/94706645007" target="_blank" rel="noopener noreferrer" className="contact-link social-link">
                      <FaWhatsapp className="social-icon-small whatsapp" /> WhatsApp: +94 70 664 5007
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-side">
              <h2>Send Us a Message</h2>
              <form ref={form} onSubmit={sendEmail}>
                <input type="hidden" name="to_email" value="mohamadrizni42@gmail.com" />
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" name="user_name" placeholder="Enter your name" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="user_email" placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" name="subject" placeholder="Enter subject" required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea name="message" rows="5" placeholder="Type your message here..." required />
                </div>
                <button type="submit" className="contact-send-btn">
                  Send Message
                </button>
              </form>
              {status && <p className="status">{status}</p>}
            </div>
          </section>

          <section className="contact-map-section">
            <h2>Our Location</h2>
            <div className="contact-map-container">
              <iframe
                title="office-location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8754630583515!2d80.3299379!3d7.4912278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae33a6f801c11fd%3A0x9bb216d234450418!2sVin%20Agri%20Business!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <div className="contact-address">
              <p>
                <strong>Address:</strong> Vin Agri Business, <br />
                2nd Stage, Heraliyawala 6000, Sri Lanka.
              </p>
            </div>
          </section>
        </main>
      </div>
    </FrontendLayout>
  );
}

