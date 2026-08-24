import { CandidateLocation } from '../types/ev';

export const DELHI_CANDIDATE_LOCATIONS: CandidateLocation[] = [
  {
    id: 'CAND-DEL-001',
    rank: 1,
    name: 'Kashmiri Gate ISBT Multi-Modal Transit Hub',
    district: 'North Delhi',
    latitude: 28.6698,
    longitude: 77.2285,
    address: 'Ring Road Interchange, Near Kashmiri Gate ISBT, North Delhi',
    score: 94.2,
    
    demandScore: 96.0,        // 30%
    supplyGapScore: 92.5,     // 20%
    evDensityScore: 91.0,     // 15%
    trafficScore: 98.0,       // 10%
    dwellScore: 89.0,         // 10%
    accessibilityScore: 95.0, // 5%
    futureGrowthScore: 94.0,  // 5%
    gridFeasibilityScore: 90.0,// 5%

    predictedSessionsPerDay: 78,
    predictedKwhPerDay: 1840,
    nearestStationDistanceKm: 2.8,
    chargersWithin2Km: 2,
    dailyTrafficVolume: 145000,
    evShareInZonePercent: 12.8,

    shapFeatures: [
      {
        feature: 'Heavy Interstate & Commercial EV Traffic Exposure',
        weight: +24.5,
        impact: 'positive',
        description: 'Intersection of Ring Road and Grand Trunk Road carries over 145k vehicles/day with heavy 3W/4W commercial EV conversion.'
      },
      {
        feature: 'Severe Charging Supply Deficit within 3km Radius',
        weight: +21.0,
        impact: 'positive',
        description: 'Only 2 public fast chargers exist within 2km, creating an unserved daily demand gap of 1,200+ kWh.'
      },
      {
        feature: 'Multi-Modal Dwell Time (ISBT + Metro Interchange)',
        weight: +18.2,
        impact: 'positive',
        description: 'Interstate buses and metro commuters produce high average dwell times (35-60 mins), ideal for fast charging.'
      },
      {
        feature: 'High Capacity 11kV Substation Adjacent (<120m)',
        weight: +12.4,
        impact: 'positive',
        description: 'Adjacent DTL substation eliminates costly high-voltage grid extension costs.'
      },
      {
        feature: 'Peak Hour Traffic Slowdowns on Ring Road',
        weight: -4.1,
        impact: 'negative',
        description: 'Severe evening congestion may slightly delay entry queue during 6 PM - 8 PM peak.'
      }
    ],

    parkingSpotsAvailable: 24,
    gridSubstationDistanceMeters: 110,
    transformerCapacityKva: 1250,
    siteFeasibilityStatus: 'Ready',
    landType: 'Metro Station Footprint',
    estPaybackMonths: 18,
    estRoiPercent: 32.4
  },
  {
    id: 'CAND-DEL-002',
    rank: 2,
    name: 'Nehru Place Commercial & IT Park Extension',
    district: 'South East Delhi',
    latitude: 28.5481,
    longitude: 77.2530,
    address: 'Outer Ring Road Flyover Bay, Nehru Place, South East Delhi',
    score: 91.8,

    demandScore: 94.0,
    supplyGapScore: 88.0,
    evDensityScore: 95.5,
    trafficScore: 92.0,
    dwellScore: 93.0,
    accessibilityScore: 90.0,
    futureGrowthScore: 91.0,
    gridFeasibilityScore: 86.0,

    predictedSessionsPerDay: 68,
    predictedKwhPerDay: 1560,
    nearestStationDistanceKm: 1.6,
    chargersWithin2Km: 4,
    dailyTrafficVolume: 128000,
    evShareInZonePercent: 18.4,

    shapFeatures: [
      {
        feature: 'Highest Commercial EV & Fleet Density in South Delhi',
        weight: +26.0,
        impact: 'positive',
        description: 'Nehru Place IT hub generates massive daily office commuter and ride-hailing EV traffic.'
      },
      {
        feature: 'Extended Daytime Dwell Time (Workplace Charging)',
        weight: +20.5,
        impact: 'positive',
        description: 'Average dwell duration exceeds 4 hours for IT professionals, boosting AC slow/fast dual monetization.'
      },
      {
        feature: 'Rapid YoY EV Growth Rate (+42% YoY)',
        weight: +15.8,
        impact: 'positive',
        description: 'South East Delhi leads private 4W EV registrations in Delhi NCT.'
      },
      {
        feature: 'Moderate Competition Nearby',
        weight: -6.2,
        impact: 'negative',
        description: '4 fast chargers nearby, but current utilization at 84% indicates unmet demand overflow.'
      }
    ],

    parkingSpotsAvailable: 30,
    gridSubstationDistanceMeters: 240,
    transformerCapacityKva: 1000,
    siteFeasibilityStatus: 'Ready',
    landType: 'Commercial Complex',
    estPaybackMonths: 21,
    estRoiPercent: 28.6
  },
  {
    id: 'CAND-DEL-003',
    rank: 3,
    name: 'Janakpuri District Centre & Westend Commercial Corridor',
    district: 'West Delhi',
    latitude: 28.6288,
    longitude: 77.0812,
    address: 'Najafgarh Road Corridor, Janakpuri West, Delhi',
    score: 88.5,

    demandScore: 89.0,
    supplyGapScore: 91.0,
    evDensityScore: 86.0,
    trafficScore: 90.0,
    dwellScore: 88.0,
    accessibilityScore: 87.0,
    futureGrowthScore: 89.0,
    gridFeasibilityScore: 84.0,

    predictedSessionsPerDay: 58,
    predictedKwhPerDay: 1320,
    nearestStationDistanceKm: 2.4,
    chargersWithin2Km: 3,
    dailyTrafficVolume: 110000,
    evShareInZonePercent: 14.1,

    shapFeatures: [
      {
        feature: 'Arterial Najafgarh Road High EV Flow',
        weight: +22.1,
        impact: 'positive',
        description: 'Connects West Delhi residential hubs to Gurugram & Central Delhi bypass.'
      },
      {
        feature: 'High Commercial Dwell Cluster (Malls & Shopping)',
        weight: +18.4,
        impact: 'positive',
        description: 'Retail activity drives strong weekend and evening charging sessions.'
      },
      {
        feature: 'Substation Feasibility',
        weight: +11.2,
        impact: 'positive',
        description: 'West Delhi BSES Rajdhani 33kV substation line available within 300 meters.'
      }
    ],

    parkingSpotsAvailable: 18,
    gridSubstationDistanceMeters: 310,
    transformerCapacityKva: 800,
    siteFeasibilityStatus: 'Minor Upgrade Required',
    landType: 'Retail Hub',
    estPaybackMonths: 24,
    estRoiPercent: 25.1
  },
  {
    id: 'CAND-DEL-004',
    rank: 4,
    name: 'Anand Vihar Multi-Modal Transportation Depot',
    district: 'East Delhi',
    latitude: 28.6475,
    longitude: 77.3150,
    address: 'Chauhan Patti Road, Anand Vihar Border, East Delhi',
    score: 86.9,

    demandScore: 91.0,
    supplyGapScore: 84.0,
    evDensityScore: 82.0,
    trafficScore: 96.0,
    dwellScore: 85.0,
    accessibilityScore: 88.0,
    futureGrowthScore: 88.0,
    gridFeasibilityScore: 82.0,

    predictedSessionsPerDay: 62,
    predictedKwhPerDay: 1480,
    nearestStationDistanceKm: 1.9,
    chargersWithin2Km: 5,
    dailyTrafficVolume: 138000,
    evShareInZonePercent: 15.6,

    shapFeatures: [
      {
        feature: 'Inter-state Delhi-UP Border Fleet Corridor',
        weight: +25.4,
        impact: 'positive',
        description: 'High volume of electric commercial delivery vans and 3W feeder rickshaws.'
      },
      {
        feature: 'Railway Station & Bus Terminal Tri-Interchange',
        weight: +19.0,
        impact: 'positive',
        description: 'Continuous 24/7 charging demand throughout night and early morning hours.'
      }
    ],

    parkingSpotsAvailable: 40,
    gridSubstationDistanceMeters: 180,
    transformerCapacityKva: 1500,
    siteFeasibilityStatus: 'Ready',
    landType: 'Public Parking',
    estPaybackMonths: 22,
    estRoiPercent: 27.2
  },
  {
    id: 'CAND-DEL-005',
    rank: 5,
    name: 'Punjabi Bagh Ring Road Flyover Junction',
    district: 'West Delhi',
    latitude: 28.6680,
    longitude: 77.1260,
    address: 'Rohtak Road & Ring Road Crossing, Punjabi Bagh',
    score: 84.3,

    demandScore: 85.0,
    supplyGapScore: 86.0,
    evDensityScore: 84.0,
    trafficScore: 91.0,
    dwellScore: 80.0,
    accessibilityScore: 89.0,
    futureGrowthScore: 85.0,
    gridFeasibilityScore: 80.0,

    predictedSessionsPerDay: 52,
    predictedKwhPerDay: 1180,
    nearestStationDistanceKm: 2.1,
    chargersWithin2Km: 4,
    dailyTrafficVolume: 122000,
    evShareInZonePercent: 13.2,

    shapFeatures: [
      {
        feature: 'Major Outer Ring Corridor Junction',
        weight: +20.8,
        impact: 'positive',
        description: 'Strategic waypoint between North and South West Delhi.'
      },
      {
        feature: 'Growing Private 4W EV Adoption in Environs',
        weight: +14.6,
        impact: 'positive',
        description: 'High-income residential catchments of Paschim Vihar & Punjabi Bagh.'
      }
    ],

    parkingSpotsAvailable: 16,
    gridSubstationDistanceMeters: 420,
    transformerCapacityKva: 750,
    siteFeasibilityStatus: 'Minor Upgrade Required',
    landType: 'Highway Fuel Station',
    estPaybackMonths: 26,
    estRoiPercent: 23.0
  },
  {
    id: 'CAND-DEL-006',
    rank: 6,
    name: 'Lajpat Nagar Central Market & Metro Corridor',
    district: 'South Delhi',
    latitude: 28.5695,
    longitude: 77.2420,
    address: 'Ring Road Feeder, Lajpat Nagar Ring Road, South Delhi',
    score: 82.7,

    demandScore: 84.0,
    supplyGapScore: 81.0,
    evDensityScore: 92.0,
    trafficScore: 85.0,
    dwellScore: 89.0,
    accessibilityScore: 82.0,
    futureGrowthScore: 86.0,
    gridFeasibilityScore: 78.0,

    predictedSessionsPerDay: 48,
    predictedKwhPerDay: 1040,
    nearestStationDistanceKm: 1.4,
    chargersWithin2Km: 5,
    dailyTrafficVolume: 98000,
    evShareInZonePercent: 19.1,

    shapFeatures: [
      {
        feature: 'Retail Shopper Dwell Time Cluster',
        weight: +21.5,
        impact: 'positive',
        description: 'Lajpat Nagar Central Market attracts over 40,000 visitors daily.'
      }
    ],

    parkingSpotsAvailable: 14,
    gridSubstationDistanceMeters: 490,
    transformerCapacityKva: 630,
    siteFeasibilityStatus: 'Minor Upgrade Required',
    landType: 'Retail Hub',
    estPaybackMonths: 28,
    estRoiPercent: 21.4
  }
];

export class RecommendationService {
  static getCandidates(filter?: { district?: string; minScore?: number }): CandidateLocation[] {
    let result = [...DELHI_CANDIDATE_LOCATIONS];
    if (filter?.district && filter.district !== 'ALL') {
      result = result.filter(c => c.district.toLowerCase() === filter.district?.toLowerCase());
    }
    if (filter?.minScore) {
      result = result.filter(c => c.score >= filter.minScore!);
    }
    return result.sort((a, b) => a.rank - b.rank);
  }

  static getCandidateById(id: string): CandidateLocation | undefined {
    return DELHI_CANDIDATE_LOCATIONS.find(c => c.id === id);
  }

  static getTopCandidate(): CandidateLocation {
    return DELHI_CANDIDATE_LOCATIONS[0];
  }
}
