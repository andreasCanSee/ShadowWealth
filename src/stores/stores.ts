import { writable } from "svelte/store";
import { investmentOptions } from "../data/investmentOptions";
import type { Expense } from "$lib/types";

export const initialSavings = 10;
export const currentSavings = writable(initialSavings);

export const selectedYears = writable(5);

export const includeInflation = writable(false);

export const selectedInvestmentType = writable(investmentOptions[0])

export const expenses = writable<Expense[]>([]);
