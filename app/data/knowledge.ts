import {
  identity,
  projects,
  skills,
  experience,
  certificates,
} from "./identity";

export type Focus =
  | "identity"
  | "projects"
  | "skills"
  | "experience"
  | "certificates"
  | null;

export type Answer = {
  focus: Focus;
  lines: string[];
};

type Intent = {
  keywords: string[];
  build: () => Answer;
};

const topSkills = () =>
  [...skills].sort((a, b) => b.level - a.level).slice(0, 6);

const certCountByIssuer = () => {
  const m = new Map<string, number>();
  certificates.forEach((c) =>
    m.set(c.issuer, (m.get(c.issuer) ?? 0) + 1)
  );
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
};

const intents: Intent[] = [
  {
    keywords: ["project", "build", "ship", "work", "portfolio", "repo", "github"],
    build: () => ({
      focus: "projects",
      lines: [
        `Showing ${projects.length} projects · most recent first.`,
        ...projects
          .slice(0, 8)
          .map((p) => `  ${p.year}  ${p.name} — ${p.tagline.slice(0, 72)}${p.tagline.length > 72 ? "…" : ""}`),
        `+ ${Math.max(0, projects.length - 8)} more in the grid below.`,
      ],
    }),
  },
  {
    keywords: ["skill", "stack", "strong", "tech", "framework"],
    build: () => ({
      focus: "skills",
      lines: [
        "Top signals, sorted by depth:",
        ...topSkills().map(
          (s) =>
            `  ${s.level.toString().padStart(2, " ")}  ${s.name}  ·  ${s.category}`
        ),
        `Full matrix — ${skills.length} competencies across Frontend · Backend · ML/AI · Cloud · Tools.`,
      ],
    }),
  },
  {
    keywords: [
      "experience",
      "role",
      "career",
      "job",
      "organization",
      "bem",
      "hmti",
      "bangkit",
      "education",
      "ukdw",
      "university",
      "graduate",
    ],
    build: () => ({
      focus: "experience",
      lines: [
        "Trajectory — most recent first:",
        ...experience.map((e) => `  ${e.period}  ${e.role} @ ${e.org}`),
        "Tap a row for the summary.",
      ],
    }),
  },
  {
    keywords: [
      "certificate",
      "cert",
      "credential",
      "badge",
      "google",
      "dicoding",
      "oracle",
      "cisco",
    ],
    build: () => ({
      focus: "certificates",
      lines: [
        `${certificates.length} certificates tracked. By issuer:`,
        ...certCountByIssuer().map(
          ([issuer, count]) =>
            `  ${count.toString().padStart(2, " ")}×  ${issuer}`
        ),
        "Highlights: Bangkit 2024 (top graduate) · Becoming a Google Cloud Engineer · IT Specialist Python.",
      ],
    }),
  },
  {
    keywords: ["who", "about", "bio", "identity", "you", "yourself"],
    build: () => ({
      focus: "identity",
      lines: [
        `${identity.name} — ${identity.title}.`,
        identity.bio,
        `Based in ${identity.location}. Reach: ${identity.email}.`,
        `Motto: "${identity.motto}"`,
      ],
    }),
  },
  {
    keywords: ["chain", "walrus", "onchain", "permanent", "stored", "blockchain"],
    build: () => ({
      focus: "identity",
      lines: [
        `This identity is stored on ${identity.chain.network}.`,
        `Owner     ${identity.chain.ownerAddressShort}`,
        `Address   ${identity.chain.ownerAddress}`,
        `Written   ${identity.chain.timestamp}`,
        "Read-only. Tamper-evident. No server required.",
      ],
    }),
  },
  {
    keywords: ["contact", "email", "reach", "hire", "available"],
    build: () => ({
      focus: "identity",
      lines: [
        `Reach: ${identity.email}`,
        `Handle: ${identity.handle}`,
        `GitHub: ${identity.socials[0].href}`,
        `LinkedIn: ${identity.socials[1].href}`,
      ],
    }),
  },
];

export const suggestions = [
  "Show projects",
  "What skills are strongest?",
  "Show certificates",
  "Explain experience",
  "Who are you?",
];

function tokenize(q: string) {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function answer(query: string): Answer {
  const tokens = tokenize(query);
  if (tokens.length === 0) {
    return {
      focus: null,
      lines: [
        "Ask about projects, skills, experience, certificates, or the on-chain record.",
      ],
    };
  }

  let best: { intent: Intent; score: number } | null = null;
  for (const intent of intents) {
    const score = intent.keywords.reduce(
      (s, k) =>
        s + (tokens.some((t) => t.includes(k) || k.includes(t)) ? 1 : 0),
      0
    );
    if (score > 0 && (!best || score > best.score)) {
      best = { intent, score };
    }
  }

  if (!best) {
    return {
      focus: null,
      lines: [
        `I parsed: "${query}"`,
        "No strong match. Try: projects · skills · experience · certificates · chain.",
      ],
    };
  }

  return best.intent.build();
}
