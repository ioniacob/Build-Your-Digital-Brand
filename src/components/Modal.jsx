import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, MessageSquare, Loader2 } from 'lucide-react';
import { fetchPageContent, fetchPageComments } from '../lib/notion';

const Modal = ({ isOpen, onClose, item, onPrev, onNext }) => {
  const [content, setContent] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && item) {
      const loadPageData = async () => {
        setLoading(true);
        const [blocks, pageComments] = await Promise.all([
          fetchPageContent(item.id),
          fetchPageComments(item.id)
        ]);
        setContent(blocks);
        setComments(pageComments);
        setLoading(false);
      };
      loadPageData();
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const renderRichText = (richText) => {
    return richText.map((t, i) => {
      let className = '';
      if (t.annotations.bold) className += ' font-bold';
      if (t.annotations.italic) className += ' italic';
      if (t.annotations.code) className += ' font-mono bg-white/10 px-1 rounded text-accent-2';
      
      if (t.href) {
        return (
          <a key={i} href={t.href} target="_blank" rel="noopener noreferrer" className={`${className} text-accent-2 hover:underline`}>
            {t.plain_text}
          </a>
        );
      }
      return <span key={i} className={className}>{t.plain_text}</span>;
    });
  };

  const renderBlock = (block) => {
    const { type } = block;
    const value = block[type];
    if (!value || !value.rich_text) return null;

    switch (type) {
      case 'heading_1': return <h1 key={block.id} className="text-3xl font-bold text-white mb-6 mt-8">{renderRichText(value.rich_text)}</h1>;
      case 'heading_2': return <h2 key={block.id} className="text-2xl font-bold text-white/90 mb-4 mt-6">{renderRichText(value.rich_text)}</h2>;
      case 'heading_3': return <h3 key={block.id} className="text-xl font-bold text-white/80 mb-3 mt-4">{renderRichText(value.rich_text)}</h3>;
      case 'paragraph': return <p key={block.id} className="text-white/60 leading-relaxed mb-4 text-lg">{renderRichText(value.rich_text)}</p>;
      case 'bulleted_list_item': return <li key={block.id} className="text-white/60 mb-2 ml-4 list-disc pl-2">{renderRichText(value.rich_text)}</li>;
      case 'numbered_list_item': return <li key={block.id} className="text-white/60 mb-2 ml-4 list-decimal pl-2">{renderRichText(value.rich_text)}</li>;
      case 'to_do': return (
        <div key={block.id} className="flex items-center gap-3 mb-2">
          <input type="checkbox" checked={value.checked} readOnly className="rounded border-white/20 bg-white/5" />
          <span className="text-white/60">{renderRichText(value.rich_text)}</span>
        </div>
      );
      case 'quote': return (
        <blockquote key={block.id} className="border-l-4 border-accent-1 pl-6 py-2 my-6 italic text-white/70 bg-white/5 rounded-r-xl">
          {renderRichText(value.rich_text)}
        </blockquote>
      );
      case 'code': return (
        <pre key={block.id} className="bg-black/40 p-5 rounded-2xl border border-white/10 my-6 overflow-x-auto font-mono text-sm text-accent-2">
          <code>{renderRichText(value.rich_text)}</code>
        </pre>
      );
      case 'callout': return (
        <div key={block.id} className="bg-accent-1/10 border border-accent-1/20 p-5 rounded-2xl my-6 flex gap-4 items-start">
          <span className="text-2xl">{block.icon?.emoji || '💡'}</span>
          <p className="text-white/80">{renderRichText(value.rich_text)}</p>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 animate-[fadeIn_0.3s_ease-out]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0a0a1a]/80 backdrop-blur-xl" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-full max-h-[90vh] glass shadow-[0_0_100px_rgba(124,92,252,0.2)] rounded-[2.5rem] border border-white/10 flex flex-col overflow-hidden animate-[modalSlideUp_0.4s_cubic-bezier(0.2,0.8,0.2,1)]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-white/5 border border-white/10 shadow-inner">
              {item.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{item.name}</h2>
              <p className="text-white/40 text-sm font-medium tracking-wide uppercase mt-1">{item.type} • {item.author}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all border border-white/10 group"
          >
            <X className="text-white/40 group-hover:text-white transition-colors" size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-20">
              <Loader2 className="animate-spin text-accent-1" size={48} />
              <p className="text-white/30 font-medium tracking-widest uppercase text-xs">Decrypting Knowledge...</p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              {/* Blocks */}
              <div className="space-y-2">
                {content.map(renderBlock)}
              </div>

              {/* Comments Section */}
              {comments.length > 0 && (
                <div className="mt-16 pt-12 border-t border-white/5">
                  <div className="flex items-center gap-3 mb-8">
                    <MessageSquare size={20} className="text-accent-1" />
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Expert Insights</h3>
                  </div>
                  <div className="space-y-6">
                    {comments.map(comment => (
                      <div key={comment.id} className="glass-subtle p-6 rounded-2xl border border-white/5 shadow-inner">
                        <p className="text-white/70 leading-relaxed italic">"{comment.rich_text.map(t => t.plain_text).join('')}"</p>
                        <div className="mt-4 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-1"></div>
                          <span className="text-[0.7rem] text-white/30 font-bold uppercase tracking-widest">Knowledge Base Contribution</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-8 border-t border-white/5 bg-[#0a0a1a]/40 backdrop-blur-md shrink-0 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 order-2 md:order-1 w-full md:w-auto">
            <button 
              onClick={onPrev}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all border border-white/10 font-bold text-sm"
            >
              <ChevronLeft size={20} /> Anterior
            </button>
            <button 
              onClick={onNext}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all border border-white/10 font-bold text-sm"
            >
              Siguiente <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex items-center gap-4 order-1 md:order-2 w-full md:w-auto">
            <a 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/10 text-sm"
            >
              Fuente <ExternalLink size={18} />
            </a>
            <a 
              href={item.refLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-accent-1 hover:bg-accent-1/80 text-white font-bold transition-all shadow-[0_0_30px_rgba(124,92,252,0.4)] text-sm"
            >
              Implementar {item.type} <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
