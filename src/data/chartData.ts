import { derived } from "svelte/store";
import { selectedYears, expenses, includeInflation, selectedInvestmentType } from "../stores/stores";
import { investmentProperties } from "./investmentOptions";

// Berechnung der Gesamtsumme der Ausgaben
export const totalExpenses = derived(expenses, $expenses =>
    $expenses.reduce((total, expense) => total + expense.cost, 0)
);

export type ChartData = {
    labels: string[];
    minData: number[];
    maxData?: number[]; //optional
};

export const chartData = derived([selectedYears, totalExpenses, includeInflation, selectedInvestmentType], ([$selectedYears, $totalExpenses, $includeInflation, $selectedInvestmentType]) => {
    const labels = Array.from({ length: $selectedYears }, (_, i) => `${i + 1} Jahr${i > 0 ? 'e' : ''}`);
    const selectedOption = investmentProperties.find(option => option.label === $selectedInvestmentType);

    if (!selectedOption) {
        console.error('Ausgewählte Anlageoption nicht gefunden:', $selectedInvestmentType);
        // Default-Werte zurückgeben, wenn keine Option gefunden wird
        return { labels, minData: Array($selectedYears).fill($totalExpenses) };
    }

    const minData = calculateData($selectedYears, $totalExpenses, selectedOption.interestRate.min, $includeInflation);
    
    let maxData;
    // MaxData nur für volatile Anlageformen berechnen
    if (selectedOption.volatility) {
        maxData = calculateData($selectedYears, $totalExpenses, selectedOption.interestRate.max, $includeInflation);
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
