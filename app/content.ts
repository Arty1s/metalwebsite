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

export const services = [
  { title: "CNC obrábění", text: "Přesné frézování, soustružení a opracování dílů podle výkresové dokumentace.", image: "/photos/stainless-machine-shaft.jpg", alt: "Přesně obrobená hřídel nerezového zařízení" },
  { title: "Svařování a kovové konstrukce", text: "Ocelové, nerezové i hliníkové konstrukce od přípravy po finální kompletaci.", image: "/photos/welded-frame-assembly-work.jpg", alt: "Svařování průmyslové rámové konstrukce" },
  { title: "Přípravky a jednoúčelová řešení", text: "Montážní, kontrolní a výrobní přípravky navržené pro váš konkrétní proces.", image: "/photos/mechanical-jig-detail.jpg", alt: "Detail zakázkového mechanického přípravku" },
  { title: "Povrchové úpravy", text: "Lakování, broušení a další finální úpravy v koordinaci s ověřenými partnery.", image: "/photos/black-coated-cover-top.jpg", alt: "Černě lakovaný kovový kryt" },
  { title: "Zakázková technická výroba", text: "Kompletní zařízení a dílčí sestavy, které v katalogu jednoduše nenajdete.", image: "/photos/blue-steel-machine-frame.jpg", alt: "Modrý ocelový rám průmyslového zařízení" },
];

export const projects = [
  { title: "Přesný montážní přípravek", category: "Přípravky", summary: "Zakázkové ustavení dílů pro přesnou a opakovatelnou montáž.", image: "/photos/green-safety-enclosure-front.jpg", alt: "Zakázkový zelený rám s bezpečnostním oplocením" },
  { title: "Svařované nosné rámy", category: "Konstrukce", summary: "Rozměrově stabilní základ pro navazující technologii.", image: "/photos/large-white-welded-panels.jpg", alt: "Velké bílé svařované ocelové panely" },
  { title: "Nerezová technologická násypka", category: "Nerezová výroba", summary: "Kompletní nerezová sestava s důrazem na provedení detailů.", image: "/photos/stainless-hopper-side.jpg", alt: "Boční pohled na nerezovou technologickou násypku" },
  { title: "Manipulační a plnicí konstrukce", category: "Technologické celky", summary: "Řešení připravené podle prostoru a způsobu obsluhy.", image: "/photos/green-industrial-frame-installation.jpg", alt: "Instalace zelené manipulační konstrukce" },
  { title: "Část technologického zařízení", category: "Kompletace", summary: "Výroba a osazení dílčího funkčního celku.", image: "/photos/stainless-screw-conveyor.jpg", alt: "Nerezový šnekový dopravník ve výrobní hale" },
  { title: "Lakované díly výrobní linky", category: "Sériová výroba", summary: "Lakované komponenty připravené pro další montáž.", image: "/photos/teal-painted-steel-rails.jpg", alt: "Lakované ocelové kolejnice pro výrobní linku" },
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
