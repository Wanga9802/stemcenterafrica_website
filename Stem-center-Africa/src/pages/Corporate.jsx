import ServicesHero from "../Components/services/serviceshero";
import StatsMarquee from "../Components/services/StatsMarquee";
import ServiceListing from "../Components/services/ServiceListing";
import OurProcess from "../Components/services/Ourprocess";
import CallToAction from "../Components/services/Calltoaction";






function Corporate() {
  const scrollToServices = () => {
    const target = document.getElementById('our-services');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <ServicesHero onSecondaryClick={scrollToServices} />
      <StatsMarquee />
      <ServiceListing />
      <OurProcess />
      <CallToAction />
    </>
  );
}

export default Corporate;
