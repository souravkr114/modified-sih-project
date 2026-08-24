import { ChargingStation } from '../types/ev';

export const DELHI_EXISTING_STATIONS: ChargingStation[] = [
  {
    id: 'DEL-STA-001',
    name: 'Tata Power EZ Charge - Connaught Place Outer Ring',
    operator: 'Tata Power',
    latitude: 28.6315,
    longitude: 77.2167,
    address: 'Block E, Connaught Place, New Delhi',
    district: 'Central Delhi',
    stationType: 'commercial_hub',
    chargerCount: 6,
    powerKw: 150,
    connectorTypes: ['CCS2', 'Type2_AC'],
    pricePerKwh: 18.5,
    utilizationRate: 78,
    avgSessionsPerDay: 42,
    status: 'active',
    dataSource: 'Delhi Open EV Data Portal'
  },
  {
    id: 'DEL-STA-002',
    name: 'BluSmart EV Hub - Aerocity Metro Station',
    operator: 'BluSmart Mobility',
    latitude: 28.5492,
    longitude: 77.1215,
    address: 'Asset 8, Hospitality District, Aerocity, New Delhi',
    district: 'South West Delhi',
    stationType: 'depot',
    chargerCount: 16,
    powerKw: 480,
    connectorTypes: ['CCS2', 'GB_T'],
    pricePerKwh: 16.0,
    utilizationRate: 92,
    avgSessionsPerDay: 135,
    status: 'active',
    dataSource: 'Delhi EV Dashboard'
  },
  {
    id: 'DEL-STA-003',
    name: 'DTL Public Fast Charger - Saket District Centre',
    operator: 'Delhi Transco Ltd',
    latitude: 28.5284,
    longitude: 77.2189,
    address: 'DLF Avenue Parking, Saket, New Delhi',
    district: 'South Delhi',
    stationType: 'public',
    chargerCount: 4,
    powerKw: 100,
    connectorTypes: ['CCS2', 'Type2_AC', 'LECCS_2W'],
    pricePerKwh: 15.0,
    utilizationRate: 65,
    avgSessionsPerDay: 28,
    status: 'active',
    dataSource: 'Delhi EV Portal'
  },
  {
    id: 'DEL-STA-004',
    name: 'Statiq Charging Hub - Nehru Place Bus Terminal',
    operator: 'Statiq',
    latitude: 28.5494,
    longitude: 77.2519,
    address: 'Nehru Place Outer Ring Road, New Delhi',
    district: 'South East Delhi',
    stationType: 'public',
    chargerCount: 8,
    powerKw: 240,
    connectorTypes: ['CCS2', 'LECCS_2W'],
    pricePerKwh: 17.5,
    utilizationRate: 84,
    avgSessionsPerDay: 58,
    status: 'active',
    dataSource: 'Delhi Transport Dept'
  },
  {
    id: 'DEL-STA-005',
    name: 'Fortum Charge & Drive - Janakpuri District Centre',
    operator: 'Fortum',
    latitude: 28.6293,
    longitude: 77.0784,
    address: 'Westend Mall Parking, Janakpuri, New Delhi',
    district: 'West Delhi',
    stationType: 'commercial_hub',
    chargerCount: 4,
    powerKw: 120,
    connectorTypes: ['CCS2', 'CHAdeMO'],
    pricePerKwh: 19.0,
    utilizationRate: 71,
    avgSessionsPerDay: 31,
    status: 'active',
    dataSource: 'Delhi Open EV Portal'
  },
  {
    id: 'DEL-STA-006',
    name: 'Exicom Smart Charger - Rohini Sector 10 Metro',
    operator: 'Exicom',
    latitude: 28.7112,
    longitude: 77.1189,
    address: 'DMRC Gate 2 Parking, Rohini Sector 10',
    district: 'North West Delhi',
    stationType: 'public',
    chargerCount: 6,
    powerKw: 120,
    connectorTypes: ['CCS2', 'Type2_AC'],
    pricePerKwh: 16.5,
    utilizationRate: 59,
    avgSessionsPerDay: 26,
    status: 'active',
    dataSource: 'Delhi EV Portal'
  },
  {
    id: 'DEL-STA-007',
    name: 'Ather Grid 2W Charger - Lajpat Nagar Central Market',
    operator: 'Ather Energy',
    latitude: 28.5678,
    longitude: 77.2435,
    address: 'Block 3, Lajpat Nagar II, New Delhi',
    district: 'South Delhi',
    stationType: 'commercial_hub',
    chargerCount: 3,
    powerKw: 15,
    connectorTypes: ['LECCS_2W'],
    pricePerKwh: 14.0,
    utilizationRate: 81,
    avgSessionsPerDay: 38,
    status: 'active',
    dataSource: 'Delhi EV Dashboard'
  },
  {
    id: 'DEL-STA-008',
    name: 'DTL Public Charger - Anand Vihar ISBT Hub',
    operator: 'Delhi Transco Ltd',
    latitude: 28.6469,
    longitude: 77.3162,
    address: 'ISBT Complex, Anand Vihar, East Delhi',
    district: 'East Delhi',
    stationType: 'depot',
    chargerCount: 10,
    powerKw: 300,
    connectorTypes: ['CCS2', 'GB_T'],
    pricePerKwh: 15.0,
    utilizationRate: 88,
    avgSessionsPerDay: 72,
    status: 'active',
    dataSource: 'Delhi Transport Dept'
  },
  {
    id: 'DEL-STA-009',
    name: 'Tata Power EZ Charge - Dwarka Sector 12 Metro',
    operator: 'Tata Power',
    latitude: 28.5923,
    longitude: 77.0408,
    address: 'Sector 12 Metro Station Complex, Dwarka',
    district: 'South West Delhi',
    stationType: 'public',
    chargerCount: 4,
    powerKw: 100,
    connectorTypes: ['CCS2', 'Type2_AC'],
    pricePerKwh: 18.0,
    utilizationRate: 64,
    avgSessionsPerDay: 27,
    status: 'active',
    dataSource: 'Delhi Open EV Data Portal'
  },
  {
    id: 'DEL-STA-010',
    name: 'Statiq Charging Hub - Kashmiri Gate Transit Hub',
    operator: 'Statiq',
    latitude: 28.6674,
    longitude: 77.2281,
    address: 'Lothian Road, Near Kashmiri Gate ISBT',
    district: 'North Delhi',
    stationType: 'public',
    chargerCount: 6,
    powerKw: 180,
    connectorTypes: ['CCS2', 'Type2_AC'],
    pricePerKwh: 17.0,
    utilizationRate: 76,
    avgSessionsPerDay: 45,
    status: 'active',
    dataSource: 'Delhi Transport Dept'
  },
  {
    id: 'DEL-STA-011',
    name: 'BluSmart EV Depot - Punjabi Bagh Flyover Hub',
    operator: 'BluSmart Mobility',
    latitude: 28.6664,
    longitude: 77.1245,
    address: 'Ring Road Underpass, Punjabi Bagh',
    district: 'West Delhi',
    stationType: 'depot',
    chargerCount: 12,
    powerKw: 360,
    connectorTypes: ['CCS2', 'GB_T'],
    pricePerKwh: 16.0,
    utilizationRate: 90,
    avgSessionsPerDay: 110,
    status: 'active',
    dataSource: 'Delhi EV Dashboard'
  },
  {
    id: 'DEL-STA-012',
    name: 'Tata Power EZ Charge - Laxmi Nagar District Centre',
    operator: 'Tata Power',
    latitude: 28.6304,
    longitude: 77.2773,
    address: 'V3S Mall Parking, Laxmi Nagar',
    district: 'East Delhi',
    stationType: 'commercial_hub',
    chargerCount: 4,
    powerKw: 100,
    connectorTypes: ['CCS2', 'Type2_AC'],
    pricePerKwh: 18.5,
    utilizationRate: 73,
    avgSessionsPerDay: 34,
    status: 'active',
    dataSource: 'Delhi Open EV Data Portal'
  }
];

export class StationService {
  static getStations(filter?: { operator?: string; district?: string; minPowerKw?: number }): ChargingStation[] {
    let result = [...DELHI_EXISTING_STATIONS];
    if (filter?.operator && filter.operator !== 'ALL') {
      result = result.filter(s => s.operator.toLowerCase() === filter.operator?.toLowerCase());
    }
    if (filter?.district && filter.district !== 'ALL') {
      result = result.filter(s => s.district.toLowerCase() === filter.district?.toLowerCase());
    }
    if (filter?.minPowerKw) {
      result = result.filter(s => s.powerKw >= filter.minPowerKw!);
    }
    return result;
  }

  static getStationById(id: string): ChargingStation | undefined {
    return DELHI_EXISTING_STATIONS.find(s => s.id === id);
  }

  static getUniqueOperators(): string[] {
    const operators = Array.from(new Set(DELHI_EXISTING_STATIONS.map(s => s.operator)));
    return ['ALL', ...operators];
  }

  static getUniqueDistricts(): string[] {
    const districts = Array.from(new Set(DELHI_EXISTING_STATIONS.map(s => s.district)));
    return ['ALL', ...districts];
  }
}
