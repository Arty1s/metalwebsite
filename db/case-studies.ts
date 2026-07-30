import { env } from "cloudflare:workers";
import type { ChatGPTUser } from "@/app/chatgpt-auth";

export type CaseStudy = {
  id: number;
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  materials: string;
  process: string;
  result: string;
  image: string;
  published: number;
  created_at: string;
  updated_at: string;
};

const seeds = [
  ["presny-montazni-pripravek", "Přesný montážní přípravek", "Přípravky", "Zakázkové ustavení dílů pro přesnou a opakovatelnou montáž.", "/client-assets/client-20.jpg"],
  ["svarovane-nosne-ramy", "Svařované nosné rámy", "Konstrukce", "Rozměrově stabilní základ pro navazující technologii.", "/client-assets/client-23.jpg"],
  ["nerezova-technologicka-nasypka", "Nerezová technologická násypka", "Nerezová výroba", "Kompletní nerezová sestava s důrazem na provedení detailů.", "/client-assets/client-29.jpg"],
  ["manipulacni-a-plnici-konstrukce", "Manipulační a plnicí konstrukce", "Technologické celky", "Řešení připravené podle prostoru a způsobu obsluhy.", "/client-assets/client-10.jpg"],
  ["cast-technologickeho-zarizeni", "Část technologického zařízení", "Kompletace", "Výroba a osazení dílčího funkčního celku.", "/client-assets/client-02.jpg"],
  ["lakovane-dily-vyrobni-linky", "Lakované díly výrobní linky", "Sériová výroba", "Lakované komponenty připravené pro další montáž.", "/client-assets/client-13.jpg"],
] as const;

function db() {
  if (!env.DB) throw new Error("Databáze není dostupná.");
  return env.DB;
}

export async function ensureCaseStudySchema() {
  const database = db();
  await database.batch([
    database.prepare("CREATE TABLE IF NOT EXISTS admin_users (email TEXT PRIMARY KEY NOT NULL, display_name TEXT, created_at TEXT NOT NULL)"),
    database.prepare("CREATE TABLE IF NOT EXISTS case_studies (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL, category TEXT NOT NULL, summary TEXT NOT NULL, content TEXT NOT NULL, materials TEXT NOT NULL DEFAULT '', process TEXT NOT NULL DEFAULT '', result TEXT NOT NULL DEFAULT '', image TEXT NOT NULL, published INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)"),
    database.prepare("CREATE INDEX IF NOT EXISTS case_studies_published_created_idx ON case_studies (published, created_at DESC)"),
  ]);
  const count = await database.prepare("SELECT COUNT(*) AS count FROM case_studies").first<{ count: number }>();
  if ((count?.count ?? 0) === 0) {
    const now = new Date().toISOString();
    await database.batch(seeds.map(([slug, title, category, summary, image]) =>
      database.prepare("INSERT OR IGNORE INTO case_studies (slug,title,category,summary,content,materials,process,result,image,published,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,1,?,?)")
        .bind(slug, title, category, summary, "Zakázka byla připravena podle dodané dokumentace a požadavků konkrétního provozu.", "", "Konzultace, technická příprava, výroba a výstupní kontrola.", "Hotový celek byl připraven k navazující montáži nebo předání.", image, now, now)
    ));
  }
}

export async function claimOrVerifyAdmin(user: ChatGPTUser) {
  await ensureCaseStudySchema();
  const database = db();
  const count = await database.prepare("SELECT COUNT(*) AS count FROM admin_users").first<{ count: number }>();
  if ((count?.count ?? 0) === 0) {
    await database.prepare("INSERT OR IGNORE INTO admin_users (email,display_name,created_at) VALUES (?,?,?)")
      .bind(user.email.toLowerCase(), user.displayName, new Date().toISOString()).run();
  }
  const admin = await database.prepare("SELECT email FROM admin_users WHERE email = ?")
    .bind(user.email.toLowerCase()).first<{ email: string }>();
  return Boolean(admin);
}

export async function listCaseStudies(page = 1, pageSize = 24, includeDrafts = false) {
  await ensureCaseStudySchema();
  const safePage = Math.max(1, Math.floor(page));
  const offset = (safePage - 1) * pageSize;
  const where = includeDrafts ? "" : "WHERE published = 1";
  const [rows, total] = await Promise.all([
    db().prepare(`SELECT * FROM case_studies ${where} ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`).bind(pageSize, offset).all<CaseStudy>(),
    db().prepare(`SELECT COUNT(*) AS count FROM case_studies ${where}`).first<{ count: number }>(),
  ]);
  return { items: rows.results, page: safePage, pages: Math.max(1, Math.ceil((total?.count ?? 0) / pageSize)), total: total?.count ?? 0 };
}

export async function getCaseStudy(slug: string, includeDrafts = false) {
  await ensureCaseStudySchema();
  const suffix = includeDrafts ? "" : " AND published = 1";
  return db().prepare(`SELECT * FROM case_studies WHERE slug = ?${suffix}`).bind(slug).first<CaseStudy>();
}

export async function createCaseStudy(input: Omit<CaseStudy, "id" | "created_at" | "updated_at">) {
  await ensureCaseStudySchema();
  const now = new Date().toISOString();
  await db().prepare("INSERT INTO case_studies (slug,title,category,summary,content,materials,process,result,image,published,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)")
    .bind(input.slug, input.title, input.category, input.summary, input.content, input.materials, input.process, input.result, input.image, input.published, now, now).run();
}

export async function deleteCaseStudy(id: number) {
  await ensureCaseStudySchema();
  await db().prepare("DELETE FROM case_studies WHERE id = ?").bind(id).run();
}
