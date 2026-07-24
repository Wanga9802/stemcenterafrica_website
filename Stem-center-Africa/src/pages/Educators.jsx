import React from 'react';
import EducatorsHero from '../Components/Educators/Heroe';
import ProgramOverviews from '../Components/Educators/ProgramOverview';
import ProgramGoals from '../Components/Educators/ProgramGoals';
import ProgramStructure from '../Components/Educators/ProgramStructure';
import ProgramImpact from '../Components/Educators/ProgramImpact'

function Educators() {
  return (
      <>
      
      <EducatorsHero />
      <ProgramOverviews />
      <ProgramGoals />
      <ProgramStructure />
      <ProgramImpact />
      </>
  );
}

export default Educators;
