type priorityOption = {
    value: number,
    label: string
}

export const priorityProperties: priorityOption[] = [
    { value: 1, label: '😐' },
    { value: 2, label: '🙂' },
    { value: 3, label: '😊' },
    { value: 4, label: '😍' }
];

// Funktion, um das Emoji basierend auf der Priorität zu erhalten
export function getPriorityEmoji(prio: number) {
    const found = priorityProperties.find(p => p.value === prio);
    return found ? found.label : '';
}