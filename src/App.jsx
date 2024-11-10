import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProfileProvider } from './context/ProfileContext';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import PricingPage from './pages/PricingPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import PolicyPage from './pages/PolicyPage';
import Navbar from './components/Navbar';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import Support from './pages/support';
import MediaOverlay from './components/MediaOverlay.jsx';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <AuthProvider>
        <ProfileProvider>
        <Navbar />
        {user && <MediaOverlay/>}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </ProfileProvider>
  </AuthProvider>
    </Router>
  );
}

export default App;
