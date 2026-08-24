import { FinancialConfig, FinancialSimulationResult } from '../types/ev';

export const DEFAULT_FINANCIAL_CONFIG: FinancialConfig = {
  budgetInr: 5000000, // ₹50 Lakhs
  chargers: [
    {
      type: 'DC_Fast_50kW',
      label: 'DC Fast Charger (50 kW Dual Gun)',
      kwPower: 50,
      capexPerUnit: 1400000, // ₹14 Lakhs
      quantity: 2
    },
    {
      type: 'AC_Type2_22kW',
      label: 'AC Smart Charger (22 kW Dual Type 2)',
      kwPower: 22,
      capexPerUnit: 250000, // ₹2.5 Lakhs
      quantity: 2
    }
  ],
  electricityTariffPerKwh: 6.8, // ₹6.8/kWh (Delhi EV commercial tariff)
  sellingTariffPerKwh: 18.0,     // ₹18.0/kWh (Public charging retail tariff)
  monthlySiteRentInr: 45000,
  monthlyMaintenanceInr: 15000,
  operatingHoursPerDay: 18,
  targetUtilizationPercent: 45, // 45% average load factor
  gridConnectionCostInr: 350000
};

export class FinancialService {
  static simulate(config: FinancialConfig = DEFAULT_FINANCIAL_CONFIG): FinancialSimulationResult {
    // 1. Calculate Capex
    const equipmentCapex = config.chargers.reduce((sum, c) => sum + (c.capexPerUnit * c.quantity), 0);
    const totalPowerKw = config.chargers.reduce((sum, c) => sum + (c.kwPower * c.quantity), 0);
    const installationAndGridCapex = config.gridConnectionCostInr + (totalPowerKw * 2500); // Installation per kW
    const totalCapex = equipmentCapex + installationAndGridCapex;

    // Helper for scenario calculation
    const calcScenario = (name: string, utilPercent: number) => {
      // Maximum potential kWh if 100% utilized for operating hours
      const maxDailyKwh = totalPowerKw * (config.operatingHoursPerDay);
      const dailyEnergySoldKwh = maxDailyKwh * (utilPercent / 100);
      
      // Average session ~25 kWh per session
      const dailySessions = Math.round(dailyEnergySoldKwh / 25);
      
      const dailyRevenue = dailyEnergySoldKwh * config.sellingTariffPerKwh;
      const annualRevenue = dailyRevenue * 365;

      const dailyElectricityCost = dailyEnergySoldKwh * config.electricityTariffPerKwh;
      const annualElectricityCost = dailyElectricityCost * 365;

      const annualFixedOpex = (config.monthlySiteRentInr + config.monthlyMaintenanceInr) * 12;
      const annualOpex = annualElectricityCost + annualFixedOpex;
      const annualEbitda = annualRevenue - annualOpex;

      const roi = totalCapex > 0 ? (annualEbitda / totalCapex) * 100 : 0;
      const payback = annualEbitda > 0 ? (totalCapex / annualEbitda) * 12 : 999;

      return {
        name,
        utilizationPercent: utilPercent,
        dailySessions,
        annualRevenueInr: Math.round(annualRevenue),
        annualOpexInr: Math.round(annualOpex),
        annualEbitdaInr: Math.round(annualEbitda),
        roiPercent: parseFloat(roi.toFixed(1)),
        paybackMonths: Math.round(payback)
      };
    };

    const baseScenario = calcScenario('Base Case', config.targetUtilizationPercent);
    const pessimisticScenario = calcScenario('Stress / Low Demand', Math.max(15, config.targetUtilizationPercent - 20));
    const optimisticScenario = calcScenario('High Adoption / Fleet Peak', Math.min(85, config.targetUtilizationPercent + 20));

    // Base metrics
    const dailyEnergySoldKwh = (totalPowerKw * config.operatingHoursPerDay) * (config.targetUtilizationPercent / 100);
    const dailySessionsCount = Math.round(dailyEnergySoldKwh / 25);
    const monthlyRevenue = (dailyEnergySoldKwh * config.sellingTariffPerKwh) * 30;
    const monthlyElectricityCost = (dailyEnergySoldKwh * config.electricityTariffPerKwh) * 30;
    const monthlyOpex = monthlyElectricityCost + config.monthlySiteRentInr + config.monthlyMaintenanceInr;
    const monthlyNetProfit = monthlyRevenue - monthlyOpex;
    const annualProfit = monthlyNetProfit * 12;
    
    const margin = monthlyRevenue > 0 ? (monthlyNetProfit / monthlyRevenue) * 100 : 0;
    const roiPercent = totalCapex > 0 ? (annualProfit / totalCapex) * 100 : 0;
    const paybackPeriodMonths = annualProfit > 0 ? Math.round((totalCapex / annualProfit) * 12) : 999;

    return {
      totalCapexInr: Math.round(totalCapex),
      equipmentCapexInr: Math.round(equipmentCapex),
      installationAndGridCapexInr: Math.round(installationAndGridCapex),
      dailyEnergySoldKwh: Math.round(dailyEnergySoldKwh),
      dailySessionsCount,
      monthlyRevenueInr: Math.round(monthlyRevenue),
      monthlyElectricityCostInr: Math.round(monthlyElectricityCost),
      monthlyOpexInr: Math.round(monthlyOpex),
      monthlyNetProfitInr: Math.round(monthlyNetProfit),
      annualProfitInr: Math.round(annualProfit),
      ebitdaMarginPercent: parseFloat(margin.toFixed(1)),
      roiPercent: parseFloat(roiPercent.toFixed(1)),
      paybackPeriodMonths,
      scenarios: {
        pessimistic: pessimisticScenario,
        base: baseScenario,
        optimistic: optimisticScenario
      }
    };
  }
}
