// Saku — shared UI components
// All component-scoped style objects use unique names.

const { useState, useEffect, useRef, useMemo } = React;

// ─── Icons (line, 24px) ──────────────────────────────────────
const Icon = ({ name, size = 22, stroke = 'currentColor', sw = 1.8 }) => {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke, strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'home':       return <svg {...p}><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2v-9z"/></svg>;
    case 'list':       return <svg {...p}><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/></svg>;
    case 'plus':       return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case 'pie':        return <svg {...p}><path d="M21 12A9 9 0 1 1 12 3v9h9z"/><path d="M21 12c0-5-4-9-9-9"/></svg>;
    case 'grid':       return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>;
    case 'wallet':     return <svg {...p}><path d="M19 7H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 14h.01M21 9V7a2 2 0 0 0-2-2H6a3 3 0 0 1-3-3"/></svg>;
    case 'bell':       return <svg {...p}><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>;
    case 'wa':         return <svg width={size} height={size} viewBox="0 0 24 24" fill={stroke}><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.4 1.7.7 2.4.8 3.3.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z"/><path d="M20.5 3.5A10 10 0 0 0 3 17l-1 5 5-1a10 10 0 0 0 13.5-13.5zM12 20a8 8 0 0 1-4-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20z"/></svg>;
    case 'arrow-up':   return <svg {...p}><path d="M7 17L17 7M7 7h10v10"/></svg>;
    case 'arrow-down': return <svg {...p}><path d="M17 7L7 17M17 17H7V7"/></svg>;
    case 'arrow-right':return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'arrow-left': return <svg {...p}><path d="M19 12H5M11 18l-6-6 6-6"/></svg>;
    case 'transfer':   return <svg {...p}><path d="M16 3l4 4-4 4M20 7H8M8 21l-4-4 4-4M4 17h12"/></svg>;
    case 'settings':   return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8h0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>;
    case 'eye':        return <svg {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>;
    case 'eye-off':    return <svg {...p}><path d="M17.9 17.9A10.1 10.1 0 0 1 12 19c-6 0-10-7-10-7a18 18 0 0 1 4.6-5.3M9.9 4.2A10 10 0 0 1 12 4c6 0 10 7 10 7a18 18 0 0 1-2.2 3.2M14.1 14.1a3 3 0 0 1-4.2-4.2"/><path d="M3 3l18 18"/></svg>;
    case 'search':     return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>;
    case 'filter':     return <svg {...p}><path d="M3 4h18M6 12h12M10 20h4"/></svg>;
    case 'check':      return <svg {...p}><path d="M5 12l5 5L20 7"/></svg>;
    case 'close':      return <svg {...p}><path d="M18 6L6 18M6 6l12 12"/></svg>;
    case 'edit':       return <svg {...p}><path d="M11 4H4v16h16v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
    case 'trash':      return <svg {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>;
    case 'calendar':   return <svg {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
    case 'tag':        return <svg {...p}><path d="M20.6 13.4L13 21a2 2 0 0 1-2.8 0L3 13.8V3h10.8L21 10.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1"/></svg>;
    case 'flame':      return <svg {...p}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c0 .5-.5 1-1 1.5a3 3 0 0 1-2-2.5c0-3 4-5 4-9 0 3 2 4 2 7a4 4 0 1 1-8 0c0-1 .5-2 1.5-2.5z"/></svg>;
    case 'drag':       return <svg {...p}><circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/></svg>;
    case 'sparkle':    return <svg {...p}><path d="M12 3l1.9 5.7L20 10l-6.1 1.3L12 17l-1.9-5.7L4 10l6.1-1.3L12 3zM19 17l.5 2 2 .5-2 .5L19 22l-.5-2-2-.5 2-.5L19 17z"/></svg>;
    case 'chevron-r':  return <svg {...p}><path d="M9 6l6 6-6 6"/></svg>;
    case 'chevron-d':  return <svg {...p}><path d="M6 9l6 6 6-6"/></svg>;
    case 'more':       return <svg {...p}><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>;
    case 'shield':     return <svg {...p}><path d="M12 2l8 4v6c0 5-4 9-8 10-4-1-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>;
    case 'phone':      return <svg {...p}><path d="M22 16.9V20a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7 13 13 0 0 0 .7 2.8 2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4 13 13 0 0 0 2.8.7 2 2 0 0 1 1.7 2z"/></svg>;
    case 'send':       return <svg {...p}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>;
    case 'circle-dot': return <svg {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3" fill={stroke}/></svg>;
    case 'clock':      return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'trend-up':   return <svg {...p}><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>;
    case 'piggy':      return <svg {...p}><path d="M19 9h2v4h-2M7 9V7m10 7l1 3M5 16l1 3"/><path d="M19 13a8 8 0 0 1-15 4l-2-1 1-3 2 1A8 8 0 0 1 19 13z"/><circle cx="14" cy="11" r="0.5" fill={stroke}/></svg>;
    default: return null;
  }
};

// ─── Avatar circle for category ──────────────────────────────
const CatAvatar = ({ cat, size = 40 }) => {
  const c = catById(cat);
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.32,
      background: c.soft, color: c.color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.5, flexShrink: 0,
    }}>{c.icon}</div>
  );
};

// ─── Pill ────────────────────────────────────────────────────
const Pill = ({ children, color = C.primary, soft = C.primarySoft, active = false, onClick, size = 'sm' }) => {
  const padY = size === 'sm' ? 6 : 9;
  const padX = size === 'sm' ? 12 : 16;
  const fs = size === 'sm' ? 12.5 : 14;
  return (
    <button onClick={onClick} style={{
      padding: `${padY}px ${padX}px`, borderRadius: 999,
      background: active ? color : soft,
      color: active ? '#fff' : color,
      fontWeight: 700, fontSize: fs, fontFamily: 'inherit',
      whiteSpace: 'nowrap', letterSpacing: '-0.01em',
      transition: 'all 0.15s',
    }}>{children}</button>
  );
};

// ─── Section heading ─────────────────────────────────────────
const SectionHeading = ({ title, action, actionLabel }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px', marginBottom: 12 }}>
    <h3 style={{ margin: 0, fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em', color: C.ink }}>{title}</h3>
    {action && (
      <button onClick={action} style={{ fontSize: 13, fontWeight: 700, color: C.inkSoft, display: 'flex', alignItems: 'center', gap: 2 }}>
        {actionLabel || 'Lihat'} <Icon name="chevron-r" size={14} sw={2.4}/>
      </button>
    )}
  </div>
);

// ─── Progress bar ────────────────────────────────────────────
const ProgressBar = ({ value, max, color = C.primary, height = 8, soft = '#EFE9FF' }) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const over = value > max;
  return (
    <div style={{ height, background: soft, borderRadius: 999, overflow: 'hidden', position: 'relative' }}>
      <div style={{
        width: `${Math.min(100, pct)}%`, height: '100%',
        background: over ? `linear-gradient(90deg, ${color}, ${C.coral})` : color,
        borderRadius: 999, transition: 'width 0.4s ease',
      }}/>
    </div>
  );
};

// ─── Donut ring (for budget overview) ────────────────────────
const Donut = ({ size = 160, stroke = 18, value, max, color = C.primary, trackColor = 'rgba(255,255,255,0.18)', children }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, value / max);
  const dash = c * pct;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} stroke={trackColor} strokeWidth={stroke} fill="none"/>
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
};

// ─── Inline sparkline ────────────────────────────────────────
const Sparkline = ({ data, color = C.primary, width = 80, height = 28, fill = true }) => {
  const max = Math.max(...data, 1);
  const step = width / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${height - (v / max) * (height - 4) - 2}`).join(' ');
  const fillPts = `0,${height} ${pts} ${width},${height}`;
  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      {fill && <polygon points={fillPts} fill={color} fillOpacity={0.15}/>}
      <polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={width} cy={height - (data[data.length - 1] / max) * (height - 4) - 2} r={3} fill={color}/>
    </svg>
  );
};

// ─── Card (rounded soft) ─────────────────────────────────────
const Card = ({ children, style = {}, padding = 18, onClick }) => (
  <div onClick={onClick} style={{
    background: C.card, borderRadius: 22, padding,
    boxShadow: '0 1px 0 rgba(26,22,37,0.04), 0 8px 22px rgba(26,22,37,0.04)',
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  }}>{children}</div>
);

// ─── Account chip (mini card) ────────────────────────────────
const AccountChip = ({ acc, selected, onClick }) => (
  <button onClick={onClick} style={{
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '8px 14px 8px 8px', borderRadius: 999,
    background: selected ? C.ink : '#F2EDE2',
    color: selected ? '#fff' : C.ink, fontWeight: 700, fontSize: 13,
    transition: 'all 0.15s', flexShrink: 0,
  }}>
    <span style={{
      width: 26, height: 26, borderRadius: 8, background: acc.color,
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
    }}>{acc.emoji}</span>
    {acc.name}
  </button>
);

// ─── Bottom navigation ───────────────────────────────────────
const BottomNav = ({ active, onChange, onAdd }) => {
  const items = [
    { id: 'home',     label: 'Home',      icon: 'home' },
    { id: 'tx',       label: 'Transaksi', icon: 'list' },
    { id: 'add',      label: '',          icon: 'plus', primary: true },
    { id: 'budget',   label: 'Budget',    icon: 'pie' },
    { id: 'more',     label: 'More',      icon: 'grid' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      paddingBottom: 28, paddingTop: 6, paddingLeft: 12, paddingRight: 12,
      background: 'linear-gradient(180deg, rgba(244,241,234,0) 0%, rgba(244,241,234,0.95) 32%, rgba(244,241,234,1) 100%)',
      zIndex: 40, pointerEvents: 'none',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderRadius: 28, padding: 8,
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
        boxShadow: '0 1px 0 rgba(255,255,255,0.8) inset, 0 -1px 0 rgba(26,22,37,0.04) inset, 0 12px 32px rgba(26,22,37,0.10), 0 2px 8px rgba(26,22,37,0.05)',
        pointerEvents: 'auto',
      }}>
        {items.map(it => {
          if (it.primary) {
            return (
              <button key={it.id} onClick={onAdd} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '-14px 6px -2px', height: 56, borderRadius: 22,
                background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDeep} 100%)`,
                color: '#fff',
                boxShadow: `0 6px 16px rgba(124,92,252,0.45), 0 1px 0 rgba(255,255,255,0.3) inset`,
              }}>
                <Icon name="plus" size={26} sw={2.6}/>
              </button>
            );
          }
          const isActive = active === it.id;
          return (
            <button key={it.id} onClick={() => onChange(it.id)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 2, padding: '8px 4px 6px', borderRadius: 18,
              color: isActive ? C.ink : C.inkFaint,
              background: isActive ? '#F2EDE2' : 'transparent',
              transition: 'all 0.15s',
            }}>
              <Icon name={it.icon} size={22} sw={isActive ? 2.2 : 1.9}/>
              <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.01em' }}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ─── Page header (back/title) ────────────────────────────────
const PageHeader = ({ title, onBack, right }) => (
  <div style={{
    padding: '52px 20px 14px',
    display: 'flex', alignItems: 'center', gap: 12,
  }}>
    {onBack && (
      <button onClick={onBack} style={{
        width: 38, height: 38, borderRadius: 14, background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 1px 0 rgba(26,22,37,0.04), 0 4px 10px rgba(26,22,37,0.04)',
      }}>
        <Icon name="arrow-left" size={18} sw={2.2}/>
      </button>
    )}
    <h1 style={{
      margin: 0, flex: 1, fontFamily: 'Bricolage Grotesque, sans-serif',
      fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em', color: C.ink,
    }}>{title}</h1>
    {right}
  </div>
);

// ─── Toast ───────────────────────────────────────────────────
const Toast = ({ msg, onClose }) => {
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(onClose, 2400);
    return () => clearTimeout(t);
  }, [msg]);
  if (!msg) return null;
  return (
    <div style={{
      position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)',
      background: C.ink, color: '#fff', padding: '10px 16px', borderRadius: 999,
      fontWeight: 600, fontSize: 13, zIndex: 100,
      boxShadow: '0 8px 24px rgba(26,22,37,0.30)',
      display: 'flex', alignItems: 'center', gap: 8,
      animation: 'saku-fade-up 0.25s ease',
    }}>
      <span style={{ width: 18, height: 18, borderRadius: 999, background: C.lime, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.limeInk }}>
        <Icon name="check" size={12} sw={3}/>
      </span>
      {msg}
    </div>
  );
};

Object.assign(window, {
  Icon, CatAvatar, Pill, SectionHeading, ProgressBar, Donut, Sparkline,
  Card, AccountChip, BottomNav, PageHeader, Toast,
});
