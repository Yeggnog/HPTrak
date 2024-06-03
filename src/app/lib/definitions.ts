// custom types for handling scenario and healthbar blocks

export type Scenario = {
    id: string,
    name: string,
    barCount: number
    //bars: string[]
}

export type Bar = {
    id: string,
    scenarioId: string,
    name: string,
    maxValue: number,
    defaultValue: number,
    segmented: boolean,
    color: ColorBlock,
    increment: number
}

export type ColorBlock = {
    name: string,
    fillColor: string,
    bgColor: string,
    hiddenTextColor: string
}
