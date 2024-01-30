import { writable } from "svelte/store";

export const currentSavings = writable(500);

export const selectedYears = writable(5);

export const includeInflation = writable(false);

export const selectedInvestmentType = writable("Girokonto")