function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const teamData = {
  board: [
    {
      name: 'Sebastian McKinlay',
      role: 'Board Chairman',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
      slug: toSlug('Sebastian McKinlay'),
      bio: [
        'Sebastian McKinlay brings decades of leadership in private equity, venture capital, and strategic governance to STEM Africa. He champions partnerships that deepen access to applied technology learning across East Africa.',
        'As Board Chairman, Sebastian helps guide investment strategy, governance, and external engagement to ensure the organization scales sustainably while keeping student outcomes front and center.',
      ],
    },
    {
      name: 'Audrey Cheng',
      role: 'Board Member, Co-founder',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
      slug: toSlug('Audrey Cheng'),
      bio: [
        'Audrey Cheng is a serial social entrepreneur with a passion for education innovation and community impact. She has founded and grown multiple ventures focused on youth opportunity and digital skills.',
        'On the STEM Africa board, Audrey helps shape the long-term vision and ensures the curriculum remains deeply rooted in real-world job pathways for learners.',
      ],
    },
    {
      name: 'Snehar Shah',
      role: 'Board Member',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      slug: toSlug('Snehar Shah'),
      bio: [
        'Snehar Shah brings thoughtful leadership to STEM Africa through a background in education strategy and digital inclusion. His focus is on building learning pathways that work for underserved communities.',
        'He plays a key role in advising on governance, partnerships, and stakeholder engagement to keep the organization mission-driven and impact-led.',
      ],
    },
    {
      name: 'Karen Serem Waithaka',
      role: 'Board Member',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80',
      slug: toSlug('Karen Serem Waithaka'),
      bio: [
        'Karen Serem Waithaka is a corporate governance expert and advocate for women in technology. She supports STEM Africa with her experience in organizational design and policy development.',
        'Her board leadership ensures that the organization follows strong governance practices while remaining agile and responsive to student needs.',
      ],
    },
  ],
  executive: [
    {
      name: 'James Mwangi',
      role: 'Chief Executive Officer',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
      slug: toSlug('James Mwangi'),
      bio: [
        'James Mwangi is the CEO of STEM Africa and a seasoned leader in technology education and operations. He is dedicated to scaling the organisation through partnerships, learner-centered programs, and measurable outcomes.',
        'Under his leadership, STEM Africa combines practical curriculum design with strong employer relationships to help learners build real career pathways.',
      ],
    },
    {
      name: 'Amina Hassan',
      role: 'Chief Operating Officer',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
      slug: toSlug('Amina Hassan'),
      bio: [
        'Amina Hassan leads operations with a focus on learner experience, staff excellence, and program delivery. She ensures that every cohort benefits from a seamless, high-quality learning environment.',
        'Amina’s operational expertise keeps the organisation aligned across curriculum, events, and community outreach.',
      ],
    },
    {
      name: 'David Ochieng',
      role: 'Head of Engineering',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
      slug: toSlug('David Ochieng'),
      bio: [
        'David Ochieng heads the engineering curriculum and mentorship programs. His experience building software teams helps embed practical project work and technical excellence into every course.',
        'He works closely with instructors and learners to make sure the technical skills taught are directly relevant to current industry needs.',
      ],
    },
    {
      name: 'Lydia Kamau',
      role: 'Head of Academics',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
      slug: toSlug('Lydia Kamau'),
      bio: [
        'Lydia Kamau leads academic design and learner support. She focuses on creating inclusive, practical learning experiences that empower students from a wide range of backgrounds.',
        'Her work ensures that STEM Africa’s programs are both rigorous and accessible, with strong mentorship and growth support built in.',
      ],
    },
  ],
};

const allTeamMembers = [...teamData.board, ...teamData.executive];

function findMemberBySlug(slug) {
  return allTeamMembers.find(member => member.slug === slug)
}

export { teamData, allTeamMembers, findMemberBySlug }
