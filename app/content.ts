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
  ["Služby", "/#sluzby"],
  ["Realizace", "/realizace"],
  ["Technologie", "/#proces"],
  ["O nás", "/#o-nas"],
  ["Kontakt", "/#kontakt"],
] as const;

export const services = [
  { title: "CNC obrábění", text: "Přesné frézování, soustružení a opracování dílů podle výkresové dokumentace.", image: "/client-assets/client-22.jpg", alt: "Přesně obrobené hliníkové desky v dílně" },
  { title: "Svařování a kovové konstrukce", text: "Ocelové, nerezové i hliníkové konstrukce od přípravy po finální kompletaci.", image: "/client-assets/client-25.jpg", alt: "Pracovník u svařované průmyslové konstrukce" },
  { title: "Přípravky a jednoúčelová řešení", text: "Montážní, kontrolní a výrobní přípravky navržené pro váš konkrétní proces.", image: "/client-assets/client-19.jpg", alt: "Detail přesně obráběného zakázkového přípravku" },
  { title: "Povrchové úpravy", text: "Lakováním, broušením a dalšími úpravami připravíme výrobek k finálnímu použití.", image: "/client-assets/client-30.jpg", alt: "Pracovník provádí povrchovou úpravu ocelového rámu" },
  { title: "Zakázková technická výroba", text: "Kompletní zařízení a dílčí sestavy, které v katalogu jednoduše nenajdete.", image: "/client-assets/client-09.jpg", alt: "Kompletní nerezové technologické zařízení v dílně" },
];

export const proofPoints = [
  ["Kusová výroba", "Od prototypu po malou sérii"],
  ["Přesné obrábění", "Podle výkresové dokumentace"],
  ["Nerez, ocel, hliník", "Materiál podle zadání"],
  ["Kompletní servis", "Od návrhu po dodání"],
] as const;

export const projects = [
  { slug: "presny-montazni-pripravek", title: "Přesný montážní přípravek", category: "Přípravky", summary: "Zakázkové ustavení dílů pro přesnou a opakovatelnou montáž.", image: "/client-assets/client-20.jpg", alt: "Zakázkový přesně obráběný montážní přípravek" },
  { slug: "svarovane-nosne-ramy", title: "Svařované nosné rámy", category: "Konstrukce", summary: "Rozměrově stabilní základ pro navazující technologii.", image: "/client-assets/client-23.jpg", alt: "Velké bílé svařované ocelové rámy" },
  { slug: "nerezova-technologicka-nasypka", title: "Nerezová technologická násypka", category: "Nerezová výroba", summary: "Kompletní nerezová sestava s důrazem na provedení detailů.", image: "/client-assets/client-29.jpg", alt: "Nerezová technologická násypka během výroby" },
  { slug: "manipulacni-a-plnici-konstrukce", title: "Manipulační a plnicí konstrukce", category: "Technologické celky", summary: "Řešení připravené podle prostoru a způsobu obsluhy.", image: "/client-assets/client-10.jpg", alt: "Zelená manipulační a plnicí konstrukce v provozu" },
  { slug: "cast-technologickeho-zarizeni", title: "Část technologického zařízení", category: "Kompletace", summary: "Výroba a osazení dílčího funkčního celku.", image: "/client-assets/client-02.jpg", alt: "Kompletní nerezové technologické zařízení v dílně" },
  { slug: "lakovane-dily-vyrobni-linky", title: "Lakované díly výrobní linky", category: "Sériová výroba", summary: "Lakované komponenty připravené pro další montáž.", image: "/client-assets/client-13.jpg", alt: "Lakované ocelové díly připravené k expedici" },
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
