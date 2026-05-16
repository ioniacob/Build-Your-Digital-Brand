import React from 'react';

const Hero = ({ className = "" }) => {
  return (
    <section className={`hero text-center pt-[140px] pb-4 px-4 animate-[fadeInUp_0.8s_ease-out] ${className}`}>
      <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-accent-2 tracking-widest uppercase mb-10 bg-accent-2/10 border border-accent-2/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-2 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-2"></span>
        </span>
        Authority Prompt Hub
      </div>
      <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight leading-tight mb-10 bg-gradient-to-br from-white via-accent-2 to-accent-3 bg-clip-text text-transparent">
        Efficient Prompting <br /> for ALL IAs
      </h1>
      <p className="text-lg md:text-2xl text-white/60 max-w-[800px] mx-auto leading-relaxed mb-12">
        The ultimate collection of high-authority prompts architected for CEOs, Founders & Authors. 
        Engineered for precision across ChatGPT, Claude, Gemini and beyond.
      </p>
    </section>
  );
};

export default Hero;
