import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Link, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, FileText, HeartHandshake, Menu, ShieldCheck, X } from 'lucide-react';
import { activityEvidence, documentCategories, expectedCoreTeamSize, galleryPhotos, impactItems, memberCategories, navigation, pageMeta, plannedActivities, publicDocuments, publicMembers, publicTeam, serviceAreas, site, teamRoles } from '@/data/content';
import './index.css';

const galleryItems = activityEvidence.flatMap(activity => {
  const photos = galleryPhotos.filter(photo => photo.activityId === activity.id);
  return photos.length
    ? photos.map(photo => ({
        id: photo.id,
        activityId: activity.id,
        category: photo.category,
        title: photo.caption,
        evidence: photo.caption,
        src: photo.src,
        alt: photo.alt,
      }))
    : [{
        id: `pending-${activity.id}`,
        activityId: activity.id,
        category: activity.category,
        title: activity.title,
        evidence: activity.evidence,
        src: '',
        alt: `${activity.title}; approved activity photograph not yet supplied`,
      }];
});

function galleryIndexForActivity(activityId: string) {
  return Math.max(0, galleryItems.findIndex(item => item.activityId === activityId));
}

function Logo({ inverted = false }: { inverted?: boolean }) {
  return <Link href="/" className={`brand ${inverted ? 'brand-inverted' : ''}`} aria-label={`${site.name} — home`}>
    <span className="brand-mark" aria-label="समिति का लोगो">PS</span>
    <span className="brand-name"><strong>प्रयास सहयोग</strong><small>सेवा समिति · बरेली</small></span>
  </Link>;
}

function Header() {
  const [path] = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  return <>
    <div className="topline"><div className="wrap topline-inner"><span>{site.place}</span><span className="topline-right"><span className="status-dot" /> जनसेवा • सहयोग • पारदर्शिता</span></div></div>
    <header className="site-header"><div className="wrap header-inner">
      <Logo />
      <p className="header-motto">{site.tagline}</p>
      <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav className={`main-nav ${open ? 'nav-open' : ''}`} aria-label="Main navigation">
        {navigation.map(item => <Link key={item.path} href={item.path} className={path === item.path ? 'nav-link active' : 'nav-link'} aria-current={path === item.path ? 'page' : undefined}>{item.label}</Link>)}
        <Link className="nav-contact" href="/contact">संपर्क करें <ArrowUpRight size={14} /></Link>
      </nav>
    </div></header>
  </>;
}

function Footer() {
  return <footer className="site-footer"><div className="wrap">
    <div className="footer-top"><div className="footer-brand"><Logo inverted /><p>{site.promise}<br />स्थानीय सेवा से समाज के साथ जुड़ा एक प्रयास।</p></div>
      <div className="footer-col"><span className="footer-label">देखें</span>{navigation.slice(1, 5).map(n => <Link key={n.path} href={n.path}>{n.label}</Link>)}</div>
      <div className="footer-col"><span className="footer-label">पारदर्शिता</span><Link href="/transparency">पारदर्शिता एवं जवाबदेही</Link><Link href="/documents">सार्वजनिक दस्तावेज़</Link><Link href="/activities">सेवा कार्य</Link></div>
      <div className="footer-col"><span className="footer-label">संपर्क</span><p>बरेली, उत्तर प्रदेश</p><span className="footer-muted">आधिकारिक संपर्क विवरण शीघ्र जोड़े जाएंगे</span><Link className="footer-cta" href="/contact">संपर्क page <ArrowUpRight size={14} /></Link></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {site.name}</span><span>सार्वजनिक जानकारी संस्था की स्वीकृति के बाद ही प्रकाशित की जाती है।</span><span className="footer-initials">PS / BLY</span></div>
  </div></footer>;
}

function PageFrame({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro: string; children: ReactNode }) {
  return <main className="page-enter"><section className="page-heading wrap"><div className="eyebrow">{eyebrow}</div><h1 className="serif">{title}</h1><p>{intro}</p></section>{children}</main>;
}

function PhotoPlaceholder({ label, onClick, src, alt }: { label: string; onClick?: () => void; src?: string; alt?: string }) {
  const content = src
    ? <img className="photo-image" src={src} alt={onClick ? '' : alt ?? label} loading="lazy" decoding="async" />
    : <><span className="placeholder-symbol"><span>PS</span></span><span className="placeholder-label">{label}</span><span className="placeholder-note">फोटो जल्द जोड़ी जाएगी</span></>;
  return onClick
    ? <button className="photo-placeholder photo-clickable" onClick={onClick} aria-label={src ? `फोटो देखें: ${label}` : `${label}. फोटो का विवरण देखें`}>{content}</button>
    : <div className="photo-placeholder" role={src ? undefined : 'img'} aria-label={src ? undefined : `${label}. Approved photograph not yet supplied`}>{content}</div>;
}

function GalleryModal({ close, index, change }: { close: () => void; index: number; change: (n: number) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') change(index + 1); if (e.key === 'ArrowLeft') change(index - 1); };
    window.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [close, change, index]);
  const item = galleryItems[(index + galleryItems.length) % galleryItems.length];
  return <div className="modal-backdrop" role="presentation" onClick={close}><section className="gallery-modal" role="dialog" aria-modal="true" aria-label="सेवा कार्य फोटो विवरण" onClick={e => e.stopPropagation()}>
    <button className="modal-close" onClick={close} aria-label="फोटो बंद करें"><X /></button><PhotoPlaceholder label={item.title} src={item.src || undefined} alt={item.alt} />
    <div className="modal-detail"><div><span className="eyebrow">{item.category} · {index + 1} / {galleryItems.length}</span><h2 className="serif">{item.title}</h2><p>{item.evidence}</p></div>
      <div className="modal-controls"><button className="icon-button" aria-label="पिछली फोटो" onClick={() => change(index - 1)}><ArrowLeft /></button><button className="icon-button" aria-label="अगली फोटो" onClick={() => change(index + 1)}><ArrowRight /></button></div></div>
  </section></div>;
}

function Home() {
  const [slide, setSlide] = useState(0);
  const [gallery, setGallery] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const move = (n: number) => setSlide((n + galleryItems.length) % galleryItems.length);
  const featured = galleryItems[slide];
  useEffect(() => {
    if (galleryItems.length < 2 || gallery) return;
    const timer = window.setInterval(() => setSlide(current => (current + 1) % galleryItems.length), 6000);
    return () => window.clearInterval(timer);
  }, [gallery]);
  const handleTouchEnd = (endX: number) => {
    if (touchStartX.current === null) return;
    const distance = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) > 45) move(slide + (distance < 0 ? 1 : -1));
  };
  return <main className="page-enter">
    <section className="hero wrap"><div className="hero-copy"><div className="eyebrow"><span className="small-rule" /> समाज सेवा · बरेली</div><h1 className="serif">सेवा का एक प्रयास,<br /><em>कई चेहरों की मुस्कान।</em></h1><p className="hero-lede">प्रयास सहयोग सेवा समिति वर्ष 2013 से समाज सेवा, सहयोग और जनकल्याण के लिए प्रयासरत है। यह वेबसाइट हमारे सेवा कार्यों, टीम और जनसहयोग की यात्रा को एक जगह साझा करने का माध्यम है।</p><div className="hero-actions"><Link href="/activities" className="button button-dark">देखें our work <ArrowUpRight size={16} /></Link><Link href="/about" className="text-link">समिति के बारे में <ArrowDownRight size={15} /></Link></div><div className="hero-caption"><span className="caption-mark">01</span><span>{site.tagline}</span></div></div>
      <div className="hero-visual"><button className="hero-photo" onClick={() => setGallery(true)} onTouchStart={e => { touchStartX.current = e.touches[0]?.clientX ?? null; }} onTouchEnd={e => handleTouchEnd(e.changedTouches[0]?.clientX ?? 0)} aria-label={`फोटो ${slide + 1} देखें: ${featured.title}`}><PhotoPlaceholder label={featured.title} src={featured.src || undefined} alt={featured.alt} /><span className="photo-open"><ArrowUpRight size={16} /></span></button><div className="hero-side-note"><span className="vertical-label">सेवा · सम्मान · पारदर्शिता</span><div className="slide-controls"><span className="slide-current" aria-live="polite">{String(slide + 1).padStart(2, '0')}</span><span className="slide-line" /><span className="slide-total">{String(galleryItems.length).padStart(2, '0')}</span><div className="slide-nav"><button className="slide-arrow" onClick={() => move(slide - 1)} aria-label="Previous gallery item"><ArrowLeft size={16} /></button><button className="slide-arrow" onClick={() => move(slide + 1)} aria-label="Next gallery item"><ArrowRight size={17} /></button></div></div></div><div className="hero-index">जनसेवा • बरेली / उ.प्र.</div></div>
    </section>
    <section className="trust-strip"><div className="wrap trust-inner"><ShieldCheck size={21} /><p><strong>काम पहले, दावा बाद में।</strong> हम बिना पुष्टि के संख्या, नाम या दस्तावेज़ को तथ्य के रूप में प्रकाशित नहीं करते।</p><Link href="/transparency">हमारी पारदर्शिता नीति देखें <ArrowUpRight size={14} /></Link></div></section>
    <section className="section wrap impact-section"><div className="section-head"><div><div className="eyebrow">हमारे सेवा कार्य</div><h2 className="serif">सेवा कार्यों की<br />सच्ची कहानी।</h2></div><p>हर सेवा कार्य अपने साथ एक कहानी लेकर आता है। हम उपलब्ध फोटो, विवरण और रिकॉर्ड को व्यवस्थित कर रहे हैं ताकि समाज हमारे कार्यों को देख और समझ सके।</p></div>
      {impactItems.length ? <div className="impact-grid">{impactItems.map(i => <div key={i.label} className="impact-tile"><strong>{i.value}</strong><span>{i.label}</span><small>{i.note}</small></div>)}</div> : <div className="verification-panel"><div className="verification-icon"><Check size={19} /></div><div><h3>सेवा यात्रा का विवरण तैयार किया जा रहा है</h3><p>जिन कार्यों के फोटो और विवरण उपलब्ध हैं, उन्हें क्रमवार इस वेबसाइट पर जोड़ा जाएगा। जहाँ आवश्यक होगा, कार्यक्रम की तारीख, स्थान और संक्षिप्त विवरण भी दिया जाएगा।</p></div><Link href="/documents" className="arrow-link">हम जानकारी कैसे साझा करते हैं <ArrowUpRight size={15} /></Link></div>}
    </section>
    <section className="home-services"><div className="wrap"><div className="section-head service-heading"><div><div className="eyebrow">हमारी सेवा के क्षेत्र</div><h2 className="serif">जहाँ सेवा की<br />जरूरत हो।</h2></div><p>समिति द्वारा किए गए प्रमुख सेवा कार्यों में भोजन, कपड़े व कंबल वितरण, रक्तदान, स्वास्थ्य सेवा, अनाथालय व वृद्धाश्रम सेवा तथा अन्य जनकल्याण पहल शामिल हैं।</p></div><div className="service-list">{serviceAreas.map(a => <Link href="/activities" key={a.mark} className="service-item"><span className="service-num">{a.mark}</span><span className="service-title">{a.title}</span><span className="service-desc">{a.text}</span><ArrowUpRight className="service-icon" size={17} /></Link>)}</div></div></section>
    <section className="section wrap home-evidence"><div className="evidence-photo" role="group" aria-label="सेवा कार्य फोटो"><PhotoPlaceholder label="सेवा कार्य फोटो गैलरी" onClick={() => setGallery(true)} /><div className="photo-caption"><span>सेवा फोटो / 01</span><span>स्वीकृत सेवा कार्य की फोटो यहाँ जोड़ी जाएगी</span></div></div><div className="evidence-copy"><div className="eyebrow">हमारी सेवा यात्रा</div><h2 className="serif">सेवा कार्य दिखाएँ,<br /><em>कहानी भी साझा करें।</em></h2><p>हमारा प्रयास है कि प्रत्येक सेवा कार्य की तस्वीर और संक्षिप्त जानकारी समाज तक पहुँचे, ताकि सहयोग करने वालों को अपने योगदान का प्रभाव दिखाई दे।</p><Link className="button button-outline" href="/activities">सेवा कार्य देखें <ArrowUpRight size={15} /></Link></div></section>
    <section className="upcoming"><div className="wrap upcoming-inner"><div><div className="eyebrow">आगे की दिशा</div><h2 className="serif">आगे के प्रयास,<br />साथ मिलकर।</h2><p>भविष्य की सेवा योजनाएँ संस्था द्वारा तय होने के बाद यहाँ साझा की जाएंगी।</p></div><div className="upcoming-card">{plannedActivities.length ? plannedActivities.map(p => <article key={p.title}><span>{p.status}</span><h3>{p.title}</h3><p>{p.summary}</p></article>) : <div className="planned-empty"><span className="empty-date">योजना / —</span><div><strong>नई सेवा पहल जल्द साझा होगी</strong><p>आने वाले सेवा कार्यक्रमों की जानकारी तय होने पर इस स्थान पर प्रकाशित की जाएगी।</p></div></div>}<Link href="/contact" className="arrow-link">भविष्य की सेवा पहल के बारे में पूछें <ArrowUpRight size={15} /></Link></div></div></section>
     <section className="transparency-cta"><div className="wrap transparency-inner"><div className="round-seal"><ShieldCheck size={28} /><span>खुला<br />रिकॉर्ड</span></div><div><div className="eyebrow">विश्वास छोटे-छोटे विवरणों से बनता है</div><h2 className="serif">पारदर्शिता is part<br />सेवा कार्य का।</h2></div><Link href="/transparency" className="button button-light">पारदर्शिता केंद्र देखें <ArrowUpRight size={16} /></Link></div></section>
    {gallery && <GalleryModal close={() => setGallery(false)} index={slide} change={move} />}
  </main>;
}

function About() {
  return <PageFrame eyebrow="हम कौन हैं" title={<>बरेली से शुरू हुई सेवा यात्रा,<br /><em>समाज के साथ आगे बढ़ती हुई।</em></>} intro="प्रयास सहयोग सेवा समिति बरेली, उत्तर प्रदेश में समाज सेवा और जनकल्याण के लिए कार्यरत संस्था है। वर्ष 2013 से जरूरतमंदों तक सहयोग पहुँचाने का प्रयास इसकी सेवा यात्रा का महत्वपूर्ण हिस्सा रहा है।">
    <div className="wrap about-layout"><aside className="about-side"><span className="about-number">01 / परिचय</span><div className="side-quote serif">“सेवा की शुरुआत जरूरत को समझने से होती है।”</div><span className="tiny-note">हमारी सेवा भावना</span></aside><div className="about-main">
      <section className="about-block"><div className="eyebrow">परिचय</div><h2 className="serif">समाज से जुड़ी<br />एक सेवा संस्था।</h2><p>प्रयास सहयोग सेवा समिति की सेवा यात्रा वर्ष 2013 से समाज के जरूरतमंद लोगों के बीच सहयोग पहुँचाने के प्रयासों से जुड़ी रही है। भोजन, वस्त्र, स्वास्थ्य, अनाथालय और वृद्धाश्रम सेवा जैसे कार्यों के माध्यम से संस्था समाज के साथ खड़े होने का प्रयास करती है।</p><div className="inline-note"><FileText size={17} /><span>संस्था से जुड़े पंजीकरण और आधिकारिक विवरण स्वीकृत दस्तावेज़ों के साथ यहाँ जोड़े जाएंगे।</span></div></section>
      <div className="mission-grid"><article><span className="eyebrow">हमारा उद्देश्य</span><h3 className="serif">सम्मान के साथ जरूरतमंद तक सहयोग पहुँचाना।</h3><p>जहाँ जरूरत हो, वहाँ अपनी क्षमता के अनुसार भोजन, वस्त्र, स्वास्थ्य, शिक्षा, राहत और अन्य उपयोगी सहयोग पहुँचाना।</p></article><article><span className="eyebrow">हमारी दृष्टि</span><h3 className="serif">ऐसा समाज जहाँ जरूरतमंद अकेला न रहे।</h3><p>समाज के लोगों को जोड़कर सेवा, सहयोग और संवेदनशीलता की संस्कृति को मजबूत करना।</p></article></div>
      <section className="about-block history-block"><div className="eyebrow">सेवा यात्रा</div><h2 className="serif">वर्ष 2013 से<br /><em>सेवा की निरंतर यात्रा।</em></h2><p>समिति की सेवा यात्रा का पुराना नाम “प्रयास रेवो” रहा है। अब “प्रयास सहयोग सेवा समिति” के नाम से सेवा कार्यों को आगे बढ़ाया जा रहा है। उपलब्ध पुराने रिकॉर्ड और तस्वीरों के आधार पर इस यात्रा को वेबसाइट पर व्यवस्थित रूप से साझा किया जाएगा।</p><div className="timeline"><div><span className="timeline-dot" /><span className="timeline-title">प्रारंभिक सेवा प्रयास</span><span className="timeline-desc">वर्ष 2013 से सेवा यात्रा</span></div><div><span className="timeline-dot" /><span className="timeline-title">प्रयास सहयोग सेवा समिति</span><span className="timeline-desc">आधिकारिक विवरण दस्तावेज़ों के साथ</span></div><div><span className="timeline-dot" /><span className="timeline-title">आगे की दिशा</span><span className="timeline-desc">समाज के साथ मिलकर नई सेवा पहल</span></div></div></section>
      <section className="future-panel"><div className="eyebrow">भविष्य की दिशा</div><h3 className="serif">सेवा बढ़े, पारदर्शिता बनी रहे।</h3><p>भविष्य में जरूरतमंदों के लिए नई सेवा गतिविधियों, जागरूकता कार्यक्रमों और सहयोग की पहलों को आगे बढ़ाने का प्रयास रहेगा। योजनाएँ तय होने पर उनकी जानकारी वेबसाइट पर साझा की जाएगी।</p></section>
    </div></div><section className="about-bottom"><div className="wrap about-bottom-inner"><span className="eyebrow">और जानें</span><h2 className="serif">सेवा कार्य और जानकारी देखें।</h2><div><Link className="arrow-link" href="/activities">सेवा कार्य <ArrowUpRight size={15} /></Link><Link className="arrow-link" href="/documents">दस्तावेज़ एवं पारदर्शिता <ArrowUpRight size={15} /></Link></div></div></section>
  </PageFrame>;
}

function Activities() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(activityEvidence.map(a => a.category)))];
  const visible = filter === 'All' ? activityEvidence : activityEvidence.filter(a => a.category === filter);
  const [gallery, setGallery] = useState<number | null>(null);
  const move = (n: number) => setGallery((n + activityEvidence.length) % activityEvidence.length);
  return <PageFrame eyebrow="हमारे सेवा कार्य" title={<>सेवा कार्य,<br /><em>तस्वीरों और जानकारी के साथ।</em></>} intro="यहाँ समिति द्वारा किए गए सेवा कार्यों की तस्वीरें और संक्षिप्त विवरण साझा किए जाएंगे। उपलब्ध फोटो और जानकारी को क्रमवार व्यवस्थित किया जा रहा है।">
    <section className="wrap activities-content"><div className="activity-note"><ShieldCheck size={19} /><p><strong>हमारी प्रकाशन नीति</strong> सेवा कार्य से जुड़ी तस्वीरें और जानकारी संस्था की पुष्टि के बाद ही प्रकाशित की जाएगी।</p></div>
      <div className="filter-bar" role="group" aria-label="Filter activity categories">{categories.map(c => <button key={c} className={filter === c ? 'filter-chip selected' : 'filter-chip'} aria-pressed={filter === c} onClick={() => setFilter(c)}>{c}</button>)}</div>
      <div className="activity-grid">{visible.map(a => <article className="activity-card" key={a.id}><PhotoPlaceholder label={`${a.category}: ${a.title}`} onClick={() => setGallery(galleryIndexForActivity(a.id))} /><div className="activity-card-body"><div className="activity-meta"><span>{a.category}</span><span>विवरण जोड़े जा रहे हैं</span></div><h2 className="serif">{a.title}</h2><p>{a.summary}</p><dl className="activity-facts"><div><dt>कब</dt><dd>{a.when}</dd></div><div><dt>कहाँ</dt><dd>{a.where}</dd></div><div><dt>सहायक जानकारी</dt><dd>{a.evidence}</dd></div></dl><button className="activity-view" onClick={() => setGallery(galleryIndexForActivity(a.id))}>तस्वीरें और विवरण देखें <ArrowUpRight size={14} /></button></div></article>)}</div>
      <div className="planned-activities"><div><div className="eyebrow">आने वाले सेवा कार्य</div><h2 className="serif">योजनाएँ तय होते ही साझा होंगी।</h2></div><p>{plannedActivities.length ? 'नीचे उपलब्ध योजनाओं की जानकारी देखें।' : 'आने वाले कार्यक्रम तय होने पर तारीख, स्थान और संक्षिप्त जानकारी यहाँ साझा की जाएगी।'}</p></div>
    </section>{gallery !== null && <GalleryModal close={() => setGallery(null)} index={gallery} change={move} />}
  </PageFrame>;
}

function CoreTeam() {
  return <PageFrame eyebrow="हमारी टीम" title={<>सेवा से जुड़े<br /><em>लोगों का परिचय।</em></>} intro="समिति के पदाधिकारी और सदस्य सेवा कार्यों की महत्वपूर्ण कड़ी हैं। स्वीकृत नाम और फोटो मिलने के बाद उनका परिचय यहाँ साझा किया जाएगा।">
    <section className="wrap team-content"><div className="team-callout"><div className="team-callout-mark"><HeartHandshake size={24} /></div><div><strong>गोपनीयता भी जिम्मेदारी है।</strong><p>बिना अनुमति किसी का निजी मोबाइल नंबर या व्यक्तिगत जानकारी प्रकाशित नहीं की जाएगी।</p></div></div><div className="team-grid">{publicTeam.length ? publicTeam.map(person => <article className="person-card" key={person.id}><PhotoPlaceholder label={`${person.name} का फोटो`} /><div><span className="eyebrow">{person.role}</span><h2>{person.name}</h2>{person.workplace && <p>{person.workplace}</p>}{person.bio && <p>{person.bio}</p>}{person.phone && <a href={`tel:${person.phone}`}>कॉल करें: {person.phone}</a>}</div></article>) : teamRoles.map((role, i) => <article className="role-card" key={role}><div className="role-card-top"><span className="role-number">0{i + 1}</span><span className="pending-badge">परिचय शीघ्र</span></div><div className="role-avatar" aria-hidden="true">{role.slice(0, 1)}</div><div className="eyebrow">{role}</div><h2 className="serif">नाम शीघ्र जोड़ा जाएगा</h2><p>स्वीकृत परिचय और फोटो मिलने के बाद जानकारी प्रकाशित की जाएगी।</p></article>)}</div><p className="team-footnote">पदाधिकारियों के नाम और परिचय संस्था की स्वीकृति के बाद यहाँ जोड़े जाएंगे।</p></section>
  </PageFrame>;
}

function Members() {
  const [selected, setSelected] = useState('all');
  const filtered = selected === 'all' ? publicMembers : publicMembers.filter(m => m.category === selected);
  return <PageFrame eyebrow="सदस्यता" title={<>समाज के साथ<br /><em>एक कदम आगे।</em></>} intro="सदस्यता की विभिन्न श्रेणियाँ समाज सेवा से जुड़ने के अलग-अलग अवसर देती हैं। सदस्य परिचय स्वीकृति के बाद ही सार्वजनिक किया जाएगा।">
    <section className="wrap members-content"><div className="member-banner"><div><div className="eyebrow">समिति की सदस्यता</div><h2 className="serif">सदस्यों का परिचय,<br />सम्मान के साथ।</h2></div><p>सदस्यता संस्था के समुदाय का महत्वपूर्ण हिस्सा है। सार्वजनिक परिचय सदस्य की सहमति और सही जानकारी के साथ ही साझा किया जाएगा।</p></div>
      <div className="member-tabs" role="tablist" aria-label="Filter members"><button className={selected === 'all' ? 'member-tab active' : 'member-tab'} onClick={() => setSelected('all')} role="tab" aria-selected={selected === 'all'}>सभी सदस्य</button>{memberCategories.map(m => <button key={m.key} className={selected === m.key ? 'member-tab active' : 'member-tab'} role="tab" aria-selected={selected === m.key} onClick={() => setSelected(m.key)}>{m.title}</button>)}</div>
      {filtered.length ? <div className="members-list">{filtered.map(m => <article key={m.id}><PhotoPlaceholder label={`${m.name} member photograph`} /><div><h3>{m.name}</h3><span>{m.category} member</span><small>{m.since ?? 'सदस्यता date not supplied'}</small></div></article>)}</div> : <div className="members-empty"><div className="empty-orbit"><span>PS</span></div><div className="eyebrow">सदस्य सूची तैयार हो रही है</div><h2 className="serif">सदस्यों के नाम<br />स्वीकृति के साथ जुड़ेंगे।</h2><p>सार्वजनिक रूप से साझा किए जाने वाले सदस्य परिचय और फोटो संस्था की स्वीकृति के बाद जोड़े जाएंगे। निजी मोबाइल नंबर यहाँ प्रकाशित नहीं किए जाएंगे।</p><button className="button button-outline" onClick={() => setSelected('all')}>सभी सदस्यता श्रेणियाँ <ArrowRight size={15} /></button></div>}
      <div className="category-rows">{memberCategories.map(m => <div className="category-row" key={m.key}><span className="category-icon">{m.key === 'lifetime' ? 'L' : m.key === 'fiveYear' ? '5' : '1'}</span><div><h3>{m.title}</h3><p>अवधि: {m.duration}। सदस्य विवरण स्वीकृति के बाद प्रकाशित होगा।</p></div><button className="row-arrow" onClick={() => setSelected(m.key)} aria-label={`Filter to ${m.title}`}><ArrowUpRight size={16} /></button></div>)}</div>
    </section>
  </PageFrame>;
}

function Transparency() {
  return <PageFrame eyebrow="पारदर्शिता एवं जवाबदेही" title={<>जनसहयोग में<br /><em>विश्वास और पारदर्शिता।</em></>} intro="पारदर्शिता का अर्थ है सेवा कार्य की सही जानकारी साझा करना और साथ ही निजी जानकारी की सुरक्षा करना।">
    <section className="wrap transparency-page-content">
      <div className="transparency-intro"><div className="record-seal"><ShieldCheck size={25} /><span>खुला<br />रिकॉर्ड</span></div><div><h2 className="serif">सहायक जानकारी, context<br />और जिम्मेदारी।</h2><p>इस वेबसाइट पर सेवा कार्यों की तस्वीरें, संस्था का परिचय, सदस्यता और आवश्यक दस्तावेज़ क्रमशः जोड़े जाएंगे। संवेदनशील निजी जानकारी प्रकाशित नहीं की जाएगी।</p></div></div>
      <div className="transparency-principles">
        <article><span className="eyebrow">01 / सेवा कार्य</span><h2 className="serif">क्या सेवा हुई और कहाँ।</h2><p>जहाँ उपलब्ध होगा, सेवा कार्य की तारीख, स्थान, फोटो और संक्षिप्त विवरण साझा किया जाएगा।</p></article>
        <article><span className="eyebrow">02 / संस्था</span><h2 className="serif">दस्तावेज़ों के साथ सही जानकारी।</h2><p>स्वीकृत पंजीकरण, रिपोर्ट और अन्य सार्वजनिक दस्तावेज़ इस अनुभाग में जोड़े जाएंगे।</p><Link href="/documents" className="arrow-link">सार्वजनिक दस्तावेज़ देखें <ArrowUpRight size={15} /></Link></article>
        <article><span className="eyebrow">03 / गोपनीयता</span><h2 className="serif">पारदर्शिता, बिना निजता से समझौता किए।</h2><p>दानदाताओं की निजी जानकारी, पहचान संबंधी संवेदनशील विवरण और निजी संपर्क बिना अनुमति प्रकाशित नहीं किए जाएंगे।</p></article>
        <article><span className="eyebrow">04 / अपडेट</span><h2 className="serif">स्वीकृत जानकारी के आधार पर अपडेट।</h2><p>नई स्वीकृत जानकारी मिलने पर वेबसाइट की सामग्री अपडेट की जाएगी।</p></article>
      </div>
      <div className="privacy-note"><ShieldCheck size={18} /><p><strong>वर्तमान स्थिति।</strong> उपलब्ध फोटो, सदस्य विवरण और दस्तावेज़ क्रमशः वेबसाइट में जोड़े जाएंगे। जहाँ जानकारी उपलब्ध नहीं है, वहाँ उसे स्पष्ट रूप से बताया जाएगा।</p></div>
    </section>
  </PageFrame>;
}

function Documents() {
  const [category, setCategory] = useState('सभी रिकॉर्ड');
  const visible = category === 'सभी रिकॉर्ड' ? publicDocuments : publicDocuments.filter(d => d.category === category);
  return <PageFrame eyebrow="सार्वजनिक दस्तावेज़" title={<>महत्वपूर्ण रिकॉर्ड,<br /><em>स्पष्ट जानकारी के साथ।</em></>} intro="संस्था से जुड़े स्वीकृत सार्वजनिक दस्तावेज़, रिपोर्ट और सूचनाएँ इस अनुभाग में साझा की जाएंगी।">
    <section className="wrap documents-content"><div className="transparency-intro"><div className="record-seal"><ShieldCheck size={25} /><span>सार्वजनिक<br />रिकॉर्ड</span></div><div><h2 className="serif">क्या साझा करते हैं,<br />और क्या सुरक्षित रखते हैं।</h2><p>दस्तावेज़ों को प्रकाशित करने से पहले उनकी उपयुक्तता और निजी जानकारी की समीक्षा की जाएगी।</p></div></div>
      <div className="document-toolbar"><div className="eyebrow">दस्तावेज़ संग्रह</div><label className="select-wrap"><span className="sr-only">दस्तावेज़ श्रेणी चुनें</span><select value={category} onChange={e => setCategory(e.target.value)}><option>सभी रिकॉर्ड</option>{documentCategories.map(d => <option key={d}>{d}</option>)}</select><ChevronDown size={15} /></label></div>
      {visible.length ? <div className="document-list">{visible.map(d => <article key={d.id} className="document-row"><div className="document-icon"><FileText /></div><div className="doc-info"><span className="eyebrow">{d.category} · {d.year ?? 'तारीख शीघ्र'}</span><h3>{d.title}</h3><p>{d.description}</p></div>{d.fileUrl ? <a className="doc-open" href={d.fileUrl} target="_blank" rel="noreferrer">रिकॉर्ड देखें <ArrowUpRight size={14} /></a> : <span className="doc-pending">दस्तावेज़ शीघ्र उपलब्ध होगा</span>}</article>)}</div> : <div className="documents-empty"><span className="empty-file"><FileText /></span><div className="eyebrow">दस्तावेज़ संग्रह तैयार हो रहा है</div><h2 className="serif">दस्तावेज़ क्रमशः जोड़े जा रहे हैं।</h2><p>स्वीकृत दस्तावेज़ उपलब्ध होने पर उन्हें शीर्षक, श्रेणी और संक्षिप्त विवरण के साथ यहाँ प्रकाशित किया जाएगा।</p><button className="text-link" onClick={() => setCategory('All records')}>सभी श्रेणियाँ देखें <ArrowRight size={14} /></button></div>}
      <div className="privacy-note"><ShieldCheck size={18} /><p><strong>जिम्मेदार पारदर्शिता।</strong> सार्वजनिक सामग्री को प्रकाशित करने से पहले आवश्यक समीक्षा की जाएगी।</p></div>
    </section>
  </PageFrame>;
}

function संपर्क() {
  const [feedback, setFeedback] = useState('');
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const values = new FormData(form);
    if (String(values.get('website') ?? '').trim()) return;
    if (!site.contactEmail.trim()) {
      setFeedback('संदेश तैयार नहीं हुआ। संस्था का स्वीकृत सार्वजनिक ईमेल कॉन्फ़िगर करना आवश्यक है।');
      return;
    }
    const subject = String(values.get('subject') ?? 'Website inquiry');
    const body = [
      `Name: ${String(values.get('name') ?? '')}`,
      `Email: ${String(values.get('email') ?? '')}`,
      `मोबाइल: ${String(values.get('phone') ?? '') || 'Not provided'}`,
      '',
      String(values.get('message') ?? ''),
    ].join('\n');
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFeedback('आपके ईमेल ऐप में संदेश का ड्राफ्ट खुलेगा। भेजने से पहले उसे जांच लें; वेबसाइट डिलीवरी की पुष्टि नहीं कर सकती।');
  };
  return <PageFrame eyebrow="संपर्क us" title={<>सेवा से जुड़ने के लिए<br /><em>हमसे बात करें।</em></>} intro="प्रयास सहयोग सेवा समिति से जुड़ने, सुझाव देने या सेवा कार्य में सहयोग करने के लिए हमसे संपर्क करें। आधिकारिक संपर्क विवरण उपलब्ध होने पर यहाँ जोड़ा जाएगा।">
    <section className="wrap contact-layout"><div className="contact-main"><div className="contact-card"><div className="eyebrow">समिति से संपर्क</div><h2 className="serif">संपर्क विवरण<br />शीघ्र जोड़े जाएंगे।</h2><p>केवल संस्था द्वारा स्वीकृत और नियमित रूप से देखे जाने वाले सार्वजनिक संपर्क माध्यम यहाँ प्रकाशित किए जाएंगे।</p><div className="contact-detail"><span className="contact-icon">01</span><div><span>स्थान</span><strong>बरेली, उत्तर प्रदेश</strong><small>पूरा सार्वजनिक पता शीघ्र</small></div></div><div className="contact-detail"><span className="contact-icon">02</span><div><span>ईमेल</span>{site.contactEmail ? <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> : <strong>आधिकारिक ईमेल शीघ्र</strong>}<small>{site.contactEmail ? 'आधिकारिक सार्वजनिक ईमेल' : 'सार्वजनिक ईमेल उपलब्ध होने पर जोड़ा जाएगा'}</small></div></div><div className="contact-detail"><span className="contact-icon">03</span><div><span>फोन</span><strong>सार्वजनिक नंबर शीघ्र</strong><small>अधिकृत नंबर उपलब्ध नहीं है</small></div></div><div className="contact-safety"><ShieldCheck size={16} />संपर्क जानकारी संस्था की पुष्टि के बाद ही प्रकाशित की जाएगी।</div></div><div className="contact-side-note"><span className="eyebrow">कार्यालय / सेवा क्षेत्र</span><div className="map-placeholder"><span className="map-cross">+</span><span className="map-label">बरेली<br />उत्तर प्रदेश</span><span className="map-footnote">पूरा पता शीघ्र जोड़ा जाएगा</span></div></div></div>
      <div className="inquiry-panel"><div className="eyebrow">संदेश भेजें</div><h2 className="serif">अपना संदेश भेजें।</h2><p className="form-intro">सार्वजनिक ईमेल कॉन्फ़िगर होने के बाद यह फॉर्म आपके ईमेल ऐप में संदेश का ड्राफ्ट तैयार करेगा।</p><form onSubmit={submit}><div className="form-grid"><label>आपका नाम<input required name="name" autoComplete="name" placeholder="Name" /></label><label>ईमेल पता<input required name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label></div><div className="form-grid"><label>मोबाइल <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" placeholder="Optional" /></label><label>विषय<input required name="subject" placeholder="आप क्या पूछना चाहते हैं?" /></label></div><label>संदेश<textarea required name="message" rows={5} placeholder="अपना संदेश यहाँ लिखें…" /></label><label className="sr-only" aria-hidden="true">इस फ़ील्ड को खाली रखें<input name="website" tabIndex={-1} autoComplete="off" /></label><div className="form-note"><ShieldCheck size={16} /><span>कृपया निजी या वित्तीय संवेदनशील जानकारी साझा न करें। संदेश भेजने से पहले उसे स्वयं जांचें।</span></div><button className="button button-dark" type="submit">{site.contactEmail ? 'ईमेल ड्राफ्ट खोलें' : 'फॉर्म जांचें'} <ArrowUpRight size={15} /></button>{feedback && <p className="form-feedback" role="status">{feedback}</p>}</form></div>
    </section>
  </PageFrame>;
}

function NotFound() { return <PageFrame eyebrow="पेज नहीं मिला" title={<>यह पेज<br /><em>उपलब्ध नहीं है।</em></>} intro="संभव है पेज का पता बदल गया हो।"><div className="wrap not-found"><Link className="button button-dark" href="/">होम पर जाएँ <ArrowUpRight size={15} /></Link></div></PageFrame>; }

function Router() {
  const [path] = useLocation();
  useEffect(() => {
    const meta = pageMeta[path] ?? { title: 'पेज नहीं मिला', description: site.description };
    document.title = `${meta.title === 'होम' ? site.name : `${meta.title} — ${site.name}`}`;
    const desc = document.querySelector('meta[name="description"]'); if (desc) desc.setAttribute('content', meta.description);
    const ogTitle = document.querySelector('meta[property="og:title"]'); if (ogTitle) ogTitle.setAttribute('content', document.title);
    const ogDesc = document.querySelector('meta[property="og:description"]'); if (ogDesc) ogDesc.setAttribute('content', meta.description);
  }, [path]);
  return <><a className="skip-link" href="#main-content">मुख्य सामग्री पर जाएँ</a><Header /><div id="main-content"><Switch><Route path="/" component={Home} /><Route path="/about" component={About} /><Route path="/activities" component={Activities} /><Route path="/core-team" component={CoreTeam} /><Route path="/members" component={Members} /><Route path="/transparency" component={Transparency} /><Route path="/documents" component={Documents} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></div><Footer /></>;
}

function App() { return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter>; }

export default App;