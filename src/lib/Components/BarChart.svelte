<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import Chart from 'chart.js/auto';
    import type { ChartDataset } from 'chart.js/auto';
    import type { ChartConfiguration } from 'chart.js/auto';
    import type { DataSet } from '$lib/Models/types';
    import { chartData } from '$lib/Stores/stores';

    let chart: Chart;

    // Reagiere auf Änderungen in chartData und aktualisiere das Chart
    $: $chartData, updateChart();

   // Definieren Sie einen erweiterten Typ für Ihre Datasets, der die zusätzlichen Eigenschaften beinhaltet
    interface CustomDataset extends ChartDataset<'bar'> {
        minData?: number[];
    }

    const chartConfig: ChartConfiguration = {
        type: 'bar',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    stacked: true,
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
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const dataset = context.dataset as CustomDataset;
                            const dataIndex = context.dataIndex;
                            const label = dataset.label || '';
                            
                            // Überprüfen, ob es sich um ein Max-Dataset handelt
                            
                            if (label.includes('Max') && dataset.minData) {
                                const minDataValue = dataset.minData[dataIndex];
                                const rawValue = context.raw as number; // Typumwandlung für context.raw
                                const maxDataValue = minDataValue + rawValue;

                                // Verwenden Sie toLocaleString() für die Formatierung
                                const formattedMin = minDataValue.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                const formattedMax = maxDataValue.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                                return `Min: ${formattedMin} €, Max: ${formattedMax} €`;
                            } else {
                                // Standard-Tooltip für Min-Datasets
                                const formattedValue = (context.raw as number).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                return `${label}: ${formattedValue} €`;
                            }
                        }
                    }
                }
            }
        }
    };

    function updateChart() {
        if (chart) {
            chart.data.labels = $chartData.labels;
            chart.data.datasets = [];

            const isMultipleDataSets = $chartData.dataSets.length > 1;

            $chartData.dataSets.forEach((dataSet: DataSet, index: number) => {

                // Standardfarben für einen einzelnen Datensatz oder die aktuelle Simulation
                let backgroundColor = `rgba(134, 239, 172, 0.6)`; // Grün mit Transparenz

                // Anpassen der Farben, wenn mehr als ein Datensatz vorhanden ist und dies die ältere Simulation ist
                if (isMultipleDataSets && index === 0) {
                    backgroundColor = `rgba(108, 99, 255, 0.6)`; // Lila (purple-800) mit Transparenz
                }

                const minDataDataset = {
                    label: `Simulation ${index + 1} - Min`,
                    data: dataSet.minData,
                    backgroundColor,
                    stack: `Stack ${index}`
                };
                chart.data.datasets.push(minDataDataset);
         
                // Überprüfe, ob maxData vorhanden ist und passe das Chart entsprechend an
                if ('maxData' in dataSet) {
                    const diffData = dataSet.maxData.map((maxVal, i) => maxVal - dataSet.minData[i]);
                    const maxDataDataset = {
                        label: `Simulation ${index + 1} - Max`,
                        data: diffData,
                        backgroundColor: isMultipleDataSets && index === 0 ? `rgba(149, 113, 255, 0.6)` : `rgba(52, 211, 153, 0.6)`, // Heller für Max-Daten
                        stack: `Stack ${index}`,
                        minData: dataSet.minData
                    };
                    chart.data.datasets.push(maxDataDataset);
                }
            });

            
            chart.update();
        }
    }

    // Diagramm bauen
    onMount(() => {
        const ctx = (document.getElementById('myChart') as HTMLCanvasElement)?.getContext('2d');
        if(ctx){
            chart = new Chart(ctx, chartConfig);
            updateChart();
        } 
    })

    // Diagramm zerstören
    onDestroy(() => {
        if (chart) chart.destroy();
    });
    
</script>

<div style="position: relative; height: 40vh; width: 80vw; margin: auto;">
    <canvas id="myChart"></canvas>
</div>