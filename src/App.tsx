import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SelectedWork } from './components/SelectedWork';
import { ContactSection } from './components/ContactSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AdminModal } from './components/AdminModal';
import { ResumeModal } from './components/ResumeModal';
import { ImageLightbox } from './components/ImageLightbox';

export default function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#F4F3EF] text-[#111111] flex flex-col font-sans selection:bg-[#07732C] selection:text-[#F4F3EF]">
        {/* Navigation Header */}
        <Header />

        {/* Main Sections */}
        <main className="flex-grow">
          {/* 01. Hero with 3-image composition */}
          <Hero />

          {/* 02. About Me / My Profile (id="profile") */}
          <AboutSection />

          {/* 03. Experience Timeline (id="experience") */}
          <ExperienceTimeline />

          {/* 04. Selected Work Projects (id="work") */}
          <SelectedWork />

          {/* 05. Contact & Channels (id="contact") */}
          <ContactSection />
        </main>

        {/* Modals & Overlays */}
        <ProjectDetailModal />
        <AdminModal />
        <ResumeModal />
        <ImageLightbox />
      </div>
    </PortfolioProvider>
  );
}
