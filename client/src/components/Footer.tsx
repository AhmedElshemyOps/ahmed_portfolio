import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">Ahmed Mahmoud</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Quality & Operations Professional dedicated to operational excellence and guest experience optimization.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="text-white/80 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-white/80 hover:text-white transition-colors">About</a></li>
              <li><a href="#experience" className="text-white/80 hover:text-white transition-colors">Experience</a></li>
              <li><a href="#certifications" className="text-white/80 hover:text-white transition-colors">Certifications</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-white/80">
              <p>LinkedIn: <a href="https://www.linkedin.com/in/ahmedmohamedahmedm" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Ahmed Mohamed</a></p>
              <p>Location: Abu Dhabi, UAE</p>
              <p>Website: <a href="https://ahmedqualityops.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">ahmedqualityops.com</a></p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-white/80">
            <p>
              &copy; {currentYear} Ahmed Mahmoud. All rights reserved.
            </p>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <span>Made with</span>
              <Heart size={16} className="text-red-400" />
              <span>by Manus</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
