import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/Aboutus'
import Courses from './pages/Courses'
import Services from './pages/Corporate'
import ServiceDetail from './pages/ServiceDetail'
import ServiceForm from './pages/ServiceForm'
import Blog from './pages/Blog'
import BlogPostPage from './Components/Blog/BlogPostPage'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Faqs from './pages/Faqs'
import TeamProfile from './pages/TeamProfile'
import InnovationHubPage from './pages/innovationhub'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import WhatsAppWidget from './Components/WhatsAppWidget'
import ProtectedAdminRoute from './admin/components/ProtectedAdminRoute'
import AdminLayout from './admin/layouts/AdminLayout'
import AdminLogin from './admin/pages/AdminLogin'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminBlog from './admin/pages/AdminBlog'
import AdminBlogForm from './admin/pages/Blogform'
import AdminEvents from './admin/pages/AdminEvents'
import AdminEventForm from './admin/pages/AdminEventform'
import AdminStories from './admin/pages/AdminStories'
import AdminStoriesForm from './admin/pages/AdminStoriesForm'
import AdminTeam from './admin/pages/Adminteam'
import AdminTeamForm from './admin/pages/Adminteamform'
import AdminFaq from './admin/pages/AdminFaq'
import AdminFaqForm from './admin/pages/AdminFaqForm'
import AdminAwards from './admin/pages/AdminAwards'
import AdminAwardsForm from './admin/pages/AdminAwardsForm'
import AdminImpactHighlights from './admin/pages/AdminImpactHighlights'
import AdminImpactHighlightsForm from './admin/pages/AdminImpactHighlightsForm'
import AdminSettings from './admin/pages/settings/SettingsPage'
import AdminCommunity from './admin/pages/Admincommunity'
import ResetPassword from './admin/pages/Resetpassword'
import waIcon from './assets/whatsapp.png'
import './App.css'

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses/*" element={<Courses />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceId" element={<ServiceDetail />} />
        <Route path="/service-request" element={<ServiceForm />} />
        <Route path="/innovationhub" element={<InnovationHubPage />} />
        <Route path="/corporate" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetail />} />
        <Route path="/team/:slug" element={<TeamProfile />} />
        <Route path="/faqs" element={<Faqs />} />

        <Route path="/Admin" element={<Navigate to="/admin" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />
        <Route path="/admin/*" element={<ProtectedAdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="blogs" element={<AdminBlog />} />
            <Route path="blogs/new" element={<AdminBlogForm />} />
            <Route path="blogs/:id/edit" element={<AdminBlogForm />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="events/new" element={<AdminEventForm />} />
            <Route path="events/:id/edit" element={<AdminEventForm />} />
            <Route path="stories" element={<AdminStories />} />
            <Route path="stories/new" element={<AdminStoriesForm />} />
            <Route path="stories/:id/edit" element={<AdminStoriesForm />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="team/new" element={<AdminTeamForm />} />
            <Route path="team/:id/edit" element={<AdminTeamForm />} />
            <Route path="faqs" element={<AdminFaq />} />
            <Route path="faqs/new" element={<AdminFaqForm />} />
            <Route path="faqs/:id/edit" element={<AdminFaqForm />} />
            <Route path="awards" element={<AdminAwards />} />
            <Route path="awards/new" element={<AdminAwardsForm />} />
            <Route path="awards/:id/edit" element={<AdminAwardsForm />} />
            <Route path="impact" element={<Navigate to="/admin/impact-highlights" replace />} />
            <Route path="impact-highlights" element={<AdminImpactHighlights />} />
            <Route path="impact-highlights/new" element={<AdminImpactHighlightsForm />} />
            <Route path="impact-highlights/:id/edit" element={<AdminImpactHighlightsForm />} />
            <Route path="community" element={<AdminCommunity />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>

        <Route path="*" element={<Home />} />
      </Routes>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppWidget phone="+254759924543" message="Hi — I saw your site and have a question." iconSrc={waIcon} />}
    </>
  )
}

export default App
