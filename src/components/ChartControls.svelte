<script lang="ts">
    import { selectedYears, includeInflation, selectedInvestmentType } from "../stores/store";
    import { investmentOptions } from "../data/investmentOptions";
</script>

<div class="flex items-center space-x-4">
    <label for="years-slider" class="whitespace-nowrap">Zeitraum:</label>
    <input id="years-slider" type="range" min="1" max="10" class="slider flex-1" bind:value={$selectedYears}>
    <span>{$selectedYears} Jahre</span>

    <label for="investment-dropdown">Anlageform:</label>
    <select id="investment-dropdown" bind:value={$selectedInvestmentType}>
        {#each investmentOptions as option}
            <option value={option}>{option}</option>
        {/each}
    </select>

    <label for="inflation-checkbox">Inflation berücksichtigen</label>
    <input id="inflation-checkbox" type="checkbox" bind:checked={$includeInflation}>
</div>