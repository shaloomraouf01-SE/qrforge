import { ArrowRight, ArrowUpRight, Check, ContactRound, Download, Globe, Link2, LockKeyhole, MapPin, MessageCircle, Palette, QrCode, ShieldCheck, Sparkles, Wifi, Wallet, Zap } from 'lucide-react';
import { BrandVisual } from './BrandVisual';
import './home.css';

type HomeKind = 'url' | 'wifi' | 'vcard' | 'whatsapp' | 'location' | 'payment';
const uses = [
  { kind: 'url', title: 'Share your world', detail: 'Websites, portfolios, menus & more', icon: Globe, accent: 'violet' },
  { kind: 'wifi', title: 'Make guests feel at home', detail: 'Connect to Wi-Fi with one scan', icon: Wifi, accent: 'blue' },
  { kind: 'vcard', title: 'Make a new connection', detail: 'Put your contact details in their pocket', icon: ContactRound, accent: 'pink' },
  { kind: 'whatsapp', title: 'Start a conversation', detail: 'Let people reach you on WhatsApp', icon: MessageCircle, accent: 'green' },
  { kind: 'location', title: 'Point them your way', detail: 'Share a place, a venue or your next event', icon: MapPin, accent: 'orange' },
  { kind: 'payment', title: 'Share a payment link', detail: 'Send people to your payment provider', icon: Wallet, accent: 'blue' },
] as const;

export function Home({ onStart }: { onStart: (kind: HomeKind) => void }) {
  return <div className="landing">
    <section className="landing-hero" aria-labelledby="landing-title">
      <div className="landing-intro">
        <div className="landing-kicker"><span className="status-dot"/> LITTLE CODE. BIG POSSIBILITIES.</div>
        <h1 id="landing-title">Good things<br/>start with<br/><span>one scan.</span><span className="title-spark" aria-hidden="true">✳</span></h1>
        <p>Turn your links, Wi-Fi and contact details into a QR code worth sharing. Make it yours. Download it free.</p>
        <div className="landing-actions">
          <a className="landing-primary" href="#generate" onClick={() => onStart('url')}>Create your QR code <ArrowUpRight size={20}/></a>
          <a className="landing-secondary" href="#how-it-works">See how it works <ArrowRight size={17}/></a>
        </div>
        <div className="landing-assurance"><span><Check size={15}/> No signup</span><span><Check size={15}/> No watermarks</span><span><Check size={15}/> Yours to keep</span></div>
      </div>

      <BrandVisual scanning/>
    </section>

    <div className="landing-proof" data-reveal>
      <span><QrCode size={21}/><strong>11</strong> ways to share</span><span><Download size={21}/><strong>PNG · SVG · JPG</strong> exports</span><span><ShieldCheck size={21}/> Made in your browser</span><span><Sparkles size={21}/> Completely free</span>
    </div>

    <section className="landing-section" id="use-cases" aria-labelledby="uses-title">
      <div className="landing-section-heading" data-reveal><div><div className="section-kicker">A SMALL SQUARE. A NEW CONNECTION.</div><h2 id="uses-title">What will your<br/><span>next scan do?</span></h2></div><p>From your next customer to your next house guest, make sharing the easy part.</p></div>
      <div className="use-grid">{uses.map(item => <a className={`use-link use-${item.accent}`} key={item.kind} href="#generate" onClick={() => onStart(item.kind)} data-reveal><span className="use-icon"><item.icon size={25}/></span><span><strong>{item.title}</strong><small>{item.detail}</small></span><ArrowUpRight size={20} className="use-arrow"/></a>)}</div>
      <a className="text-link" href="#generate">Explore all 11 QR types <ArrowRight size={17}/></a>
    </section>

    <section className="landing-section how-section" id="how-it-works" aria-labelledby="steps-title">
      <div className="landing-section-heading" data-reveal><div><div className="section-kicker">FROM IDEA TO SCAN</div><h2 id="steps-title">Three steps.<br/><span>That’s your whole workflow.</span></h2></div><a href="#generate" className="landing-secondary">Let’s make one <ArrowUpRight size={18}/></a></div>
      <div className="steps-grid">{[
        {number:'01', icon:Link2, title:'Add your thing.', text:'Choose a QR type and enter your link, message or details.'},
        {number:'02', icon:Palette, title:'Find your style.', text:'Keep it classic, or add colors, a dot pattern and your logo.'},
        {number:'03', icon:Download, title:'Take it anywhere.', text:'Download your file, test the scan, and share it with the world.'},
      ].map(step => <div className="landing-step" key={step.number} data-reveal><div className="step-top"><span>{step.number}</span><step.icon size={24}/></div><h3>{step.title}</h3><p>{step.text}</p></div>)}</div>
    </section>

    <section className="landing-section features-section" id="features" aria-labelledby="features-title">
      <div className="landing-section-heading" data-reveal><div><div className="section-kicker">GOOD TO THE LAST PIXEL</div><h2 id="features-title">Made for your ideas.<br/><span>Built around you.</span></h2></div></div>
      <div className="feature-stories">
        <article className="feature-story privacy-story" data-reveal><div className="privacy-art" aria-hidden="true"><div className="privacy-ring ring-a"/><div className="privacy-ring ring-b"/><div className="privacy-lock"><LockKeyhole size={35}/></div><span className="privacy-tag"><span className="status-dot"/> ON YOUR DEVICE</span></div><div className="feature-story-copy"><span className="story-tag">YOUR DETAILS STAY YOURS</span><h3>Keep your data<br/>close to home.</h3><p>QR codes are generated in your browser. Your entered details and logo stay on your device, with no QR generation server in between.</p><a href="#privacy" className="text-link">Our approach to privacy <ArrowRight size={16}/></a></div></article>
        <article className="feature-story export-story" data-reveal><div className="export-art" aria-hidden="true"><div className="export-sheet"><QrCode size={78}/><span>YOUR NEXT BIG THING</span></div><span className="file-chip chip-png">PNG <Check size={13}/></span><span className="file-chip chip-svg">SVG <Check size={13}/></span><span className="file-chip chip-jpg">JPG <Check size={13}/></span></div><div className="feature-story-copy"><span className="story-tag">SCREEN TO PRINT. NO EXTRA STEPS.</span><h3>A perfect fit.<br/>Wherever you share.</h3><p>High-resolution PNG and JPG for everyday sharing. Scalable SVG for print. No watermark, and no subscription to unlock your files.</p><a href="#generate" className="text-link">Find your format <ArrowRight size={16}/></a></div></article>
      </div>
    </section>

    <section className="landing-finale" data-reveal aria-labelledby="finale-title"><div className="finale-icon" aria-hidden="true"><Zap size={29}/></div><div className="section-kicker">YOUR NEXT CONNECTION IS WAITING</div><h2 id="finale-title">Let’s make something<br/><span>worth scanning.</span></h2><a href="#generate" className="landing-primary">Create a free QR code <ArrowUpRight size={20}/></a><p>No accounts. No limits. Just a good idea and a QR code.</p><div className="finale-grid" aria-hidden="true"/></section>
  </div>;
}
