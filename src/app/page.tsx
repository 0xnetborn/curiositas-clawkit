import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import SquadSection from '@/components/SquadSection';
import WorkflowSection from '@/components/WorkflowSection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import NewsletterSection from '@/components/NewsletterSection';
import LoadingScreen from '@/components/LoadingScreen';
import TrustedBySection from '@/components/TrustedBySection';
import DocsSection from '@/components/DocsSection';
import KonamiEasterEgg from '@/components/KonamiEasterEgg';
import PageTracker from '@/components/PageTracker';

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-black text-white selection:bg-teal-500/30">
      <PageTracker path="/" title="CurioKit | AI Orchestration for Founders" />
      <LoadingScreen />
      <KonamiEasterEgg />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <SquadSection />
      <WorkflowSection />
      <TestimonialsSection />
      <FAQSection />
      <NewsletterSection />
      <PricingSection />
      <DocsSection />
      <TrustedBySection />

      {/* Final CTA - Tech Style */}
      <section className="py-32 px-6 border-t border-white/5 bg-grid relative overflow-hidden" aria-labelledby="final-cta-heading">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" aria-hidden="true" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-teal-500/20 bg-teal-500/5 mb-8">
            <span className="w-1.5 h-1.5 bg-teal-500 animate-pulse" />
            <span className="text-[10px] font-mono text-teal-500 tracking-widest uppercase">System Ready</span>
          </div>

          <h2 id="final-cta-heading" className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-white">
            Initialize <span className="text-white/40">Workspace</span>
          </h2>
          
          <p className="text-lg text-white/40 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Deploy your AI squad in seconds. No configuration required.<br />
            Enterprise-grade orchestration out of the box.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-8 py-4 bg-white text-black font-medium text-sm tracking-wide overflow-hidden w-full sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded">
              <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 group-hover:text-black transition-colors uppercase animate-pulse-teal">Start Deployment</span>
            </button>
            
            <button className="group px-8 py-4 border border-white/10 text-white/60 font-medium text-sm tracking-wide hover:text-white hover:border-white/40 transition-all uppercase w-full sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Tech Style */}
      <footer className="py-12 px-6 border-t border-white/10 bg-black" role="contentinfo" aria-label="Site footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white/40" aria-hidden="true">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-mono text-xs text-white/40 tracking-widest uppercase">
              Curiositas Studio © 2026
            </span>
          </div>

          <nav aria-label="Social links">
            <div className="flex gap-8">
              {['Twitter', 'GitHub', 'Discord'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="text-xs font-mono text-white/40 hover:text-teal-500 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-black rounded"
                  aria-label={social}
                >
                  {social}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-500" aria-hidden="true" />
            <span className="text-xs font-mono text-white/40 tracking-wider">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
