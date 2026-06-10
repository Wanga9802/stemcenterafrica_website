import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/Aboutus'
import Courses from './pages/Courses'
import Services from './pages/Corporate'
import ServiceDetail from './pages/ServiceDetail'
import ServiceForm from './pages/ServiceForm'
import Community from './pages/Community'
import Blog from './pages/Blog'
import BlogPostPage from './Components/Blog/BlogPostPage'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Faqs from './pages/Faqs'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import WhatsAppWidget from './Components/WhatsAppWidget'
import waIcon from './assets/whatsapp.png'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses/*" element={<Courses />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceId" element={<ServiceDetail />} />
        <Route path="/service-request" element={<ServiceForm />} />
        <Route path="/corporate" element={<Services />} />
        <Route path="/community" element={<Community />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetail />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <WhatsAppWidget phone="+254759924543" message="Hi — I saw your site and have a question." iconSrc={waIcon} />
    </>
  )
}

export default App
