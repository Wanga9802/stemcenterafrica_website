import HeroSection from "../Components/Home/Herosection";
import ExplorePrograms from "../Components/Home/Exploreprograms";
import StatsBar from "../Components/Home/Statsbar";
import PartnersJoinBanner from "../Components/Home/PartnersJoinBanner";
import AlumniSuccessStories from "../Components/Home/Alumnisucces";
import MapSection from "../Components/Home/Mapsection";
import InnovationHub from "../Components/Home/Innovationhub";
import SupportSection from "../Components/Home/SupportSection";
import ProjectsShowcase from "../Components/Home/Projects";

function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ExplorePrograms />

      <section className="impact-section">
        <div className="container">
<div className="row g-5">
  <div className="col-lg-6 impact-left">
    <AlumniSuccessStories compact />
  </div>
  <div className="col-lg-6 impact-right">
    <InnovationHub compact />
  </div>
</div>
        </div>
      </section>
      <ProjectsShowcase />
      <PartnersJoinBanner />
      < SupportSection />
      <MapSection />
    </>
  );
}
export default Home;