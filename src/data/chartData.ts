import { derived } from "svelte/store";
import { selectedYears, expenses, includeInflation, selectedInvestmentType } from "../stores/stores";
import { investmentProperties } from "./investmentOptions";

export type ChartData = {
    labels: string[];
    minData: number[];
    maxData?: number[]; //optional
};

type ExpenseData = {
    cost: number;
    annualFrequency: number;
};

export const chartData = derived([selectedYears, expenses, includeInflation, selectedInvestmentType], ([$selectedYears, $expenses, $includeInflation, $selectedInvestmentType]) => {
    const labels = Array.from({ length: $selectedYears }, (_, i) => `${i + 1} Jahr${i > 0 ? 'e' : ''}`);
    const expenseData: ExpenseData[] = $expenses.map(expense => ({ cost: expense.cost, annualFrequency: expense.annualFrequency }));

    const selectedOption = investmentProperties.find(option => option.label === $selectedInvestmentType);

    if (!selectedOption) {
        console.error('Ausgewählte Anlageoption nicht gefunden:', $selectedInvestmentType);
        // Default-Werte zurückgeben, wenn keine Option gefunden wird
        return { labels, minData: Array($selectedYears).fill(0) };
    }

    const minData = calculateData($selectedYears, expenseData, selectedOption.interestRate.min, $includeInflation);
    
    let maxData;
    // MaxData nur für volatile Anlageformen berechnen
    if (selectedOption.volatility) {
        maxData = calculateData($selectedYears, expenseData, selectedOption.interestRate.max, $includeInflation);
    }

    // Ergebnisobjekt, inklusive maxData, wenn vorhanden
    const result: ChartData = { labels, minData };
    if (maxData) {
        result.maxData = maxData;
    }
    console.log(result)
    
    return result;
});
  
export default chartData;

function calculateData(years: number, expenses: ExpenseData[], annualRate: number, includeInflation: boolean): number[] {
    const inflationRate = 0.02; // Angenommene durchschnittliche Inflationsrate pro Jahr in Prozent
    let monthlyRate = annualRate / 12; // Monatlicher Zinssatz

    let annualValues: number[] = []; // Liste für die jährlichen Werte
    let totalValue = 0; // Startwert mit einmaligen Ausgaben

    expenses.filter(({ annualFrequency}) => annualFrequency === 0).forEach(({ cost }) => {
        totalValue += cost; // Einmalige Ausgaben zum Startwert hinzufügen
    });

    for (let yearIndex = 1; yearIndex <= years; yearIndex++) {
        let yearContribution = 0; // Beitrag für das aktuelle Jahr

        // Füge jährliche Beiträge und ihren zukünftigen Wert hinzu
        expenses.filter(({ annualFrequency }) => annualFrequency === 1).forEach(({ cost }) => {
            yearContribution += cost;
        });

        // Berechne den Beitrag für das Jahr unter Verwendung der Annuitätsformel für monatliche Zahlungen
        expenses.filter(({ annualFrequency }) => annualFrequency > 1).forEach(({ annualFrequency, cost }) => {
            let n = 12; 
            if (monthlyRate === 0) {
                // Wenn der monatliche Zinssatz 0 ist, fügen Sie einfach die monatlichen Ausgaben multipliziert mit 12 zum Jahresbeitrag hinzu
                yearContribution += cost * annualFrequency;
            } else {
                // Ansonsten verwenden Sie die Annuitätsformel
                yearContribution += (cost * (annualFrequency / n)) * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate);
            }
        });

        // Wende jährliche Zinsen auf den Gesamtbetrag des Vorjahres an, bevor die diesjährigen Beiträge hinzugefügt werden
        totalValue = (totalValue * (1 + annualRate)) + yearContribution;

        // Anwendung der Inflation, falls einbezogen
        if (includeInflation) {
            totalValue *= (1 - inflationRate);
        }

        // Füge den kumulierten Wert am Ende des Jahres zur Liste hinzu
        annualValues.push(Number(totalValue.toFixed(2)));
    }
    return annualValues;
}



