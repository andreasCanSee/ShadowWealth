<script lang="ts">
    import { selectedYears, includeInflation, selectedInvestmentType } from "../stores/store";
    import { investmentOptions } from "../data/investmentOptions";
</script>

<div class="flex space-x-4 justify-between bg-green-300 p-4 rounded-lg border border-black"> <!-- Flex-Container mit Hintergrund, Padding, Abrundung und Border -->
    <div class="flex flex-col items-start space-y-1"> <!-- Gruppierung für den Zeitraum-Slider -->
        <label for="years-slider" class="whitespace-nowrap font-bold">Zeitraum:</label> <!-- Fettgedruckte Schrift für das Label -->
        <input id="years-slider" type="range" min="1" max="10" class="slider w-full" bind:value={$selectedYears}> <!-- Volle Breite für den Slider -->
        <span>{$selectedYears} Jahre</span>
    </div>

    <div class="flex flex-col items-start space-y-1 "> <!-- Gruppierung für das Anlageform-Dropdown -->
        <label for="investment-dropdown" class="font-bold">Anlageform:</label> <!-- Fettgedruckte Schrift für das Label -->
        <select id="investment-dropdown" bind:value={$selectedInvestmentType} class="w-full"> <!-- Volle Breite für das Dropdown -->
            {#each investmentOptions as option}
                <option value={option}>{option}</option>
            {/each}
        </select>
    </div>

    <div class="flex flex-col items-center space-y-2"> <!-- Vertikale Ausrichtung und Abstand für die Inflations-Checkbox -->
        <label for="inflation-checkbox" class="font-bold">Inflation</label> <!-- Fettgedruckte Schrift für das Label -->
        <input id="inflation-checkbox" type="checkbox" bind:checked={$includeInflation}>
    </div>
</div>

