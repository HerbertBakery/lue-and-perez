import fs from "node:fs";
import path from "node:path";

const outputPath = path.join(process.cwd(), "public", "lue-and-perez-capabilities.pdf");
const pageWidth = 612;
const pageHeight = 792;
const marginX = 48;
const topY = 744;
const bottomY = 52;

const sections = [
  {
    type: "eyebrow",
    text: "Caribbean Food Export Partner",
  },
  {
    type: "title",
    text: "Lue & Perez",
  },
  {
    type: "subtitle",
    text: "One-page capabilities overview",
  },
  {
    type: "paragraph",
    text: "Lue & Perez supports serious B2B buyers sourcing, consolidating, documenting, packaging, and moving Caribbean food products into export markets with stronger commercial and operating clarity.",
  },
  {
    type: "mini-grid",
    items: [
      ["Buyer types", "Importers, distributors, retail programs, private label, and foodservice buyers"],
      ["Markets served", "North America, UK/EU, Middle East, and CARICOM"],
      ["Product handling", "Ambient, chilled, and frozen operating models"],
      ["Core scope", "Sourcing, consolidation, export logistics, packaging, and private label support"],
    ],
  },
  {
    type: "heading",
    text: "What buyers usually need help with",
  },
  {
    type: "bullet",
    items: [
      "Testing whether supplier capability, MOQ logic, packaging, and market fit actually align",
      "Reducing fragmentation across sourcing, documentation, consolidation, and freight handoffs",
      "Protecting shelf-life, cold-chain integrity, and commercial usability at destination",
      "Moving private-label concepts into repeatable, export-ready programs",
    ],
  },
  {
    type: "heading",
    text: "Typical engagement starting points",
  },
  {
    type: "bullet",
    items: [
      "Destination market, product scope, target volume, and launch timing",
      "Packaging, labeling, certifications, and cold-chain requirements",
      "Export-readiness questions that could delay quote, launch, or replenishment",
    ],
  },
  {
    type: "footer-band",
    text: "www.lueandperez.com/request-a-quote",
  },
];

function escapePdfText(value) {
  return value.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

function wrapText(text, maxChars) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) current = next;
    else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

const commands = [];
let y = topY;

function ensureSpace(height) {
  if (y - height < bottomY) {
    throw new Error("Capabilities PDF content exceeded one page.");
  }
}

function addText(text, x, size, font = "F1", color = "0.20 0.24 0.31", lineGap = 15) {
  const safe = escapePdfText(text);
  commands.push(`BT /${font} ${size} Tf ${color} rg 1 0 0 1 ${x} ${y} Tm (${safe}) Tj ET`);
  y -= lineGap;
}

commands.push(`q 0.06 0.46 0.43 rg 0 712 ${pageWidth} 80 re f Q`);

for (const section of sections) {
  if (section.type === "eyebrow") {
    ensureSpace(18);
    addText(section.text, marginX, 10, "F2", "1 1 1", 16);
    continue;
  }

  if (section.type === "title") {
    ensureSpace(36);
    addText(section.text, marginX, 28, "F2", "1 1 1", 30);
    continue;
  }

  if (section.type === "subtitle") {
    ensureSpace(20);
    addText(section.text, marginX, 12, "F1", "0.89 0.97 0.96", 24);
    continue;
  }

  if (section.type === "paragraph") {
    const lines = wrapText(section.text, 92);
    ensureSpace(lines.length * 15 + 14);
    for (const line of lines) addText(line, marginX, 11, "F1", "0.20 0.24 0.31", 15);
    y -= 8;
    continue;
  }

  if (section.type === "mini-grid") {
    const cardWidth = 246;
    const gap = 18;
    const rowHeight = 70;
    ensureSpace(rowHeight * 2 + 12);

    section.items.forEach(([label, value], index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const x = marginX + col * (cardWidth + gap);
      const cardTop = y - row * (rowHeight + 12);

      commands.push(`q 0.97 0.98 0.99 rg ${x} ${cardTop - rowHeight} ${cardWidth} ${rowHeight} re f Q`);
      commands.push(`q 0.89 0.91 0.94 RG 1 w ${x} ${cardTop - rowHeight} ${cardWidth} ${rowHeight} re S Q`);

      const labelY = cardTop - 20;
      commands.push(`BT /F2 9 Tf 0.06 0.46 0.43 rg 1 0 0 1 ${x + 14} ${labelY} Tm (${escapePdfText(label.toUpperCase())}) Tj ET`);

      const valueLines = wrapText(value, 34);
      let lineY = labelY - 18;
      for (const line of valueLines.slice(0, 3)) {
        commands.push(`BT /F1 10 Tf 0.20 0.24 0.31 rg 1 0 0 1 ${x + 14} ${lineY} Tm (${escapePdfText(line)}) Tj ET`);
        lineY -= 13;
      }
    });

    y -= rowHeight * 2 + 24;
    continue;
  }

  if (section.type === "heading") {
    ensureSpace(24);
    addText(section.text, marginX, 15, "F2", "0.07 0.12 0.20", 22);
    continue;
  }

  if (section.type === "bullet") {
    for (const item of section.items) {
      const lines = wrapText(item, 80);
      ensureSpace(lines.length * 14 + 6);
      commands.push(`q 0.06 0.46 0.43 rg ${marginX} ${y - 4} 4 4 re f Q`);
      addText(lines[0], marginX + 14, 10.5, "F1", "0.20 0.24 0.31", 14);
      for (const line of lines.slice(1)) addText(line, marginX + 14, 10.5, "F1", "0.20 0.24 0.31", 14);
      y -= 2;
    }
    y -= 6;
    continue;
  }

  if (section.type === "footer-band") {
    ensureSpace(40);
    commands.push(`q 0.06 0.46 0.43 rg ${marginX} ${bottomY} ${pageWidth - marginX * 2} 30 re f Q`);
    commands.push(`BT /F2 11 Tf 1 1 1 rg 1 0 0 1 ${marginX + 16} ${bottomY + 10} Tm (${escapePdfText(section.text)}) Tj ET`);
  }
}

const content = commands.join("\n");
const objects = [];
objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
objects[2] = "<< /Type /Pages /Count 1 /Kids [5 0 R] >>";
objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";
objects[5] =
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] ` +
  `/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents 6 0 R >>`;
objects[6] = `<< /Length ${Buffer.byteLength(content, "utf8")} >>\nstream\n${content}\nendstream`;

let pdf = "%PDF-1.4\n";
const offsets = [0];

for (let i = 1; i < objects.length; i += 1) {
  offsets[i] = Buffer.byteLength(pdf, "utf8");
  pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
}

const xrefOffset = Buffer.byteLength(pdf, "utf8");
pdf += `xref\n0 ${objects.length}\n`;
pdf += "0000000000 65535 f \n";

for (let i = 1; i < objects.length; i += 1) {
  pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}

pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

fs.writeFileSync(outputPath, pdf, "binary");
console.log(`Wrote ${outputPath}`);
