import { useEffect, useState } from 'react';
import { Home, QrCode, Sparkles, History, Info, HelpCircle } from 'lucide-react';

const links = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'generate', label: 'Generate', icon: QrCode },
  { key: 'features', label: 'Features', icon: Sparkles },
  { key: 'history', label: 'History', icon: History },
  { key: 'about', label: 'About', icon: Info },
  { key: 'faq', label: 'FAQ', icon: HelpCircle },
];

export function Navigation({ page }: { page: string }) {
  const [hash, setHash] = useState(() => window.location.hash.slice(1));
  useEffect(() => {
    const update = () => setHash(window.location.hash.slice(1));
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  const active = page === 'generator' ? hash === 'history' ? 'history' : 'generate'
    : page === 'home' ? hash === 'features' ? 'features' : 'home' : page;

  return <nav className="nav" aria-label="Main navigation">{links.map(link => {
    const selected = active === link.key;
    return <a key={link.key} className={selected ? 'selected' : ''} href={`#${link.key}`} aria-current={selected ? 'page' : undefined}>
      {selected && <link.icon className="nav-symbol" size={15} aria-hidden="true"/>}
      <span>{link.label}</span>
      {selected && <span className="nav-indicator" aria-hidden="true"/>}
    </a>;
  })}</nav>;
}
