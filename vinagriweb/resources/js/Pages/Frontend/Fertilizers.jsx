import React from "react";
import FrontendLayout from "@/Layouts/FrontendLayout";
import FertilizerHero from "@/Components/Frontend/FertilizerHero";
import FertilizerWelcome from "@/Components/Frontend/FertilizerWelcome";
import "../../styles/Fertilizer.css";

export default function Fertilizer() {
  return (
    <FrontendLayout title="Fertilizers">
      <div className="fertilizer-page">
        <main>
          <FertilizerHero />
          <FertilizerWelcome />
        </main>
      </div>
    </FrontendLayout>
  );
}

