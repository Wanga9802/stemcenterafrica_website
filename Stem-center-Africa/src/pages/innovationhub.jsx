import React from 'react';
import InnovationHubHero from '../Components/iinovationhub/hero';
import ActiveInnovations from '../Components/iinovationhub/Activeinnovations';
import CoreCapabilities from '../Components/iinovationhub/CoreCapabilities';
import InnovationOverview from '../Components/iinovationhub/InnovationOverview';

function InnovationHubPage() {
  return (
    <>
      <InnovationHubHero />
      <CoreCapabilities />
      <InnovationOverview />
      <ActiveInnovations />
    </>
  );
}

export default InnovationHubPage;