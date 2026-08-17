// CYClaude — personalized notice picker (Vercel Serverless Function)
// POST /api/notices  { profile: {...}, question?: "..." }
// Requires env var: GEMINI_API_KEY  (Vercel → Settings → Environment Variables)

const NOTICES = [
  { id: 1, cat: "Academic", title: "115-1 Add/Drop/Change/Retake — Business English Conversation (I)", deadline: "2026-09-11", body: "Course add/drop for Business English Conversation (I). Apply on i-learning from Aug 6." },
  { id: 2, cat: "Visa/ARC", title: "Apply for your ARC within 15 days of arrival", deadline: "rolling", body: "Alien Resident Certificate required within 15 days of arrival. Late fines from NT$2,000. Bring passport, photo, enrollment & dorm certificate." },
  { id: 3, cat: "Event", title: "ISA Welcome Party & STEM Mixer", deadline: "2026-08-22", body: "International Student Association welcome party, Friday. Meet Taiwanese and international friends. STEM majors mixer." },
  { id: 4, cat: "Academic", title: "Fall course registration — English guide", deadline: "2026-09-01", body: "Fall semester course registration opens. English guide available for international students." },
  { id: 5, cat: "Insurance", title: "NHI eligibility after 6 months — interim group insurance", deadline: "notice", body: "National Health Insurance available after 6 months of residence. Until then, the compulsory group insurance (NT$500/month) applies." },
  { id: 6, cat: "Dorm", title: "Dormitory vacation-stay application", deadline: "2026-12-01", body: "Apply to stay in the dorm during winter vacation. Submit via the dorm office." }
];

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const { profile = {}, question = "" } = req.body || {};
  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(200).json({ mode: "demo", error: "GEMINI_API_KEY not set", picks: demoPicks(profile) });

  const prompt = `You are CYClaude, an assistant for international students at CYCU (Taiwan).
Student profile: ${JSON.stringify(profile)}
Student question (may be empty): "${question}"
Today's date: ${new Date().toISOString().slice(0, 10)}
All notices: ${JSON.stringify(NOTICES)}

Task: pick the 3 notices MOST relevant and urgent for THIS student (consider major, interests, arrival date, deadlines).
Reply with ONLY a JSON array (no markdown), each item: {"id": number, "title": string, "deadline": string, "reason": string (one short sentence, friendly, addressed to the student)}.`;

  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 512 }
        })
      }
    );
    const data = await r.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const json = text.replace(/```json|```/g, "").trim();
    let picks;
    try { picks = JSON.parse(json); } catch { picks = demoPicks(profile); }
    return res.status(200).json({ mode: "gemini", picks });
  } catch (e) {
    return res.status(200).json({ mode: "demo", error: String(e), picks: demoPicks(profile) });
  }
}

function demoPicks(profile) {
  const major = (profile.major || "").toLowerCase();
  const picks = [
    { id: 2, title: NOTICES[1].title, deadline: "within 15 days of arrival", reason: "Every new international student must do this first — fines apply if late." },
    { id: 1, title: NOTICES[0].title, deadline: "2026-09-11", reason: major.includes("business") ? "You're in the Business track — this add/drop deadline affects you." : "Add/drop period is closing soon." },
    { id: 3, title: NOTICES[2].title, deadline: "2026-08-22", reason: "A great first chance to meet friends this Friday." }
  ];
  return picks;
}
