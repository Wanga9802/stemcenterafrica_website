
import WoStemIntro from "../Components/WoStem/WoSTEMINTRO"
import GirlsInSTEMHero from "../Components/WoStem/GirlsInSTEMHero";
import robotGirlPhoto from "../assets/wostemf.JPG";
import WoStemPrograms from "../Components/WoStem/WoStemPrograms";
import TestimonialsMoments from "../Components/WoStem/TestimonialsMoments";

function WoStem() {
  return (
    <>
<GirlsInSTEMHero
  program={{
    title: "Empowering Girls. Innovating the Future.",
    description: "Girls in STEM is our commitment to inspiring and equipping girls with the skills, confidence, and opportunities to lead in Science, Technology, Engineering and Mathematics.",
    heroImage: robotGirlPhoto,
    duration: "69%",
    ageGroup: "100,000",
  }}
/>
      <WoStemIntro videoId="xGO2Ww54eYQ" />
      <WoStemPrograms />
      <TestimonialsMoments />
    </>
  );
}

export default WoStem;