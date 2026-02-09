import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Linkedin, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'Contact via LinkedIn',
      href: 'https://www.linkedin.com/in/ahmedmohamedahmedm'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'Ahmed Mohamed',
      href: 'https://www.linkedin.com/in/ahmedmohamedahmedm'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Abu Dhabi, UAE',
      href: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Get In Touch</h2>
          <p className="text-lg text-foreground">
            I'm always interested in hearing about new opportunities and projects. Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <a
                key={index}
                href={info.href}
                className="bg-secondary/30 rounded-lg p-8 border border-border hover:shadow-lg transition-all duration-300 hover:border-accent"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 mx-auto">
                  <Icon className="text-accent" size={24} />
                </div>
                <h3 className="text-lg font-bold text-primary text-center mb-2">{info.title}</h3>
                <p className="text-foreground text-center">{info.value}</p>
              </a>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg border border-border p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-primary mb-6">Send Me a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white text-foreground"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white text-foreground"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-primary mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white text-foreground"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white text-foreground resize-none"
                  placeholder="Your message here..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
                size="lg"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-16 text-center">
          <p className="text-foreground mb-6">Connect with me on professional networks:</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <Linkedin size={20} className="text-primary hover:text-white" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
