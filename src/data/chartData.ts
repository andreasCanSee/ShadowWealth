import { derived } from "svelte/store";
import { selectedYears, currentSavings, includeInflation, selectedInvestmentType } from "../stores/store";
import { investmentProperties } from "./investmentOptions";

export type ChartData = {
    labels: string[];
    minData: number[];
    maxData?: number[]; //optional
};

export const chartData = derived([selectedYears, currentSavings, includeInflation, selectedInvestmentType], ([$selectedYears, $currentSavings, $includeInflation, $selectedInvestmentType]) => {
    const labels = Array.from({ length: $selectedYears }, (_, i) => `${i + 1} Jahr${i > 0 ? 'e' : ''}`);
    const selectedOption = investmentProperties.find(option => option.label === $selectedInvestmentType);

    if (!selectedOption) {
        console.error('Ausgewählte Anlageoption nicht gefunden:', $selectedInvestmentType);
        // Default-Werte zurückgeben, wenn keine Option gefunden wird
        return { labels, minData: Array($selectedYears).fill($currentSavings) };
    }

    const minData = calculateData($selectedYears, $currentSavings, selectedOption.interestRate.min, $includeInflation);
    
    let maxData;
    // MaxData nur für volatile Anlageformen berechnen
    if (selectedOption.volatility) {
        maxData = calculateData($selectedYears, $currentSavings, selectedOption.interestRate.max, $includeInflation);
    }

    // Ergebnisobjekt, inklusive maxData, wenn vorhanden
    const result: ChartData = { labels, minData };
    if (maxData) {
        result.maxData = maxData;
    }
    
    return result;
});
  
export default chartData;

function calculateData(years: number, baseSavings: number, rate: number, includeInflation: boolean): number[] {
    const inflationRate = 2; // Angenommene durchschnittliche Inflationsrate pro Jahr in Prozent

    return Array.from({ length: years }, (_, i) => {
        let adjustedRate = rate;
        if (includeInflation) {
            adjustedRate -= inflationRate / 100; // Anpassung der Zinsrate um die Inflation
        }
        return baseSavings * Math.pow(1 + adjustedRate, i + 1); // Berechnung unter Berücksichtigung der Zinsen (und Inflation, falls aktiviert)
    });
}
