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
import { teamData as TEAM_DATA } from '../src/data/teamData.js'

// ========== STORIES DATA ==========
const STORIES = [
  {
    title: 'Filled Our Biggest Class Yet – 225 Students',
    content:
      'More than 225 students enrolled for the February Software Development class in 2020. We were so excited to begin this journey with them.',
    story_date: '2020-02-03',
    image_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
  },
  {
    title: 'Launched Our Data Science Course',
    content:
      'We launched our very first masterclass on Supervised Learning, then shortly followed that up with a full Data Science Course launch at Metta Nairobi. Both were a huge success.',
    story_date: '2019-09-04',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    title: 'Opened Our Doors to the First Cohort',
    content:
      'We welcomed our very first cohort of students — four passionate learners ready to reshape their futures through technology. A humble but historic beginning.',
    story_date: '2018-03-12',
    image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
  },
  {
    title: 'Launched Cybersecurity & DevOps Programs',
    content:
      'Responding to market demand, we expanded our curriculum with Cybersecurity and DevOps Engineering tracks, empowering even more students to find their niche in tech.',
    story_date: '2021-06-20',
    image_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
  },
]

// ========== AWARDS DATA ==========
const AWARDS = [
  {
    label: 'Moringa listed among the most promising EdTech startups from Sub-Saharan Africa by HolonIQ',
    image_url: '/assets/python.jpg',
  },
  {
    label: 'Higher Education Tech Leader 2021',
    image_url: '/assets/scratch.jpg',
  },
  {
    label: 'Moringa Named as World Technology Pioneers in 2021',
    image_url: '/assets/Robotics.jpg',
  },
  {
    label: 'Most Preferred Corporate Training Institution 2021',
    image_url: '/assets/ARDUINO.jpg',
  },
  {
    label: 'Best Tech Education Provider — East Africa 2022',
    image_url: '/assets/ARDUINO.jpg',
  },
  {
    label: 'Top Cybersecurity Training Institution 2023',
    image_url: '/assets/ARDUINO.jpg',
  },
]

// ========== IMPACT HIGHLIGHTS DATA ==========
const IMPACT_HIGHLIGHTS = [
  {
    title: 'STEM Expo/Challenge 2025',
    description:
      'On December 10, 2025, we hosted a STEM Competition and STEM Fair, during which students showcased their innovation projects and competed in a range of STEM activities. 357 students participated, and 114 parents and guests attended.',
    image_url: '/assets/iOS%20app%20development.jpg',
  },
  {
    title: 'Robotics & Embedded Systems',
    description:
      'Build intelligent robots and embedded systems with hands-on projects using microcontrollers, sensors, and motor control.',
    image_url: '/assets/Robotics.jpg',
  },
  {
    title: 'Arduino & IoT Development',
    description:
      'Learn to build interactive electronic projects with Arduino and explore the world of Internet of Things (IoT).',
    image_url: '/assets/ARDUINO.jpg',
  },
  {
    title: 'Introduction to Basic Computer Skills',
    description:
      'Build confidence with everyday software: master Word, Excel, PowerPoint, email, and basic digital navigation for school, office, and career success',
    image_url: '/assets/computers.jpg',
  },
  {
    title: 'Python Programming Bootcamp',
    description:
      'A practical Python bootcamp for beginners: write clean code, automate workflows, and build real-world projects using Python\'s most popular tools and frameworks.',
    image_url: '/assets/python.jpg',
  },
  {
    title: 'Scratch Programming for Kids',
    description:
      'Introduce young learners to programming concepts through fun, interactive projects. Develop problem-solving skills and creativity while building their own games and animations.',
    image_url: '/assets/scratch.jpg',
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
      content: blog.content,
    }))

    const { error } = await supabase.from('blogs').upsert(blogsData, { onConflict: 'slug' })
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

    const { error } = await supabase.from('events').upsert(eventsData, { onConflict: 'event_id' })
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

    const faqsData = allFaqs.map((faq, index) => ({
      question: faq.question,
      answer: faq.answer,
      order: index,
    }))

    const { data: existingFaqs, error: fetchError } = await supabase
      .from('faqs')
      .select('question, answer, order')

    if (fetchError) throw fetchError

    const existingSet = new Set(
      existingFaqs.map((faq) => `${faq.question}||${faq.answer}||${faq.order}`)
    )

    const newFaqs = faqsData.filter(
      (faq) => !existingSet.has(`${faq.question}||${faq.answer}||${faq.order}`)
    )

    if (newFaqs.length === 0) {
      console.log('✅ No new FAQs to migrate')
      return
    }

    const { error } = await supabase.from('faqs').insert(newFaqs)
    if (error) throw error
    console.log(`✅ Migrated ${newFaqs.length} new FAQs`)
  } catch (error) {
    console.error('❌ Error migrating FAQs:', error.message)
  }
}

// ========== MIGRATE AWARDS ==========
async function migrateAwards() {
  console.log('🏆 Migrating awards...')
  try {
    const awardsData = AWARDS.map((award) => ({
      title: award.label,
      image_path: award.image_url,
    }))

    const { data: existingAwards, error: fetchError } = await supabase
      .from('awards')
      .select('id, title')

    if (fetchError) throw fetchError

    const titleMap = new Map()
    const duplicateIds = []

    existingAwards.forEach((item) => {
      if (titleMap.has(item.title)) {
        duplicateIds.push(item.id)
      } else {
        titleMap.set(item.title, item.id)
      }
    })

    if (duplicateIds.length > 0) {
      const { error: deleteError } = await supabase
        .from('awards')
        .delete()
        .in('id', duplicateIds)

      if (deleteError) throw deleteError
      console.log(`🧹 Removed ${duplicateIds.length} duplicate awards`)
    }

    const upsertData = awardsData.map((item) => {
      const id = titleMap.get(item.title)
      return id ? { id, ...item } : item
    })

    const { error } = await supabase
      .from('awards')
      .upsert(upsertData, { onConflict: 'id' })

    if (error) throw error
    console.log(`✅ Migrated ${upsertData.length} awards`)
  } catch (error) {
    console.error('❌ Error migrating awards:', error.message)
    if (error.message.includes('permission denied')) {
      console.error('🔧 Supabase needs service_role privileges on public.awards or the table Data API must be enabled.')
    }
  }
}

// ========== MIGRATE IMPACT HIGHLIGHTS ==========
async function migrateImpactHighlights() {
  console.log('🌟 Migrating impact highlights...')
  try {
    const impactData = IMPACT_HIGHLIGHTS.map((item) => ({
      title: item.title,
      content: item.description,
      image_path: item.image_url,
    }))

    const { data: existingHighlights, error: fetchError } = await supabase
      .from('impact_highlights')
      .select('id, title')

    if (fetchError) throw fetchError

    const titleMap = new Map()
    const duplicateIds = []

    existingHighlights.forEach((item) => {
      if (titleMap.has(item.title)) {
        duplicateIds.push(item.id)
      } else {
        titleMap.set(item.title, item.id)
      }
    })

    if (duplicateIds.length > 0) {
      const { error: deleteError } = await supabase
        .from('impact_highlights')
        .delete()
        .in('id', duplicateIds)

      if (deleteError) throw deleteError
      console.log(`🧹 Removed ${duplicateIds.length} duplicate impact highlights`)
    }

    const upsertData = impactData.map((item) => {
      const id = titleMap.get(item.title)
      return id ? { id, ...item } : item
    })

    if (upsertData.length === 0) {
      console.log('✅ No impact highlights to migrate')
      return
    }

    const { error } = await supabase
      .from('impact_highlights')
      .upsert(upsertData, { onConflict: 'id' })

    if (error) throw error
    console.log(`✅ Migrated ${upsertData.length} impact highlights`)
  } catch (error) {
    console.error('❌ Error migrating impact highlights:', error.message)
    if (error.message.includes('permission denied')) {
      console.error('🔧 Supabase needs service_role privileges on public.impact_highlights or the table Data API must be enabled.')
    }
  }
}

// ========== MIGRATE TEAM MEMBERS ==========
async function migrateTeamMembers() {
  console.log('👥 Migrating team members...')
  try {
    const teamMembersData = []

    TEAM_DATA.board.forEach((member, index) => {
      teamMembersData.push({
        name: member.name,
        role: member.role,
        slug: member.slug || '',
        category: 'board',
        image: member.image,
        profile: Array.isArray(member.bio) ? member.bio.join('\n\n') : member.profile || '',
        order: index,
      })
    })

    TEAM_DATA.executive.forEach((member, index) => {
      teamMembersData.push({
        name: member.name,
        role: member.role,
        slug: member.slug || '',
        category: 'executive',
        image: member.image,
        profile: Array.isArray(member.bio) ? member.bio.join('\n\n') : member.profile || '',
        order: index,
      })
    })

    const { data: existingMembers, error: fetchError } = await supabase
      .from('team_members')
      .select('id, name, role, category')

    if (fetchError) throw fetchError

    const existingMap = new Map(
      existingMembers.map((member) => [
        `${member.name}||${member.role}||${member.category}`,
        member.id,
      ])
    )

    const updateTeamMembers = []
    const newTeamMembers = []

    teamMembersData.forEach((member) => {
      const key = `${member.name}||${member.role}||${member.category}`
      const existingId = existingMap.get(key)
      if (existingId) {
        updateTeamMembers.push({ id: existingId, ...member })
      } else {
        newTeamMembers.push(member)
      }
    })

    if (updateTeamMembers.length > 0) {
      for (const member of updateTeamMembers) {
        const { id, ...payload } = member
        const { error: updateError } = await supabase
          .from('team_members')
          .update(payload)
          .eq('id', id)
        if (updateError) throw updateError
      }
      console.log(`✅ Updated ${updateTeamMembers.length} existing team members`)
    }

    if (newTeamMembers.length === 0) {
      console.log('✅ No new team members to migrate')
      return
    }

    const { error } = await supabase.from('team_members').insert(newTeamMembers)
    if (error) throw error
    console.log(`✅ Migrated ${newTeamMembers.length} new team members`)
  } catch (error) {
    console.error('❌ Error migrating team members:', error.message)
  }
}

// ========== MIGRATE STORIES ==========
async function migrateStories() {
  console.log('📖 Migrating stories...')
  try {
    const { data: existing, error: fetchError } = await supabase
      .from('stories')
      .select('title')

    if (fetchError) throw fetchError

    const existingTitles = new Set(existing.map((s) => s.title))
    const newStories = STORIES.filter((s) => !existingTitles.has(s.title))

    if (newStories.length === 0) {
      console.log('✅ No new stories to migrate')
      return
    }

    const { error } = await supabase.from('stories').insert(newStories)
    if (error) throw error
    console.log(`✅ Migrated ${newStories.length} stories`)
  } catch (error) {
    console.error('❌ Error migrating stories:', error.message)
  }
}

// ========== RUN ALL MIGRATIONS ==========
async function runMigrations() {
  console.log('\n🚀 Starting data migration...\n')

  await migrateBangs()
  await migrateEvents()
  await migrateFaqs()
  await migrateAwards()
  await migrateImpactHighlights()
  await migrateTeamMembers()
  await migrateStories()

  console.log('\n✨ Migration complete!\n')
}

runMigrations().catch((error) => {
  console.error('❌ Migration failed:', error)
  process.exit(1)
})
