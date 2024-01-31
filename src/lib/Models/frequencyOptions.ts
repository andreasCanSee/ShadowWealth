type frequencyOption = {
    label: string;
    multiplier: number;
}

export const frequencyProperties: frequencyOption[] = [
    { label: 'Einmalig', multiplier: 0},
    { label: 'Wöchentlich', multiplier: 52 }, 
    { label: 'Monatlich', multiplier: 12 },
    { label: 'Jährlich', multiplier: 1 }
]