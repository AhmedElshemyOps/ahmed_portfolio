import { Award, CheckCircle } from 'lucide-react';

export default function Certifications() {
  const certifications = [
    {
      title: 'Lean Six Sigma Black Belt',
      issuer: 'Six Sigma Certification',
      year: '2025',
      category: 'Process Improvement',
      featured: true
    },
    {
      title: 'CAPM (Certified Associate in Project Management)',
      issuer: 'Project Management Institute (PMI)',
      year: '2024',
      category: 'Project Management',
      featured: true
    },
    {
      title: 'ITIL V4 Foundation',
      issuer: 'AXELOS Global Best Practice',
      year: '2024',
      category: 'IT Service Management',
      featured: false
    },
    {
      title: 'CompTIA ITF+',
      issuer: 'CompTIA',
      year: '2024',
      category: 'IT Fundamentals',
      featured: false
    },
    {
      title: 'IATA Diploma - Travel & Tourism Consultant',
      issuer: 'International Air Transport Association',
      year: '2021',
      category: 'Travel & Tourism',
      featured: true
    },
    {
      title: 'IATA Diploma - Tour Production',
      issuer: 'International Air Transport Association',
      year: '2022',
      category: 'Travel & Tourism',
      featured: false
    },
    {
      title: 'IATA Diploma - Sales & MICE',
      issuer: 'International Air Transport Association',
      year: '2025',
      category: 'Travel & Tourism',
      featured: false
    },
    {
      title: 'Licensed Tour Guide',
      issuer: 'Abu Dhabi, Dubai, Sharjah, RAK, Louvre Abu Dhabi',
      year: '2020',
      category: 'Professional License',
      featured: false
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Law',
      institution: 'Cairo University',
      year: '2010',
      location: 'Cairo, Egypt'
    }
  ];

  return (
    <section id="certifications" className="py-20 md:py-32 bg-white">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: 'url(https://private-us-east-1.manuscdn.com/sessionFile/LnsndYcqrMlHFJiREuE4k5/sandbox/bfweBxWu5Q78dZUCXlh5Ge-img-2_1770650224000_na1fn_Y2VydGlmaWNhdGlvbnMtc2VjdGlvbi1iZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTG5zbmRZY3FyTWxIRkppUkV1RTRrNS9zYW5kYm94L2Jmd2VCeFd1NVE3OGRaVUNYbGg1R2UtaW1nLTJfMTc3MDY1MDIyNDAwMF9uYTFmbl9ZMlZ5ZEdsbWFXTmhkR2x2Ym5NdGMyVmpkR2x2YmkxaVp3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=dpQmyiJ1-A18deVL9dQ5sJUyoIqyXDfm8Ukb~P6TMq~7lKBjhhtW9An-4s2ULZegIwXQZ64KDVNgCHq3bXBWahwd53UkMr8g5iedVqpnZmi0pvyVKhrmhThyLe1yk5MfcKfx9BcjOCUaZWsOrOLHJC8EtWg7-rLxE9dBrfY-4buaeyQ30nGH3DKRUO0YPsh42cbN-NvBaga3wwuNQmFoDCXI8D3CmDmAl9zCqrwq7-11AbXIpK77GbEdgby7VjJSz4Wv4IqL-vCTDRcMl-WWhZ6mZx1vpzQXrP09AEGtE2TvCSudcQaPMsSw205AHGSqMXS6p5DPzFEr-YCNTjEHWQ__)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Certifications & Education</h2>
          <p className="text-lg text-foreground">
            Professional credentials demonstrating expertise in quality management, operations, and hospitality.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary mb-8">Professional Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className={`rounded-lg p-6 border transition-all duration-300 hover:shadow-lg ${
                  cert.featured
                    ? 'bg-gradient-to-br from-accent/10 to-primary/10 border-accent/30'
                    : 'bg-white border-border'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${cert.featured ? 'bg-accent/20' : 'bg-primary/10'}`}>
                      <Award size={20} className={cert.featured ? 'text-accent' : 'text-primary'} />
                    </div>
                    {cert.featured && (
                      <span className="label-badge text-accent">Featured</span>
                    )}
                  </div>
                  <CheckCircle size={20} className="text-accent" />
                </div>

                <h4 className="font-bold text-primary mb-2">{cert.title}</h4>
                <p className="text-sm text-foreground mb-3">{cert.issuer}</p>
                
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xs label-badge text-muted-foreground">{cert.category}</span>
                  <span className="text-sm font-semibold text-primary">{cert.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="max-w-2xl">
          <h3 className="text-2xl font-bold text-primary mb-8">Education</h3>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-primary">{edu.degree}</h4>
                    <p className="text-foreground">{edu.institution}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">{edu.year}</span>
                </div>
                <p className="text-sm text-muted-foreground">{edu.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
