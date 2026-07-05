import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import '../Styles/Faqsection.css';
import faqBannerImg from '../assets/faqs.jpg';

// ── Split FAQs into pages (adjust page size as needed) ──
const PAGE_SIZE = 7;

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
      'We support learners from primary school through high school and young adults, tailoring our programs to each age group’s learning needs.',
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
];

// Chunk helper — groups flat FAQ array into pages
function chunkArray(arr, size) {
  const pages = [];
  for (let i = 0; i < arr.length; i += size) {
    pages.push(arr.slice(i, i + size));
  }
  return pages;
}

export default function FaqSection({ faqs, bannerImage, bannerTitle }) {
  const [source, setSource] = useState(faqs || allFaqs)
  const [page, setPage] = useState(0)
  const [openIndex, setOpenIndex] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const imgSrc = bannerImage || faqBannerImg
  const heroTitle = bannerTitle || 'FAQs'

  useEffect(() => {
    if (faqs) return

    async function loadFaqs() {
      setLoading(true)
      setError('')

      const { data, error: fetchError } = await supabase
        .from('faqs')
        .select('id, question, answer, order')
        .order('order', { ascending: true })
        .order('created_at', { ascending: true })

      if (fetchError) {
        console.error('Failed to load FAQs:', fetchError)
        setError('Unable to load FAQs right now.')
        setSource(allFaqs)
      } else if (data?.length) {
        setSource(data)
      } else {
        setSource(allFaqs)
      }

      setLoading(false)
    }

    loadFaqs()
  }, [faqs])

  const pages = chunkArray(source, PAGE_SIZE)
  const currentItems = pages[page] ?? []
  const isFirst = page === 0
  const isLast = page === pages.length - 1

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const goOlder = () => {
    if (!isLast) {
      setPage((p) => p + 1);
      setOpenIndex(null);
    }
  };

  const goNewer = () => {
    if (!isFirst) {
      setPage((p) => p - 1);
      setOpenIndex(null);
    }
  };

  return (
    <>
      {/* ── Hero Banner ── */}
      <div className="faq-hero" aria-label="FAQs page banner">
        <img
          className="faq-hero__img"
          src={imgSrc}
          alt="Students collaborating at STEM Center Africa"
        />
        <div className="faq-hero__overlay" aria-hidden="true" />
        <div className="faq-hero__content">
          <h1 className="faq-hero__title">{heroTitle}</h1>
        </div>
      </div>

      {/* ── FAQ Accordion ── */}
      <section className="faq-section" aria-label="Frequently asked questions">
        <div className="container faq-container mt-4 mb-5 py-5">
          <div className="faq-list">
            {loading ? (
              <p className="faq-loading">Loading FAQs…</p>
            ) : error ? (
              <p className="faq-error">{error}</p>
            ) : currentItems.length === 0 ? (
              <p className="faq-empty">No FAQs available right now.</p>
            ) : (
              currentItems.map((item, index) => (
                <div
                  key={item.id ?? index}
                  className={`faq-item${openIndex === index ? ' open' : ''}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggle(index)}
                    aria-expanded={openIndex === index}
                  >
                    <span className="faq-question-text">{item.question}</span>
                    <span className="faq-toggle" aria-hidden="true">+</span>
                  </button>

                  <div className="faq-answer" aria-hidden={openIndex !== index}>
                    <div className="faq-answer-inner">{item.answer}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ── Pagination ── */}
          <div className="faq-pagination">
            {/* Left: Newer posts (hidden on page 0) */}
            <button
              className="faq-page-link"
              onClick={goNewer}
              style={{ visibility: isFirst ? 'hidden' : 'visible' }}
              aria-label="Go to newer posts"
            >
              ← Newer posts
            </button>

            {/* Right: Older posts (hidden on last page) */}
            <button
              className="faq-page-link"
              onClick={goOlder}
              style={{ visibility: isLast ? 'hidden' : 'visible' }}
              aria-label="Go to older posts"
            >
              Older posts →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
