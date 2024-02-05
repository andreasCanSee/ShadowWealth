import { writable, derived } from "svelte/store";
import { investmentOptions, investmentProperties } from "../Models/investmentOptions";
import type { DataSet, Expense, ExpenseData, SimulationStore, SimulationChartData } from "$lib/Models/types";
import { calculateData } from "$lib/calculate";
import { initialExpenses } from "./initialExpenses";

// Definition eines einzigen Store-Objekts, das alle relevanten Daten enthält
export const simulationStore = writable<SimulationStore>({
    selectedYears: 5,
    simulations: [
        {
            investmentType: investmentOptions[0],
            includeInflation: false,
            expenses: initialExpenses
        }
    ],
    currentSimulationIndex: 0
});

export const chartData = derived(simulationStore, ($simulationStore): SimulationChartData => {
    const labels = Array.from({ length: $simulationStore.selectedYears }, (_, i) => `${i + 1} Jahr${i > 0 ? 'e' : ''}`);
    const dataSets: DataSet[] = $simulationStore.simulations.map((simulation) => {
        
        // Verwende adjustedCost, wenn vorhanden, sonst originalCost
        const expenseData: ExpenseData[] = simulation.expenses.filter(expense => expense.isActive).map(expense => ({
            cost: expense.cost.adjustedCost ?? expense.cost.originalCost,
            annualFrequency: expense.annualFrequency
        }));

        const selectedInvestmentOption = investmentProperties.find(option => option.label === simulation.investmentType);

        if (!selectedInvestmentOption) {
            console.error('Ausgewählte Anlageoption nicht gefunden:', simulation.investmentType);
            // Default-Werte zurückgeben, wenn keine Option gefunden wird
            return { minData: Array($simulationStore.selectedYears).fill(0) };
        }

        const minData = calculateData($simulationStore.selectedYears, expenseData, selectedInvestmentOption.interestRate.min, simulation.includeInflation);
        
        let dataSet: DataSet = { minData };

        // MaxData nur für volatile Anlageformen berechnen
        if (selectedInvestmentOption.volatility) {
            const maxData = calculateData($simulationStore.selectedYears, expenseData, selectedInvestmentOption.interestRate.max, simulation.includeInflation);
            dataSet = { ...dataSet, maxData }
        }

        return dataSet;

    });
    return { labels, dataSets }
})

function addExpenseToSimulation(newExpense: Expense) {
    simulationStore.update($simulationStore => {
        const updatedSimulations = [...$simulationStore.simulations];
        updatedSimulations[$simulationStore.currentSimulationIndex].expenses.push(newExpense);

        return {
            ...$simulationStore,
            simulations: updatedSimulations
        };
    });
}

// Funktion zum Entfernen einer Ausgabe aus dem Store
function removeExpenseFromSimulation(expenseId: string) {
    simulationStore.update($simulationStore => {
        const updatedSimulations = [...$simulationStore.simulations];
        // Verwenden Sie die Array filter-Methode, um die Ausgabe mit der angegebenen ID zu entfernen
        updatedSimulations[$simulationStore.currentSimulationIndex].expenses = updatedSimulations[$simulationStore.currentSimulationIndex].expenses.filter(expense => expense.id !== expenseId);
        return {
            ...$simulationStore,
            simulations: updatedSimulations
        };
    });
}

function updateExpenseInSimulation(expenseId: string, newCost: number) {
    simulationStore.update($simulationStore => {
        const updatedSimulations = [...$simulationStore.simulations];
        updatedSimulations[$simulationStore.currentSimulationIndex].expenses = updatedSimulations[$simulationStore.currentSimulationIndex].expenses.map(expense => {
            // Wenn die ID übereinstimmt, aktualisiere die Kosten und optional die Häufigkeit
            if (expense.id === expenseId) {
                if (newCost === 0) {
                    const { adjustedCost, ...restCost } = expense.cost;
                    return {
                        ...expense,
                        cost: restCost // Aktualisiere cost ohne adjustedCost
                    };
                } else {
                    // Setze adjustedCost auf newCost, wenn newCost ungleich 0 ist
                    return {
                        ...expense,
                        cost: {
                            ...expense.cost,
                            adjustedCost: newCost
                        }
                    };
                }
            }
            // Gib das Expense unverändert zurück, wenn die ID nicht übereinstimmt
            return expense;
        });

        // Aktualisierten Zustand mit den neuen Ausgaben zurückgeben
        return {
            ...$simulationStore,
            simulations: updatedSimulations
        };
    });
}

function toggleExpenseActiveStatusInSimulation(expenseId: string) {
    simulationStore.update($simulationStore => {
        const updatedSimulations = [...$simulationStore.simulations];
        updatedSimulations[$simulationStore.currentSimulationIndex].expenses = updatedSimulations[$simulationStore.currentSimulationIndex].expenses.map(expense => {
            if (expense.id === expenseId) {
                return { ...expense, isActive: !expense.isActive };
            }
            return expense;
        });

        return { ...$simulationStore, simulations: updatedSimulations };
    });
}

export { addExpenseToSimulation, removeExpenseFromSimulation, updateExpenseInSimulation, toggleExpenseActiveStatusInSimulation };

export function duplicateAndManageSimulations() {
    simulationStore.update($simulationStore => {
        // Kopiere die aktuelle Simulation
        const newSimulation = { ...$simulationStore.simulations[$simulationStore.currentSimulationIndex] };
        // Erstelle eine tiefe Kopie der Ausgaben, um Referenzen zu trennen
        newSimulation.expenses = newSimulation.expenses.map(expense => ({ ...expense }));

        // Füge die neue Simulation hinzu
        const updatedSimulations = [...$simulationStore.simulations, newSimulation];

        // Stelle sicher, dass nicht mehr als zwei Simulationen vorhanden sind
        while (updatedSimulations.length > 2) {
            updatedSimulations.shift(); // Entferne die älteste Simulation
        }

        // Aktualisiere den Index, um auf die neue Simulation zu zeigen
        const updatedIndex = updatedSimulations.length - 1;

        return {
            ...$simulationStore,
            simulations: updatedSimulations,
            currentSimulationIndex: updatedIndex
        };
    });
}