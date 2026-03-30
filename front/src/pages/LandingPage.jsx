import React from 'react';
import { Link } from 'react-router';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#020b33] text-white font-sans">
      {/* --- HEADER / NAVIGATION --- */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-2xl font-semibold text-blue-400">
            BudgetNest
          </Link>
          <nav className="hidden md:block">
            <Link to="/" className="text-sm text-white hover:text-blue-300 transition-colors">
              Home
            </Link>
          </nav>
          <Link
            to="/login"
            className="rounded-[10px] bg-blue-500 px-6 py-2 text-sm font-medium text-white hover:bg-blue-400 transition-all shadow-lg shadow-blue-500/20"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <main>
        <section className="relative px-6 py-24 md:py-32 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Take Control of Your Finances with Ease
            </h1>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10">
              BudgetNest helps you track expenses, plan savings, and reach your 
              financial goals — all in one beautiful dashboard.
            </p>
            <Link
              to="/signup"
              className="inline-block rounded-[10px] bg-blue-500 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-400 transition-all shadow-xl shadow-blue-500/25"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section className="px-6 py-20 bg-[#020b33]">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-16">Why Choose BudgetNest?</h2>
            
            <div className="grid gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-left hover:border-blue-500/50 transition-colors">
                <h3 className="text-xl font-bold mb-4">Track Everything</h3>
                <p className="text-gray-400 leading-relaxed">
                  Monitor all your income and expenses in real-time with intuitive categorization.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-left hover:border-blue-500/50 transition-colors">
                <h3 className="text-xl font-bold mb-4">Smart Savings</h3>
                <p className="text-gray-400 leading-relaxed">
                  Set goals and watch your savings grow with automated tracking and insights.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-left hover:border-blue-500/50 transition-colors">
                <h3 className="text-xl font-bold mb-4">Visual Reports</h3>
                <p className="text-gray-400 leading-relaxed">
                  Beautiful charts and graphs help you understand your financial patterns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="px-6 py-24 text-center border-t border-white/5">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control?</h2>
            <p className="text-gray-400 mb-10">
              Join thousands of users who have transformed their financial lives with BudgetNest.
            </p>
            <Link
              to="/login"
              className="inline-block rounded-[10px] bg-blue-500 px-10 py-3 text-lg font-semibold text-white hover:bg-blue-400 transition-all"
            >
              Login
            </Link>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/10 bg-[#010826]">
        <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">BudgetNest</h3>
            <p className="text-sm text-gray-400 leading-6">
              Take control of your money. Track, save & grow — all in one place.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
              <li className="hover:text-blue-400 cursor-pointer">How It Works</li>
              <li className="hover:text-blue-400 cursor-pointer">Features</li>
              <li className="hover:text-blue-400 cursor-pointer">About</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-blue-400 cursor-pointer">Contact Us</li>
              <li className="hover:text-blue-400 cursor-pointer">FAQ</li>
              <li className="hover:text-blue-400 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-blue-400 cursor-pointer">Terms of Service</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Follow Us</h4>
            <div className="flex gap-4 text-gray-400">
              {/* Čia gali įdėti piktogramas, jei naudoji Lucide-React ar FontAwesome */}
              <span className="hover:text-white cursor-pointer transition-colors text-sm">FB</span>
              <span className="hover:text-white cursor-pointer transition-colors text-sm">TW</span>
              <span className="hover:text-white cursor-pointer transition-colors text-sm">IG</span>
              <span className="hover:text-white cursor-pointer transition-colors text-sm">LI</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 py-8 text-center text-xs text-gray-500 uppercase tracking-widest">
          © 2024 BudgetNest. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;