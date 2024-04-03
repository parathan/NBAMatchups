interface Datasets {
    label: string,
    backgroundColor: string,
    borderColor: string,
    data: number[]
}

export interface ChartFormat {
    labels: string[],
    datasets: Datasets[]
}

