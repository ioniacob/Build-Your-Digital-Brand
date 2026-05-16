import React from 'react';
import { ExternalLink, Star, User } from 'lucide-react';

const ServiceCard = ({ item, onSelect }) => {
  const getAccentClass = (type) => {
    const types = {
      'Coding': 'border-accent-2/20 hover:border-accent-2/50 shadow-accent-2/5',
      'LLM': 'border-accent-3/20 hover:border-accent-3/50 shadow-accent-3/5',
      'Media': 'border-accent-5/20 hover:border-accent-5/50 shadow-accent-5/5',
      'Resources': 'border-accent-1/20 hover:border-accent-1/50 shadow-accent-1/5',
      'Article': 'border-white/10 hover:border-white/30'
    };
    return types[type] || types['Article'];
  };

  const getTypeColor = (type) => {
    const colors = {
      'Coding': 'text-accent-2 bg-accent-2/10 border-accent-2/20',
      'LLM': 'text-accent-3 bg-accent-3/10 border-accent-3/20',
      'Media': 'text-accent-5 bg-accent-5/10 border-accent-5/20',
      'Resources': 'text-accent-1 bg-accent-1/10 border-accent-1/20'
    };
    return colors[type] || 'text-white/60 bg-white/5 border-white/10';
  };

  return (
    <div 
      onClick={() => onSelect(item)}
      className={`service-card glass p-7 rounded-3xl transition-all duration-400 group relative flex flex-col gap-5 border cursor-pointer ${getAccentClass(item.type)} hover:-translate-y-2 hover:shadow-2xl`}
    >
      <div className="card-top flex items-start gap-4">
        <div className="card-logo w-11 h-11 rounded-xl flex items-center justify-center text-xl bg-white/5 border border-white/10">
          {item.icon}
        </div>
        <div className="card-info flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="card-name text-[1rem] font-bold text-white truncate tracking-tight">{item.name}</h3>
            <span className={`card-type px-2 py-0.5 rounded-full text-[0.65rem] font-bold uppercase tracking-wider border ${getTypeColor(item.type)}`}>
              {item.type}
            </span>
          </div>
          <p className="card-desc text-xs text-white/50 truncate mt-1">{item.summary}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
        <div className="flex items-center gap-3 text-[0.7rem] text-white/40">
          <div className="flex items-center gap-1">
            <User size={12} />
            <span>{item.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-accent-4 fill-accent-4/20" />
            <span>{item.score}/5</span>
          </div>
        </div>
        <div className="card-arrow w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-accent-1/30 transition-all">
          <ExternalLink size={14} className="text-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
