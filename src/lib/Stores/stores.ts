import { writable, derived } from "svelte/store";
import { investmentOptions, investmentProperties } from "../Models/investmentOptions";
import type { Expense, ExpenseData } from "$lib/Models/types";
import { calculateData } from "$lib/calculate";

// Definition eines einzigen Store-Objekts, das alle relevanten Daten enthält
export const chartStore = writable({
    selectedYears: 5,
    includeInflation: false,
    selectedInvestmentType: investmentOptions[0],
    expenses: [] as Expense[]
});

type ChartData = {
    labels: string[];
    minData: number[];
    maxData?: number[]; //optional
};

export const chartData = derived(chartStore, ($chartStore) => {
    const labels = Array.from({ length: $chartStore.selectedYears }, (_, i) => `${i + 1} Jahr${i > 0 ? 'e' : ''}`);
    const expenseData: ExpenseData[] = $chartStore.expenses.map(expense => ({ cost: expense.cost, annualFrequency: expense.annualFrequency }));

    const selectedOption = investmentProperties.find(option => option.label === $chartStore.selectedInvestmentType);

    if (!selectedOption) {
        console.error('Ausgewählte Anlageoption nicht gefunden:', $chartStore.selectedInvestmentType);
        // Default-Werte zurückgeben, wenn keine Option gefunden wird
        return { labels, minData: Array($chartStore.selectedYears).fill(0) };
    }

    const minData = calculateData($chartStore.selectedYears, expenseData, selectedOption.interestRate.min, $chartStore.includeInflation);
    
    let maxData;
    // MaxData nur für volatile Anlageformen berechnen
    if (selectedOption.volatility) {
        maxData = calculateData($chartStore.selectedYears, expenseData, selectedOption.interestRate.max, $chartStore.includeInflation);
    }

    // Ergebnisobjekt, inklusive maxData, wenn vorhanden
    const result: ChartData = { labels, minData };
    if (maxData) {
        result.maxData = maxData;
    }
    console.log(result)
    
    return result;
})

function addExpenseToChartStore(newExpense: Expense) {
    chartStore.update($chartStore => {
        return {
            ...$chartStore,
            expenses: [...$chartStore.expenses, newExpense]
        };
    });
}

// Funktion zum Entfernen einer Ausgabe aus dem Store
function removeExpenseFromChartStore(id: string) {
    chartStore.update($chartStore => {
        // Verwenden Sie die Array filter-Methode, um die Ausgabe mit der angegebenen ID zu entfernen
        const updatedExpenses = $chartStore.expenses.filter(expense => expense.id !== id);
        return {
            ...$chartStore,
            expenses: updatedExpenses
        };
    });
}

export { addExpenseToChartStore, removeExpenseFromChartStore };