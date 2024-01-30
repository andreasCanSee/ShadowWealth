<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import Chart from 'chart.js/auto';
    import type { ChartConfiguration } from 'chart.js/auto';
    import { chartData } from '../data/chartData';

    let chart: Chart;

    $: $chartData, updateChart();

    // Initialkonfiguration des Charts
    const initialDatasets = [{
        label: 'Gespartes Geld in Euro',
        data: $chartData.minData,
        backgroundColor: 'rgba(134, 239, 172, 0.6)',
        borderColor: 'rgba(134, 239, 172, 1)',
        borderWidth: 1
    }];

    const maxDataDatasetTemplate = {
        backgroundColor: 'rgba(173, 255, 192, 0.6)',
        borderColor: 'rgba(173, 255, 192, 1)',
        borderWidth: 1
    };

    if ('maxData' in $chartData && $chartData.maxData) {
        initialDatasets.push({
            ...maxDataDatasetTemplate,
            label: 'Maximales gespartes Geld in Euro',
            data: $chartData.maxData
        });
    }

    const chartConfig: ChartConfiguration = {
        type: 'bar',
        data: {
            labels: $chartData.labels,
            datasets: initialDatasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    //suggestedMax: 600,
                    title: {
                        display: true,
                        text: 'Geld in Euro'
                    },
                    ticks: {
                        stepSize: 50
                    }
                },
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Zeit in Jahren'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    };

    function updateChart() {
        if (chart) {
            chart.data.labels = $chartData.labels;
            chart.data.datasets[0].data = $chartData.minData; // Setze immer minData für das erste Dataset

            // Überprüfe, ob maxData vorhanden ist und passe das Chart entsprechend an
            if ('maxData' in $chartData && $chartData.maxData) {
                const maxDataDataset = {
                    ...maxDataDatasetTemplate,
                    label: 'Maximales gespartes Geld in Euro',
                    data: $chartData.maxData
                };
                if (chart.data.datasets.length > 1) {
                    // Aktualisiere maxData für das zweite Dataset, falls es bereits existiert
                    chart.data.datasets[1] = maxDataDataset;
                } else {
                    // Füge ein neues Dataset für maxData hinzu, falls es noch nicht existiert
                    chart.data.datasets.push(maxDataDataset);
                }
            } else if (chart.data.datasets.length > 1) {
                // Entferne das maxData Dataset, falls es nicht mehr benötigt wird
                chart.data.datasets.pop();
            }

            chart.update();
        }
    }

    // Diagramm bauen
    onMount(() => {
        const ctx = (document.getElementById('myChart') as HTMLCanvasElement)?.getContext('2d');
        if(ctx) chart = new Chart(ctx, chartConfig);
    })

    // Diagramm zerstören
    onDestroy(() => {
        if (chart) chart.destroy();
    });
    
</script>

<div style="position: relative; height: 40vh; width: 80vw; margin: auto;">
    <canvas id="myChart"></canvas>
</div>