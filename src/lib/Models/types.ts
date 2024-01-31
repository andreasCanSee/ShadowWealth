export type Expense = {
    id: string; // Eindeutige ID für jede Ausgabe
    name: string; // Name oder Beschreibung der Ausgabe
    cost: number; // Kosten der Ausgabe
    simulatedCost?: number,
    annualFrequency: number; // Häufigkeit der Ausgabe (Einmalig, Wöchentlich, Monatlich, Jährlich)
    prio: number;
    isActive: boolean;
}

export type ExpenseData = {
    cost: number;
    annualFrequency: number;
};