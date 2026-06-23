import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables. Check your .env file.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Import data files
import { BLOG_POSTS } from '../src/data/blogPosts.js'
import events from '../src/data/eventsData.js'

// Services data (without image imports)
const SERVICES = [
  {
    id: '01',
    slug: 'website-development',
    title: 'Website Development',
    description:
      'Professional websites, ecommerce stores, landing pages, and portals built to convert visitors into customers.',
    features: ['Responsive design', 'Basic SEO', 'Modern custom design'],
  },
  {
    id: '02',
    slug: 'software-development',
    title: 'Software Development',
    description:
      'Custom software solutions tailored to your business workflows — from internal tools to full-scale platforms.',
    features: ['Custom dashboards', 'API integrations', 'Scalable architecture'],
  },
  {
    id: '03',
    slug: 'booking-systems',
    title: 'Booking Systems',
    description:
      'Booking platforms with calendars, M-Pesa payments, reminders, staff schedules, and client portals.',
    features: ['Online bookings', 'M-Pesa payments', 'Client portals'],
  },
  {
    id: '04',
    slug: 'ai-automation',
    title: 'AI Automation',
    description:
      'AI workflows, customer support automation, reporting, and task systems that reduce manual work.',
    features: ['AI workflows', 'Smart reporting', 'Customer automation'],
  },
  {
    id: '05',
    slug: 'mobile-development',
    title: 'Mobile Development',
    description:
      'Native and cross-platform mobile apps for Android and iOS that deliver seamless user experiences.',
    features: ['Android & iOS', 'Offline support', 'Push notifications'],
  },
  {
    id: '06',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    description:
      'Data-driven campaigns across social media, search, and email to grow your brand and drive revenue.',
    features: ['Social media ads', 'SEO & content', 'Email campaigns'],
  },
]

// ========== TEAM DATA ==========
const teamData = {
  board: [
    {
      name: 'Sebastian McKinlay',
      role: 'Board Chairman',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      profile: '#',
    },
    {
      name: 'Audrey Cheng',
      role: 'Board Member, Co-founder',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      profile: '#',
    },
    {
      name: 'Snehar Shah',
      role: 'Board Member',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      profile: '#',
    },
    {
      name: 'Karen Serem Waithaka',
      role: 'Board Member',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80',
      profile: '#',
    },
  ],
  executive: [
    {
      name: 'James Mwangi',
      role: 'Chief Executive Officer',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
      profile: '#',
    },
    {
      name: 'Amina Hassan',
      role: 'Chief Operating Officer',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
      profile: '#',
    },
    {
      name: 'David Ochieng',
      role: 'Head of Engineering',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      profile: '#',
    },
    {
      name: 'Lydia Kamau',
      role: 'Head of Academics',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      profile: '#',
    },
  ],
}

// ========== FAQ DATA ==========
const allFaqs = [
  {
    question: 'Q: What is STEM Center Africa?',
    answer:
      'STEM Center Africa is a nonprofit organization based at Edenview Academy in Oyugis, Kenya. We offer mathematics, science, technology, and engineering programs to inspire the next generation of innovators.',
  },
  {
    question: 'Q: Who can join your programs?',
    answer:
      'Our programs are open to learners of all ages — from primary school students to young adults. We believe every curious mind deserves access to quality STEM education.',
  },
  {
    question: 'Q: Do you offer remote learning?',
    answer:
      'Yes! We offer both in-person and remote learning options to ensure our programs are accessible to students regardless of their location.',
  },
  {
    question: 'Q: How can I support STEM Center Africa?',
    answer:
      'You can support us by donating, partnering with us as an organization, or volunteering your time and expertise. Visit our Donate page to learn more.',
  },
  {
    question: 'Q: Will students receive a certificate upon completion?',
    answer:
      'Yes. Students who complete our programs receive a certificate of participation recognizing their achievement and the skills they have gained.',
  },
  {
    question: 'Q: How do I enroll my child?',
    answer:
      'You can reach out to us directly through our Contact page or visit Edenview Academy in Oyugis, Kenya. Our team will guide you through the enrollment process.',
  },
  {
    question: 'Q: What age groups do you support?',
    answer:
      'We support learners from primary school through high school and young adults, tailoring our programs to each age group\'s learning needs.',
  },
  {
    question: 'Q: Are your programs free or paid?',
    answer:
      'Some of our community outreach programs are free, while specialized courses and camps may have a fee to cover materials and facilitation. Please contact us for current pricing.',
  },
  {
    question: 'Q: Can parents get involved?',
    answer:
      'Absolutely. Parents can volunteer, attend community events, and help support student learning alongside our team.',
  },
  {
    question: 'Q: What topics do you teach?',
    answer:
      'We teach mathematics, science, coding, robotics, engineering, and technology skills with hands-on activities and real-world problem solving.',
  },
  {
    question: 'Q: Do you offer scholarships?',
    answer:
      'We offer need-based scholarship opportunities for eligible learners. Reach out to our team for application details and availability.',
  },
  {
    question: 'Q: How long is each program?',
    answer:
      'Program lengths vary from short-term workshops to multi-week courses. We share details for each program on the course page.',
  },
  {
    question: 'Q: Can schools partner with you?',
    answer:
      'Yes, we partner with local schools and community groups to bring STEM learning directly into classrooms and extracurricular clubs.',
  },
  {
    question: 'Q: Where are your learning centers located?',
    answer:
      'Our main programs run from Edenview Academy in Oyugis, Kenya, and we also deliver remote and outreach programs to nearby communities.',
  },
]

// ========== MIGRATE BLOGS ==========
async function migrateBangs() {
  console.log('📝 Migrating blogs...')
  try {
    const blogsData = BLOG_POSTS.map((blog) => ({
      slug: blog.slug,
      category: blog.category,
      title: blog.title,
      subtitle: blog.subtitle,
      author: blog.author,
      author_image: blog.authorImage,
      date: blog.date,
      image: blog.image,
      content: blog.content, // Already an array, will be stored as JSONB
    }))

    const { error } = await supabase.from('blogs').insert(blogsData)
    if (error) throw error
    console.log(`✅ Migrated ${blogsData.length} blogs`)
  } catch (error) {
    console.error('❌ Error migrating blogs:', error.message)
  }
}

// ========== MIGRATE EVENTS ==========
async function migrateEvents() {
  console.log('📅 Migrating events...')
  try {
    const eventsData = events.map((event) => ({
      event_id: event.id,
      title: event.title,
      location: event.location,
      start_date: event.startDate,
      end_date: event.endDate,
      time: event.time,
      excerpt: event.excerpt,
      description_blocks: event.descriptionBlocks,
      image_url: event.imageUrl,
      register_url: event.registerUrl,
      requires_registration: event.requiresRegistration,
      qr_codes: event.qrCodes,
    }))

    const { error } = await supabase.from('events').insert(eventsData)
    if (error) throw error
    console.log(`✅ Migrated ${eventsData.length} events`)
  } catch (error) {
    console.error('❌ Error migrating events:', error.message)
  }
}

// ========== MIGRATE FAQS ==========
async function migrateFaqs() {
  console.log('❓ Migrating FAQs...')
  try {
    const faqsData = allFaqs.map((faq, index) => ({
      question: faq.question,
      answer: faq.answer,
      order: index,
    }))

    const { error } = await supabase.from('faqs').insert(faqsData)
    if (error) throw error
    console.log(`✅ Migrated ${faqsData.length} FAQs`)
  } catch (error) {
    console.error('❌ Error migrating FAQs:', error.message)
  }
}

// ========== MIGRATE SERVICES ==========
async function migrateServices() {
  console.log('🛠️  Migrating services...')
  try {
    const servicesData = SERVICES.map((service) => ({
      service_id: service.id,
      slug: service.slug,
      title: service.title,
      icon: null, // icon is an imported image, store as null or store URL
      description: service.description,
      features: service.features,
    }))

    const { error } = await supabase.from('services').insert(servicesData)
    if (error) throw error
    console.log(`✅ Migrated ${servicesData.length} services`)
  } catch (error) {
    console.error('❌ Error migrating services:', error.message)
  }
}

// ========== MIGRATE TEAM MEMBERS ==========
async function migrateTeamMembers() {
  console.log('👥 Migrating team members...')
  try {
    const teamMembersData = []

    // Board members
    teamData.board.forEach((member, index) => {
      teamMembersData.push({
        name: member.name,
        role: member.role,
        category: 'board',
        image: member.image,
        profile: member.profile,
        order: index,
      })
    })

    // Executive members
    teamData.executive.forEach((member, index) => {
      teamMembersData.push({
        name: member.name,
        role: member.role,
        category: 'executive',
        image: member.image,
        profile: member.profile,
        order: index,
      })
    })

    const { error } = await supabase.from('team_members').insert(teamMembersData)
    if (error) throw error
    console.log(`✅ Migrated ${teamMembersData.length} team members`)
  } catch (error) {
    console.error('❌ Error migrating team members:', error.message)
  }
}

// ========== RUN ALL MIGRATIONS ==========
async function runMigrations() {
  console.log('\n🚀 Starting data migration...\n')

  await migrateBangs()
  await migrateEvents()
  await migrateFaqs()
  await migrateServices()
  await migrateTeamMembers()

  console.log('\n✨ Migration complete!\n')
}

runMigrations().catch((error) => {
  console.error('❌ Migration failed:', error)
  process.exit(1)
})
