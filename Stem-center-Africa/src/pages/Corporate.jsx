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
      <CallToAction
        badgeText="Ready to get started?"
        titlePrefix="Turn Your Idea Into a Powerful Digital Solution."
        titleAccent=""
        description="From websites to full AI automation — we scope, price, and deliver with precision."
        buttonText="start conversion"
      />
    </>
  );
}

export default Corporate;
