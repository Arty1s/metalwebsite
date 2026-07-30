import { Header, QuoteForm } from "./components";
import { benefits, company, process, projects, proofPoints, services } from "./content";

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: company.name,
    url: company.canonical,
    telephone: company.phone,
    email: company.email,
    address: { "@type": "PostalAddress", streetAddress: company.address },
  };
  return (
    <main id="top">
      <Header />
      <section className="hero">
        <img className="hero-visual" src="/metalcraft-hero.png" width="1984" height="793" alt="Přesné obrábění kovového dílu s jiskrami a zakázkovou konstrukcí" fetchPriority="high" />
        <div className="hero-shade"></div>
        <div className="hero-content shell">
          <div className="hero-copy">
            <p className="eyebrow">Přesnost. Kvalita. Spolehlivost.</p>
            <h1>Kovová řešení<br />na míru</h1>
            <p className="lead">Navrhujeme, vyrábíme a dodáváme zakázkové kovové výrobky, přípravky, konstrukce a technologické celky přesně podle vašich požadavků.</p>
            <div className="actions">
              <a className="button button-primary" href="#realizace">Prohlédnout realizace <Arrow /></a>
              <a className="button button-outline" href="#kontakt">Poptat zakázku <Arrow /></a>
            </div>
          </div>
          <div className="hero-index"><span>01 / 06</span><strong>Od návrhu<br />po dodání</strong></div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Naše výrobní možnosti">
        <div className="shell proof-grid">
          {proofPoints.map(([title, text], i) => <article key={title}><span>0{i + 1}</span><div><strong>{title}</strong><p>{text}</p></div></article>)}
        </div>
      </section>

      <section className="section section-light" id="sluzby">
        <div className="shell">
          <div className="capabilities-layout">
            <header className="capabilities-intro">
              <p className="eyebrow blue">Co děláme</p><h2>Co umíme<br />vyrobit</h2>
              <p>Od přesného dílu po kompletní technologickou sestavu. Každou zakázku stavíme kolem skutečné potřeby vašeho provozu.</p>
              <a href="#kontakt">Více o službách <Arrow /></a>
            </header>
            {services.map((service, i) => <article className={`service-card service-${i + 1}`} key={service.title}>
              <img src={service.image} width="340" height="255" alt={service.alt} loading="lazy" />
              <div className="card-copy"><span className="index">0{i + 1}</span><h3>{service.title}</h3><p>{service.text}</p><a href="#kontakt" aria-label={`Poptat službu ${service.title}`}>Zjistit možnosti <Arrow /></a></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section projects-section" id="realizace">
        <div className="shell">
          <div className="featured-layout">
            <header className="featured-intro">
              <p className="eyebrow blue">Vybrané realizace</p><h2>Projekty, za které se můžeme postavit</h2>
              <p>Každý projekt je unikátní. Prohlédněte si samostatný archiv našich realizací.</p>
              <a href="/realizace">Zobrazit všechny <Arrow /></a>
            </header>
            {projects.slice(0, 4).map((project, i) => <article className="project-card" key={project.title}>
              <img src={project.image} width="355" height="266" alt={project.alt} loading="lazy" />
              <div className="project-copy"><span>{project.category} · 0{i + 1}</span><h3>{project.title}</h3><p>{project.summary}</p><a href={`/realizace/${project.slug}`}>Zobrazit případovou studii <Arrow /></a></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section process-section" id="proces">
        <img className="process-background" src="/process-background.png" width="2048" height="730" loading="lazy" alt="" />
        <div className="shell process-layout">
          <div>
            <p className="eyebrow blue">Jak pracujeme</p>
            <h2>Jak probíhá spolupráce</h2>
            <div className="timeline">
              {process.map(([num, title, text], i) => <article className="step" key={num}><div className="step-top"><span>{num}</span>{i < process.length - 1 && <i></i>}</div><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section why-section" id="o-nas">
        <img className="why-background" src="/why-background.png" width="2048" height="730" loading="lazy" alt="" />
        <div className="shell why-strip">
          <header>
            <p className="eyebrow blue">Proč Metalcraft</p>
            <h2>Proč spolupracovat<br /><span>právě s námi?</span></h2>
          </header>
          <div className="benefit-row">
            {benefits.map((benefit, i) => <article key={benefit}><span>0{i + 1}</span><strong>{benefit}</strong></article>)}
          </div>
          <div className="why-cta">
            <a className="button button-outline" href="#kontakt">Poptat zakázku <Arrow /></a>
            <small>Nebo nám pošlete výkres</small>
          </div>
        </div>
      </section>

      <section className="quote-section" id="kontakt">
        <div className="shell quote-grid">
          <div className="quote-copy"><p className="eyebrow blue">Nezávazná poptávka</p><h2>Máte výkres, vzorek nebo jen představu?</h2><p>Pošlete nám podklady. Ozveme se vám, projdeme možnosti výroby a připravíme nezávaznou nabídku.</p><div className="contact-lines"><a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a><a href={`mailto:${company.email}`}>{company.email}</a></div></div>
          <QuoteForm />
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <div><a className="brand footer-brand" href="#top"><strong>{company.name}</strong><span>{company.subtitle}</span></a><p>Zakázková kovovýroba, přípravky, konstrukce a technologické celky.</p></div>
          <div><strong>Služby</strong><a href="#sluzby">CNC obrábění</a><a href="#sluzby">Svařování</a><a href="#sluzby">Konstrukce a sestavy</a></div>
          <div><strong>Kontakt</strong><a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a><a href={`mailto:${company.email}`}>{company.email}</a><span>{company.address}</span><span>IČO: {company.ico}</span></div>
          <div><strong>Sledujte nás</strong><a href="#" aria-label="LinkedIn">LinkedIn ↗</a><a href="#" aria-label="Instagram">Instagram ↗</a></div>
        </div>
        <div className="shell copyright">© 2026 {company.name} s.r.o. Všechna práva vyhrazena. <a href="#">Ochrana soukromí</a><a href="/admin">Admin</a></div>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
