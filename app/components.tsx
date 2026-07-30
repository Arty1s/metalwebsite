"use client";

import { FormEvent, useState } from "react";
import { company, nav } from "./content";

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Metalcraft – domů">
        <strong>{company.name}</strong><span>{company.subtitle}</span>
      </a>
      <nav className="desktop-nav" aria-label="Hlavní navigace">
        {nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>
      <a className="button button-outline header-cta" href="#kontakt">Poptat zakázku <span>↗</span></a>
      <details className="mobile-menu">
        <summary aria-label="Otevřít menu"><span></span><span></span><span></span></summary>
        <nav>{nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
      </details>
    </header>
  );
}

export function QuoteForm() {
  const [notice, setNotice] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice("Formulář je připravený. Pro skutečné odesílání je potřeba připojit e-mailový nebo CRM backend.");
  }
  return (
    <form className="quote-form" onSubmit={submit}>
      <div className="field-grid">
        <label>Jméno a příjmení<input name="name" autoComplete="name" required /></label>
        <label>Firma<input name="company" autoComplete="organization" /></label>
        <label>E-mail<input type="email" name="email" autoComplete="email" required /></label>
        <label>Telefon<input type="tel" name="phone" autoComplete="tel" /></label>
      </div>
      <label>Co potřebujete vyrobit?<textarea name="description" rows={5} required placeholder="Rozměry, materiál, množství, termín…"></textarea></label>
      <label className="file-field">Podklady nebo výkres<input type="file" name="file" accept=".pdf,.dwg,.dxf,.step,.stp,.jpg,.png,.zip" /></label>
      <label className="consent"><input type="checkbox" required /> Souhlasím se zpracováním údajů pro vyřízení poptávky.</label>
      <button className="button button-primary" type="submit">Odeslat nezávaznou poptávku <span>→</span></button>
      {notice && <p className="form-notice" role="status">{notice}</p>}
    </form>
  );
}
