import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import FeaturedCars from "../components/FeaturedCars";
import StatsStrip from "../components/StatsStrip";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SearchBar />
      <StatsStrip />
      <FeaturedCars />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
}
