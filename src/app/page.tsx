import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import SquadSection from '@/components/SquadSection';
import WorkflowSection from '@/components/WorkflowSection';
import PricingSection from '@/components/PricingSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <SquadSection />
      <WorkflowSection />
      <PricingSection />

      {/* Final CTA */}
      <section className="py-32 px-6 bg-gradient-to-t from-amber-500/10 to-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto a <span className="text-amber-400">decollar</span>?
          </h2>
          <p className="text-xl text-zinc-400 mb-10">
            Attiva il tuo workspace in pochi minuti.<br />
            Scegli un pack, configura, e lascia lavorare il tuo squad AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 transform hover:scale-105">
              Inizia Ora - Gratis
            </button>
            <button className="px-8 py-4 rounded-xl bg-zinc-800 text-white font-semibold text-lg border border-zinc-700 hover:bg-zinc-700 transition-all duration-300">
              Contattaci
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-semibold">Curiositas Studio</span>
          </div>
          <p className="text-zinc-500 text-sm">
            © 2026 Curiositas Studio. Crafted with 🦝 & ⚡
          </p>
        </div>
      </footer>
    </main>
  );
}
