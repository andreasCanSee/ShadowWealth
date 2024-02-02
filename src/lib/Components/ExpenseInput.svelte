<script lang="ts">
    import { frequencyProperties } from "$lib/Models/frequencyOptions";
    import { priorityProperties } from "$lib/Models/priorityOptions";
    import type { Expense } from "$lib/Models/types";
    import { addExpenseToSimulation } from "$lib/Stores/stores";

    let name = '';
    let cost: number;
    let selectedFrequencyMultiplier = frequencyProperties[0].multiplier;
    let selectedPriorityValue = priorityProperties[0].value;

    function addExpense() {
        const newExpense: Expense = {
            id: Date.now().toString(), // Einfache Methode, um eine eindeutige ID zu generieren
            name,
            cost: cost,
            annualFrequency: selectedFrequencyMultiplier,
            prio: selectedPriorityValue,
            isActive: true
        };

        addExpenseToSimulation(newExpense);

        // Eingabefelder zurücksetzen
        name = '';
        cost = 0;
        selectedFrequencyMultiplier = frequencyProperties[0].multiplier;
        selectedPriorityValue = priorityProperties[0].value;
    }
</script>

<div class="space-y-4 mt-4 mb-8 bg-white p-4 rounded-lg shadow border border-black">
    <div class="flex items-center space-x-2">
        <span>📝</span>
        <input type="text" placeholder="Artikel/Service" bind:value={name}
            class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

        <div class="flex flex-col md:flex-row md:space-x-2 md:items-center space-y-2 md:space-y-0  md:justify-between">
            <div class="flex items-center space-x-2">
                <span>💰</span>
                <input type="number" placeholder="Kosten in Euro" bind:value={cost}
                    class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div class="flex items-center space-x-2">
                <span>🔄</span>
                <select bind:value={selectedFrequencyMultiplier}
                    class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {#each frequencyProperties as option}
                        <option value={option.multiplier}>{option.label}</option>
                    {/each}
                </select>
            </div>

            <div class="flex items-center space-x-2">
                <span>⭐</span>
                <select bind:value={selectedPriorityValue}
                    class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {#each priorityProperties as {value, label}}
                        <option value={value}>{label}</option>
                    {/each}
                </select>
            </div>
    </div>

    <button 
    class="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 {name.trim().length === 0 || !Number.isFinite(cost) || cost <= 0 ? 'bg-gray-600 text-white cursor-not-allowed' : 'bg-green-300 text-black hover:bg-green-500'}" 
        on:click={addExpense}
        disabled={name.trim().length === 0 || !Number.isFinite(cost) || cost <= 0}
    >
        +
    </button>
</div>

