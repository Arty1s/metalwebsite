"use client";

import { FormEvent, useState } from "react";
import type { CaseStudy } from "@/db/case-studies";

export function AdminPanel({ initialItems }: { initialItems: CaseStudy[] }) {
  const [items, setItems] = useState(initialItems);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setMessage("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.published = form.get("published") === "on" ? "true" : "false";
    const response = await fetch("/api/admin/case-studies", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, published: payload.published === "true" }),
    });
    const result = await response.json() as { error?: string };
    if (!response.ok) setMessage(result.error ?? "Uložení se nezdařilo.");
    else { setMessage("Případová studie byla uložena."); event.currentTarget.reset(); window.location.reload(); }
    setBusy(false);
  }

  async function remove(id: number) {
    if (!window.confirm("Opravdu chcete tuto případovou studii odstranit?")) return;
    const response = await fetch(`/api/admin/case-studies?id=${id}`, { method: "DELETE" });
    if (response.ok) setItems(current => current.filter(item => item.id !== id));
    else setMessage("Případovou studii se nepodařilo odstranit.");
  }

  return (
    <div className="admin-grid">
      <form className="admin-form" onSubmit={submit}>
        <h2>Nová případová studie</h2>
        <div className="admin-fields">
          <label>Název<input name="title" required /></label>
          <label>URL slug<input name="slug" required placeholder="napr-presny-pripravek" /></label>
          <label>Kategorie<input name="category" required /></label>
          <label>Obrázek<input name="image" required list="case-images" placeholder="/client-assets/client-01.jpg" /></label>
        </div>
        <datalist id="case-images">
          {Array.from({ length: 33 }, (_, index) => <option key={index} value={`/client-assets/client-${String(index + 1).padStart(2, "0")}.jpg`} />)}
        </datalist>
        <label>Krátké shrnutí<textarea name="summary" rows={2} required /></label>
        <label>Popis projektu<textarea name="content" rows={5} required /></label>
        <label>Materiály<textarea name="materials" rows={2} /></label>
        <label>Výrobní postup<textarea name="process" rows={3} /></label>
        <label>Výsledek<textarea name="result" rows={3} /></label>
        <label className="admin-check"><input type="checkbox" name="published" defaultChecked /> Publikovat okamžitě</label>
        <button className="button button-primary" disabled={busy}>{busy ? "Ukládám…" : "Uložit případovou studii"}</button>
        {message && <p role="status" className="admin-message">{message}</p>}
      </form>
      <section className="admin-list">
        <div className="admin-list-head"><h2>Všechny studie</h2><span>{items.length} záznamů</span></div>
        {items.map(item => <article key={item.id}>
          <img src={item.image} alt="" width="100" height="75" />
          <div><strong>{item.title}</strong><span>{item.category} · {item.published ? "publikováno" : "koncept"}</span></div>
          <a href={`/realizace/${item.slug}`} target="_blank">Otevřít</a>
          <button type="button" onClick={() => remove(item.id)}>Odstranit</button>
        </article>)}
      </section>
    </div>
  );
}
