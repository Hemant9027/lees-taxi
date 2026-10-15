import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer, { MobileActionBar } from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Tours from "./pages/Tours";
import CarRentals from "./pages/CarRentals";
import Destinations from "./pages/Destinations";
import About from "./pages/About";
import GalleryPage from "./pages/GalleryPage";
import Contact from "./pages/Contact";
import Airbnb from "./pages/Airbnb";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import BookingDemo from "./pages/BookingDemo";

export default function App() {
  return (
    <HashRouter>
      <div className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-ink-900 px-5 py-3 text-sm font-bold text-sand-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/car-rentals" element={<CarRentals />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/airbnb" element={<Airbnb />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/booking-demo" element={<BookingDemo />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <MobileActionBar />
      </div>
    </HashRouter>
  );
}
