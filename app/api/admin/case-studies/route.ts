import { NextResponse } from "next/server";
import { getChatGPTUser } from "@/app/chatgpt-auth";
import { claimOrVerifyAdmin, createCaseStudy, deleteCaseStudy } from "@/db/case-studies";

async function authorize() {
  const user = await getChatGPTUser();
  return user && await claimOrVerifyAdmin(user) ? user : null;
}

export async function POST(request: Request) {
  if (!await authorize()) return NextResponse.json({ error: "Nemáte oprávnění." }, { status: 403 });
  const data = await request.json() as Record<string, unknown>;
  const required = ["slug", "title", "category", "summary", "content", "image"];
  if (required.some(key => typeof data[key] !== "string" || !(data[key] as string).trim())) {
    return NextResponse.json({ error: "Vyplňte všechna povinná pole." }, { status: 400 });
  }
  const slug = String(data.slug).trim().toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return NextResponse.json({ error: "URL slug může obsahovat jen malá písmena, čísla a pomlčky." }, { status: 400 });
  }
  try {
    await createCaseStudy({
      slug,
      title: String(data.title).trim(),
      category: String(data.category).trim(),
      summary: String(data.summary).trim(),
      content: String(data.content).trim(),
      materials: String(data.materials ?? "").trim(),
      process: String(data.process ?? "").trim(),
      result: String(data.result ?? "").trim(),
      image: String(data.image).trim(),
      published: data.published === false ? 0 : 1,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Případovou studii se nepodařilo uložit. Zkontrolujte, zda URL slug už neexistuje." }, { status: 409 });
  }
}

export async function DELETE(request: Request) {
  if (!await authorize()) return NextResponse.json({ error: "Nemáte oprávnění." }, { status: 403 });
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!Number.isInteger(id) || id < 1) return NextResponse.json({ error: "Neplatné ID." }, { status: 400 });
  await deleteCaseStudy(id);
  return NextResponse.json({ ok: true });
}
