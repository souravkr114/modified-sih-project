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
        
        # Header (pages 2+)
        if self._pageNumber > 1:
            self.drawString(54, 11 * inch - 36, "TEAM HEXAGRAM • SIH25-806 PPT SLIDE-BY-SLIDE WINNING PRESENTATION GUIDE")
            self.drawRightString(8.5 * inch - 54, 11 * inch - 36, "SIH GRAND FINALE MASTER DOSSIER")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.75)
            self.line(54, 11 * inch - 42, 8.5 * inch - 54, 11 * inch - 42)
            
        # Footer
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.75)
        self.line(54, 46, 8.5 * inch - 54, 46)
        
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawString(54, 32, "SIH25-806 • EV Charging Station Predictor • MoHUA Decision Support Engine")
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

    # Colors
    PRIMARY = colors.HexColor("#0099ff")       # Electric Sky Blue
    PRIMARY_DARK = colors.HexColor("#0284c7")  # Cerulean
    DARK_BG = colors.HexColor("#0f172a")       # Slate 900
    TEXT_DARK = colors.HexColor("#1e293b")     # Slate 800
    BORDER_COLOR = colors.HexColor("#cbd5e1")  # Slate 300

    styles.add(ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=PRIMARY,
        spaceAfter=4
    ))

    styles.add(ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=DARK_BG,
        spaceAfter=12
    ))

    styles.add(ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=PRIMARY_DARK,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    ))

    styles.add(ParagraphStyle(
        'SlideTitleHeading',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=DARK_BG,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    ))

    styles.add(ParagraphStyle(
        'BodyDark',
        parent=styles['BodyText'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=TEXT_DARK,
        spaceAfter=6
    ))

    styles.add(ParagraphStyle(
        'BodyDarkBold',
        parent=styles['BodyText'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=13,
        textColor=DARK_BG,
        spaceAfter=6
    ))

    styles.add(ParagraphStyle(
        'ScriptBox',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13,
        textColor=DARK_BG
    ))

    story = []

    # Title Banner
    story.append(Paragraph("SIH25-806 • PPT Slide-by-Slide Winning Presentation Guide", styles['DocTitle']))
    story.append(Paragraph("<b>Team Hexagram Master Strategy: How to Present & Win Smart India Hackathon</b>", styles['DocSubTitle']))
    story.append(Paragraph("<b>Problem Statement ID:</b> SIH25-806 | <b>Ministry:</b> Ministry of Housing & Urban Affairs (MoHUA)", styles['BodyDark']))
    story.append(Paragraph("<b>Team Name:</b> Hexagram | <b>Team ID:</b> SIH2025-HEXAGRAM | <b>Team Members:</b> Sourav Kumar (Leader), Sumit Kumar, Rishabh Raj, Karishma Kumari Gupta, Abhas Prasad, Rishu Raj", styles['BodyDark']))
    story.append(HRFlowable(width="100%", thickness=2, color=PRIMARY, spaceBefore=4, spaceAfter=12))

    # Executive Overview
    story.append(Paragraph("1. The Judge's Mindset & Winning Pitch Blueprint", styles['SectionHeading']))
    
    pitch_mindset = [
        [Paragraph("<b>SIH Finalist & Senior Judge Insight:</b><br/>\"SIH evaluators grade over 20-30 presentations per panel. They don't just look for code—they evaluate <b>Problem Understanding, Technical Rigor, Real-World Feasibility, UI Polish, and MoHUA Policy Impact</b>. Your presentation deck <code>SIH2026_Idea_Hexagram_DelhiEV.pptx</code> has been structured to hit 100% of these criteria. This guide gives your team the exact slide-by-slide verbal script, visual cues, and defense strategies to dominate your presentation round.\"", styles['ScriptBox'])]
    ]
    t_mindset = Table(pitch_mindset, colWidths=[7.0 * inch])
    t_mindset.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#f0f9ff")),
        ('BOX', (0, 0), (-1, -1), 1, PRIMARY),
        ('PADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(t_mindset)
    story.append(Spacer(1, 10))

    # Slide-by-Slide Breakdown
    story.append(Paragraph("2. Slide-by-Slide Master Script & Explanation Guide", styles['SectionHeading']))

    slides_guide = [
        ("Slide 1: Title Page & Team Credentials",
         "<b>Slide Objective:</b> Establish instant authority, technical polish, and team identity.<br/>"
         "<b>Key Content on Slide:</b> Problem ID SIH25-806, MoHUA Ministry Tag, Team Hexagram credentials, Team Member list, and Live Prototype Link.<br/>"
         "<b>Verbal Pitch Script (Speaker: Team Leader):</b><br/>"
         "<i>\"Good morning honorable judges. We are Team Hexagram presenting our solution for SIH Problem Statement ID SIH25-806 under the Ministry of Housing and Urban Affairs: EV Charging Station Predictor — Optimal Site Recommendation Engine for Delhi NCT. Before we begin, our live production prototype is deployed and accessible at <code>souravkr114.github.io/modified-sih-project/</code>.\"</i><br/>"
         "<b>Judge Evaluation Focus:</b> Verifies team registration details and immediate working prototype proof."),

        ("Slide 2: Proposed Solution (The 3 Innovation Pillars)",
         "<b>Slide Objective:</b> Prove your solution is an intelligent decision engine, not just a static map.<br/>"
         "<b>Key Content on Slide:</b> 3 Core Innovation Pillars (Multi-Factor GIS Scoring, SHAP Explainable AI, Investor ROI Simulator) + Dynamic Pincode/POI Engine.<br/>"
         "<b>Verbal Pitch Script:</b><br/>"
         "<i>\"Judges, existing mapping tools show where chargers ALREADY exist. Our platform tells city planners and private operators WHERE THE NEXT CHARGER MUST BE BUILT. We achieve this through 3 core pillars: First, a Multi-Factor Spatial GIS Scoring Model evaluating demand gap, EV density, traffic corridors, and DISCOM grid capacity. Second, Explainable AI using SHAP feature attributions so planners see WHY a site received Rank #1. Third, an Investor Financial Simulator that calculates Capex, Opex, EBITDA, and Payback Period across interactive tariff sliders.\"</i><br/>"
         "<b>Judge Evaluation Focus:</b> Differentiates your project from consumer maps like Google Maps."),

        ("Slide 3: Technical Approach & Production Architecture",
         "<b>Slide Objective:</b> Demonstrate modern, type-safe full-stack software architecture.<br/>"
         "<b>Key Content on Slide:</b> Next.js 16 (Turbopack), React 18, TypeScript, Tailwind CSS, Leaflet.js with CartoDB Voyager Light tiles, SHAP XAI engine, and 100% offline standalone resilience (`Delhi_EV_Platform.html`).<br/>"
         "<b>Verbal Pitch Script:</b><br/>"
         "<i>\"Our technology stack is built on Next.js 16 with Turbopack and TypeScript for high-performance spatial rendering. We utilize Leaflet.js for light vector tile GIS mapping and custom SVG candidate markers. Crucially, our architecture is 100% serverless on GitHub Pages and includes a zero-dependency offline standalone bundle (`Delhi_EV_Platform.html`), ensuring field resilience even without internet connectivity.\"</i><br/>"
         "<b>Judge Evaluation Focus:</b> Technical stack maturity, execution speed, and offline reliability."),

        ("Slide 4: Feasibility, Grid Constraints & Data Quality",
         "<b>Slide Objective:</b> Address real-world infrastructure constraints and data governance.<br/>"
         "<b>Key Content on Slide:</b> Rule 2 Data Quality Compliance, Grid Substation Feasibility Index (11kV/33kV substations, cable distance in meters, transformer kVA), and Dynamic Supply Deficit adjustment.<br/>"
         "<b>Verbal Pitch Script:</b><br/>"
         "<i>\"A high-demand site is useless if grid interconnection requires 5km of expensive cabling. Our Grid Feasibility Index evaluates distance to DISCOM 11kV/33kV substations and transformer kVA capacity directly in the site score. Furthermore, under Rule 2 Data Provenance, we combine ground-truth Delhi Govt Vahan registrations with OpenStreetMap GIS geometries and calibrated spatial proxies.\"</i><br/>"
         "<b>Judge Evaluation Focus:</b> Real-world engineering feasibility, grid safety, and data credibility."),

        ("Slide 5: Impact, Benefits & MoHUA Policy Alignment",
         "<b>Slide Objective:</b> Prove policy impact and economic viability for city authorities & CPOs.<br/>"
         "<b>Key Content on Slide:</b> Direct alignment with MoHUA urban benchmark of 1 Public Charger per 25 EVs, economic de-risking (14–24 month payback), and multi-modal transit integration (ISBTs, Metro, Airport).<br/>"
         "<b>Verbal Pitch Script:</b><br/>"
         "<i>\"Our platform directly operationalizes MoHUA urban guidelines targeting 1 public charger per 25 EVs. By incorporating our District Deficit Matrix, city authorities can identify deficit hot-spots like North Delhi (773.6 EVs/charger), while private CPOs can de-risk capital investments by predicting payback periods before breaking ground.\"</i><br/>"
         "<b>Judge Evaluation Focus:</b> Government policy alignment, public impact, and financial de-risking."),

        ("Slide 6: Demo Links, Code Repository & References",
         "<b>Slide Objective:</b> Close with authority and invite judges to test the live prototype.<br/>"
         "<b>Key Content on Slide:</b> Live Prototype URL, GitHub Repository, Delhi EV Policy 2026, and OpenStreetMap references.<br/>"
         "<b>Verbal Pitch Script:</b><br/>"
         "<i>\"In conclusion, Team Hexagram has delivered a production-ready, fully deployed decision support platform for MoHUA. You can test the live application right now on your devices at <code>souravkr114.github.io/modified-sih-project/</code>. Thank you, and we welcome your questions!\"</i><br/>"
         "<b>Judge Evaluation Focus:</b> Complete deployment verification and transition to Q&A round.")
    ]

    for title, script_body in slides_guide:
        slide_block = [
            [Paragraph(f"<b>{title}</b>", styles['SlideTitleHeading'])],
            [Paragraph(script_body, styles['BodyDark'])]
        ]
        t_slide = Table(slide_block, colWidths=[7.0 * inch])
        t_slide.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#f8fafc")),
            ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
            ('PADDING', (0, 0), (-1, -1), 7),
            ('LINELEFT', (0, 0), (-1, -1), 3, PRIMARY),
        ]))
        story.append(t_slide)
        story.append(Spacer(1, 8))

    story.append(Spacer(1, 10))

    # Q&A Defense Strategy
    story.append(Paragraph("3. Q&A Defense Strategy (Winning the 5-Minute Evaluation)", styles['SectionHeading']))
    
    qa_table = [
        [Paragraph("<b>Judge Question Scenario</b>", styles['BodyDarkBold']), Paragraph("<b>Winning Defense Strategy & Formula to Quote</b>", styles['BodyDarkBold'])],
        [Paragraph("1. 'Is your ML model actually running or is it static?'", styles['BodyDark']), Paragraph("Demonstrate clicking 'Predict Station Site', change Pincode (e.g. 110019) or POIs, and click Predict. Show instant live recalculation of map pins, candidate scores, daily sessions, and SHAP feature drivers.", styles['BodyDark'])],
        [Paragraph("2. 'How do you calculate the site score mathematically?'", styles['BodyDark']), Paragraph("Quote the formula: <b>S_i = min(100, Σ w_k · f_{ik})</b> across 6 factors: Demand (30%), Supply Deficit (20%), Grid Capacity (15%), District Fleet (15%), Traffic (10%), and POI Dwell (10%).", styles['BodyDark'])],
        [Paragraph("3. 'What is SHAP and why did you use it?'", styles['BodyDark']), Paragraph("Quote SHAP additive equation: <b>S_i = E[f(x)] + Σ φ_k</b>. Explain that SHAP eliminates 'black box' opacity by providing additive game-theoretic weights (+24.5 traffic, +21.0 supply gap).", styles['BodyDark'])],
        [Paragraph("4. 'How does this align with MoHUA policy?'", styles['BodyDark']), Paragraph("Point to the District Deficit Matrix in the app. State that MoHUA targets <b>1 public charger per 25 EVs</b>, and our platform highlights districts like North Delhi (773.6 EVs/charger) as high-priority target zones.", styles['BodyDark'])],
        [Paragraph("5. 'What happens if internet fails during field deployment?'", styles['BodyDark']), Paragraph("Explain that our platform includes a 100% offline standalone single-file bundle (<code>Delhi_EV_Platform.html</code>) running client-side Babel & Leaflet JS with zero server dependencies.", styles['BodyDark'])]
    ]
    t_qa = Table(qa_table, colWidths=[2.2 * inch, 4.8 * inch])
    t_qa.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#e0f2fe")),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('PADDING', (0, 0), (-1, -1), 5),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(t_qa)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Winning presentation guide PDF saved to: {filename}")

if __name__ == "__main__":
    out_pdf = os.path.join(os.getcwd(), "SIH25-806_Hexagram_Winning_Presentation_Guide.pdf")
    build_pdf(out_pdf)
