import { Globe, Award, Users } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: Award,
      title: 'Certified Excellence',
      description: 'Lean Six Sigma Black Belt, CAPM, ITIL V4 Foundation, and IATA Diplomas'
    },
    {
      icon: Globe,
      title: 'International Experience',
      description: 'Worked across UAE, Egypt, and Netherlands in diverse hospitality environments'
    },
    {
      icon: Users,
      title: 'Guest-Centric Approach',
      description: 'Combining operational rigor with exceptional guest service delivery'
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">About Me</h2>
          <p className="text-lg text-foreground leading-relaxed">
            A results-driven hospitality and operations professional dedicated to optimizing guest experiences through structured quality management and continuous process improvement.
          </p>
        </div>

        {/* Professional Summary */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-secondary/30 rounded-lg p-8 border border-border">
            <h3 className="text-2xl font-bold text-primary mb-4">Professional Summary</h3>
            <p className="text-foreground leading-relaxed mb-4">
              With over a decade of experience in the hospitality and tourism sector, I have developed a comprehensive expertise in quality management, operations optimization, and guest experience enhancement. My career spans multiple countries and organizational contexts, from boutique attractions to large-scale tourism operations.
            </p>
            <p className="text-foreground leading-relaxed">
              I specialize in implementing Lean Six Sigma methodologies to identify inefficiencies, developing standard operating procedures that ensure consistency, and leading cross-functional teams to achieve operational excellence. My multilingual capabilities (Arabic, French, English, Russian) and international exposure enable me to work effectively in diverse, multicultural environments.
            </p>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-white border border-border rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4">
                  <Icon className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Core Values */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-8 border border-primary/10">
          <h3 className="text-2xl font-bold text-primary mb-6">Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-primary mb-2">Excellence</h4>
              <p className="text-foreground text-sm">Committed to delivering the highest standards in every aspect of operations and guest service.</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Continuous Improvement</h4>
              <p className="text-foreground text-sm">Leveraging data-driven insights to identify opportunities for operational enhancement and innovation.</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Collaboration</h4>
              <p className="text-foreground text-sm">Building strong partnerships across teams and departments to achieve shared organizational goals.</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Integrity</h4>
              <p className="text-foreground text-sm">Maintaining transparency and ethical standards in all professional relationships and decisions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
