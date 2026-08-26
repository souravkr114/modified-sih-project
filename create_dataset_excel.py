from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile
from xml.sax.saxutils import escape

OUT = Path(__file__).with_name('Delhi_EV_Platform_Dataset.xlsx')

def make_sheet(rows):
    lines = []
    for number, row in enumerate(rows, 1):
        cells = []
        for value in row:
            if isinstance(value, (int, float)):
                cells.append(f'<c><v>{value}</v></c>')
            else:
                text = '' if value is None else escape(str(value))
                cells.append(f'<c t="inlineStr"><is><t xml:space="preserve">{text}</t></is></c>')
        lines.append(f'<row r="{number}">' + ''.join(cells) + '</row>')
    return '<?xml version="1.0"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>' + ''.join(lines) + '</sheetData></worksheet>'

def build(sheets):
    names = list(sheets)
    workbook = '<?xml version="1.0"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>' + ''.join(f'<sheet name="{escape(n)}" sheetId="{i}" r:id="rId{i}"/>' for i, n in enumerate(names, 1)) + '</sheets></workbook>'
    rels = '<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' + ''.join(f'<Relationship Id="rId{i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet{i}.xml"/>' for i in range(1, len(names) + 1)) + '</Relationships>'
    types = '<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' + ''.join(f'<Override PartName="/xl/worksheets/sheet{i}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' for i in range(1, len(names) + 1)) + '</Types>'
    with ZipFile(OUT, 'w', ZIP_DEFLATED) as book:
        book.writestr('[Content_Types].xml', types)
        book.writestr('_rels/.rels', '<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>')
        book.writestr('xl/workbook.xml', workbook)
        book.writestr('xl/_rels/workbook.xml.rels', rels)
        for i, rows in enumerate(sheets.values(), 1):
            book.writestr(f'xl/worksheets/sheet{i}.xml', make_sheet(rows))

sheets = {
    'README': [
        ['Delhi EV Platform Dataset Export'],
        ['Purpose', 'Values hardcoded in the current Next.js application, exported for review.'],
        ['Important', 'Source names and URLs are copied from the app lineage register. The app does not currently download live records from these sources.'],
        ['Code files', 'src/app/page.tsx; src/services/stationService.ts; src/services/recommendationService.ts; src/services/analyticsService.ts'],
        ['Dataset sheets', 'Pincodes; Existing Stations; Candidate Locations; District Metrics; Source Register'],
    ],
    'Pincodes': [
        ['Pincode', 'Name', 'District', 'Latitude', 'Longitude', 'EV Base', 'Traffic / Day', 'Supply Gap'],
        ['110006', 'Kashmiri Gate & Chandni Chowk', 'North Delhi', 28.6698, 77.2285, 29400, 145000, 92.5],
        ['110019', 'Nehru Place & Kalkaji', 'South East Delhi', 28.5481, 77.253, 36200, 128000, 88],
        ['110058', 'Janakpuri & Posangipur', 'West Delhi', 28.6288, 77.0812, 38500, 110000, 91],
        ['110092', 'Anand Vihar & Laxmi Nagar', 'East Delhi', 28.6475, 77.315, 31200, 138000, 84],
        ['110017', 'Saket & Malviya Nagar', 'South Delhi', 28.5284, 77.2189, 42800, 120000, 86],
        ['110001', 'Connaught Place & Barakhamba', 'Central Delhi', 28.6315, 77.2167, 24800, 160000, 72],
        ['110037', 'Aerocity & IGI Airport Hub', 'South West Delhi', 28.5492, 77.1215, 44100, 175000, 68],
        ['110085', 'Rohini Sector 10 & Pitampura', 'North West Delhi', 28.7112, 77.1189, 32000, 95000, 89],
    ],
    'Existing Stations': [
        ['ID', 'Name', 'Operator', 'District', 'Latitude', 'Longitude', 'Type', 'Chargers', 'Power kW', 'Connectors', 'Price INR/kWh', 'Utilization %', 'Sessions/Day', 'Status', 'Data Source'],
        ['DEL-STA-001', 'Tata Power EZ Charge - Connaught Place Outer Ring', 'Tata Power', 'Central Delhi', 28.6315, 77.2167, 'commercial_hub', 6, 150, 'CCS2; Type2_AC', 18.5, 78, 42, 'active', 'Delhi Open EV Data Portal'],
        ['DEL-STA-002', 'BluSmart EV Hub - Aerocity Metro Station', 'BluSmart Mobility', 'South West Delhi', 28.5492, 77.1215, 'depot', 16, 480, 'CCS2; GB_T', 16, 92, 135, 'active', 'Delhi EV Dashboard'],
        ['DEL-STA-003', 'DTL Public Fast Charger - Saket District Centre', 'Delhi Transco Ltd', 'South Delhi', 28.5284, 77.2189, 'public', 4, 100, 'CCS2; Type2_AC; LECCS_2W', 15, 65, 28, 'active', 'Delhi EV Portal'],
        ['DEL-STA-004', 'Statiq Charging Hub - Nehru Place Bus Terminal', 'Statiq', 'South East Delhi', 28.5494, 77.2519, 'public', 8, 240, 'CCS2; LECCS_2W', 17.5, 84, 58, 'active', 'Delhi Transport Dept'],
        ['DEL-STA-005', 'Fortum Charge & Drive - Janakpuri District Centre', 'Fortum', 'West Delhi', 28.6293, 77.0784, 'commercial_hub', 4, 120, 'CCS2; CHAdeMO', 19, 71, 31, 'active', 'Delhi Open EV Portal'],
        ['DEL-STA-006', 'Exicom Smart Charger - Rohini Sector 10 Metro', 'Exicom', 'North West Delhi', 28.7112, 77.1189, 'public', 6, 120, 'CCS2; Type2_AC', 16.5, 59, 26, 'active', 'Delhi EV Portal'],
        ['DEL-STA-007', 'Ather Grid 2W Charger - Lajpat Nagar Central Market', 'Ather Energy', 'South Delhi', 28.5678, 77.2435, 'commercial_hub', 3, 15, 'LECCS_2W', 14, 81, 38, 'active', 'Delhi EV Dashboard'],
        ['DEL-STA-008', 'DTL Public Charger - Anand Vihar ISBT Hub', 'Delhi Transco Ltd', 'East Delhi', 28.6469, 77.3162, 'depot', 10, 300, 'CCS2; GB_T', 15, 88, 72, 'active', 'Delhi Transport Dept'],
        ['DEL-STA-009', 'Tata Power EZ Charge - Dwarka Sector 12 Metro', 'Tata Power', 'South West Delhi', 28.5923, 77.0408, 'public', 4, 100, 'CCS2; Type2_AC', 18, 64, 27, 'active', 'Delhi Open EV Data Portal'],
        ['DEL-STA-010', 'Statiq Charging Hub - Kashmiri Gate Transit Hub', 'Statiq', 'North Delhi', 28.6674, 77.2281, 'public', 6, 180, 'CCS2; Type2_AC', 17, 76, 45, 'active', 'Delhi Transport Dept'],
        ['DEL-STA-011', 'BluSmart EV Depot - Punjabi Bagh Flyover Hub', 'BluSmart Mobility', 'West Delhi', 28.6664, 77.1245, 'depot', 12, 360, 'CCS2; GB_T', 16, 90, 110, 'active', 'Delhi EV Dashboard'],
        ['DEL-STA-012', 'Tata Power EZ Charge - Laxmi Nagar District Centre', 'Tata Power', 'East Delhi', 28.6304, 77.2773, 'commercial_hub', 4, 100, 'CCS2; Type2_AC', 18.5, 73, 34, 'active', 'Delhi Open EV Data Portal'],
    ],
    'Candidate Locations': [
        ['ID', 'Rank', 'Name', 'District', 'Latitude', 'Longitude', 'Score', 'Demand', 'Supply Gap', 'EV Density', 'Traffic', 'Dwell', 'Accessibility', 'Future Growth', 'Grid Feasibility', 'Sessions/Day', 'kWh/Day', 'Nearest Station km', 'Chargers Within 2 km', 'Traffic/Day', 'EV Share %', 'Parking', 'Substation m', 'Transformer kVA', 'Feasibility', 'Land Type', 'Payback Months', 'ROI %'],
        ['CAND-DEL-001', 1, 'Kashmiri Gate ISBT Multi-Modal Transit Hub', 'North Delhi', 28.6698, 77.2285, 94.2, 96, 92.5, 91, 98, 89, 95, 94, 90, 78, 1840, 2.8, 2, 145000, 12.8, 24, 110, 1250, 'Ready', 'Metro Station Footprint', 18, 32.4],
        ['CAND-DEL-002', 2, 'Nehru Place Commercial & IT Park Extension', 'South East Delhi', 28.5481, 77.253, 91.8, 94, 88, 95.5, 92, 93, 90, 91, 86, 68, 1560, 1.6, 4, 128000, 18.4, 30, 240, 1000, 'Ready', 'Commercial Complex', 21, 28.6],
        ['CAND-DEL-003', 3, 'Janakpuri District Centre & Westend Commercial Corridor', 'West Delhi', 28.6288, 77.0812, 88.5, 89, 91, 86, 90, 88, 87, 89, 84, 58, 1320, 2.4, 3, 110000, 14.1, 18, 310, 800, 'Minor Upgrade Required', 'Retail Hub', 24, 25.1],
        ['CAND-DEL-004', 4, 'Anand Vihar Multi-Modal Transportation Depot', 'East Delhi', 28.6475, 77.315, 86.9, 91, 84, 82, 96, 85, 88, 88, 82, 62, 1480, 1.9, 5, 138000, 15.6, 40, 180, 1500, 'Ready', 'Public Parking', 22, 27.2],
        ['CAND-DEL-005', 5, 'Punjabi Bagh Ring Road Flyover Junction', 'West Delhi', 28.668, 77.126, 84.3, 85, 86, 84, 91, 80, 89, 85, 80, 52, 1180, 2.1, 4, 122000, 13.2, 16, 420, 750, 'Minor Upgrade Required', 'Highway Fuel Station', 26, 23],
        ['CAND-DEL-006', 6, 'Lajpat Nagar Central Market & Metro Corridor', 'South Delhi', 28.5695, 77.242, 82.7, 84, 81, 92, 85, 89, 82, 86, 78, 48, 1040, 1.4, 5, 98000, 19.1, 14, 490, 630, 'Minor Upgrade Required', 'Retail Hub', 28, 21.4],
    ],
    'District Metrics': [
        ['District', 'Registered EVs', 'YoY Growth %', 'Existing Chargers', 'EV/Charger Ratio', 'Deficit Score', 'Grid Capacity', 'Top Corridor'],
        ['South Delhi', 42800, 38.5, 94, 455.3, 88, 'Moderate Margin', 'Mehrauli-Badarpur Road & Saket Corridor'],
        ['South East Delhi', 36200, 42.1, 68, 532.3, 92, 'High Capacity', 'Outer Ring Road (Nehru Place - Okhla)'],
        ['West Delhi', 38500, 35.2, 52, 740.3, 94, 'Moderate Margin', 'Najafgarh Road & Janakpuri District Centre'],
        ['North Delhi', 29400, 31.8, 38, 773.6, 96, 'High Capacity', 'Grand Trunk Road & Kashmiri Gate ISBT'],
        ['East Delhi', 31200, 36.9, 44, 709, 90, 'Constrained', 'Vikas Marg & Anand Vihar Transit Hub'],
        ['Central Delhi', 24800, 29.4, 62, 400, 72, 'Moderate Margin', 'Connaught Place Ring & Barakhamba Road'],
        ['South West Delhi', 44100, 44, 112, 393.7, 68, 'High Capacity', 'Dwarka Expressway & Aerocity Airport Hub'],
    ],
    'Source Register': [
        ['ID', 'Dataset', 'Organization / Source', 'Type', 'Last Updated', 'Records', 'Confidence %', 'Source URL'],
        ['DS-001', 'Delhi EV Charging Station Location Database', 'Delhi Open EV Data Portal / Transport Dept', 'Official Government', '2026-07-15', '2,480 Public Chargers', 96, 'https://ev.delhi.gov.in'],
        ['DS-002', 'Vahan Delhi EV Vehicle Registration Time-Series', 'Ministry of Road Transport & Highways (MoRTH)', 'Official Government', '2026-08-01', '246,000 EV Registrations', 98, 'https://vahan.parivahan.gov.in'],
        ['DS-003', 'Delhi Road Geometry & Traffic Congestion Exposure', 'OpenStreetMap & Delhi Traffic Police GIS Layer', 'Open Spatial / GIS', '2026-06-20', '18,400 Road Segments', 92, 'https://www.openstreetmap.org'],
        ['DS-004', 'Commercial Dwell Activity & POI Density Layer', 'Derived Spatial Index (MoHUA urban criteria)', 'Derived Model Feature', '2026-08-10', '520 Grid Clusters', 89, ''],
        ['DS-005', 'EV Charging Session Demand & Utilisation Proxy', 'Synthesized AI Demand Proxy (SIH Benchmark)', 'Synthetic Proxy', '2026-08-22', '12,500 Session Records', 85, ''],
    ],
}

if __name__ == '__main__':
    build(sheets)
    print(f'Created {OUT}')
