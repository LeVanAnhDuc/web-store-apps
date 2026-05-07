// components
import PageHeader from "./mains/PageHeader";
import HeroSection from "./mains/HeroSection";
import AppsBrowser from "./mains/AppsBrowser";

const Discover = () => (
  <div className="flex flex-col gap-8">
    <PageHeader />
    <HeroSection />
    <AppsBrowser />
  </div>
);

export default Discover;
