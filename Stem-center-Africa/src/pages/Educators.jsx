import React from 'react';
import EducatorsHero from '../Components/Educators/Heroe';
import EduIntro from '../Components/Educators/EduIntro';
import EduImpact from '../Components/Educators/EduImpact';
import CohortBanner from '../Components/Educators/CohortBanner';

function Educators() {
  return (
      <>
      
      <EducatorsHero />
      <EduIntro />
      <EduImpact />
      <div className="container" style={{ marginTop: '24px', marginBottom: '24px' }}>
        <CohortBanner />
      </div>
      </>
  );
}

export default Educators;
