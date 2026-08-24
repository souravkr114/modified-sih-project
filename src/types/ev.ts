export type StationStatus = 'active' | 'under_construction' | 'maintenance' | 'proposed';
export type StationType = 'public' | 'commercial_hub' | 'depot' | 'residential' | 'highway_corridor';
export type ConnectorType = 'CCS2' | 'Type2_AC' | 'GB_T' | 'CHAdeMO' | 'LECCS_2W';

export interface ChargingStation {
  id: string;
  name: string;
  operator: string;
  latitude: number;
  longitude: number;
  address: string;
  district: string;
  stationType: StationType;
  chargerCount: number;
  powerKw: number;
  connectorTypes: ConnectorType[];
  pricePerKwh: number;
  utilizationRate: number; // 0 to 100%
  avgSessionsPerDay: number;
  status: StationStatus;
  dataSource: string;
}

export interface FeatureImportance {
  feature: string;
  weight: number;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

export interface CandidateLocation {
  id: string;
  rank: number;
  name: string;
  district: string;
  latitude: number;
  longitude: number;
  address: string;
  score: number; // 0 - 100 overall score
  
  // Score breakdown (weights defined in roadmap)
  demandScore: number;         // 30%
  supplyGapScore: number;      // 20%
  evDensityScore: number;      // 15%
  trafficScore: number;        // 10%
  dwellScore: number;          // 10%
  accessibilityScore: number;  // 5%
  futureGrowthScore: number;   // 5%
  gridFeasibilityScore: number;// 5%

  // Predicted operational metrics
  predictedSessionsPerDay: number;
  predictedKwhPerDay: number;
  nearestStationDistanceKm: number;
  chargersWithin2Km: number;
  dailyTrafficVolume: number;
  evShareInZonePercent: number;
  
  // Explainability & Feature Attributions (SHAP style)
  shapFeatures: FeatureImportance[];

  // Physical feasibility details
  parkingSpotsAvailable: number;
  gridSubstationDistanceMeters: number;
  transformerCapacityKva: number;
  siteFeasibilityStatus: 'Ready' | 'Minor Upgrade Required' | 'Grid Reinforcement Needed';
  landType: 'Commercial Complex' | 'Public Parking' | 'Metro Station Footprint' | 'Highway Fuel Station' | 'Retail Hub';
  
  // Quick financial snapshot
  estPaybackMonths: number;
  estRoiPercent: number;
}

export interface GridCell {
  cellId: string;
  lat: number;
  lng: number;
  bounds: [[number, number], [number, number]];
  evDensityIndex: number;
  trafficVolumeIndex: number;
  supplyGapIndex: number;
  commercialActivityIndex: number;
  chargingDemandKw: number;
  district: string;
}

export interface ChargerConfig {
  type: 'AC_Type2_7kW' | 'AC_Type2_22kW' | 'DC_Fast_50kW' | 'DC_UltraFast_120kW';
  label: string;
  kwPower: number;
  capexPerUnit: number; // INR
  quantity: number;
}

export interface FinancialConfig {
  candidateId?: string;
  budgetInr: number;
  chargers: ChargerConfig[];
  electricityTariffPerKwh: number; // INR buy rate (e.g. ₹6.5/kWh)
  sellingTariffPerKwh: number;     // INR sell rate (e.g. ₹18.0/kWh)
  monthlySiteRentInr: number;
  monthlyMaintenanceInr: number;
  operatingHoursPerDay: number;
  targetUtilizationPercent: number; // expected average utilization %
  gridConnectionCostInr: number;
}

export interface FinancialScenario {
  name: string;
  utilizationPercent: number;
  dailySessions: number;
  annualRevenueInr: number;
  annualOpexInr: number;
  annualEbitdaInr: number;
  roiPercent: number;
  paybackMonths: number;
}

export interface FinancialSimulationResult {
  totalCapexInr: number;
  equipmentCapexInr: number;
  installationAndGridCapexInr: number;
  dailyEnergySoldKwh: number;
  dailySessionsCount: number;
  monthlyRevenueInr: number;
  monthlyElectricityCostInr: number;
  monthlyOpexInr: number;
  monthlyNetProfitInr: number;
  annualProfitInr: number;
  ebitdaMarginPercent: number;
  roiPercent: number;
  paybackPeriodMonths: number;
  scenarios: {
    pessimistic: FinancialScenario;
    base: FinancialScenario;
    optimistic: FinancialScenario;
  };
}

export interface DistrictMetric {
  districtName: string;
  totalEVsRegistered: number;
  evGrowthRateYoy: number;
  existingChargerCount: number;
  demandSupplyRatio: number; // e.g. 14.2 EVs per charger
  deficitScore: number;      // 0-100
  gridCapacityStatus: 'High Capacity' | 'Moderate Margin' | 'Constrained';
  topCorridor: string;
}

export interface DataLineageItem {
  id: string;
  datasetName: string;
  organization: string;
  type: 'Official Government' | 'Open Spatial / GIS' | 'Derived Model Feature' | 'Synthetic Proxy';
  lastUpdated: string;
  recordCount: string;
  confidenceScore: number;
  description: string;
  sourceUrl?: string;
}

export type UserRole = 'investor' | 'operator' | 'planner';
