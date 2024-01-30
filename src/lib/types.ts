export type Expense = {
    id: string; // Eindeutige ID für jede Ausgabe
    name: string; // Name oder Beschreibung der Ausgabe
    cost: number; // Kosten der Ausgabe
    frequency: number; // Häufigkeit der Ausgabe (Einmalig, Wöchentlich, Monatlich, Jährlich)
    prio: number;
}