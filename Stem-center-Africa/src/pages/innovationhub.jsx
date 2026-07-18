import React from 'react';
import InnovationHubHero from '../Components/iinovationhub/hero';
import ActiveInnovations from '../Components/iinovationhub/Activeinnovations';
import CoreCapabilities from '../Components/iinovationhub/CoreCapabilities';

function InnovationHubPage() {
  return (
    <>
      <InnovationHubHero />
      <CoreCapabilities />
      <ActiveInnovations />
    </>
  );
}

export default InnovationHubPage;