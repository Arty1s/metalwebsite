import { chatGPTSignOutPath } from "@/app/chatgpt-auth";

export default function UnauthorizedPage() {
  return <main className="status-page"><div><p className="eyebrow blue">Přístup zamítnut</p><h1>Tento účet není administrátor.</h1><p>Přihlaste se účtem, který administraci poprvé aktivoval.</p><a className="button button-outline" href={chatGPTSignOutPath("/admin")}>Přihlásit jiný účet</a></div></main>;
}
