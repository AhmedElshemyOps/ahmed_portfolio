import { MapPin, Calendar } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      role: 'Tour Guide & Quality Improvement Project Lead',
      company: 'Masarra DMC (Miral)',
      location: 'Abu Dhabi, UAE',
      period: '2023 - Present',
      description: 'Leading quality improvement initiatives and guest experience optimization. Implementing Lean Six Sigma methodologies to enhance operational efficiency and service delivery standards.',
      achievements: [
        'Developed and implemented quality improvement projects',
        'Enhanced guest satisfaction through process optimization',
        'Led cross-functional teams on operational excellence initiatives'
      ]
    },
    {
      role: 'Operations & Quality Specialist',
      company: 'Tourism Operations Company',
      location: 'Dubai, UAE',
      period: '2020 - 2023',
      description: 'Managed daily operations and quality assurance for tourism attractions. Developed standard operating procedures and conducted regular quality audits to maintain service excellence.',
      achievements: [
        'Created comprehensive SOPs for operational consistency',
        'Conducted service quality audits across multiple locations',
        'Trained staff on quality standards and guest service excellence'
      ]
    },
    {
      role: 'Guest Services Manager',
      company: 'Louvre Abu Dhabi',
      location: 'Abu Dhabi, UAE',
      period: '2018 - 2020',
      description: 'Oversaw guest services operations and quality management. Ensured exceptional guest experiences while maintaining operational efficiency and compliance with international standards.',
      achievements: [
        'Managed guest services team of 15+ staff members',
        'Achieved 95%+ guest satisfaction ratings',
        'Implemented multilingual guest support services'
      ]
    },
    {
      role: 'Operations Coordinator',
      company: 'Tourism Company',
      location: 'Cairo, Egypt',
      period: '2015 - 2018',
      description: 'Coordinated daily operations and managed guest relations. Developed expertise in process optimization and quality control in a fast-paced tourism environment.',
      achievements: [
        'Coordinated operations for 100+ daily tours',
        'Reduced operational costs by 15% through process improvements',
        'Managed multilingual guest communications'
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 md:py-32 bg-secondary/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Work Experience</h2>
          <p className="text-lg text-foreground">
            A progressive career in hospitality and operations management across multiple countries and organizational contexts.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-8">
              {/* Timeline dot and line */}
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 w-4 h-4 bg-accent rounded-full border-4 border-white shadow-md" />
              
              {/* Content */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:pr-8'}`}>
                <div className="bg-white rounded-lg p-8 border border-border hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-primary">{exp.role}</h3>
                      <p className="text-accent font-semibold text-sm mt-1">{exp.company}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mb-4 text-sm text-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-accent" />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-accent" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-foreground mb-4 leading-relaxed">{exp.description}</p>

                  <div>
                    <p className="text-sm font-semibold text-primary mb-2">Key Achievements:</p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-accent mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Timeline connector line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 top-8 w-0.5 h-16 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
