export const company = {
  name: "METALCRAFT",
  subtitle: "KOVOVÝROBA NA MÍRU",
  phone: "+420 123 456 789",
  email: "info@metalcraft.cz",
  address: "Průmyslová 1234, 123 45 Praha, ČR",
  ico: "000 00 000",
  canonical: "https://www.example.cz",
};

export const nav = [
  ["Služby", "#sluzby"],
  ["Realizace", "#realizace"],
  ["Technologie", "#proces"],
  ["O nás", "#o-nas"],
  ["Kontakt", "#kontakt"],
] as const;

export const metrics = [
  ["100+", "Dokončených projektů"],
  ["15+", "Let zkušeností"],
  ["0,02 mm", "Dosažitelná přesnost"],
  ["Kompletní servis", "Od návrhu po dodání"],
] as const;

export const services = [
  { title: "CNC obrábění", text: "Přesné frézování, soustružení a opracování dílů podle výkresové dokumentace.", pos: "13% 42%" },
  { title: "Svařování a kovové konstrukce", text: "Ocelové, nerezové i hliníkové konstrukce od přípravy po finální kompletaci.", pos: "39% 42%" },
  { title: "Přípravky a jednoúčelová řešení", text: "Montážní, kontrolní a výrobní přípravky navržené pro váš konkrétní proces.", pos: "66% 42%" },
  { title: "Povrchové úpravy", text: "Lakování, broušení a další finální úpravy v koordinaci s ověřenými partnery.", pos: "91% 42%" },
  { title: "Zakázková technická výroba", text: "Kompletní zařízení a dílčí sestavy, které v katalogu jednoduše nenajdete.", pos: "52% 73%" },
];

export const projects = [
  { title: "Přesný montážní přípravek", category: "Přípravky", summary: "Pevné a opakovatelné ustavení dílů pro sériovou montáž.", pos: "42% 62%", span: "wide" },
  { title: "Lakované díly výrobní linky", category: "Sériová výroba", summary: "Svařence a komponenty připravené pro dlouhodobý provoz.", pos: "15% 60%", span: "normal" },
  { title: "Svařované nosné rámy", category: "Konstrukce", summary: "Rozměrově stabilní základ pro navazující technologii.", pos: "67% 62%", span: "normal" },
  { title: "Nerezová technologická násypka", category: "Nerezová výroba", summary: "Kompletní sestava s důrazem na čistitelnost a detail.", pos: "90% 62%", span: "tall" },
  { title: "Manipulační a plnicí konstrukce", category: "Technologické celky", summary: "Řešení navržené podle prostoru a způsobu obsluhy.", pos: "28% 73%", span: "normal" },
  { title: "Část technologického zařízení", category: "Kompletace", summary: "Výroba, osazení a kontrola funkčního celku.", pos: "78% 73%", span: "wide" },
];

export const process = [
  ["01", "Konzultace a zadání", "Probereme účel, podklady a očekávaný výsledek."],
  ["02", "Návrh řešení", "Navrhneme optimální postup a připravíme technické řešení."],
  ["03", "Cenová nabídka", "Transparentně stanovíme rozsah, cenu a termín."],
  ["04", "Výroba a kontrola", "Vyrobíme, zkompletujeme a každý výstup zkontrolujeme."],
  ["05", "Dodání", "Hotový výrobek bezpečně předáme nebo dopravíme."],
] as const;

export const benefits = [
  "Zakázkové řešení místo katalogového produktu",
  "Výroba jednotlivých kusů i menších sérií",
  "Konstrukce, obrábění, svařování a kompletace",
  "Průběžná komunikace během realizace",
  "Výstupní kontrola před předáním",
];
