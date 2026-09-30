import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StarfieldCanvas from './components/StarfieldCanvas';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import AboutPage from './pages/AboutPage';
import Registration from './pages/Registration';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-void text-slate-100 relative selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background Starfield Canvas */}
      <StarfieldCanvas />

      {/* Auto scroll-to-top on route navigation */}
      <ScrollToTop />

      {/* Persistent Navigation Bar */}
      <Navbar />

      {/* Main Viewport Content */}
      <main className="flex-grow relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventId" element={<EventDetailsPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/register/:eventId" element={<Registration />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Persistent Brand Footer */}
      <Footer />
    </div>
  );
}
