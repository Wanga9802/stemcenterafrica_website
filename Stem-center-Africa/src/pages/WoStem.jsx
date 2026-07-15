import WostemHero from "../Components/WoStem/WoHero";
import WoSTEMIntro from "../Components/WoStem/WoSTEMIntro";
import WoSTEMGallery from "../Components/WoStem/WoSTEMGallery";
import SpacePartnerBanner from "../Components/WoStem/SpaceBannerPartner";
import CompetitionShowcase from "../Components/WoStem/CompetitionShowcase";

function WoStem() {
  return (
    <>
      <WostemHero />
      <WoSTEMIntro />
      <WoSTEMGallery />
      <CompetitionShowcase />
    </>
  );
}

export default WoStem;