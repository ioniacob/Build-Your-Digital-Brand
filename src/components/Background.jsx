import React from 'react';

const Background = () => {
  return (
    <>
      <div className="bg-canvas fixed top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="bg-orb absolute rounded-full filter blur-[120px] opacity-40 animate-[floatOrb_25s_ease-in-out_infinite] w-[600px] h-[600px] top-[-10%] left-[-5%] bg-[radial-gradient(circle,_var(--accent-1),_transparent_70%)]"></div>
        <div className="bg-orb absolute rounded-full filter blur-[120px] opacity-40 animate-[floatOrb_30s_ease-in-out_infinite] w-[500px] h-[500px] top-[40%] right-[-10%] bg-[radial-gradient(circle,_var(--accent-2),_transparent_70%)] delay-[-5s]"></div>
        <div className="bg-orb absolute rounded-full filter blur-[120px] opacity-40 animate-[floatOrb_22s_ease-in-out_infinite] w-[450px] h-[450px] bottom-[-5%] left-[20%] bg-[radial-gradient(circle,_var(--accent-3),_transparent_70%)] delay-[-10s]"></div>
        <div className="bg-orb absolute rounded-full filter blur-[120px] opacity-40 animate-[floatOrb_28s_ease-in-out_infinite] w-[350px] h-[350px] top-[60%] left-[50%] bg-[radial-gradient(circle,_var(--accent-4),_transparent_70%)] delay-[-15s]"></div>
        <div className="bg-orb absolute rounded-full filter blur-[120px] opacity-40 animate-[floatOrb_35s_ease-in-out_infinite] w-[300px] h-[300px] top-[20%] left-[60%] bg-[radial-gradient(circle,_var(--accent-5),_transparent_70%)] delay-[-8s]"></div>
      </div>
      <div className="bg-grid fixed top-0 left-0 w-full h-full z-[1] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,_transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
    </>
  );
};

export default Background;
