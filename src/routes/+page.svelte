<script lang="ts">
    import Header from "../lib/Components/Header.svelte";
    import ExpenseInput from "../lib/Components/ExpenseInput.svelte";
    import BarChart from "../lib/Components/BarChart.svelte";
    import ChartControls from "../lib/Components/ChartControls.svelte";
    import ExpenseCard from "../lib/Components//ExpenseCard.svelte";
    import { chartStore } from "../lib/Stores/stores";
</script>

<div class="min-h-screen bg-yellow-100">
    <Header />
    <div style="width: 80vw; margin: auto;"> <!-- Wrapper mit gleichen Stilen wie BarChart -->
        <ExpenseInput/>
        <BarChart />
        <ChartControls />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each $chartStore.expenses.slice().sort((a, b) => a.prio - b.prio) as expense (expense.id)}
                <ExpenseCard {expense}/>
            {/each}
        </div>
    </div>
</div>