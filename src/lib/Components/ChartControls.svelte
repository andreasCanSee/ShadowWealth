<script lang="ts">
    import { simulationStore } from "$lib/Stores/stores";
    import { investmentOptions } from "$lib/Models/investmentOptions";

    // Reaktive Variable, die den Wert von includeInflation der aktuellen Simulation speichert
    let includeInflation = false;

    // Reaktive Variable für den ausgewählten Anlagentyp
    let selectedInvestmentType: string;

    // Aktualisiere die lokale Variable, wenn die aktuelle Simulation geändert wird
    $: {
        const currentSimulation = $simulationStore.simulations[$simulationStore.currentSimulationIndex];
        selectedInvestmentType = currentSimulation.investmentType;
    }

    // Reagiere auf Änderungen im simulationStore, um includeInflation für die aktuelle Simulation zu erhalten
    $: {
        const currentSimulation = $simulationStore.simulations[$simulationStore.currentSimulationIndex];
        includeInflation = currentSimulation.includeInflation;
    }

    // Funktion, um die includeInflation-Einstellung in der aktuellen Simulation zu aktualisieren
    function toggleInflation() {
        simulationStore.update($store => {
            $store.simulations[$store.currentSimulationIndex].includeInflation = !includeInflation;
            return $store;
        });
    }

    // Funktion zum Aktualisieren des Anlagentyps in der aktuellen Simulation
    function updateInvestmentType(event: Event) {
        const target = event.target as HTMLSelectElement;
        const newType = target.value;
        
        simulationStore.update($store => {
            $store.simulations[$store.currentSimulationIndex].investmentType = newType;
            return $store;
        });
    }
</script>

<div class="flex space-x-4 justify-between bg-green-300 p-4 rounded-lg border border-black mt-4 mb-8"> <!-- Flex-Container mit Hintergrund, Padding, Abrundung und Border -->
    <div class="flex flex-col items-start space-y-1"> <!-- Gruppierung für den Zeitraum-Slider -->
        <label for="years-slider" class="whitespace-nowrap font-bold">Zeitraum:</label> <!-- Fettgedruckte Schrift für das Label -->
        <input id="years-slider" type="range" min="1" max="10" class="slider w-full" bind:value={$simulationStore.selectedYears}> <!-- Volle Breite für den Slider -->
        <span>{$simulationStore.selectedYears} Jahre</span>
    </div>

    <div class="flex flex-col items-start space-y-1">
        <label for="investment-dropdown" class="font-bold">Anlageform:</label>
        <select id="investment-dropdown" value={selectedInvestmentType} on:change={updateInvestmentType} class="w-full">
            {#each investmentOptions as option}
                <option value={option}>{option}</option>
            {/each}
        </select>
    </div>

    <div class="flex flex-col items-center space-y-2"> <!-- Vertikale Ausrichtung und Abstand für die Inflations-Checkbox -->
        <label for="inflation-checkbox" class="font-bold">Inflation</label>
        <input id="inflation-checkbox" type="checkbox" checked={includeInflation} on:change={toggleInflation}>
    </div>

</div>

