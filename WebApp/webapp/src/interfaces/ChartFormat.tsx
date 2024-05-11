// These interfaces are used to accomodate the ChartJS library

/**
 * The interface for datasets used for the individual lines in a line graph
 */
interface Datasets {
    label: string,
    backgroundColor: string,
    borderColor: string,
    data: number[]
}

/**
 * The interface for the whole chart that includes the x axis labels and the data
 */
export interface ChartFormat {
    labels: string[],
    datasets: Datasets[]
}