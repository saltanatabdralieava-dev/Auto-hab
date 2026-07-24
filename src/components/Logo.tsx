import React, { useState } from 'react';

// ============================================================================
// 1. THE CROWN JEWEL: REDESIGNED PREMIUM ASKAR AUTOHUB EMBLEM (LogoIcon)
// Combines: Letter A, Luxury Vehicle Silhouette, Road Perspective, AI Network, 
// Trust Shield, and Kyrgyzstan Mountain Silhouette in one unified vector masterpiece.
// ============================================================================

interface LogoIconProps {
  size?: number;
  variant?: 'default' | 'white' | 'dark' | 'transparent' | 'vector';
  className?: string;
  animate?: boolean;
}

export function LogoIcon({ 
  size = 48, 
  variant = 'default',
  className = "",
  animate = true
}: LogoIconProps) {
  // Determine gradient IDs and styles based on variants
  const idPrefix = `askar-logo-${variant}`;

  const isWhite = variant === 'white';
  const isVector = variant === 'vector';
  
  // Custom theme colors for vector style or normal
  const strokeColor = isVector ? '#3B82F6' : (isWhite ? '#FFFFFF' : 'url(#' + idPrefix + '-gold)');
  const mainAColor = isWhite ? '#FFFFFF' : 'url(#' + idPrefix + '-silver)';
  const mountainColor = isWhite ? '#FFFFFF' : 'url(#' + idPrefix + '-mountain-grad)';
  const roadColor = isWhite ? '#FFFFFF' : 'url(#' + idPrefix + '-road-grad)';
  const vehicleColor = isWhite ? '#FFFFFF' : 'url(#' + idPrefix + '-electric-blue)';

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
    >
      {/* -------------------- DEFINITIONS (Gradients & Filters) -------------------- */}
      <defs>
        {/* Deep Royal & Midnight Blue Background Gradient */}
        <linearGradient id={`${idPrefix}-shield-bg`} x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#050C1E" />
          <stop offset="40%" stopColor="#0B1D40" />
          <stop offset="80%" stopColor="#0F2A5C" />
          <stop offset="100%" stopColor="#02040A" />
        </linearGradient>

        {/* Silver Metallic Gradient for Letter A */}
        <linearGradient id={`${idPrefix}-silver`} x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#F1F5F9" />
          <stop offset="50%" stopColor="#CBD5E1" />
          <stop offset="75%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        {/* Electric & Cyan Gradient for AI/Tech Highlights */}
        <linearGradient id={`${idPrefix}-electric-blue`} x1="30" y1="80" x2="90" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="35%" stopColor="#3B82F6" />
          <stop offset="70%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>

        {/* Mountain Silhouette Gradient (Kyrgyzstan Snowy Peaks) */}
        <linearGradient id={`${idPrefix}-mountain-grad`} x1="60" y1="35" x2="60" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="30%" stopColor="#E2E8F0" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#94A3B8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
        </linearGradient>

        {/* Luxury Gold/Champagne Border Gradient */}
        <linearGradient id={`${idPrefix}-gold`} x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE599" />
          <stop offset="30%" stopColor="#E5B23C" />
          <stop offset="70%" stopColor="#C99018" />
          <stop offset="100%" stopColor="#8A5A00" />
        </linearGradient>

        {/* Road Perspective Gradient */}
        <linearGradient id={`${idPrefix}-road-grad`} x1="60" y1="92" x2="60" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E293B" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
        </linearGradient>

        {/* Hologram Pulse Effect Filter */}
        <filter id={`${idPrefix}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* -------------------- 1. OUTER SHIELD (Trust & Safety) -------------------- */}
      {variant !== 'transparent' && variant !== 'vector' && (
        <>
          {/* Subtle Outer Glow Shadow */}
          <path 
            d="M60 6 L104 22 C104 22 106 65 102 82 C96 102 60 114 60 114 C60 114 24 102 18 82 C14 65 16 22 16 22 Z" 
            fill="#030712" 
            opacity="0.3"
            className="transition-transform duration-300 transform translate-y-1.5"
          />
          {/* Main Shield Background */}
          <path 
            d="M60 6 L104 22 C104 22 106 65 102 82 C96 102 60 114 60 114 C60 114 24 102 18 82 C14 65 16 22 16 22 Z" 
            fill={`url(#${idPrefix}-shield-bg)`}
            stroke={`url(#${idPrefix}-gold)`}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* High-tech Inner Carbon/Vector Frame border */}
          <path 
            d="M60 11 L98 25 C98 25 99.5 62.5 96.5 77 C91.5 93.5 60 108 60 108 C60 108 28.5 93.5 23.5 77 C20.5 62.5 22 25 22 25 Z" 
            stroke="white" 
            strokeWidth="0.75" 
            strokeDasharray="2 2"
            opacity="0.2" 
          />
        </>
      )}

      {/* -------------------- 2. TECHNICAL GRID LINES (Vector Mode) -------------------- */}
      {isVector && (
        <>
          {/* Engineering Blueprint Ring & Grid */}
          <rect x="2" y="2" width="116" height="116" rx="12" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
          <circle cx="60" cy="60" r="54" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.3" />
          <circle cx="60" cy="60" r="38" stroke="#3B82F6" strokeWidth="0.5" opacity="0.2" />
          <line x1="60" y1="0" x2="60" y2="120" stroke="#3B82F6" strokeWidth="0.5" opacity="0.3" />
          <line x1="0" y1="60" x2="120" y2="60" stroke="#3B82F6" strokeWidth="0.5" opacity="0.3" />
          
          {/* Technical coordinate labels */}
          <text x="64" y="14" fill="#3B82F6" fontSize="6" fontFamily="monospace" opacity="0.6">N_74°</text>
          <text x="102" y="66" fill="#3B82F6" fontSize="6" fontFamily="monospace" opacity="0.6">E_42°</text>
          
          {/* Outer wireframe path */}
          <path 
            d="M60 6 L104 22 C104 22 106 65 102 82 C96 102 60 114 60 114 C60 114 24 102 18 82 C14 65 16 22 16 22 Z" 
            stroke="#10B981" 
            strokeWidth="1" 
            strokeDasharray="1 1"
            opacity="0.8"
          />
        </>
      )}

      {/* -------------------- 3. PERSPECTIVE ROAD (The Journey / Platform) -------------------- */}
      <path 
        d="M48 58 L72 58 L88 94 L32 94 Z" 
        fill={roadColor}
        opacity={isWhite ? "0.2" : "0.7"}
      />
      
      {/* Road Markings converging */}
      <line 
        x1="60" y1="94" x2="60" y2="58" 
        stroke={isWhite ? "#FFFFFF" : "#06B6D4"} 
        strokeWidth="1.5" 
        strokeDasharray="4 3" 
        opacity="0.7"
      />

      {/* -------------------- 4. THE JAGGED MOUNTAINS (Kyrgyzstan Peak Ala-Too) -------------------- */}
      {/* Front sharp snow-capped mountains inside */}
      <path 
        d="M32 80 L52 44 L62 58 L72 38 L88 80 Z" 
        fill={mountainColor}
        stroke={strokeColor}
        strokeWidth="0.5"
        opacity="0.85"
      />
      {/* Mountain Shading for premium multi-dimensional depth */}
      <path 
        d="M52 44 L56 50 L50 62 L32 80 Z" 
        fill="black" 
        opacity="0.12" 
      />
      <path 
        d="M72 38 L76 48 L68 64 L60 80 L88 80 Z" 
        fill="white" 
        opacity="0.1" 
      />

      {/* -------------------- 5. THE CAPITAL LETTER 'A' (Askar / AutoHub) -------------------- */}
      {/* Sleek bold A legs styled as an aerospace wing profile framing the mountain */}
      {/* Left Wing Leg */}
      <path 
        d="M57 15 C54 20 42 54 30 92 L41 92 C46 72 54 44 58 26 Z" 
        fill={mainAColor}
        filter={animate && !isWhite && !isVector ? `url(#${idPrefix}-glow)` : undefined}
      />
      {/* Right Wing Leg */}
      <path 
        d="M63 15 C66 20 78 54 90 92 L79 92 C74 72 66 44 62 26 Z" 
        fill={mainAColor}
        filter={animate && !isWhite && !isVector ? `url(#${idPrefix}-glow)` : undefined}
      />
      
      {/* Top Cap Connection (Glossy highlight) */}
      <path 
        d="M57 15 C57 15 60 12 63 15 L62 26 C62 26 60 21 58 26 Z" 
        fill={isWhite ? "#FFFFFF" : "#F8FAFC"}
      />

      {/* -------------------- 6. LUXURY HYPERCAR SILHOUETTE (Precision Automotive) -------------------- */}
      {/* Beautiful horizontal sleek supercar contour intersecting the road */}
      <path 
        d="M33 76 C42 70 50 69 60 70 C70 69 78 70 87 76 C89 77.5 84 80 60 80 C36 80 31 77.5 33 76 Z" 
        fill={isWhite ? "#FFFFFF" : "#0F172A"} 
        stroke={isWhite ? "#FFFFFF" : "url(#" + idPrefix + "-electric-blue)"}
        strokeWidth="1.5"
        className={animate ? "animate-pulse" : ""}
      />
      {/* Laser LED headlights */}
      <circle cx="36" cy="76" r="1" fill="#22D3EE" filter="drop-shadow(0 0 2px #22D3EE)" />
      <circle cx="84" cy="76" r="1" fill="#22D3EE" filter="drop-shadow(0 0 2px #22D3EE)" />
      
      {/* Elegant chrome splitter */}
      <path d="M42 79 L78 79" stroke={strokeColor} strokeWidth="0.75" />

      {/* -------------------- 7. AI DIGITAL NETWORK (Nodes & Cyber Connections) -------------------- */}
      {/* Neural cyber lines emanating from the apex */}
      <g opacity={isWhite ? "0.4" : "0.9"}>
        {/* Connection lines */}
        <line x1="60" y1="14" x2="44" y2="30" stroke={vehicleColor} strokeWidth="0.75" strokeDasharray="1 1" />
        <line x1="60" y1="14" x2="76" y2="30" stroke={vehicleColor} strokeWidth="0.75" strokeDasharray="1 1" />
        <line x1="60" y1="14" x2="60" y2="34" stroke={vehicleColor} strokeWidth="0.75" />
        <line x1="44" y1="30" x2="32" y2="44" stroke={vehicleColor} strokeWidth="0.5" />
        <line x1="76" y1="30" x2="88" y2="44" stroke={vehicleColor} strokeWidth="0.5" />

        {/* Central pulsing core node at the peak of A */}
        <circle cx="60" cy="14" r="3" fill="#06B6D4" className={animate ? "animate-ping" : ""} style={{ transformOrigin: '60px 14px' }} />
        <circle cx="60" cy="14" r="2.2" fill="#FFFFFF" stroke="#0891B2" strokeWidth="1" />

        {/* Side network satellite nodes */}
        <circle cx="44" cy="30" r="1.5" fill="#3B82F6" />
        <circle cx="76" cy="30" r="1.5" fill="#3B82F6" />
        <circle cx="32" cy="44" r="1.2" fill="#60A5FA" />
        <circle cx="88" cy="44" r="1.2" fill="#60A5FA" />
        
        {/* Core brain node intersecting mountains */}
        <circle cx="60" cy="34" r="1.5" fill="#22D3EE" />
      </g>

      {/* Glowing Star/Sparkle of Excellence (Kyrgyzstan Sun Symbol tribute) */}
      {!isVector && (
        <path 
          d="M60 2 L61 5 L64 6 L61 7 L60 10 L59 7 L56 6 L59 5 Z" 
          fill={isWhite ? "#FFFFFF" : "url(#" + idPrefix + "-gold)"} 
          className={animate ? "animate-pulse" : ""}
        />
      )}
    </svg>
  );
}

// ============================================================================
// 2. FULL HORIZONTAL LOGO
// ============================================================================
interface LogoProps {
  className?: string;
  iconSize?: number;
  theme?: 'light' | 'dark' | 'white';
  showSubtitle?: boolean;
}

export function Logo({ 
  className = "", 
  iconSize = 44, 
  theme = "dark",
  showSubtitle = true 
}: LogoProps) {
  // Setup color schema
  const isLight = theme === 'light';
  const isWhite = theme === 'white';

  const titleColor = isWhite ? 'text-white' : (isLight ? 'text-[#050C1E]' : 'text-white');
  const accentColor = isWhite ? 'text-white/80' : 'text-blue-500';
  const countryColor = isWhite ? 'text-white/60' : (isLight ? 'text-slate-600' : 'text-slate-400');
  const sloganColor = isWhite ? 'text-white/50' : 'text-blue-400/90';

  return (
    <div className={`flex items-center space-x-3.5 select-none group ${className}`}>
      <LogoIcon 
        size={iconSize} 
        variant={isWhite ? 'white' : (isLight ? 'default' : 'default')} 
        className="transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"
      />
      <div className="flex flex-col text-left">
        {/* Redesigned Premium Title - Clean, Bold, spaced */}
        <h2 className="font-sans text-lg font-black tracking-[0.06em] leading-none uppercase">
          <span className={titleColor}>ASKAR </span>
          <span className={accentColor}>AUTOHUB</span>
        </h2>
        
        {/* Smaller Kyrgyzstan location and Tagline */}
        {showSubtitle && (
          <div className="flex flex-col mt-1 space-y-0.5">
            <span className={`text-[9px] font-black tracking-[0.25em] uppercase leading-none ${countryColor}`}>
              KYRGYZSTAN
            </span>
            <span className={`text-[8px] font-medium tracking-wide uppercase leading-none ${sloganColor}`}>
              AI Automotive Platform
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 3. VERTICAL LOGO
// ============================================================================
export function LogoVertical({ 
  iconSize = 64, 
  theme = "dark",
  showSubtitle = true 
}: { 
  iconSize?: number; 
  theme?: 'light' | 'dark' | 'white';
  showSubtitle?: boolean;
}) {
  const isLight = theme === 'light';
  const isWhite = theme === 'white';

  const titleColor = isWhite ? 'text-white' : (isLight ? 'text-[#050C1E]' : 'text-white');
  const accentColor = isWhite ? 'text-white/80' : 'text-blue-500';
  const countryColor = isWhite ? 'text-white/60' : (isLight ? 'text-slate-600' : 'text-slate-400');
  const sloganColor = isWhite ? 'text-white/50' : 'text-blue-400/90';

  return (
    <div className="flex flex-col items-center text-center select-none group p-4">
      <LogoIcon 
        size={iconSize} 
        variant={isWhite ? 'white' : 'default'} 
        className="mb-3 transition-transform duration-500 group-hover:scale-110"
      />
      <h2 className="font-sans text-xl font-black tracking-[0.08em] leading-none uppercase">
        <span className={titleColor}>ASKAR </span>
        <span className={accentColor}>AUTOHUB</span>
      </h2>
      {showSubtitle && (
        <div className="flex flex-col items-center mt-2 space-y-1">
          <span className={`text-[10px] font-black tracking-[0.3em] uppercase leading-none ${countryColor}`}>
            KYRGYZSTAN
          </span>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent my-1" />
          <span className={`text-[8.5px] font-semibold tracking-wider uppercase leading-none ${sloganColor}`}>
            AI Automotive Platform
          </span>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 4. APP ICON
// ============================================================================
export function LogoAppIcon({ size = 80 }: { size?: number }) {
  return (
    <div 
      className="relative flex items-center justify-center bg-gradient-to-br from-[#020617] to-[#0f172a] border border-white/10 rounded-2xl shadow-xl overflow-hidden group select-none"
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <LogoIcon size={size * 0.75} variant="default" className="relative z-10 transition-transform duration-500 group-hover:scale-105" />
    </div>
  );
}

// ============================================================================
// 5. FAVICON ICON
// ============================================================================
export function LogoFavicon({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center select-none">
      <LogoIcon size={size} variant="transparent" animate={false} />
    </div>
  );
}

// ============================================================================
// 6. MONOCHROME WHITE VERSION
// ============================================================================
export function LogoWhite({ iconSize = 44, showSubtitle = true }: { iconSize?: number, showSubtitle?: boolean }) {
  return <Logo theme="white" iconSize={iconSize} showSubtitle={showSubtitle} />;
}

// ============================================================================
// 7. MONOCHROME DARK VERSION (With Rich dark background backing)
// ============================================================================
export function LogoDark({ iconSize = 44, showSubtitle = true }: { iconSize?: number, showSubtitle?: boolean }) {
  return (
    <div className="bg-[#030712] p-3 rounded-xl inline-block border border-white/5">
      <Logo theme="dark" iconSize={iconSize} showSubtitle={showSubtitle} />
    </div>
  );
}

// ============================================================================
// 8. BRAND GUIDE IDENTITY SHOWCASE DIALOG
// Let the users view, inspect, and copy all these newly designed assets!
// ============================================================================

export function BrandShowcase({ onClose }: { onClose: () => void }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const assets = [
    {
      title: '1. Full Horizontal Logo',
      desc: 'The primary lockup for the top navbar, letterheads, and main digital assets.',
      element: <Logo theme="dark" iconSize={48} />,
      code: `<Logo theme="dark" iconSize={48} />`
    },
    {
      title: '2. Vertical Logo',
      desc: 'Balanced stack layout suited for dashboards, footers, and mobile loading views.',
      element: <LogoVertical iconSize={64} theme="dark" />,
      code: `<LogoVertical iconSize={64} theme="dark" />`
    },
    {
      title: '3. Premium App Icon',
      desc: 'High-end app launcher look with rich ambient glassmorphism shadows.',
      element: <LogoAppIcon size={80} />,
      code: `<LogoAppIcon size={80} />`
    },
    {
      title: '4. Favicon / Minimal',
      desc: 'Compact layout optimized for browser tabs, navigation points, and minor footprints.',
      element: <LogoFavicon size={36} />,
      code: `<LogoFavicon size={32} />`
    },
    {
      title: '5. Luxury White Version',
      desc: 'Pure monochrome styling for dark backgrounds and premium print/engraving overlays.',
      element: <div className="bg-slate-950 p-6 rounded-xl border border-white/10"><LogoWhite iconSize={44} /></div>,
      code: `<Logo theme="white" iconSize={44} />`
    },
    {
      title: '6. Luxury Dark Card',
      desc: 'Self-contained dark block with rich navy base backing and gold highlights.',
      element: <LogoDark iconSize={44} />,
      code: `<LogoDark iconSize={44} />`
    },
    {
      title: '7. Transparent PNG Style',
      desc: 'Clean vector emblem without background borders, ideal for watermarks or image overlays.',
      element: <div className="p-4 bg-slate-800 rounded-xl flex justify-center"><LogoIcon size={64} variant="transparent" /></div>,
      code: `<LogoIcon size={64} variant="transparent" />`
    },
    {
      title: '8. Technical Vector Blueprint',
      desc: 'Wireframe blueprint style showcasing coordinates, vector nodes, and alignment paths.',
      element: <div className="p-4 bg-blue-950/20 border border-blue-500/30 rounded-xl flex justify-center"><LogoIcon size={64} variant="vector" /></div>,
      code: `<LogoIcon size={64} variant="vector" />`
    }
  ];

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-[10000] flex items-center justify-center overflow-y-auto p-4 sm:p-6 backdrop-blur-md font-sans text-white">
      <div className="bg-[#050B18] w-full max-w-5xl rounded-3xl border border-white/15 shadow-2xl p-6 sm:p-10 relative overflow-hidden my-8">
        
        {/* Glow decorative overlays */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 mb-8 text-left gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-500/40 px-3.5 py-1 rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">ASKAR AUTOHUB BRAND IDENTITY</span>
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight">
              БРЕНД-БУК &amp; ПРЕМИУМ-ИДЕНТИКА
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Эксклюзивный фирменный стиль Askar AutoHub — международный технологический автомобильный холдинг в Кыргызстане.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
          >
            Закрыть бренд-бук &times;
          </button>
        </div>

        {/* Grid of the 8 Assets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left relative z-10 mb-8">
          {assets.map((asset, index) => (
            <div 
              key={index} 
              className="bg-black/40 border border-white/5 hover:border-white/15 rounded-2xl p-5.5 flex flex-col justify-between transition-all duration-300"
            >
              <div className="space-y-3">
                <h3 className="font-bold text-xs text-blue-400 tracking-wide">{asset.title}</h3>
                <p className="text-[10.5px] text-slate-400 leading-relaxed font-light">{asset.desc}</p>
                <div className="min-h-[110px] flex items-center justify-center bg-slate-900/50 rounded-xl p-3 border border-white/3">
                  {asset.element}
                </div>
              </div>
              
              <button
                onClick={() => handleCopyCode(asset.code, index)}
                className="mt-4 w-full py-2 bg-white/5 hover:bg-blue-600/20 hover:text-white border border-white/5 hover:border-blue-500/30 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all"
              >
                {copiedIndex === index ? '✓ Скопировано!' : 'Копировать JSX'}
              </button>
            </div>
          ))}
        </div>

        {/* Brand values / guidelines footer */}
        <div className="bg-white/3 border border-white/5 rounded-2xl p-5 text-left relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400 leading-relaxed">
          <div>
            <h4 className="font-black text-white uppercase tracking-wider mb-2 text-[10px]">ФИЛОСОФИЯ СИМВОЛИКИ</h4>
            <p className="font-light">
              Эмблема сочетает в себе литеру <strong>A</strong> (Аскар) с величественными пиками гор Ала-Too. Внутренний силуэт спорткара и перспектива дороги олицетворяют динамику, а цифровая сеть сверху — искусственный интеллект платформы.
            </p>
          </div>
          <div>
            <h4 className="font-black text-white uppercase tracking-wider mb-2 text-[10px]">ЦВЕТОВАЯ ПАЛИТРА</h4>
            <p className="font-light">
              Королевский синий символизирует благородство и доверие. Электрический синий передает инновации, а золотисто-платиновые рамки отражают премиальность, надежность и люксовое качество сервиса.
            </p>
          </div>
          <div>
            <h4 className="font-black text-white uppercase tracking-wider mb-2 text-[10px]">ОРИЕНТАЦИЯ НА РЫНОК</h4>
            <p className="font-light">
              Дизайн спроектирован в духе ведущих премиальных холдингов мира, сочетая строгие корпоративные стандарты с эстетикой кибернетики. Подходит для работы с марками класса люкс: Tesla, Porsche, Mercedes-Benz.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
