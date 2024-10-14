import React from 'react';
import { ArrowRight, CheckCircle2, DollarSign, PieChart, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Background Image */}
      <div className="relative min-h-screen flex flex-col">
        {/* Custom Background Pattern */}
        <div className="absolute inset-0 z-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.2"/>
              </pattern>
              <linearGradient id="fade" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#064e3b"/>
                <stop offset="100%" stopColor="#0f172a"/>
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#fade)"/>
            <rect width="100%" height="100%" fill="url(#grid)"/>
            {/* Abstract financial shapes */}
            <g opacity="0.1">
              <path d="M100,100 L150,50 L200,150 Z" fill="#22c55e"/>
              <circle cx="300" cy="150" r="50" fill="#22c55e"/>
              <rect x="400" y="75" width="100" height="100" fill="#22c55e"/>
            </g>
          </svg>
        </div>


        {/* Main Content */}
        <div className="relative z-10 flex-grow flex items-center">
          <div className="max-w-7xl mx-auto px-4 py-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Main Text */}
              <div className="space-y-8">
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Smart Way to<br />
                  Track Your Daily<br />
                  <span className="text-green-400">Expenses</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-lg">
                  Take control of your finances with our intuitive expense tracking app. 
                  Monitor spending, set budgets, and achieve your financial goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-green-500 text-black rounded-lg font-semibold text-lg hover:bg-green-400 transition-colors flex items-center justify-center gap-2 group">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-colors">
                    Learn More
                  </button>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div>
                    <div className="text-3xl font-bold text-white">50K+</div>
                    <div className="text-green-400">Active Users</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">95%</div>
                    <div className="text-green-400">Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">4.9</div>
                    <div className="text-green-400">App Rating</div>
                  </div>
                </div>
              </div>

        
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="relative z-10">
          <svg className="fill-current text-white" viewBox="0 0 1440 120">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-xl p-6 hover:bg-black/60 transition-colors border border-green-500/20">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
    </div>
  );
}