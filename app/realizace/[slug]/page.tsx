import { notFound } from "next/navigation";
import { Header } from "@/app/components";
import { getCaseStudy } from "@/db/case-studies";

export const dynamic = "force-dynamic";

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getCaseStudy(slug);
  if (!item) notFound();
  return <main>
    <Header />
    <article className="case-detail">
      <header className="case-detail-head"><div className="shell"><p className="eyebrow blue">{item.category}</p><h1>{item.title}</h1><p>{item.summary}</p></div></header>
      <div className="shell case-detail-body">
        <img src={item.image} width="900" height="675" alt={item.title} />
        <div className="case-copy"><section><h2>Zadání a řešení</h2><p>{item.content}</p></section>
          {item.materials && <section><h2>Materiály</h2><p>{item.materials}</p></section>}
          {item.process && <section><h2>Výrobní postup</h2><p>{item.process}</p></section>}
          {item.result && <section><h2>Výsledek</h2><p>{item.result}</p></section>}
          <a className="button button-primary" href="/#kontakt">Poptat podobné řešení</a>
        </div>
      </div>
    </article>
  </main>;
}
