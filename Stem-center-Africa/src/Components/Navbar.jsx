import '../Styles/Navbar.css'
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import Logopicc from '../assets/stem_africa.jpg';

const COURSES = [
  {
    id: 'computing-software',
    label: 'Computing & Software',
    title: 'Computing & Software Development',
    description: 'From foundational computer skills to full web development, build the technical fluency to create in the digital world.',
    offerings: [
      { name: 'Computer Basics', meta: 'Ages 8+, All Levels', to: '/programs/computer-basics' },
      { name: 'Web Development', meta: 'Beginner to Advanced', to: '/programs/web-development' },
      { name: 'Python Programming', meta: 'Beginner to Advanced', to: '/programs/python-programming' },
      { name: 'Scratch', meta: 'Ages 8-14, Beginner', to: '/programs/scratch' },
    ],
  },
  {
    id: 'robotics-embedded',
    label: 'Robotics & Embedded Systems',
    title: 'Robotics & Embedded Systems',
    description: 'Design, build, and program intelligent machines through hands-on work with circuits, microcontrollers, and flight systems.',
    offerings: [
      { name: 'Robotics', meta: 'Beginner to Advanced', to: '/programs/robotics' },
      { name: 'Arduino', meta: 'Beginner to Intermediate', to: '/programs/arduino' },
      { name: 'Electricity & Electronics', meta: 'Beginner to Advanced', to: '/programs/electronics' },
      { name: 'Drone Technology', meta: 'Intermediate to Advanced', to: '/programs/drone-technology' },
    ],
  },
  {
    id: 'design-fabrication',
    label: 'Design & Fabrication',
    title: 'Design & Fabrication',
    description: 'Turn ideas into physical objects through 3D modelling, printing, and hands-on maker projects.',
    offerings: [
      { name: '3D Designing', meta: 'Beginner to Advanced', to: '/programs/3d-designing' },
      { name: 'DIY', meta: 'All Levels', to: '/programs/diy' },
    ],
  },
  {
    id: 'data-ai',
    label: 'Data, AI & Emerging Tech',
    title: 'Data, AI & Emerging Tech',
    description: 'Explore the technologies shaping the future, from data analysis to artificial intelligence and machine learning.',
    offerings: [
      { name: 'Artificial Intelligence', meta: 'Intermediate to Advanced', to: '/programs/ai' },
      { name: 'Data Science', meta: 'Intermediate to Advanced', to: '/programs/data-science' },
    ],
  },
  {
    id: 'science-exploration',
    label: 'Science & Exploration',
    title: 'Science & Exploration',
    description: 'Strengthen critical thinking and scientific curiosity through mathematics, experiments, and exploring space science.',
    offerings: [
      { name: 'Science Experiments', meta: 'All Ages, Hands-on', to: '/programs/science-experiments' },
      { name: 'Space Science', meta: 'Intermediate, All Ages', to: '/programs/space-science' },
      { name: 'Mathematics', meta: 'All Levels', to: '/programs/mathematics' },
    ],
  },
  {
    id: 'creativity-life-skills',
    label: 'Creativity & Life Skills',
    title: 'Creativity & Life Skills',
    description: 'Build the communication, creative-thinking, and mentorship skills that complement technical learning and prepare students and educators alike for real-world impact.',
    offerings: [
      { name: 'Creativity & Communication', meta: 'All Ages, All Levels', to: '/programs/creativity-and-communication' },
    ],
  },
];

function Navbar() {
  const [scrolled, setScrolled]               = useState(false);
  const [activeDropdown, setActiveDropdown]   = useState(null); // 'about' | 'community' | 'courses' | null
  const [activeCourse, setActiveCourse]       = useState(COURSES[0].id);

  // Mobile accordion state
  const [mobileExpanded, setMobileExpanded]   = useState(null); // 'about' | 'community' | null
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);

  const aboutLinkRef    = useRef(null);
  const communityLinkRef = useRef(null);
  const programsLinkRef = useRef(null);
  const navRef          = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const navigate        = useNavigate();
  const location        = useLocation();
  const [dropdownBounds, setDropdownBounds] = useState({ aboutLeft: 0, aboutRight: 0, communityLeft: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setActiveDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Listen for program-open requests from other components (e.g., homepage "Explore All Programs")
  useEffect(() => {
    const openProgramsHandler = (e) => {
      const mobile = e?.detail?.mobile;
      const id = e?.detail?.id;
      if (mobile) {
        // open mobile menu and show programs
        setMobileMenuOpen(true);
        setMobileCoursesOpen(true);
        if (id) setActiveCourse(id);
      } else {
        if (id) {
          setActiveCourse(id);
          // navigate to the course slug so URL reflects selection
          try { navigate(`/courses/${id}`); } catch (err) { /* ignore */ }
        }
        openDropdown('courses');
      }
    };

    window.addEventListener('openProgramsDropdown', openProgramsHandler);
    return () => window.removeEventListener('openProgramsDropdown', openProgramsHandler);
  }, []);

  useEffect(() => {
    const updateDropdownBounds = () => {
      if (!navRef.current || !aboutLinkRef.current || !communityLinkRef.current || !programsLinkRef.current) return;
      const navRect = navRef.current.getBoundingClientRect();
      const aboutRect = aboutLinkRef.current.getBoundingClientRect();
      const communityRect = communityLinkRef.current.getBoundingClientRect();
      const programsRect = programsLinkRef.current.getBoundingClientRect();
      setDropdownBounds({
        aboutLeft: aboutRect.left - navRect.left,
        aboutRight: navRect.right - programsRect.right,
        communityLeft: communityRect.left - navRect.left,
      });
    };

    updateDropdownBounds();
    window.addEventListener('resize', updateDropdownBounds);
    return () => window.removeEventListener('resize', updateDropdownBounds);
  }, []);

  const openDropdown = (name) => {
    if (hoverTimeoutRef.current) { clearTimeout(hoverTimeoutRef.current); hoverTimeoutRef.current = null; }
    setActiveDropdown(name);
  };

  const closeDropdownDelayed = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => { setActiveDropdown(null); hoverTimeoutRef.current = null; }, 180);
  };

  useEffect(() => {
    return () => { if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current); };
  }, []);

  const isCoursesActive = location.pathname.startsWith('/courses');
  const isAboutActive = ['/about', '/faqs', '/impact-highlights'].includes(location.pathname);

  const toggleMobileSection = (section) => {
    setMobileExpanded(prev => prev === section ? null : section);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => {
      const next = !prev;
      if (!next) setMobileCoursesOpen(false);
      return next;
    });
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileExpanded(null);
    setMobileCoursesOpen(false);
  }, [location]);

  const closeMobileMenu = () => {
    setMobileExpanded(null);
    setMobileCoursesOpen(false);
    setMobileMenuOpen(false);
  };

  const openMobileCourses = () => {
    setActiveDropdown(null);
    setMobileExpanded(null);
    setMobileCoursesOpen(true);
  };

  const currentCourse = COURSES.find(c => c.id === activeCourse) || COURSES[0];

  return (
    <>
      <nav ref={navRef} className={`navbar navbar-expand-lg sticky-top${scrolled ? ' scrolled' : ''}`}>
        <div className="container position-relative">

          {/* Brand */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <div className="brand-logo-wrapper">
              <img src={Logopicc} alt="STEMCENTER-LOGO" />
            </div>
            <span className="brand-name ms-2">STEM Center Africa</span>
          </Link>

          {/* Mobile right controls: hamburger only */}
          <div className="mobile-controls d-lg-none">
            <button
              className="navbar-toggler-clean"
              type="button"
              onClick={toggleMobileMenu}
              aria-controls="mobileMenu"
              aria-label="Toggle navigation"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="#101F3C" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Desktop links */}
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">

              {/* Home */}
              <li className="nav-item">
                <NavLink end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/">Home</NavLink>
              </li>

             {/* About */}
              <li
                className="nav-item"
                onMouseEnter={() => openDropdown('about')}
                onMouseLeave={closeDropdownDelayed}
              >
                <button
                  ref={aboutLinkRef}
                  type="button"
                  className={`nav-link dropdown-trigger${isAboutActive ? ' active' : ''}${activeDropdown === 'about' ? ' open' : ''}`}
                  onClick={() => openDropdown('about')}
                >
                  About
                </button>
              </li>

              {/* programs*/}

              <li
                className="nav-item"
                onMouseEnter={() => openDropdown('courses')}
                onMouseLeave={closeDropdownDelayed}
              >
                <NavLink
                  ref={programsLinkRef}
                  to="/programs"
                  className={({ isActive }) => `nav-link dropdown-trigger${isActive ? ' active' : ''}${activeDropdown === 'courses' ? ' open' : ''}`}
                  onClick={() => openDropdown('courses')}
                >
                  Programs
                </NavLink>
              </li>

              {/* WoStem */}
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/wostem">Girls inSTEM</NavLink>
              </li>

              {/* STEM Educators */}
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/educators">STEM Educators</NavLink>
              </li>

              {/* Innovation Hub */}
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/innovationhub">Innovation Hub</NavLink>
              </li>

              {/* Services */}
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/services">Services</NavLink>
              </li>

              {/* Community */}
              <li
                className="nav-item"
                onMouseEnter={() => openDropdown('community')}
                onMouseLeave={closeDropdownDelayed}
              >
                <button
                  ref={communityLinkRef}
                  type="button"
                  className={`nav-link dropdown-trigger${activeDropdown === 'community' ? ' open' : ''}`}
                  onClick={() => openDropdown('community')}
                >
                  Community
                </button>
              </li>

              {/* Donate CTA */}
              <li className="nav-item ms-lg-2">
                <NavLink className="donate-cta-btn" to="/donate">
                  Donate
                </NavLink>
              </li>

            </ul>
          </div>
        </div>

        {/* ── Courses mega panel ── */}
        <div
          className={`mega-dropdown-fullwidth courses-mega${activeDropdown === 'courses' ? ' visible' : ''}`}
          onMouseEnter={() => openDropdown('courses')}
          onMouseLeave={closeDropdownDelayed}
        >
          <div className="container">
            <div className="courses-mega-grid">

              <div className="courses-col-nav">
                {COURSES.map(course => (
                  <button
                    key={course.id}
                    className={`course-nav-item${activeCourse === course.id ? ' active' : ''}`}
                    onMouseEnter={() => setActiveCourse(course.id)}
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    {course.label}
                  </button>
                ))}
              </div>

              <div className="courses-col-divider" />

              <div className="courses-col-info">
                <h3 className="courses-info-title">{currentCourse.title}</h3>
                <p className="courses-info-desc">{currentCourse.description}</p>
              </div>

              <div className="courses-col-divider" />

              <div className="courses-col-offerings">
                <p className="courses-offerings-heading">Course Offerings</p>
                {currentCourse.offerings.map((o, i) => (
                  <div key={i} className="courses-offering-item">
                    <Link to={o.to} className="courses-offering-name">{o.name}</Link>
                    <span className="courses-offering-meta">{o.meta}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* ── About mega panel ── */}
        <div
          className={`mega-dropdown-fullwidth mega-dropdown-about${activeDropdown === 'about' ? ' visible' : ''}`}
          onMouseEnter={() => openDropdown('about')}
          onMouseLeave={closeDropdownDelayed}
          style={{ left: dropdownBounds.aboutLeft, right: dropdownBounds.aboutRight }}
        >
          <div className="container">
              <div className="mega-links-row">
              <NavLink className="mega-link" to="/about">About Us</NavLink>
              <NavLink className="mega-link" to="/impact-highlights">Impact highlights</NavLink>
              <NavLink className="mega-link" to="/team">Team</NavLink>
              <NavLink className="mega-link" to="/faqs">FAQs</NavLink>
            </div>
          </div>
        </div>

        {/* ── Community mega panel ── */}
        <div
          className={`mega-dropdown-fullwidth mega-dropdown-community${activeDropdown === 'community' ? ' visible' : ''}`}
          onMouseEnter={() => openDropdown('community')}
          onMouseLeave={closeDropdownDelayed}
          style={{ left: dropdownBounds.communityLeft, right: 0 }}
        >
          <div className="container">
            <div className="mega-links-row">
              <NavLink className="mega-link" to="/blog">Blog</NavLink>
              <NavLink className="mega-link" to="/events">Events</NavLink>
            </div>
          </div>
        </div>

      </nav>

      {/* ── Offcanvas Mobile Menu ── */}
      <div className={`mobile-drawer${mobileMenuOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="mobileMenuLabel">
        <div className="offcanvas-header">
          <div className="d-flex align-items-center gap-2">
            <div className="brand-logo-wrapper">
              <img src={Logopicc} alt="STEMCENTER-LOGO" />
            </div>
            <span className="brand-name offcanvas-brand-name">STEM Africa</span>
          </div>
          <button type="button" className="offcanvas-close-btn" onClick={closeMobileMenu} aria-label="Close">✕</button>
        </div>

        <div className="offcanvas-body">

          <ul className="navbar-nav d-flex flex-column gap-1">

            {/* Home */}
            <li className="nav-item">
              <NavLink end className={({ isActive }) => `nav-link offcanvas-link${isActive ? ' active' : ''}`} to="/" onClick={closeMobileMenu}>Home</NavLink>
            </li>

            {/* About accordion */}
            <li className="nav-item">
              <button
                className={`offcanvas-accordion-trigger${mobileExpanded === 'about' ? ' expanded' : ''}`}
                onClick={() => toggleMobileSection('about')}
              >
                About
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className={`accordion-chevron${mobileExpanded === 'about' ? ' rotated' : ''}`}>
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
                <div className={`offcanvas-accordion-body${mobileExpanded === 'about' ? ' open' : ''}`}>
                <NavLink className={({ isActive }) => `nav-link offcanvas-link offcanvas-sub-link${isActive ? ' active' : ''}`} to="/about" onClick={closeMobileMenu}>About Us</NavLink>
                <NavLink className={({ isActive }) => `nav-link offcanvas-link offcanvas-sub-link${isActive ? ' active' : ''}`} to="/impact-highlights" onClick={closeMobileMenu}>Impact highlights</NavLink>
                <NavLink className={({ isActive }) => `nav-link offcanvas-link offcanvas-sub-link${isActive ? ' active' : ''}`} to="/team" onClick={closeMobileMenu}>Team</NavLink>
                <NavLink className={({ isActive }) => `nav-link offcanvas-link offcanvas-sub-link${isActive ? ' active' : ''}`} to="/faqs" onClick={closeMobileMenu}>FAQs</NavLink>
              </div>
            </li>

            {/* Courses */}
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link offcanvas-link offcanvas-link-button${mobileCoursesOpen ? ' active' : ''}`}
                onClick={openMobileCourses}
              >
                Programs
              </button>
            </li>

            {/* WoSTEM */}
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link offcanvas-link${isActive ? ' active' : ''}`} to="/wostem" onClick={closeMobileMenu}>GirlsinSTEM</NavLink>
            </li>

            {/* STEM Educators */}
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link offcanvas-link${isActive ? ' active' : ''}`} to="/educators" onClick={closeMobileMenu}>STEM Educators</NavLink>
            </li>

            {/* Innovation Hub */}
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link offcanvas-link${isActive ? ' active' : ''}`} to="/innovationhub" onClick={closeMobileMenu}>Innovation Hub</NavLink>
            </li>

            {/* Services */}
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link offcanvas-link${isActive ? ' active' : ''}`} to="/services" onClick={closeMobileMenu}>Services</NavLink>
            </li>

            {/* Community accordion */}
            <li className="nav-item">
              <button
                className={`offcanvas-accordion-trigger${mobileExpanded === 'community' ? ' expanded' : ''}`}
                onClick={() => toggleMobileSection('community')}
              >
                Community
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className={`accordion-chevron${mobileExpanded === 'community' ? ' rotated' : ''}`}>
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`offcanvas-accordion-body${mobileExpanded === 'community' ? ' open' : ''}`}>
                <NavLink className={({ isActive }) => `nav-link offcanvas-link offcanvas-sub-link${isActive ? ' active' : ''}`} to="/blog" onClick={closeMobileMenu}>Blog</NavLink>
                <NavLink className={({ isActive }) => `nav-link offcanvas-link offcanvas-sub-link${isActive ? ' active' : ''}`} to="/events" onClick={closeMobileMenu}>Events</NavLink>
              </div>
            </li>

            {/* Donate CTA (mobile) */}
            <li className="nav-item mt-2">
              <NavLink
                className="donate-cta-btn donate-cta-btn-mobile"
                to="/donate"
                onClick={closeMobileMenu}
              >
                Donate Now
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
      <div className={`mobile-menu-backdrop${mobileMenuOpen ? ' show' : ''}`} onClick={closeMobileMenu} />

      {mobileCoursesOpen && (
        <div
          className="mobile-courses-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Programs menu"
          onClick={() => setMobileCoursesOpen(false)}
        >
          <div className="mobile-courses-card" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-courses-grid">
              <div className="mobile-courses-sidebar">
                {COURSES.map(course => (
                  <button
                    key={course.id}
                    type="button"
                    className={`mobile-courses-sidebar-item${activeCourse === course.id ? ' active' : ''}`}
                    onClick={() => setActiveCourse(course.id)}
                  >
                    {course.label}
                  </button>
                ))}
              </div>

              <div className="mobile-courses-details">
                <h4>{currentCourse.title}</h4>
                <p>{currentCourse.description}</p>

                <div className="mobile-courses-offerings-header">Course Offerings</div>
                <div className="mobile-courses-offering-list">
                  {currentCourse.offerings.map((offering, index) => (
                    <div key={index} className="mobile-courses-offering-item">
                      <Link
                        to={offering.to}
                        className="mobile-courses-offering-link"
                        onClick={closeMobileMenu}
                      >
                        {offering.name}
                      </Link>
                      <span className="mobile-courses-offering-meta">{offering.meta}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
