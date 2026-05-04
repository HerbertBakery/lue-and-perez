import AppKit
import CoreGraphics
import Darwin
import Foundation

let fileManager = FileManager.default
let currentDirectory = fileManager.currentDirectoryPath
let outputURL = URL(fileURLWithPath: currentDirectory).appendingPathComponent("public/lue-and-perez-capabilities.pdf")
let logoURL = URL(fileURLWithPath: currentDirectory).appendingPathComponent("public/logo.png")

let pageSize = CGSize(width: 612, height: 792)
let scale: CGFloat = 4
let canvasSize = CGSize(width: pageSize.width * scale, height: pageSize.height * scale)

let margin: CGFloat = 48 * scale
let cardGap: CGFloat = 16 * scale
let teal = NSColor(calibratedRed: 0.06, green: 0.46, blue: 0.43, alpha: 1)
let dark = NSColor(calibratedRed: 0.10, green: 0.13, blue: 0.19, alpha: 1)
let muted = NSColor(calibratedRed: 0.33, green: 0.37, blue: 0.43, alpha: 1)
let line = NSColor(calibratedRed: 0.87, green: 0.90, blue: 0.93, alpha: 1)
let cardFill = NSColor(calibratedRed: 0.97, green: 0.98, blue: 0.99, alpha: 1)

let cards: [(String, String)] = [
    ("BUYER TYPES", "Importers, distributors, retail programs, private-label teams, and foodservice buyers."),
    ("MARKETS SERVED", "North America, UK and EU, Middle East, and CARICOM lanes."),
    ("PRODUCT HANDLING", "Ambient, chilled, and frozen operating models planned around product sensitivity."),
    ("CORE SCOPE", "Sourcing, consolidation, export logistics, packaging readiness, and private label support."),
]

let engagementBullets = [
    "Destination market, product scope, target volume, and timing are reviewed first.",
    "Packaging, labeling, documentation, and cold-chain needs are surfaced before the quote path is set.",
    "Qualified B2B inquiries typically receive a response within two business days.",
]

let supportBullets = [
    "Supplier capability, MOQ logic, and commercial fit screening.",
    "Multi-supplier consolidation and shipment-readiness planning.",
    "Export documentation, freight coordination, and cold-chain support.",
    "Private-label, packaging, and production-readiness guidance.",
]

func paragraphStyle(alignment: NSTextAlignment = .left, lineHeight: CGFloat? = nil) -> NSMutableParagraphStyle {
    let style = NSMutableParagraphStyle()
    style.alignment = alignment
    style.lineBreakMode = .byWordWrapping
    if let lineHeight {
        style.minimumLineHeight = lineHeight
        style.maximumLineHeight = lineHeight
    }
    return style
}

func drawText(_ text: String, in rect: CGRect, fontSize: CGFloat, weight: NSFont.Weight = .regular, color: NSColor, lineHeight: CGFloat? = nil, alignment: NSTextAlignment = .left) {
    let attributes: [NSAttributedString.Key: Any] = [
        .font: NSFont.systemFont(ofSize: fontSize, weight: weight),
        .foregroundColor: color,
        .paragraphStyle: paragraphStyle(alignment: alignment, lineHeight: lineHeight),
    ]
    NSAttributedString(string: text, attributes: attributes).draw(with: rect, options: [.usesLineFragmentOrigin, .usesFontLeading])
}

func drawBullets(_ items: [String], x: CGFloat, startY: CGFloat, width: CGFloat) {
    var cursorY = startY
    for item in items {
        let dotRect = CGRect(x: x, y: cursorY + 8, width: 6, height: 6)
        teal.setFill()
        NSBezierPath(ovalIn: dotRect).fill()
        drawText(item, in: CGRect(x: x + 18, y: cursorY, width: width - 18, height: 72), fontSize: 20, color: muted, lineHeight: 28)
        cursorY += 72
    }
}

guard let logoImage = NSImage(contentsOf: logoURL) else {
    fatalError("Unable to load logo from \(logoURL.path)")
}

let brandedImage = NSImage(size: NSSize(width: canvasSize.width, height: canvasSize.height), flipped: true) { rect in
    NSColor.white.setFill()
    rect.fill()

    let topBand = CGRect(x: 0, y: 0, width: rect.width, height: 118 * scale)
    teal.setFill()
    topBand.fill()

    let footerBand = CGRect(x: margin, y: rect.height - (54 * scale), width: rect.width - margin * 2, height: 30 * scale)
    teal.setFill()
    footerBand.fill()

    let logoSize: CGFloat = 136 * scale
    let logoRect = CGRect(x: (rect.width - logoSize) / 2, y: 18 * scale, width: logoSize, height: logoSize)
    logoImage.draw(in: logoRect)

    drawText("Capabilities Overview", in: CGRect(x: margin, y: 138 * scale, width: rect.width - margin * 2, height: 24 * scale), fontSize: 11 * scale, weight: .bold, color: teal)
    drawText("Lue & Perez supports serious", in: CGRect(x: margin, y: 164 * scale, width: rect.width - margin * 2, height: 28 * scale), fontSize: 21 * scale, weight: .bold, color: dark)
    drawText("B2B buyer programs", in: CGRect(x: margin, y: 194 * scale, width: rect.width - margin * 2, height: 28 * scale), fontSize: 21 * scale, weight: .bold, color: dark)
    drawText(
        "From supplier fit and consolidation through packaging, documentation, and export execution, the focus is on making Caribbean food programs clearer to launch, replenish, and scale.",
        in: CGRect(x: margin, y: 230 * scale, width: rect.width - margin * 2, height: 56 * scale),
        fontSize: 11 * scale,
        color: muted,
        lineHeight: 16 * scale
    )

    let cardWidth = (rect.width - margin * 2 - cardGap) / 2
    let cardHeight: CGFloat = 88 * scale
    for index in 0..<cards.count {
        let column = CGFloat(index % 2)
        let row = CGFloat(index / 2)
        let x = margin + column * (cardWidth + cardGap)
        let y = (300 * scale) + row * (cardHeight + 14 * scale)
        let cardRect = CGRect(x: x, y: y, width: cardWidth, height: cardHeight)

        cardFill.setFill()
        let cardPath = NSBezierPath(roundedRect: cardRect, xRadius: 10 * scale, yRadius: 10 * scale)
        cardPath.fill()
        line.setStroke()
        cardPath.lineWidth = 1
        cardPath.stroke()

        drawText(cards[index].0, in: CGRect(x: x + 14 * scale, y: y + 14 * scale, width: cardWidth - 28 * scale, height: 14 * scale), fontSize: 8.5 * scale, weight: .bold, color: teal)
        drawText(cards[index].1, in: CGRect(x: x + 14 * scale, y: y + 34 * scale, width: cardWidth - 28 * scale, height: 40 * scale), fontSize: 10 * scale, color: dark, lineHeight: 13 * scale)
    }

    let lowerWidth = (rect.width - margin * 2 - 20 * scale) / 2
    drawText("How buyers usually engage", in: CGRect(x: margin, y: 506 * scale, width: lowerWidth, height: 20 * scale), fontSize: 15 * scale, weight: .bold, color: dark)
    drawBullets(engagementBullets, x: margin, startY: 538 * scale, width: lowerWidth)

    let rightX = margin + lowerWidth + 20 * scale
    drawText("Core operating support", in: CGRect(x: rightX, y: 506 * scale, width: lowerWidth, height: 20 * scale), fontSize: 15 * scale, weight: .bold, color: dark)
    drawBullets(supportBullets, x: rightX, startY: 538 * scale, width: lowerWidth)

    drawText(
        "www.lueandperez.com/request-a-quote",
        in: CGRect(x: margin + 16 * scale, y: rect.height - (49 * scale), width: rect.width - margin * 2 - 32 * scale, height: 16 * scale),
        fontSize: 11 * scale,
        weight: .bold,
        color: .white
    )

    return true
}

guard let tiffData = brandedImage.tiffRepresentation,
      let bitmap = NSBitmapImageRep(data: tiffData),
      let cgImage = bitmap.cgImage else {
    fatalError("Unable to create image representation for capabilities sheet")
}

var mediaBox = CGRect(origin: .zero, size: pageSize)
guard let consumer = CGDataConsumer(url: outputURL as CFURL),
      let context = CGContext(consumer: consumer, mediaBox: &mediaBox, nil) else {
    fatalError("Unable to create PDF context")
}

context.beginPDFPage(nil)
context.interpolationQuality = .high
context.draw(cgImage, in: mediaBox)
context.endPDFPage()
context.closePDF()

print("Wrote \(outputURL.path)")
fflush(stdout)
exit(0)
