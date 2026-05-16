import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import ServiceCard from './components/ServiceCard';
import { fetchNotionDatabase } from './lib/notion';
import { Search, Loader2 } from 'lucide-react';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchNotionDatabase();
      setItems(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const categories = ['All', 'Coding', 'LLM', 'Media', 'Music', 'Resources'];

  const filteredItems = items.filter(item => {
    const matchesFilter = filter === 'All' || item.type === filter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.summary.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white selection:bg-accent-1/30 selection:text-white">
      <Background />
      <Header />
      
      <main className="relative z-10 max-w-[1600px] mx-auto px-8 pb-32 flex flex-col items-stretch gap-16">
        <Hero />
        
        <StatsBar count={items.length} />

        {/* Filter & Search Bar */}
        <div className="flex flex-col items-center justify-center gap-12 px-4">
          <div className="filter-bar glass-subtle p-2.5 rounded-3xl flex flex-wrap justify-center gap-3 max-w-4xl shadow-inner">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-accent-1 text-white shadow-[0_0_20px_rgba(124,92,252,0.4)] border border-white/20' 
                    : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative group w-full lg:w-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-accent-2 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search premium prompts..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-8 outline-none focus:border-accent-2/50 focus:bg-white/10 transition-all w-full lg:min-w-[400px] backdrop-blur-xl text-lg shadow-2xl"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-accent-2" size={48} />
            <p className="text-white/50 font-medium tracking-widest uppercase text-xs">Architecting Data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 animate-[fadeInUp_0.6s_ease-out]">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <ServiceCard key={item.id} item={item} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-white/30 text-lg italic">No prompts found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer Pill - Now at the bottom of the flow */}
      <footer className="pb-16 pt-8 flex justify-center relative z-20">
        <div className="glass px-8 py-4 rounded-full border border-white/10 hover:border-white/20 transition-all flex items-center gap-6 shadow-2xl backdrop-blur-2xl">
          <span className="text-sm text-white/70 font-medium whitespace-nowrap">© 2025 Big Bang Social Media Marketing</span>
          <div className="w-[1px] h-4 bg-white/10"></div>
          <a href="https://wa.me/34657201020" target="_blank" rel="noopener noreferrer" className="text-sm text-accent-2 hover:text-white transition-colors font-bold uppercase tracking-wider">VIP Support</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
