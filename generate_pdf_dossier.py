import sys
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header (Top line & title on pages 2+)
        if self._pageNumber > 1:
            self.drawString(54, 11 * inch - 36, "SIH BV806 • HACKATHON PRESENTATION & DEFENSE DOSSIER")
            self.drawRightString(8.5 * inch - 54, 11 * inch - 36, "CONFIDENTIAL & JUDGING GUIDE")
            self.setStrokeColor(colors.HexColor("#e2e8f0"))
            self.setLineWidth(0.75)
            self.line(54, 11 * inch - 42, 8.5 * inch - 54, 11 * inch - 42)
            
        # Footer
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.75)
        self.line(54, 46, 8.5 * inch - 54, 46)
        
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawString(54, 32, "EV Charging Station Predictor • MoHUA Decision Support Platform")
        self.drawRightString(8.5 * inch - 54, 32, page_str)
        self.restoreState()

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom Color Palette
    PRIMARY = colors.HexColor("#0099ff")       # Electric Sky Blue
    PRIMARY_DARK = colors.HexColor("#0284c7")  # Cerulean
    SECONDARY = colors.HexColor("#0f172a")     # Dark Slate
    TEXT_DARK = colors.HexColor("#1e293b")     # Slate 800
    TEXT_MUTED = colors.HexColor("#64748b")    # Slate 500
    BG_LIGHT = colors.HexColor("#f8fafc")      # Off white
    BORDER_COLOR = colors.HexColor("#cbd5e1")  # Slate 300

    # Custom Typography Styles
    styles.add(ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=PRIMARY,
        spaceAfter=6
    ))

    styles.add(ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=SECONDARY,
        spaceAfter=14
    ))

    styles.add(ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=PRIMARY_DARK,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    ))

    styles.add(ParagraphStyle(
        'SubSectionHeading',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=SECONDARY,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    ))

    styles.add(ParagraphStyle(
        'BodyDark',
        parent=styles['BodyText'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=TEXT_DARK,
        spaceAfter=6
    ))

    styles.add(ParagraphStyle(
        'BodyDarkBold',
        parent=styles['BodyText'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13.5,
        textColor=SECONDARY,
        spaceAfter=6
    ))

    styles.add(ParagraphStyle(
        'QuestionText',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14.5,
        textColor=PRIMARY_DARK,
        spaceBefore=8,
        spaceAfter=3,
        keepWithNext=True
    ))

    styles.add(ParagraphStyle(
        'AnswerText',
        parent=styles['BodyText'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=TEXT_DARK,
        spaceAfter=8
    ))

    styles.add(ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13,
        textColor=SECONDARY
    ))

    story = []

    # --- COVER / TITLE BLOCK ---
    story.append(Paragraph("Smart India Hackathon (SIH) • Problem ID BV806", styles['DocSubTitle']))
    story.append(Paragraph("EV Charging Station Predictor", styles['DocTitle']))
    story.append(Paragraph("<b>Senior Hackathon Judge Briefing, Presentation Strategy & Q&A Defense Dossier</b>", styles['BodyDarkBold']))
    story.append(Paragraph("<b>Organization:</b> Ministry of Housing & Urban Affairs (MoHUA) | <b>Category:</b> Software | <b>Theme:</b> Smart Vehicles", styles['BodyDark']))
    story.append(HRFlowable(width="100%", thickness=2, color=PRIMARY, spaceBefore=4, spaceAfter=14))

    # --- EXECUTIVE SUMMARY ---
    story.append(Paragraph("1. Executive Summary & 30-Second Elevator Pitch", styles['SectionHeading']))
    pitch_box = [
        [Paragraph("<b>Winning 30-Second Elevator Pitch:</b><br/>\"Honorable Judges, urban EV adoption in India is failing not because of a lack of vehicles, but because public chargers are placed based on real-estate guesswork rather than data-driven spatial demand. Our platform resolves SIH Problem BV806 by delivering a multi-layered GIS decision support engine. It combines real-time Pincode & POI demand scoring, Explainable AI (SHAP) feature drivers, land/grid feasibility checks, and investor ROI payback modeling. We don't just show where chargers exist—we calculate exactly where the next charger MUST be installed for maximum urban utility and private investor profitability.\"", styles['CalloutText'])]
    ]
    t_pitch = Table(pitch_box, colWidths=[7.0 * inch])
    t_pitch.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#f0f9ff")),
        ('BOX', (0, 0), (-1, -1), 1, PRIMARY),
        ('PADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(t_pitch)
    story.append(Spacer(1, 10))

    # --- CORE FEATURES TO DEMO ---
    story.append(Paragraph("2. Core Features Suite & Demo Script", styles['SectionHeading']))
    story.append(Paragraph("When presenting to hackathon judges, showcase the platform in these 5 logical stages:", styles['BodyDark']))

    features = [
        ("Feature 1: Interactive GIS Map & Dual Spatial Layers",
         "Showcases Leaflet Voyager light map tiles overlaid with existing public chargers (red pins) vs. candidate demand sites (electric blue rank pins #1, #2, #3). Includes dynamic catchment radius rings (1km to 25km)."),
        
        ("Feature 2: Dynamic EV Charging Station Predictor (Pincode & POI Engine)",
         "Demonstrate clicking <b>'Predict Station Site'</b>. Type any Pincode (e.g. 110006, 110019, 110058), Radius, and Points of Interest (Hotels, Malls, Metro Stations). Show how clicking <b>'Predict'</b> dynamically recalculates map coordinates, site scores, daily sessions, and kWh energy demand live!"),
        
        ("Feature 3: Explainable AI (SHAP Feature Importance Rationale)",
         "Highlight that our AI isn't a 'black box'. Explain how SHAP (SHapley Additive exPlanations) breaks down the Rank #1 score into transparent, quantified feature weights (e.g. +24.5 Traffic Exposure, +21.0 Supply Deficit, +18.2 Dwell Duration)."),
        
        ("Feature 4: Investor Capex, Opex & Financial Return Simulator",
         "Demonstrate the interactive financial calculator. Adjust hardware mix (DC 50kW fast chargers vs AC 22kW slow chargers), retail selling tariffs (₹12–25/kWh), and utilization %. Show instant automated updates to Total Capex (₹ Lakhs), Annual ROI %, Payback Period (Months), and Monthly Net Profit."),
        
        ("Feature 5: MoHUA District Deficit Matrix & Urban Benchmark Alert",
         "Show the official MoHUA planning table matching the target benchmark of <b>1 Public Charger per 25 EVs</b>. Demonstrate how searching a Pincode automatically highlights that district in the matrix table with a prominent <b>Target Zone</b> tag.")
    ]

    for title, desc in features:
        story.append(Paragraph(f"<b>• {title}:</b> {desc}", styles['BodyDark']))
        story.append(Spacer(1, 2))

    story.append(Spacer(1, 8))

    # --- TECHNICAL ARCHITECTURE ---
    story.append(Paragraph("3. Technical Architecture & Tech Stack", styles['SectionHeading']))
    
    arch_data = [
        [Paragraph("<b>Component</b>", styles['BodyDarkBold']), Paragraph("<b>Technology / Framework</b>", styles['BodyDarkBold']), Paragraph("<b>Key Responsibility</b>", styles['BodyDarkBold'])],
        [Paragraph("Frontend UI", styles['BodyDark']), Paragraph("Next.js 16 (Turbopack), React 18, Tailwind CSS", styles['BodyDark']), Paragraph("Responsive, clean enterprise presentation, state management, modal interactions.", styles['BodyDark'])],
        [Paragraph("GIS Mapping Engine", styles['BodyDark']), Paragraph("Leaflet.js & CartoDB Voyager Tile API", styles['BodyDark']), Paragraph("Lightweight, high-performance spatial map rendering, custom SVG markers & radius circles.", styles['BodyDark'])],
        [Paragraph("Spatial Scoring Algorithm", styles['BodyDark']), Paragraph("Multi-Factor Weighted Index ($S_i = \\sum w_k f_{ik}$)", styles['BodyDark']), Paragraph("Synthesizes demand gap, EV fleet density, traffic volume, POI dwell, and grid capacity.", styles['BodyDark'])],
        [Paragraph("Explainable AI (XAI)", styles['BodyDark']), Paragraph("SHAP (SHapley Additive exPlanations)", styles['BodyDark']), Paragraph("Provides additive game-theoretic feature attribution for transparent model rationale.", styles['BodyDark'])],
        [Paragraph("Offline Resilience", styles['BodyDark']), Paragraph("Single-File Standalone Bundle (Vanilla JS/Babel)", styles['BodyDark']), Paragraph("Guarantees 100% offline functionality (`Delhi_EV_Platform.html`) without server dependency.", styles['BodyDark'])]
    ]
    t_arch = Table(arch_data, colWidths=[1.5 * inch, 2.3 * inch, 3.2 * inch])
    t_arch.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#e0f2fe")),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('PADDING', (0, 0), (-1, -1), 5),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(t_arch)
    story.append(Spacer(1, 14))

    # --- TOUGHEST QUESTIONS & WINNING ANSWERS ---
    story.append(Paragraph("4. Toughest Hackathon Judges' Questions & Winning Answers", styles['SectionHeading']))
    story.append(Paragraph("Prepare your team to answer these 10 high-probability questions with authority:", styles['BodyDark']))

    qa_pairs = [
        ("Q1: How is your solution different from simply searching for EV chargers on Google Maps?",
         "<b>Answer:</b> Google Maps is a consumer-facing tool that shows where chargers <i>already exist</i>. Our platform is an urban planning and investment decision support system that predicts where chargers <i>SHOULD BE LOCATED</i> in the future. We synthesize multi-source spatial data—unserved EV fleet density, traffic flow, POI dwell times, and substation capacity—to score unserved locations and simulate financial ROI for operators."),

        ("Q2: How do you handle data scarcity or outdated government EV registration records?",
         "<b>Answer:</b> We enforce strict Data Provenance (Rule 2 Compliance). Ground truth records (vahan registrations, sub-station capacities) are complemented by OpenStreetMap GIS spatial geometries and calibrated proxy models (traffic corridor counts & POI category weights). When official records are sparse, our proxy engine estimates demand based on surrounding commercial activity."),

        ("Q3: How do you account for grid feeder capacity and land feasibility?",
         "<b>Answer:</b> Location scoring isn't just about traffic; a site scoring 95 in demand is useless if grid interconnection requires 5km of cabling. Our model integrates a Grid Feasibility Index (5% weight) considering distance to 11kV/33kV substations and transformer kVA capacity. Each candidate card displays exact cable distance (e.g. 120m) and transformer readiness status."),

        ("Q4: Why should an investor or city authority trust your AI recommendation score?",
         "<b>Answer:</b> Because we eliminate 'Black Box' opacity using SHAP (SHapley Additive exPlanations). Instead of giving an arbitrary score like '94.2', SHAP quantifies the exact contribution of each factor—e.g. +24.5 from Traffic Volume, +21.0 from Supply Gap, and +18.2 from POI Dwell Time. City officials can justify land allocation to stakeholders with clear empirical audit trails."),

        ("Q5: How does your financial simulator calculate Capex, Opex, and Payback Period?",
         "<b>Answer:</b> Capex combines hardware costs (₹14 Lakh per 50kW DC fast unit, ₹2.5 Lakh per AC 22kW unit) and grid connection fees (transformer & cabling). Opex includes bulk DISCOM power tariffs (₹6.8/kWh), land lease rents, and maintenance. Payback period is dynamically derived by comparing annual net EBITDA against initial Capex across user-adjusted retail tariff sliders (₹12–25/kWh)."),

        ("Q6: How does your platform scale beyond Delhi NCT to Tier-2 and Tier-3 cities in India?",
         "<b>Answer:</b> Our architecture separates the spatial analytics engine from local geography datasets. By ingesting standard OpenStreetMap GeoJSON geometries and local transport department Vahan registration CSVs, the platform can be configured for any Indian municipality (e.g. Patna, Lucknow, Pune) within hours without modifying the core scoring codebase."),

        ("Q7: What happens if a private operator builds a new charging hub near your recommended site?",
         "<b>Answer:</b> Our scoring engine is dynamic. When a new station is added to the system, the Supply Deficit Gap score for nearby candidate sites automatically recalculates downward, preventing market over-saturation and redirecting future capital to underserved zones."),

        ("Q8: How does your project align with official MoHUA guidelines and urban benchmarks?",
         "<b>Answer:</b> MoHUA guidelines target a benchmark of 1 public charging point per 25 EVs, with fast chargers spaced every 3km along urban corridors. Our District Deficit Matrix directly tracks local EV-to-charger ratios (e.g. 773.6 EVs/charger in North Delhi) against this MoHUA standard to flag critical priority zones."),

        ("Q9: What tech stack did you choose and why?",
         "<b>Answer:</b> We built the core application on Next.js 16 (Turbopack), React 18, TypeScript, and Tailwind CSS for rapid serverless deployment and type-safe performance. For field resilience, we also compiled a standalone zero-dependency offline HTML edition (`Delhi_EV_Platform.html`) that runs directly in any browser without needing an internet connection."),

        ("Q10: What are the next steps for commercialization or municipal deployment?",
         "<b>Answer:</b> We plan to integrate live DISCOM grid SCADA API feeds for real-time transformer load monitoring, partner with EV fleet aggregators (BluSmart, Uber EV) for anonymized GPS telemetry ingestion, and offer a SaaS dashboard for private Charge Point Operators (CPOs).")
    ]

    for q, a in qa_pairs:
        qa_block = [
            [Paragraph(q, styles['QuestionText'])],
            [Paragraph(a, styles['AnswerText'])]
        ]
        t_qa = Table(qa_block, colWidths=[7.0 * inch])
        t_qa.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#f8fafc")),
            ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
            ('PADDING', (0, 0), (-1, -1), 6),
            ('LINEBELOW', (0, 0), (-1, 0), 0.5, PRIMARY),
        ]))
        story.append(t_qa)
        story.append(Spacer(1, 6))

    story.append(Spacer(1, 10))

    # --- JUDGING RUBRIC & HIGH SCORE CHECKLIST ---
    story.append(Paragraph("5. Judge Evaluation Rubric & High-Score Strategy", styles['SectionHeading']))
    
    rubric_data = [
        [Paragraph("<b>Evaluation Criterion</b>", styles['BodyDarkBold']), Paragraph("<b>Weight</b>", styles['BodyDarkBold']), Paragraph("<b>How Our Platform Wins Full Marks</b>", styles['BodyDarkBold'])],
        [Paragraph("Technical Innovation & ML Complexity", styles['BodyDark']), Paragraph("20 Points", styles['BodyDark']), Paragraph("Multi-Factor Spatial Weighted Index + SHAP Explainable AI rationale.", styles['BodyDark'])],
        [Paragraph("Real-World Feasibility & Grid Safety", styles['BodyDark']), Paragraph("20 Points", styles['BodyDark']), Paragraph("Incorporates substation proximity, transformer kVA, and investor ROI payback modeling.", styles['BodyDark'])],
        [Paragraph("UI/UX & Interactive Usability", styles['BodyDark']), Paragraph("20 Points", styles['BodyDark']), Paragraph("Clean professional light cerulean blue design (#0099ff), clear bold black typography, interactive Leaflet map.", styles['BodyDark'])],
        [Paragraph("Government & MoHUA Policy Alignment", styles['BodyDark']), Paragraph("20 Points", styles['BodyDark']), Paragraph("Tracks official MoHUA benchmark of 1 charger per 25 EVs in District Deficit Matrix.", styles['BodyDark'])],
        [Paragraph("Completeness & Deployment Readiness", styles['BodyDark']), Paragraph("20 Points", styles['BodyDark']), Paragraph("Live GitHub Pages deployment + 100% offline standalone HTML edition.", styles['BodyDark'])]
    ]
    t_rubric = Table(rubric_data, colWidths=[2.0 * inch, 1.0 * inch, 4.0 * inch])
    t_rubric.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#e0f2fe")),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('PADDING', (0, 0), (-1, -1), 5),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(t_rubric)

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully generated at: {filename}")

if __name__ == "__main__":
    out_pdf = os.path.join(os.getcwd(), "SIH_BV806_Hackathon_Defense_Dossier.pdf")
    build_pdf(out_pdf)
