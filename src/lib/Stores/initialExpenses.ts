import type { Expense } from "$lib/Models/types";

export const initialExpenses: Expense[] = [
    {
        id: (Date.now() + 1).toString(), // Simulierte eindeutige ID
        name: 'Netflix-Abo',
        cost: {
            originalCost: 15 // Monatlicher Preis
        },
        annualFrequency: 12, // Monatliche Zahlung
        prio: 2, // Priorität
        isActive: true // Aktiviert
    },
    {
        id: (Date.now() + 2).toString(), // Simulierte eindeutige ID
        name: 'MacBook Pro',
        cost: {
            originalCost: 2000 // Einmaliger Preis
        },
        annualFrequency: 0, // Einmalige Zahlung
        prio: 1,
        isActive: true
    },
    {
        id: (Date.now() + 3).toString(), // Simulierte eindeutige ID
        name: 'Wöchentlicher Kaffee',
        cost: {
            originalCost: 5 // Wöchentlicher Preis
        },
        annualFrequency: 52, // Wöchentliche Zahlung
        prio: 3,
        isActive: true
    }
];
