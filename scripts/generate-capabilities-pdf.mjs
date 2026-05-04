import fs from "node:fs";
import path from "node:path";

const outputPath = path.join(process.cwd(), "public", "lue-and-perez-capabilities.pdf");
const pageWidth = 612;
const pageHeight = 792;
const marginX = 54;
const topY = 738;
const bottomY = 64;

const sections = [
  {
    type: "title",
    text: "Lue & Perez",
  },
  {
    type: "subtitle",
    text: "Capabilities Overview",
  },
  {
    type: "paragraph",
    text: "Lue & Perez supports serious B2B buyers sourcing, consolidating, packaging, documenting, and moving Caribbean food products into export markets with stronger commercial and operating clarity.",
  },
  {
    type: "heading",
    text: "Who We Support",
  },
  {
    type: "bullet",
    items: [
      "Importers and distributors building repeat Caribbean food programs",
      "Retail and foodservice buyers balancing launch, replenishment, and compliance needs",
      "Private-label teams needing sourcing, packaging, and export-readiness support",
    ],
  },
  {
    type: "heading",
    text: "Core Capabilities",
  },
  {
    type: "bullet",
    items: [
      "Supplier sourcing and commercial fit review",
      "Multi-supplier consolidation and shipment readiness planning",
      "Export logistics, documentation, cold-chain, and freight coordination",
      "Co-packing, private label, and packaging-readiness support",
    ],
  },
  {
    type: "heading",
    text: "Markets and Product Handling",
  },
  {
    type: "bullet",
    items: [
      "North America, UK/EU, Middle East, and CARICOM lanes",
      "Ambient, chilled, and frozen operating models",
      "Destination-market labeling, documentation, and execution considerations",
    ],
  },
  {
    type: "heading",
    text: "What Buyers Usually Need Help With",
  },
  {
    type: "bullet",
    items: [
      "Testing whether supplier, MOQ, packaging, and market fit actually align",
      "Reducing fragmentation across sourcing, export paperwork, and freight handoffs",
      "Protecting shelf-life, cold-chain integrity, and commercial usability at destination",
      "Moving private-label concepts into production-ready, export-ready programs",
    ],
  },
  {
    type: "heading",
    text: "How Engagements Usually Start",
  },
  {
    type: "bullet",
    items: [
      "Destination market, product scope, target volume, and launch timing are reviewed first",
      "Commercial fit, export readiness, and operating risks are assessed before quoting next steps",
      "Qualified B2B inquiries typically receive a response within two business days",
    ],
  },
  {
    type: "heading",
    text: "Request a Quote",
  },
  {
    type: "paragraph",
    text: "Website: www.lueandperez.com/request-a-quote",
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
    if (next.length <= maxChars) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function createPageCommands() {
  const commands = [];
  let y = topY;

  function newPage() {
    pages.push(commands.splice(0));
    y = topY;
  }

  function ensureSpace(height) {
    if (y - height < bottomY) {
      newPage();
    }
  }

  function addText(text, x, size, font = "F1", color = "0.10 0.16 0.22", lineGap = 15) {
    const safe = escapePdfText(text);
    commands.push(`BT /${font} ${size} Tf ${color} rg 1 0 0 1 ${x} ${y} Tm (${safe}) Tj ET`);
    y -= lineGap;
  }

  commands.push(`q 0.06 0.46 0.43 rg 0 744 ${pageWidth} 48 re f Q`);

  for (const section of sections) {
    if (section.type === "title") {
      ensureSpace(42);
      addText(section.text, marginX, 28, "F2", "1 1 1", 34);
      continue;
    }

    if (section.type === "subtitle") {
      addText(section.text, marginX, 14, "F1", "0.07 0.12 0.20", 30);
      continue;
    }

    if (section.type === "heading") {
      ensureSpace(28);
      y -= 6;
      addText(section.text, marginX, 16, "F2", "0.07 0.12 0.20", 24);
      continue;
    }

    if (section.type === "paragraph") {
      const lines = wrapText(section.text, 88);
      ensureSpace(lines.length * 15 + 10);
      for (const line of lines) {
        addText(line, marginX, 11, "F1", "0.20 0.24 0.31", 15);
      }
      y -= 6;
      continue;
    }

    if (section.type === "bullet") {
      for (const item of section.items) {
        const lines = wrapText(item, 78);
        ensureSpace(lines.length * 15 + 8);
        commands.push(`q 0.06 0.46 0.43 rg ${marginX} ${y - 3} 5 5 re f Q`);
        addText(lines[0], marginX + 14, 11, "F1", "0.20 0.24 0.31", 15);
        for (const line of lines.slice(1)) {
          addText(line, marginX + 14, 11, "F1", "0.20 0.24 0.31", 15);
        }
        y -= 3;
      }
      y -= 4;
    }
  }

  pages.push(commands);
}

const pages = [];
createPageCommands();

const objects = [];
objects[1] = "";
objects[2] = "";
objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

const pageObjectNumbers = [];

for (const pageCommands of pages) {
  const content = pageCommands.join("\n");
  const contentObjectNumber = objects.length;
  objects[contentObjectNumber] = `<< /Length ${Buffer.byteLength(content, "utf8")} >>\nstream\n${content}\nendstream`;

  const pageObjectNumber = objects.length;
  objects[pageObjectNumber] =
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] ` +
    `/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`;

  pageObjectNumbers.push(pageObjectNumber);
}

objects[2] = `<< /Type /Pages /Count ${pageObjectNumbers.length} /Kids [${pageObjectNumbers.map((id) => `${id} 0 R`).join(" ")}] >>`;
objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";

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
