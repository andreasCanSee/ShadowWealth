type frequencyOption = {
    label: string;
    multiplier: number;
}

export const frequencyProperties: frequencyOption[] = [
    { label: 'Einmalig', multiplier: 0},
    { label: 'Jährlich', multiplier: 1 },
    { label: 'Monatlich', multiplier: 12 },
    { label: 'Wöchentlich', multiplier: 52 }
]

export function getFrequencyLabel(frequency: number) {
    const found = frequencyProperties.find(p => p.multiplier === frequency);
    return found ? found.label : '';
}