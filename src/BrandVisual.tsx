import { ContactRound, Link2, QrCode, Wifi } from 'lucide-react';
import './brand-visual.css';

export function BrandVisual({ scanning = false }: { scanning?: boolean }) {
  return <div className="about-visual" aria-hidden="true">
    <div className="about-visual-grid"/>
    <div className="about-orbit orbit-outer"/><div className="about-orbit orbit-inner"/>
    <div className="about-brand-tile"><QrCode size={104} strokeWidth={1.5}/><span>QRFORGE</span>{scanning && <span className="brand-scan-line"/>}</div>
    <span className="about-node node-link"><Link2 size={22}/><span>Your links</span></span>
    <span className="about-node node-wifi"><Wifi size={22}/><span>Your places</span></span>
    <span className="about-node node-contact"><ContactRound size={22}/><span>Your people</span></span>
    <span className="about-visual-spark">✦</span>
    <span className="about-visual-caption"><span className="status-dot"/> SMALL CODE. REAL CONNECTIONS.</span>
  </div>;
}
