const events = [
  {
    id: 'ai-everything-kenya',
    title: 'AI EVERYTHING KENYA x GITEX KENYA',
    location: 'The Sarit Expo Centre',
    startDate: '2026-05-19',
    endDate: '2026-05-21',
    time: '9:00 am - 5:00 pm',
    excerpt:
      'Accelerated by GITEX GLOBAL, the world\u2019s largest tech and startup show, this event brings together founders, investors, and government leaders to grow East Africa\u2019s AI ecosystem.',

    // Rich description: array of content blocks rendered in order
    descriptionBlocks: [
      {
        type: 'paragraph',
        text: 'Accelerated by GITEX GLOBAL, the world\u2019s largest tech and startup show, in collaboration with the Republic of Kenya and the Office of The Tech Envoy, AI EVERYTHING KENYA x GITEX KENYA is driving inclusive access to East Africa\u2019s AI and digital economies.',
      },
      {
        type: 'paragraph',
        text: 'The event unites global pioneers, enterprises, startups, and policymakers to explore real-world AI innovations and next-generation solutions.',
      },
      {
        type: 'heading',
        text: 'Event Schedule',
      },
      {
        type: 'highlight',
        label: 'SUMMIT',
        text: 'Future Build Home \u2013 Empowering Everyone Through AI',
        subtext: '19 May 2026 | The Sarit Expo Centre',
      },
      {
        type: 'highlight',
        label: 'EXPO',
        text: 'The Ultimate Meeting Point for Global Innovators, Governments, Investors & Buyers',
        subtext: '20\u201321 May 2026 | Kenyatta International Convention Centre (KICC)',
      },
      {
        type: 'heading',
        text: 'Why Attend',
      },
      {
        type: 'stats',
        items: [
          '10,000+ Tech Executives',
          '400+ Global Enterprises & Startups',
          '75 Participating Countries',
          '150+ Global Speakers',
        ],
      },
      {
        type: 'heading',
        text: 'Co-located Events',
      },
      {
        type: 'list',
        items: [
          'North Star Kenya \u2013 startups & scaleups',
          'FDX Kenya \u2013 East Africa\u2019s premium platform for institutional finance & digital assets',
        ],
      },
      {
        type: 'heading',
        text: 'Next-Gen Solutions Across',
      },
      {
        type: 'tags',
        items: [
          'AI', 'Cloud', 'Cybersecurity', 'IoT', 'Big Data',
          'Industry 4.0', 'Fintech', 'Agritech', 'Greentech',
          'Edutech', 'SaaS', 'Quantum', 'Smart Mobility',
        ],
      },
      {
        type: 'links',
        items: [
          { label: 'Get Involved', url: 'https://linktr.ee/aieverythingkenya' },
          { label: 'More Info', url: 'https://aieverythingkenya.com' },
        ],
      },
      {
        type: 'hashtags',
        text: '#AIEVERYTHINGKENYA #GITEXKENYA',
      },
    ],

    imageUrl:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
    registerUrl: 'https://lu.ma/ai-everything-kenya',
    requiresRegistration: true,

    // Optional QR codes shown in the left column
    qrCodes: [
      {
        label: 'Map Location',
        imageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://maps.google.com/?q=Sarit+Expo+Centre+Nairobi',
        linkUrl: 'https://maps.google.com/?q=Sarit+Expo+Centre+Nairobi',
        linkLabel: 'Open Map',
      },
    ],
  },
  {
    id: 'moringa-school-graduation',
    title: 'Stem Africa July 2026 Graduation',
    location: 'The A.S.K. Dome Jamhuri Grounds',
    startDate: '2026-07-29',
    endDate: '2026-07-29',
    time: '8:30 am - 1:00 pm',
    excerpt:
      'Join us to celebrate the newest class of Moringa School graduates with a day of keynote talks, live demos, and networking for talent and partners.',

    descriptionBlocks: [
      {
        type: 'paragraph',
        text: 'Moringa School July 2026 Graduation celebrates a new cohort of tech talent ready for the intelligent economy. Attendees will join keynote conversations, graduate showcases, and career networking sessions designed to connect graduates with employers, investors, and community partners.',
      },
      {
        type: 'heading',
        text: 'Event Highlights',
      },
      {
        type: 'list',
        items: [
          'Keynote address from industry leaders',
          'Live project demos by graduating cohort',
          'Employer & investor networking lounge',
          'Graduate portfolio showcase',
        ],
      },
    ],

    imageUrl:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
    registerUrl: 'https://lu.ma/moringa-graduation-2026',
    requiresRegistration: false,

    qrCodes: [
      {
        label: 'Scan for Map Location',
        imageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://maps.google.com/?q=ASK+Dome+Jamhuri+Nairobi',
        linkUrl: 'https://maps.google.com/?q=ASK+Dome+Jamhuri+Nairobi',
        linkLabel: 'Map Location',
      },
      {
        label: 'Scan here or click the link below for the graduation program',
        imageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://lu.ma/moringa-graduation-2026/program',
        linkUrl: 'https://lu.ma/moringa-graduation-2026/program',
        linkLabel: 'Graduation Program',
      },
    ],
  },
];

export default events;
