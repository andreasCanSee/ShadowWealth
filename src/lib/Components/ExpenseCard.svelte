<script lang="ts">
    import type { Expense } from "$lib/Models/types";
    import { removeExpenseFromSimulation, updateExpenseInSimulation, toggleExpenseActiveStatusInSimulation } from "$lib/Stores/stores";
    import { getFrequencyLabel } from "$lib/Models/frequencyOptions";
    import { getPriorityEmoji } from "$lib/Models/priorityOptions";

    export let expense: Expense;

    let sliderValue = expense.cost.adjustedCost ?? expense.cost.originalCost;

    // Funktion zur Berechnung der jährlichen Kosten
    function calculateAnnualCost(cost: number, frequency: number) {
        // Kein Multiplikator für einmalige oder jährliche Zahlungen
        if (frequency === 0 || frequency === 1) return cost;
        return cost * frequency;
    }
</script>

<div class:bg-purple-800={expense.isActive} class:bg-gray-600={!expense.isActive} class=" text-white shadow-md rounded p-4 flex flex-col justify-between mb-1">
    <div class="flex justify-between">
        <div class="flex-grow">
            <h3 class="text-lg font-bold">{expense.name} {getPriorityEmoji(expense.prio)} <span class="text-sm font-normal">({expense.annualFrequency > 1 ? `${expense.annualFrequency}x jährlich` : getFrequencyLabel(expense.annualFrequency)})</span></h3>
            <p>kostet dich <strong>{calculateAnnualCost(expense.cost.originalCost, expense.annualFrequency)}€</strong> {expense.annualFrequency > 0 ? 'im Jahr' : ''} 💸 </p>
        </div>
        <button 
            class="bg-yellow-100 hover:bg-yellow-300 text-black font-bold px-4 mr-2 rounded"
            on:click={() => toggleExpenseActiveStatusInSimulation(expense.id)}
            >
            {#if expense.isActive}
                -
            {:else}
                +
            {/if}
        </button>
        <button 
            class="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded"
            on:click={() => removeExpenseFromSimulation(expense.id)}
            >
            X
        </button>
    </div>
    <hr class="my-2 border-t-2"/>
    <p>Du kannst nicht ganz darauf verzichten?</p>
    <hr class="my-2 border-t-2 border-dashed border-gray-400"/>
    <div class="flex items-center">
        <p class="mr-2">{sliderValue < expense.cost.originalCost ? 'Neuer Preis: ' : 'Alter Preis: '}{sliderValue}€</p>
        <input type="range" min="0" max={expense.cost.originalCost} bind:value={sliderValue} class="slider mr-2">
        <p class="mr-4">Ersparnis: {expense.cost.originalCost - sliderValue}€ <span class="text-sm">({getFrequencyLabel(expense.annualFrequency)})</span></p>
        
    </div>
    <hr class="my-2 border-t-2 border-dashed border-gray-400"/>
    <p>Hier könntest du im Jahr <strong>{calculateAnnualCost(expense.cost.originalCost - sliderValue, expense.annualFrequency)}€</strong> sparen 💰</p>
    <button 
            class="bg-green-300 hover:bg-green-500 text-black mt-4 py-1 px-4 rounded"
            on:click={() => updateExpenseInSimulation(expense.id, expense.cost.originalCost - sliderValue)}
            >
            Neues Ersparnis anlegen
    </button>
</div>