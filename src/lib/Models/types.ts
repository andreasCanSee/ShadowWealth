type Cost = {
    originalCost: number,
    adjustedCost?: number
}

export type Expense = {
    id: string; // Eindeutige ID für jede Ausgabe
    name: string; // Name oder Beschreibung der Ausgabe
    cost: Cost // Kosten der Ausgabe
    annualFrequency: number; // Häufigkeit der Ausgabe (Einmalig, Wöchentlich, Monatlich, Jährlich)
    prio: number;
    isActive: boolean;
}

export type Simulation = {
    expenses: Expense[];
    investmentType: string;
    includeInflation: boolean;
}

export type SimulationStore = {
    selectedYears: number;
    simulations: Simulation[];
    currentSimulationIndex: number;
};

export type DataSet = { minData: number[] } | { minData: number[], maxData: number[] }

export type SimulationChartData = {
    labels: string[];
    dataSets: DataSet[];
}

export type ExpenseData = {
    cost: number;
    annualFrequency: number;
};