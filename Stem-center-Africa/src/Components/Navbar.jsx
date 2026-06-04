import '../Styles/Navbar.css'
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import Logopicc from '../assets/stem_africa.jpg';

// ── Courses mega-menu data ──────────────────────────────────────────
const COURSES = [
  {
    id: 'software-engineering',
    label: 'Software Engineering',
    title: 'Software Engineering',
    description: 'Build real-world software products from scratch. Beginner to advanced level training available.',
    offerings: [
      { name: 'Intro to Software Engineering', meta: 'Full-time Remote, Part-time Remote', to: '/courses/software-engineering/intro' },
      { name: 'Full-Stack Bootcamp', meta: 'Full-time Remote, Part-time Remote', to: '/courses/software-engineering/fullstack' },
    ],
  },
  {
    id: 'data-courses',
    label: 'Data Courses',
    title: 'Data Courses',
    description: 'Master data analysis, visualisation, and engineering with hands-on projects and expert mentors.',
    offerings: [
      { name: 'Data Analysis Fundamentals', meta: 'Full-time Remote, Part-time Remote', to: '/courses/data/analysis' },
      { name: 'Data Engineering Bootcamp', meta: 'Full-time Remote, Part-time Remote', to: '/courses/data/engineering' },
    ],
  },
  {
    id: 'cyber-security',
    label: 'Cyber Security',
    title: 'Cyber Security',
    description: 'Your journey to becoming a cybersecurity expert starts here, beginner to advance level training available.',
    offerings: [
      { name: 'Introduction to Cybersecurity', meta: 'Full-time Remote, Part-time Remote', to: '/courses/cyber/intro' },
      { name: 'Cybersecurity Bootcamp', meta: 'Full-time Remote, Part-time Remote', to: '/courses/cyber/bootcamp' },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    title: 'Artificial Intelligence',
    description: 'Explore machine learning, deep learning, and AI applications through practical, project-based learning.',
    offerings: [
      { name: 'AI Foundations', meta: 'Full-time Remote, Part-time Remote', to: '/courses/ai/foundations' },
      { name: 'Machine Learning Bootcamp', meta: 'Full-time Remote, Part-time Remote', to: '/courses/ai/ml-bootcamp' },
    ],
  },
  {
    id: 'dpo',
    label: 'DPO',
    title: 'Data Protection Officer',
    description: 'Become a certified Data Protection Officer and lead privacy compliance in your organisation.',
    offerings: [
      { name: 'DPO Certification Programme', meta: 'Full-time Remote, Part-time Remote', to: '/courses/dpo/certification' },
    ],
  },
];

function Navbar() {
  const [scrolled, setScrolled]               = useState(false);
  const [searchOpen, setSearchOpen]           = useState(false);
  const [searchQuery, setSearchQuery]         = useState('');
  const [activeDropdown, setActiveDropdown]   = useState(null); // 'about' | 'community' | 'courses' | null
  const [activeCourse, setActiveCourse]       = useState(COURSES[0].id);

  // Mobile accordion state
  const [mobileExpanded, setMobileExpanded]   = useState(null); // 'about' | 'community' | null
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);

  const searchInputRef  = useRef(null);
  const aboutLinkRef    = useRef(null);
  const communityLinkRef = useRef(null);
  const searchWrapperRef = useRef(null);
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
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setActiveDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const updateDropdownBounds = () => {
      if (!navRef.current || !aboutLinkRef.current || !communityLinkRef.current || !searchWrapperRef.current) return;
      const navRect = navRef.current.getBoundingClientRect();
      const aboutRect = aboutLinkRef.current.getBoundingClientRect();
      const communityRect = communityLinkRef.current.getBoundingClientRect();
      const searchRect = searchWrapperRef.current.getBoundingClientRect();
      setDropdownBounds({
        aboutLeft: aboutRect.left - navRect.left,
        aboutRight: Math.max(16, navRect.right - searchRect.left + 12),
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery(''); }
  };

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

          {/* Mobile right controls: search + toggler */}
          <div className="mobile-controls d-lg-none">
            {/* Mobile inline search */}
            <div className={`mobile-header-search${searchOpen ? ' open' : ''}`}>
              <form onSubmit={handleSearchSubmit} className="mobile-header-search-form">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="mobile-header-search-input"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                />
              </form>
              <button
                className="mobile-search-icon-btn"
                onClick={() => {
                  if (searchOpen && searchQuery.trim()) handleSearchSubmit({ preventDefault: () => {} });
                  else setSearchOpen(!searchOpen);
                }}
                aria-label="Search"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Hamburger — no background */}
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

              {/* Courses */}
              <li
                className="nav-item"
                onMouseEnter={() => openDropdown('courses')}
                onMouseLeave={closeDropdownDelayed}
              >
                <NavLink
                  className={({ isActive }) => `nav-link dropdown-trigger${isActive ? ' active' : ''}${activeDropdown === 'courses' ? ' open' : ''}`}
                  to="/courses"
                >
                  Courses
                </NavLink>
              </li>

              {/* About */}
              <li
                className="nav-item"
                onMouseEnter={() => openDropdown('about')}
                onMouseLeave={closeDropdownDelayed}
              >
                <NavLink
                  ref={aboutLinkRef}
                  className={({ isActive }) => `nav-link dropdown-trigger${isActive ? ' active' : ''}${activeDropdown === 'about' ? ' open' : ''}`}
                  to="/about"
                >
                  About
                </NavLink>
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
                <NavLink
                  ref={communityLinkRef}
                  className={({ isActive }) => `nav-link dropdown-trigger${isActive ? ' active' : ''}${activeDropdown === 'community' ? ' open' : ''}`}
                  to="/community"
                >
                  Community
                </NavLink>
              </li>

              {/* Search */}
              <li className="nav-item ms-lg-1">
                <div ref={searchWrapperRef} className={`search-wrapper${searchOpen ? ' open' : ''}`}>
                  <form onSubmit={handleSearchSubmit} className="search-form">
                    <input
                      ref={searchInputRef}
                      type="text"
                      className="search-input"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                    />
                  </form>
                  <button
                    className="search-btn"
                    onClick={() => {
                      if (searchOpen && searchQuery.trim()) handleSearchSubmit({ preventDefault: () => {} });
                      else setSearchOpen(!searchOpen);
                    }}
                    aria-label="Search"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.8"/>
                      <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
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

            {/* Courses */}
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link offcanvas-link offcanvas-link-button${mobileCoursesOpen ? ' active' : ''}`}
                onClick={openMobileCourses}
              >
                Courses
              </button>
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
                <NavLink className={({ isActive }) => `nav-link offcanvas-link offcanvas-sub-link${isActive ? ' active' : ''}`} to="/faqs" onClick={closeMobileMenu}>FAQs</NavLink>
              </div>
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

          </ul>
        </div>
      </div>
      <div className={`mobile-menu-backdrop${mobileMenuOpen ? ' show' : ''}`} onClick={closeMobileMenu} />

      {mobileCoursesOpen && (
        <div
          className="mobile-courses-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Courses menu"
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
