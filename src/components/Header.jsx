import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header fixed top-0 left-0 right-0 z-[100] px-8 py-5 transition-all duration-400 ${isScrolled ? 'bg-[#0a0a1a]/85 backdrop-blur-[32px] border-b border-white/10 py-3' : ''}`}>
      <div className="header-inner max-w-[1400px] mx-auto flex items-center justify-between">
        <a href="#" className="brand flex items-center gap-3 no-underline group">
          <div className="brand-icon w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-accent-1 to-accent-2 shadow-[0_4px_15px_rgba(124,92,252,0.3)]">
            <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <div className="brand-text text-[1.1rem] font-bold text-white tracking-tight">
            BIG BANG <span className="bg-gradient-to-r from-accent-2 to-accent-3 bg-clip-text text-transparent">SMM</span>
          </div>
        </a>
        <nav className="header-nav hidden md:flex gap-2">
          <a href="#coding" className="nav-link px-4 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all">Coding</a>
          <a href="#llm" className="nav-link px-4 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all">LLM</a>
          <a href="#media" className="nav-link px-4 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all">Media</a>
          <a href="#resources" className="nav-link px-4 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all">Resources</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
