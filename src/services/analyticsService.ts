import { DistrictMetric, DataLineageItem } from '../types/ev';

export const DELHI_DISTRICT_METRICS: DistrictMetric[] = [
  {
    districtName: 'South Delhi',
    totalEVsRegistered: 42800,
    evGrowthRateYoy: 38.5,
    existingChargerCount: 94,
    demandSupplyRatio: 455.3,
    deficitScore: 88,
    gridCapacityStatus: 'Moderate Margin',
    topCorridor: 'Mehrauli-Badarpur Road & Saket Corridor'
  },
  {
    districtName: 'South East Delhi',
    totalEVsRegistered: 36200,
    evGrowthRateYoy: 42.1,
    existingChargerCount: 68,
    demandSupplyRatio: 532.3,
    deficitScore: 92,
    gridCapacityStatus: 'High Capacity',
    topCorridor: 'Outer Ring Road (Nehru Place - Okhla)'
  },
  {
    districtName: 'West Delhi',
    totalEVsRegistered: 38500,
    evGrowthRateYoy: 35.2,
    existingChargerCount: 52,
    demandSupplyRatio: 740.3,
    deficitScore: 94,
    gridCapacityStatus: 'Moderate Margin',
    topCorridor: 'Najafgarh Road & Janakpuri District Centre'
  },
  {
    districtName: 'North Delhi',
    totalEVsRegistered: 29400,
    evGrowthRateYoy: 31.8,
    existingChargerCount: 38,
    demandSupplyRatio: 773.6,
    deficitScore: 96,
    gridCapacityStatus: 'High Capacity',
    topCorridor: 'Grand Trunk Road & Kashmiri Gate ISBT'
  },
  {
    districtName: 'East Delhi',
    totalEVsRegistered: 31200,
    evGrowthRateYoy: 36.9,
    existingChargerCount: 44,
    demandSupplyRatio: 709.0,
    deficitScore: 90,
    gridCapacityStatus: 'Constrained',
    topCorridor: 'Vikas Marg & Anand Vihar Transit Hub'
  },
  {
    districtName: 'Central Delhi',
    totalEVsRegistered: 24800,
    evGrowthRateYoy: 29.4,
    existingChargerCount: 62,
    demandSupplyRatio: 400.0,
    deficitScore: 72,
    gridCapacityStatus: 'Moderate Margin',
    topCorridor: 'Connaught Place Ring & Barakhamba Road'
  },
  {
    districtName: 'South West Delhi',
    totalEVsRegistered: 44100,
    evGrowthRateYoy: 44.0,
    existingChargerCount: 112,
    demandSupplyRatio: 393.7,
    deficitScore: 68,
    gridCapacityStatus: 'High Capacity',
    topCorridor: 'Dwarka Expressway & Aerocity Airport Hub'
  }
];

export const DATA_LINEAGE_REGISTER: DataLineageItem[] = [
  {
    id: 'DS-001',
    datasetName: 'Delhi EV Charging Station Location Database',
    organization: 'Delhi Open EV Data Portal / Transport Dept',
    type: 'Official Government',
    lastUpdated: '2026-07-15',
    recordCount: '2,480 Public Chargers',
    confidenceScore: 96,
    description: 'Official geo-tagged directory of public & semi-public charging points across NCT of Delhi.',
    sourceUrl: 'https://ev.delhi.gov.in'
  },
  {
    id: 'DS-002',
    datasetName: 'Vahan Delhi EV Vehicle Registration Time-Series',
    organization: 'Ministry of Road Transport & Highways (MoRTH)',
    type: 'Official Government',
    lastUpdated: '2026-08-01',
    recordCount: '246,000 EV Registrations',
    confidenceScore: 98,
    description: 'Monthly EV registrations aggregated by RTO zone, vehicle category (2W, 3W, 4W, E-Bus).',
    sourceUrl: 'https://vahan.parivahan.gov.in'
  },
  {
    id: 'DS-003',
    datasetName: 'OpenStreetMap Overpass API Road & POI Geometry Feed',
    organization: 'OpenStreetMap Foundation & Overpass API',
    type: 'Open Spatial / GIS',
    lastUpdated: '2026-08-20',
    recordCount: '18,400 Road Segments & POIs',
    confidenceScore: 95,
    description: 'Real-time road network geometries (highway=primary, secondary, trunk) and POI nodes fetched via Overpass API.',
    sourceUrl: 'https://overpass-api.de/api/interpreter'
  },
  {
    id: 'DS-004',
    datasetName: 'Commercial Dwell Activity & POI Density Layer',
    organization: 'Derived Spatial Index (MoHUA urban criteria)',
    type: 'Derived Model Feature',
    lastUpdated: '2026-08-10',
    recordCount: '520 Grid Clusters',
    confidenceScore: 89,
    description: 'Aggregated proximity scores for malls, office complexes, metro stations, and transit hubs via overpass-api.de queries.'
  },
  {
    id: 'DS-005',
    datasetName: 'DISCOM Electrical Substation & Transformer Capacity',
    organization: 'BSES Rajdhani (BRPL), BSES Yamuna (BYPL), Tata Power DDL',
    type: 'Utility Infrastructure',
    lastUpdated: '2026-05-30',
    recordCount: '420 Substations',
    confidenceScore: 90,
    description: 'Substation feeder coordinates (11kV/33kV) and transformer kVA readiness.'
  }
];

export class AnalyticsService {
  static getDistrictMetrics(): DistrictMetric[] {
    return DELHI_DISTRICT_METRICS;
  }

  static getDistrictByName(name: string): DistrictMetric | undefined {
    return DELHI_DISTRICT_METRICS.find(d => d.districtName.toLowerCase() === name.toLowerCase());
  }

  static getDataLineage(): DataLineageItem[] {
    return DATA_LINEAGE_REGISTER;
  }

  static getOverallSummary() {
    const totalEVs = DELHI_DISTRICT_METRICS.reduce((sum, d) => sum + d.totalEVsRegistered, 0);
    const totalChargers = DELHI_DISTRICT_METRICS.reduce((sum, d) => sum + d.existingChargerCount, 0);
    const avgRatio = parseFloat((totalEVs / totalChargers).toFixed(1));

    return {
      totalEVs,
      totalChargers,
      avgRatio,
      targetRatio: 25.0, // MoHUA Target Benchmark (1 charger per 25 EVs)
      deficitStatus: avgRatio > 25.0 ? 'High Deficit' : 'Optimal'
    };
  }
}
