import { useAuth } from '@/_core/hooks/useAuth';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Certifications from '@/components/Certifications';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

/**
 * Ahmed Mahmoud's Professional Portfolio
 * 
 * Design Philosophy: Professional Elegance with Operational Clarity
 * - Clean, minimalist design that prioritizes content hierarchy
 * - Deep Navy Blue (#1F3A5F) primary color for trust and professionalism
 * - Soft Cream (#F9F7F4) background for warmth and sophistication
 * - Accent Teal (#0D9488) for highlights and certifications
 * - Typography: Playfair Display (headings), Lato (body), Montserrat (labels)
 */

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Certifications />
        <Skills />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
