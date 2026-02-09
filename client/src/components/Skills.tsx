import { Globe, Zap } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Operations Management',
      skills: [
        'SOP Development & Implementation',
        'Process Optimization',
        'Quality Assurance',
        'Guest Services Management',
        'Project Management',
        'Team Leadership',
        'Performance Analysis'
      ]
    },
    {
      title: 'Process Improvement',
      skills: [
        'Lean Six Sigma Methodology',
        'Data Analysis',
        'Root Cause Analysis',
        'Process Mapping',
        'Continuous Improvement',
        'Efficiency Optimization',
        'Compliance Management'
      ]
    },
    {
      title: 'Hospitality & Tourism',
      skills: [
        'Guest Experience Optimization',
        'Tourism Operations',
        'Tour Guiding',
        'Travel & Tourism Consulting',
        'MICE Management',
        'Cultural Heritage Expertise',
        'Destination Management'
      ]
    },
    {
      title: 'Technical Skills',
      skills: [
        'Microsoft Office Suite',
        'Data Analysis Tools',
        'CRM Systems',
        'Project Management Software',
        'Quality Management Systems',
        'Process Documentation',
        'Reporting & Analytics'
      ]
    }
  ];

  const languages = [
    { language: 'Arabic', proficiency: 'Native', level: 100 },
    { language: 'French', proficiency: 'Fluent', level: 90 },
    { language: 'English', proficiency: 'Fluent', level: 95 },
    { language: 'Russian', proficiency: 'Basic', level: 40 }
  ];

  return (
    <section id="skills" className="py-20 md:py-32 bg-secondary/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Skills & Expertise</h2>
          <p className="text-lg text-foreground">
            A comprehensive skill set developed through years of experience in quality management, operations, and hospitality.
          </p>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg p-8 border border-border hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Zap size={20} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary">{category.title}</h3>
              </div>
              <div className="space-y-3">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Languages Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Globe size={24} className="text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-primary">Languages</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {languages.map((lang, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-primary">{lang.language}</h4>
                    <p className="text-sm text-accent font-semibold label-badge">{lang.proficiency}</p>
                  </div>
                  <span className="text-2xl font-bold text-primary">{lang.level}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-accent to-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${lang.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* International Experience Highlight */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-8 border border-primary/10">
          <h3 className="text-2xl font-bold text-primary mb-6">International Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">🇦🇪</p>
              <h4 className="font-semibold text-primary mb-2">United Arab Emirates</h4>
              <p className="text-sm text-foreground">Abu Dhabi, Dubai, Sharjah, RAK</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">🇪🇬</p>
              <h4 className="font-semibold text-primary mb-2">Egypt</h4>
              <p className="text-sm text-foreground">Cairo & Regional Operations</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">🇳🇱</p>
              <h4 className="font-semibold text-primary mb-2">Netherlands</h4>
              <p className="text-sm text-foreground">International Exposure</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
