import type { Metadata } from "next";
import { Header } from "@/app/components";
import { listCaseStudies } from "@/db/case-studies";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Realizace | METALCRAFT", description: "Případové studie zakázkové kovovýroby METALCRAFT." };

export default async function CaseStudiesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const current = Math.max(1, Number(params.page) || 1);
  const { items, page, pages, total } = await listCaseStudies(current, 24);
  return <main>
    <Header />
    <section className="archive-hero"><div className="shell"><p className="eyebrow blue">Realizace</p><h1>Projekty, za které se můžeme postavit</h1><p>{total} zveřejněných případových studií zakázkové kovovýroby.</p></div></section>
    <section className="archive-section"><div className="shell archive-grid">
      {items.map(item => <article className="archive-card" key={item.id}>
        <a href={`/realizace/${item.slug}`}><img src={item.image} alt={item.title} width="420" height="315" loading="lazy" /></a>
        <div><span>{item.category}</span><h2><a href={`/realizace/${item.slug}`}>{item.title}</a></h2><p>{item.summary}</p><a href={`/realizace/${item.slug}`}>Zobrazit případovou studii →</a></div>
      </article>)}
    </div>{pages > 1 && <nav className="pagination" aria-label="Stránkování realizací">
      {page > 1 && <a href={`/realizace?page=${page - 1}`}>← Novější</a>}
      <span>Strana {page} z {pages}</span>
      {page < pages && <a href={`/realizace?page=${page + 1}`}>Starší →</a>}
    </nav>}</section>
  </main>;
}
