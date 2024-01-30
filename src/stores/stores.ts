import { writable, derived } from "svelte/store";
import { investmentOptions } from "../data/investmentOptions";
import type { Expense } from "$lib/types";

export const initialSavings = 10;
export const currentSavings = writable(initialSavings);

export const selectedYears = writable(5);

export const includeInflation = writable(false);

export const selectedInvestmentType = writable(investmentOptions[0])

export const expenses = writable<Expense[]>([]);

// Berechnung der Gesamtsumme der Ausgaben und Aktualisierung von currentSavings
export const totalExpenses = derived(expenses, $expenses => {
    const total = $expenses.reduce((sum, expense) => sum + expense.cost, 0);
    currentSavings.set(initialSavings + total); // Aktualisiere currentSavings basierend auf der Gesamtsumme der Ausgaben
    return total;
});