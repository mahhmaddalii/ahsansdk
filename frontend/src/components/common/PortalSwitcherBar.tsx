'use client';

import React from 'react';
import { useGrocery } from '../../context/GroceryContext';
import { Globe, Smartphone, Monitor, Tablet, Layers } from 'lucide-react';

interface PortalSwitcherBarProps {
  deviceView: 'responsive' | 'mobile' | 'tablet' | 'desktop';
  setDeviceView: (view: 'responsive' | 'mobile' | 'tablet' | 'desktop') => void;
  title?: string;
}

export const PortalSwitcherBar: React.FC<PortalSwitcherBarProps> = ({
  deviceView,
  setDeviceView,
  title,
}) => {
  const { language, setLanguage } = useGrocery();

  return (
    <div className="bg-slate-900 text-slate-200 text-xs border-b border-slate-800 relative z-30 px-3 py-1.5 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Info Label */}
        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold text-slate-300">{title || 'Karyana Express'}</span>
        </div>

        {/* Center: Device Simulation Selector */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60">
          <button
            onClick={() => setDeviceView('responsive')}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
              deviceView === 'responsive'
                ? 'bg-slate-700 text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Responsive</span>
          </button>
          <button
            onClick={() => setDeviceView('mobile')}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
              deviceView === 'mobile'
                ? 'bg-slate-700 text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3 h-3" />
            <span>Mobile</span>
          </button>
          <button
            onClick={() => setDeviceView('tablet')}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
              deviceView === 'tablet'
                ? 'bg-slate-700 text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tablet className="w-3 h-3" />
            <span>Tablet</span>
          </button>
          <button
            onClick={() => setDeviceView('desktop')}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
              deviceView === 'desktop'
                ? 'bg-slate-700 text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3 h-3" />
            <span>Desktop</span>
          </button>
        </div>

        {/* Right: Language Switcher */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-[11px] border border-slate-700 transition-colors"
        >
          <Globe className="w-3 h-3 text-emerald-400" />
          <span>{language === 'en' ? 'اردو' : 'English'}</span>
        </button>
      </div>
    </div>
  );
};
