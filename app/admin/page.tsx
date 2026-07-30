import { redirect } from "next/navigation";
import { requireChatGPTUser, chatGPTSignOutPath } from "@/app/chatgpt-auth";
import { claimOrVerifyAdmin, listCaseStudies } from "@/db/case-studies";
import { AdminPanel } from "./AdminPanel";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireChatGPTUser("/admin");
  if (!await claimOrVerifyAdmin(user)) redirect("/admin/neopravneny");
  const { items } = await listCaseStudies(1, 500, true);
  return <main className="admin-page">
    <header className="admin-header">
      <a className="brand" href="/"><strong>METALCRAFT</strong><span>ADMINISTRACE REALIZACÍ</span></a>
      <div><span>{user.displayName}</span><a href={chatGPTSignOutPath("/admin")}>Odhlásit</a></div>
    </header>
    <div className="admin-shell">
      <p className="eyebrow blue">Správa obsahu</p>
      <h1>Případové studie</h1>
      <p>Přidávejte realizace bez zásahu do zdrojového kódu. Veřejná stránka je automaticky stránkovaná.</p>
      <AdminPanel initialItems={items} />
    </div>
  </main>;
}
