import React from "react";
import FrontendLayout from "@/Layouts/FrontendLayout";
import Hero from "@/Components/Frontend/Hero";

import Details from "@/Components/Frontend/Details";
import Feedback from "@/Components/Frontend/Feedback";
import "../../styles/Home.css";

export default function Home() {
  return (
    <FrontendLayout title="Home">
      <div className="home-container">
        <main className="home-main">
          <Hero />
          <section className="section">
            <Details />
          </section>

          <section className="section">
            <Feedback />
          </section>
        </main>
      </div>
    </FrontendLayout>
  );
}

