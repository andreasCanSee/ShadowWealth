<script lang="ts">
    import Header from "../components/Header.svelte";
    import BarChart from "../components/BarChart.svelte";
    import ChartControls from "../components/ChartControls.svelte";
    import ExpenseInput from "../components/ExpenseInput.svelte";
</script>

<div class="min-h-screen bg-yellow-100">
    <Header />
    <div style="width: 80vw; margin: auto;"> <!-- Wrapper mit gleichen Stilen wie BarChart -->
        <BarChart />
        <ChartControls />
        <ExpenseInput/>
    </div>
</div>