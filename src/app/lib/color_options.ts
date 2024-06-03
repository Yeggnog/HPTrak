import { ColorBlock } from "./definitions";

// define all the color options and classes in one place
export const colorOptions = {
    red: {
        name: 'Red',
        fillColor: 'bg-red-600',
        bgColor: 'bg-red-900',
        hiddenTextColor: 'text-red-600'
    } as ColorBlock,

    green: {
        name: 'Green',
        fillColor: 'bg-green-500',
        bgColor: 'bg-emerald-900',
        hiddenTextColor: 'text-green-500'
    } as ColorBlock,

    blue: {
        name: 'Blue',
        fillColor: 'bg-sky-500',
        bgColor: 'bg-blue-900',
        hiddenTextColor: 'text-sky-500'
    } as ColorBlock,

    orange: {
        name: 'Orange',
        fillColor: 'bg-orange-500',
        bgColor: 'bg-orange-900',
        hiddenTextColor: 'text-orange-500'
    } as ColorBlock,

    purple: {
        name: 'Purple',
        fillColor: 'bg-purple-500',
        bgColor: 'bg-violet-900',
        hiddenTextColor: 'text-purple-500'
    } as ColorBlock,

    yellow: {
        name: 'Yellow',
        fillColor: 'bg-yellow-300',
        bgColor: 'bg-amber-900',
        hiddenTextColor: 'text-yellow-300'
    } as ColorBlock,

    grey: {
        name: 'Grey',
        fillColor: 'bg-slate-400',
        bgColor: 'bg-slate-700',
        hiddenTextColor: 'text-slate-400'
    } as ColorBlock,

    blueGreen: {
        name: 'Blue Green',
        fillColor: 'bg-teal-400',
        bgColor: 'bg-teal-900',
        hiddenTextColor: 'text-teal-400'
    } as ColorBlock,

    lime: {
        name: 'Lime',
        fillColor: 'bg-lime-400',
        bgColor: 'bg-lime-900',
        hiddenTextColor: 'text-lime-400'
    } as ColorBlock,

    blueGrey: {
        name: 'Blue Grey',
        fillColor: 'bg-blue-300',
        bgColor: 'bg-sky-800',
        hiddenTextColor: 'text-blue-300'
    } as ColorBlock,

    teal: {
        name: 'Teal',
        fillColor: 'bg-cyan-400',
        bgColor: 'bg-sky-900',
        hiddenTextColor: 'text-cyan-400'
    } as ColorBlock,

    pink: {
        name: 'Pink',
        fillColor: 'bg-fuchsia-400',
        bgColor: 'bg-fuchsia-900',
        hiddenTextColor: 'text-fuchsia-400'
    } as ColorBlock,
}

export const colorList = [
    colorOptions.red,
    colorOptions.green,
    colorOptions.blue,
    colorOptions.orange,
    colorOptions.purple,
    colorOptions.yellow,
    colorOptions.grey,
    colorOptions.blueGreen,
    colorOptions.lime,
    colorOptions.blueGrey,
    colorOptions.teal,
    colorOptions.pink
] as ColorBlock[];
