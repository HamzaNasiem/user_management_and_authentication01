import Link from "next/link";
import { ArrowRight, Cpu, Cloud, Shield, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0b0f19] text-gray-100 overflow-hidden font-sans">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none" />

      {/* Navigation */}
      <header className="border-b border-gray-800/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-blue-500/20">
              P
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
              Panaversity
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-8">
          <Cpu className="w-4 h-4 animate-pulse" /> Generative AI & Cloud Program
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15] mb-8">
          Shape the Future with{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            Next-Gen Education
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-12">
          Secure, verified, and centralized access to the Panaversity Cloud Computing and Generative AI ecosystem. Access your dashboard, payments, and learning contents.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-24">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 group transition-all hover:-translate-y-0.5"
          >
            Create Your Account
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gray-900 border border-gray-800 hover:bg-gray-800 hover:border-gray-700 text-gray-200 font-medium transition-all"
          >
            Access Dashboard
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm text-left hover:border-blue-500/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Secure Verification</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              State-of-the-art authentication with secure email magic links and SMS OTP verification.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm text-left hover:border-indigo-500/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Cloud className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Cloud Infrastructure</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Highly scalable database and authentication endpoints configured for rapid deployment.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm text-left hover:border-purple-500/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Role-Based Access</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tailored workspaces for Students, Teachers, and Program Administrators.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-12 bg-[#080b12] text-center text-xs text-gray-500 relative z-10">
        <p>&copy; {new Date().getFullYear()} Panaversity Program. All rights reserved.</p>
      </footer>
    </div>
  );
}
