<script lang="ts">
    import type { Expense } from "$lib/Models/types";
    import { priorityProperties } from "$lib/Models/priorityOptions";
    import { removeExpenseFromChartStore } from "$lib/Stores/stores";

    export let expense: Expense;

    let sliderValue = expense.cost;

    // Reaktive Aktualisierung des cost-Werts im Store, wenn der Slider bewegt wird
    /*
    $: if (sliderValue !== expense.cost) {
        expenses.update(currentExpenses => {
            return currentExpenses.map(e => e.id === expense.id ? {...e, cost: sliderValue} : e);
        });
    }
    */

    // Funktion, um das Emoji basierend auf der Priorität zu erhalten
    function getPriorityEmoji(prio: number) {
        const found = priorityProperties.find(p => p.value === prio);
        return found ? found.label : '';
    }

    // Funktion zur Berechnung der jährlichen Kosten
    function calculateAnnualCost(cost: number, frequency: number) {
        // Kein Multiplikator für einmalige oder jährliche Zahlungen
        if (frequency === 0 || frequency === 1) return cost;
        return cost * frequency;
    }
</script>

<div class="bg-purple-800 text-white mt-4 shadow-md rounded p-4 flex flex-col justify-between mb-4">
    <div class="flex justify-between">
        <div class="flex-grow">
            <h3 class="text-lg font-bold">{expense.name} {getPriorityEmoji(expense.prio)} <span class="text-sm font-normal">({expense.annualFrequency > 1 ? `${expense.annualFrequency}x jährlich` : 'Einmalig'})</span></h3>
            <p>kostet dich <strong>{calculateAnnualCost(expense.cost, expense.annualFrequency)}€</strong> im Jahr 💸 </p>
        </div>
        <button 
            class="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded"
            on:click={() => removeExpenseFromChartStore(expense.id)}
            >
            X
        </button>
    </div>
    <hr class="my-2"/>
    <div class="flex items-center">
        <p class="mr-2">Neuer Preis: {sliderValue}€</p>
        <input type="range" min="0" max={expense.cost} bind:value={sliderValue} class="slider mr-2">
        <p class="mr-4">Ersparnis: {expense.cost - sliderValue}€ </p>
    </div>
</div>