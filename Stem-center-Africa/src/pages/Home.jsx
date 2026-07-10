

import HeroSection from "../Components/Home/Herosection";
import ExplorePrograms from "../Components/Home/Exploreprograms";
import StatsBar from "../Components/Home/Statsbar";
import Partners from "../Components/Home/Partners";
import Impact from "../Components/Home/impact";
import Joinus from "../Components/Home/Joinus";
import AlumniSuccessStories from "../Components/Home/Alumnisucces";
import MapSection from "../Components/Home/Mapsection";
import AwardsSection from "../Components/Home/Awardsection";
import Projects from "../Components/Home/Projects";
import InnovationHub from "../Components/Home/Innovationhub";

function Home() {

  return (

    <>
      <HeroSection />
      <StatsBar />
      <ExplorePrograms />
      <Projects />
      <InnovationHub />
      <Partners />
      <AlumniSuccessStories />
      <AwardsSection />
      <Impact />
      <Joinus />
      <MapSection />
    </>
  )







}
export default Home;