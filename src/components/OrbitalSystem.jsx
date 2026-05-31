import { useEffect, useState } from 'react';
import { Sparkles, Terminal, Database, Server, Smartphone, Layout, Link as LinkIcon, Lock } from 'lucide-react';

export default function OrbitalSystem() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationId;
    const tick = () => {
      setRotation(prev => (prev + 0.3) % 360);
      animationId = requestAnimationFrame(tick);
    };
    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Concentric Rings Configuration
  const rings = [
    {
      radius: 110,
      speedMultiplier: 1,
      items: [
        { name: 'React', icon: Layout, color: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5' },
        { name: 'Kotlin', icon: Smartphone, color: 'text-purple-400 border-purple-400/30 bg-purple-400/5' },
        { name: 'Node.js', icon: Server, color: 'text-green-400 border-green-400/30 bg-green-400/5' }
      ]
    },
    {
      radius: 180,
      speedMultiplier: -0.7, // Reverse orbit direction
      items: [
        { name: 'Python', icon: Terminal, color: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5' },
        { name: 'Postgres', icon: Database, color: 'text-blue-400 border-blue-400/30 bg-blue-400/5' },
        { name: 'Tailwind 4', icon: Sparkles, color: 'text-pink-400 border-pink-400/30 bg-pink-400/5' },
        { name: 'Secure AES', icon: Lock, color: 'text-red-400 border-red-400/30 bg-red-400/5' }
      ]
    },
    {
      radius: 250,
      speedMultiplier: 0.4,
      items: [
        { name: 'Gemini AI', icon: Sparkles, color: 'text-cyan-300 border-cyan-300/40 bg-cyan-300/10' },
        { name: 'Rest APIs', icon: LinkIcon, color: 'text-indigo-400 border-indigo-400/30 bg-indigo-400/5' }
      ]
    }
  ];

  return (
    <div className="w-full max-w-[600px] h-[500px] mx-auto flex items-center justify-center relative overflow-hidden select-none">
      
      {/* Central Core: The Appsmiths pulsing sun */}
      <div className="w-24 h-24 rounded-full bg-cyan-500/10 border border-cyan-400/40 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.2)] animate-pulse relative z-20">
        <Sparkles className="w-8 h-8 text-cyan-400" />
        <span className="text-[9px] font-black tracking-widest text-cyan-300 uppercase mt-1">Core</span>
      </div>

      {/* Orbit Rings (3D perspective container) */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        {rings.map((ring, ringIdx) => {
          const ringAngle = rotation * ring.speedMultiplier;
          
          return (
            <div
              key={ringIdx}
              className="absolute rounded-full border border-white/5 flex items-center justify-center"
              style={{
                width: `${ring.radius * 2}px`,
                height: `${ring.radius * 2}px`,
                transform: 'rotateX(65deg) rotateY(-15deg)',
                transformStyle: 'preserve-3d',
                boxShadow: 'inset 0 0 20px rgba(6,182,212,0.01)'
              }}
            >
              {ring.items.map((item, itemIdx) => {
                const Icon = item.icon;
                // Calculate item angular position along the ring
                const angleOffset = (itemIdx / ring.items.length) * Math.PI * 2;
                const angle = (ringAngle * Math.PI) / 180 + angleOffset;
                
                // Position calculations on the X/Y circular plane
                const x = Math.cos(angle) * ring.radius;
                const y = Math.sin(angle) * ring.radius;

                return (
                  <div
                    key={itemIdx}
                    className="absolute pointer-events-auto cursor-help group"
                    style={{
                      transform: `translate3d(${x}px, ${y}px, 0px) rotateY(15deg) rotateX(-65deg)`, // Inverse rotation to keep panels flat to viewer
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Floating Planet Badge */}
                    <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] ${item.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-black tracking-tight">{item.name}</span>
                    </div>

                    {/* Orbit tooltip description */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-lg bg-black border border-white/10 text-[9px] text-zinc-400 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 z-30">
                      Standard Appsmiths Stack tool.
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
