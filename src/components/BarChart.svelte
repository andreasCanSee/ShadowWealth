<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import type { ChartConfiguration } from 'chart.js/auto';

    import chartData from '../data/chartData';

    let chart: Chart;

    const chartConfig: ChartConfiguration = {
            type: 'bar',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Gespartes Geld in Euro',
                    data: chartData.data,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Geld in Euro'
                        },
                        ticks: {
                            stepSize: 50
                        }
                    },
                    x: {
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

    // Diagramm bauen

    onMount(() => {
        const ctx = (document.getElementById('myChart') as HTMLCanvasElement)?.getContext('2d');

        if(ctx){
            chart = new Chart(ctx, chartConfig);
            chart.options.scales.y.max = 600;
            chart.update();
        }
    })

    // Diagramm zerstören
    import { onDestroy } from 'svelte';
    onDestroy(() => {
        if (chart) {
            chart.destroy();
        }
    });
    
</script>

<div style="position: relative; height: 40vh; width: 80vw; margin: auto;">
    <canvas id="myChart"></canvas>
</div>