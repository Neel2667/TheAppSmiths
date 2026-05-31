import { useState, useEffect } from 'react';
import { Layout, Smartphone, Monitor, Shield, Database, Sparkles, UserCheck, CreditCard, Radio, Link as LinkIcon } from 'lucide-react';

export default function Calculator({ onApplyEstimate }) {
  const [platforms, setPlatforms] = useState({
    web: true,
    mobile: false,
    desktop: false
  });
  
  const [scale, setScale] = useState('cloud'); // 'local', 'cloud', 'enterprise'
  
  const [features, setFeatures] = useState({
    auth: true,
    payments: false,
    apis: false,
    ai: false,
    notifications: false
  });

  const [estimate, setEstimate] = useState({ cost: 0, weeks: 0 });

  useEffect(() => {
    let baseCost = 0;
    let baseWeeks = 0;

    // Platform calculation
    if (platforms.web) { baseCost += 3000; baseWeeks += 3; }
    if (platforms.mobile) { baseCost += 4500; baseWeeks += 4; }
    if (platforms.desktop) { baseCost += 4000; baseWeeks += 4; }

    // scale / database additions
    if (scale === 'local') { baseCost += 500; baseWeeks += 1; }
    if (scale === 'cloud') { baseCost += 1500; baseWeeks += 2; }
    if (scale === 'enterprise') { baseCost += 4000; baseWeeks += 4; }

    // Features additions
    if (features.auth) { baseCost += 800; baseWeeks += 0.5; }
    if (features.payments) { baseCost += 1200; baseWeeks += 1; }
    if (features.apis) { baseCost += 1000; baseWeeks += 1; }
    if (features.ai) { baseCost += 2500; baseWeeks += 2; }
    if (features.notifications) { baseCost += 700; baseWeeks += 0.5; }

    // Discount if multi-platform
    const activePlatforms = Object.values(platforms).filter(Boolean).length;
    if (activePlatforms > 1) {
      baseCost = baseCost * (1 - 0.15 * (activePlatforms - 1)); // 15% discount for additional platforms
    }

    setEstimate({
      cost: Math.round(baseCost),
      weeks: Math.round(baseWeeks)
    });
  }, [platforms, scale, features]);

  const togglePlatform = (key) => {
    setPlatforms(prev => {
      const next = { ...prev, [key]: !prev[key] };
      // Keep at least one selected
      if (!Object.values(next).some(Boolean)) return prev;
      return next;
    });
  };

  const toggleFeature = (key) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApply = () => {
    const selectedPlatforms = Object.entries(platforms)
      .filter(([_, v]) => v)
      .map(([k, _]) => k.charAt(0).toUpperCase() + k.slice(1))
      .join(', ');

    const selectedFeatures = Object.entries(features)
      .filter(([_, v]) => v)
      .map(([k, _]) => k.charAt(0).toUpperCase() + k.slice(1))
      .join(', ');

    const text = `I used the Cost Estimator and would like a quote. Let's discuss a ${scale.toUpperCase()}-scale project built for: [${selectedPlatforms}] containing features: [${selectedFeatures || 'None'}]. Estimated budget: $${estimate.cost.toLocaleString()} over ${estimate.weeks} weeks.`;
    
    onApplyEstimate(text);
  };

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] p-6 md:p-10 backdrop-blur-2xl grid lg:grid-cols-12 gap-8 items-stretch relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Configuration Column */}
      <div className="lg:col-span-7 space-y-6 text-left relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            1. Select Platforms
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'web', label: 'Web App', icon: Layout },
              { id: 'mobile', label: 'Mobile App', icon: Smartphone },
              { id: 'desktop', label: 'Desktop OS', icon: Monitor }
            ].map(item => {
              const Icon = item.icon;
              const active = platforms[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => togglePlatform(item.id)}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2.5 transition-all cursor-pointer ${
                    active 
                      ? 'border-cyan-400 bg-cyan-400/10 text-white shadow-lg shadow-cyan-400/5' 
                      : 'border-white/5 bg-white/5 text-zinc-400 hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-cyan-400' : 'text-zinc-400'}`} />
                  <span className="text-xs font-semibold">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            2. System Scale & Data Model
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'local', label: 'Local Vault', desc: 'Offline, secure local storage (e.g. SafePass)', icon: Shield },
              { id: 'cloud', label: 'Cloud Sync', desc: 'Real-time database, cloud sync (e.g. RentFlow)', icon: Database },
              { id: 'enterprise', label: 'Enterprise OS', desc: 'Complex API systems, high loads', icon: Sparkles }
            ].map(item => {
              const Icon = item.icon;
              const active = scale === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setScale(item.id)}
                  className={`p-4 rounded-2xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                    active 
                      ? 'border-blue-500 bg-blue-500/10 text-white shadow-lg shadow-blue-500/5' 
                      : 'border-white/5 bg-white/5 text-zinc-400 hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-blue-400' : 'text-zinc-400'}`} />
                  <div className="font-bold text-xs">{item.label}</div>
                  <div className="text-[10px] text-zinc-400 leading-normal">{item.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            3. Feature Integrations
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {[
              { id: 'auth', label: 'User Auth', icon: UserCheck },
              { id: 'payments', label: 'Stripe Pay', icon: CreditCard },
              { id: 'apis', label: 'Custom APIs', icon: LinkIcon },
              { id: 'ai', label: 'AI LLM Agent', icon: Sparkles },
              { id: 'notifications', label: 'Live Notifications', icon: Radio }
            ].map(item => {
              const Icon = item.icon;
              const active = features[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => toggleFeature(item.id)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer ${
                    active 
                      ? 'border-purple-500 bg-purple-500/10 text-white shadow-lg shadow-purple-500/5' 
                      : 'border-white/5 bg-white/5 text-zinc-400 hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-purple-400' : 'text-zinc-400'}`} />
                  <span className="text-[10px] font-semibold">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Output Summary Column */}
      <div className="lg:col-span-5 bg-black/40 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between text-left relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 blur-[50px] rounded-full pointer-events-none" />
        
        <div className="space-y-6">
          <div>
            <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block mb-1">Project Estimate Summary</span>
            <h4 className="text-2xl font-black text-white">Ballpark Budget</h4>
          </div>

          <div className="space-y-2 border-b border-white/5 pb-6">
            <div className="text-zinc-500 text-xs">Estimated Cost</div>
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
              ${estimate.cost.toLocaleString()}
            </div>
            <div className="text-[10px] text-zinc-500 italic">*Based on high-polish agency custom code. Includes a 15% multi-platform discount.</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-zinc-500 text-xs">Development Time</div>
              <div className="text-2xl font-black text-white mt-1">{estimate.weeks} Weeks</div>
            </div>
            <div>
              <div className="text-zinc-500 text-xs">Build Grade</div>
              <div className="text-2xl font-black text-cyan-400 mt-1">Enterprise</div>
            </div>
          </div>
        </div>

        <div className="pt-6 mt-6 lg:mt-0">
          <button
            onClick={handleApply}
            className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            Apply Estimate to Consultation ↗
          </button>
        </div>
      </div>
    </div>
  );
}
