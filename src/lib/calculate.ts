import type { ExpenseData } from "./Models/types";

export function calculateData(years: number, expenses: ExpenseData[], annualRate: number, includeInflation: boolean): number[] {
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