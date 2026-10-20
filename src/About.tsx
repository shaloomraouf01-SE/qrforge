import { ArrowRight, ArrowUpRight, Check, Code2, Heart, Palette, ShieldCheck, Sparkles } from 'lucide-react';
import './about.css';
import { BrandVisual } from './BrandVisual';

export function About() {
  return <div className="about-page">
    <nav className="about-breadcrumb" aria-label="Breadcrumb"><a href="#home">Home</a><span>/</span><span aria-current="page">About</span></nav>
    <section className="about-hero" aria-labelledby="about-title">
      <div className="about-intro">
        <div className="section-kicker">A LITTLE ABOUT QRFORGE</div>
        <h1 id="about-title">Sharing should<br/><span>feel simple.</span></h1>
        <p>A link to your work. Wi-Fi for your guests. Your details for a new connection. QRForge turns the things you want to share into one easy scan.</p>
        <a className="landing-primary" href="#generate">Make your first QR code <ArrowUpRight size={19}/></a>
        <div className="about-hero-note"><Heart size={14}/> Made for creators. Open to everyone.</div>
      </div>
      <BrandVisual/>
    </section>

    <div className="about-facts" data-reveal><div><strong>11</strong><span>ways to make a connection</span></div><div><strong>3</strong><span>formats, ready to download</span></div><div><strong>100%</strong><span>free to create & customize</span></div><div><strong>Zero</strong><span>accounts needed to get started</span></div></div>

    <section className="about-mission" aria-labelledby="mission-title" data-reveal>
      <div><div className="section-kicker">THE IDEA BEHIND THE SQUARE</div><h2 id="mission-title">Less friction.<br/><span>More connection.</span></h2></div>
      <div className="about-mission-copy"><p>Sharing something useful shouldn’t need an account, a subscription or a complicated dashboard. It should be as easy as adding your details and hitting download.</p><p>That’s what QRForge is built for: one place to create a QR code, give it your style, and take it into the real world. From business cards to a café counter, the next connection starts small.</p><a href="#how-it-works" className="text-link">See how QRForge works <ArrowRight size={16}/></a></div>
    </section>

    <section className="about-values" aria-labelledby="values-title">
      <div className="about-section-head" data-reveal><div className="section-kicker">THE THINGS THAT MATTER</div><h2 id="values-title">Simple by design.<br/><span>Thoughtful in the details.</span></h2></div>
      <div className="about-values-grid">{[
        { number: '01', icon: Sparkles, title: 'Useful should be free.', text: 'Every QR type, custom color, logo and export format is available without a paid plan. Create what you need, whenever you need it.' },
        { number: '02', icon: ShieldCheck, title: 'Your details stay close.', text: 'Generation happens in your browser. Your download history stays on this device, with a clear button to remove it whenever you choose.' },
        { number: '03', icon: Palette, title: 'Make room for your style.', text: 'Keep it clean and classic, or use colors, patterns and your own logo. Your QR code can feel like part of your brand.' },
      ].map(value => <article className="about-value" data-reveal key={value.number}><div className="about-value-top"><value.icon size={25}/><span>{value.number}</span></div><h3>{value.title}</h3><p>{value.text}</p></article>)}</div>
    </section>

    <section className="about-creator" aria-labelledby="creator-title" data-reveal>
      <div className="creator-art" aria-hidden="true"><span className="creator-art-label"><Code2 size={15}/> DESIGN MEETS DEVELOPMENT</span><span className="creator-monogram">SR<span>✳</span></span><div className="creator-art-bottom"><span>SHALOOM RAOUF</span><span>QRFORGE — THE MAKER</span></div></div>
      <div className="creator-copy"><div className="section-kicker">THE PERSON BEHIND QRFORGE</div><h2 id="creator-title">Designed & developed<br/>by <span>Shaloom Raouf.</span></h2><p>QRForge brings design and development together around one purpose: making everyday sharing easier.</p><p>From the first preview to the file you download, the focus is a clear workflow, flexible tools and an experience that feels good to use.</p><div className="creator-disciplines"><span><Palette size={14}/> Design</span><span><Code2 size={14}/> Development</span><span><Heart size={14}/> The little details</span></div></div>
    </section>

    <section className="about-invitation" aria-labelledby="invitation-title" data-reveal><div><div className="section-kicker">THAT’S OUR STORY. NOW START YOURS.</div><h2 id="invitation-title">Got something good to share?</h2><p><Check size={15}/> Free to create. Simple to share. Yours to keep.</p></div><a href="#generate" className="landing-primary">Create your QR code <ArrowUpRight size={20}/></a></section>
  </div>;
}
