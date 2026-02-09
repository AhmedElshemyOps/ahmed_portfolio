import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://private-us-east-1.manuscdn.com/sessionFile/LnsndYcqrMlHFJiREuE4k5/sandbox/bfweBxWu5Q78dZUCXlh5Ge-img-1_1770650230000_na1fn_aGVyby1iYWNrZ3JvdW5kLXByb2Zlc3Npb25hbA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTG5zbmRZY3FyTWxIRkppUkV1RTRrNS9zYW5kYm94L2Jmd2VCeFd1NVE3OGRaVUNYbGg1R2UtaW1nLTFfMTc3MDY1MDIzMDAwMF9uYTFmbl9hR1Z5YnkxaVlXTnJaM0p2ZFc1a0xYQnliMlpsYzNOcGIyNWhiQS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rmamErMgcjBi9SDW0IBV39Tlb2f7195Fz6f6wFaMxVjhvZ5FekK-wCfXgh~BoVeJxTKpck75gsgAeqwWNaWVfAKtzOOZH5-l4FOy1LTeXL0wFAPeZL7xJDcEEJOTwSZcjnNccXTlk-kcoFWYz3h6jKB6dZbfsnraXvt0AlHWIMxNXH6PS8fR7nY-jWcZXfiNW25Ho04nnLsnM8BzB-PEtcQgTvTOH9xyqkuEUEW9Mk8bPKNOxWnZD0RQ0H6ZxbjYvQJ9j5txOVWdafmdR6k~KXJW31hYotCEw3Q61VUT7vdBdHuCN134wJyQAwmO1ZeoZC13WEYhWVFiN3Ss81w1GQ__)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-white/70 z-0" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-accent font-semibold label-badge">Welcome to my portfolio</p>
              <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                Ahmed Mahmoud
              </h1>
              <p className="text-2xl text-foreground font-semibold">
                Quality & Operations Professional
              </p>
            </div>

            <p className="text-lg text-foreground leading-relaxed max-w-lg">
              With over 10 years of experience in hospitality and operations management, I specialize in Lean Six Sigma process improvement, quality assurance, and operational excellence across the UAE, Egypt, and Netherlands.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#experience" className="inline-block">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                  size="lg"
                >
                  View My Work <ArrowRight size={18} />
                </Button>
              </a>
              <a href="/Ahmed-Mahmoud-CV.pdf" download className="inline-block">
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/5 flex items-center gap-2"
                  size="lg"
                >
                  <Download size={18} /> Download CV
                </Button>
              </a>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <p className="text-3xl font-bold text-primary">10+</p>
                <p className="text-sm text-foreground">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">4</p>
                <p className="text-sm text-foreground">Languages</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">8+</p>
                <p className="text-sm text-foreground">Certifications</p>
              </div>
            </div>
          </div>

          {/* Right Column - Professional Image */}
          <div className="hidden md:flex justify-center items-center">
            <div className="w-80 h-96 rounded-lg border-2 border-primary/20 overflow-hidden shadow-lg">
              <img 
                src="/ahmed-professional-photo.jpg" 
                alt="Ahmed Mahmoud - Professional Photo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
