<script lang="ts">
    import Header from "../lib/Components/Header.svelte";
    import ExpenseInput from "../lib/Components/ExpenseInput.svelte";
    import BarChart from "../lib/Components/BarChart.svelte";
    import ChartControls from "../lib/Components/ChartControls.svelte";
    import ExpenseCard from "../lib/Components//ExpenseCard.svelte";
    import { simulationStore } from "$lib/Stores/stores";
    import type { Simulation } from "$lib/Models/types";
    import { duplicateAndManageSimulations } from "$lib/Stores/stores";

    // Abonniere den simulationStore, um auf die aktuelle Simulation zugreifen zu können
    let currentSimulation: Simulation;
    simulationStore.subscribe($simulationStore => {
        currentSimulation = $simulationStore.simulations[$simulationStore.currentSimulationIndex];
    });
  
</script>

<div class="min-h-screen bg-yellow-100">
    <Header />
    <div style="width: 80vw; margin: auto;"> <!-- Wrapper mit gleichen Stilen wie BarChart -->
        <ExpenseInput/>
        <BarChart />
        {#if currentSimulation.expenses.length > 0}
        <ChartControls />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {#each currentSimulation.expenses.slice().sort((a, b) => a.prio - b.prio) as expense (expense.id)}
                <ExpenseCard {expense}/>
            {/each}
        </div>
        
        <div class="flex justify-center items-center">
            <button class="mt-4 bg-purple-800 hover:bg-purple-500 text-yellow-100 font-bold py-2 px-4 rounded" on:click="{duplicateAndManageSimulations}">
                Simulation zum Vergleichen festhalten
            </button>
        </div>
        {/if}
    </div>
</div>