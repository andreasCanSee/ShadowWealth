export type ChartData = {
    labels: string[];
    data: number[];
  };

const labels = ['1 Jahr', '2 Jahre', '3 Jahre', '4 Jahre', '5 Jahre'];
const data = [500, 500, 500, 500, 500];

const chartData: ChartData = {
    labels,
    data,
};
  
export default chartData;
