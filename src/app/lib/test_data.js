import { colorOptions } from "./color_options";

export const scenarios = [
    {
        id: '4E333-E6207AD',
        name: "Lizard Wizard",
        barCount: 3
        //bars: ['B64A9-5AF1B6F', '43C58-B7E0BAD', '37E47-1D83ECC']
    },
    {
        id: '3024F-4D17AF1',
        name: "Battle on the Big Bridge",
        barCount: 6
        //bars: ['0AE55-1CA5482', '35A05-B2AD08E', 'E62F8-7F03C9C', 'F8E84-4A3DAFB', 'AEF95-6C62959', '2C0B7-19D6DDD']
    },
    {
        id: '9C550-E80B2EC',
        name: "Dueling Mechanics Test",
        barCount: 2
        //bars: ['7BD4D-3EFB240', 'EBE41-CB7F460']
    }
];

export const bars = [
    {
        id: 'B64A9-5AF1B6F',
        scenarioId: '4E333-E6207AD',
        name: "Health",
        maxValue: 20,
        defaultValue: 20,
        segmented: false,
        color: colorOptions.red,
        increment: 5
    },
    {
        id: '43C58-B7E0BAD',
        scenarioId: '4E333-E6207AD',
        name: "Spell Slots",
        maxValue: 16,
        defaultValue: 13,
        segmented: true,
        color: colorOptions.blueGreen,
        increment: 1
    },
    {
        id: '37E47-1D83ECC',
        scenarioId: '4E333-E6207AD',
        name: "Ki Points",
        maxValue: 5,
        defaultValue: 2,
        segmented: true,
        color: colorOptions.blue,
        increment: 1
    },
    {
        id: '0AE55-1CA5482',
        scenarioId: '3024F-4D17AF1',
        name: "Ari",
        maxValue: 30,
        defaultValue: 30,
        segmented: false,
        color: colorOptions.purple,
        increment: 5
    },
    {
        id: '35A05-B2AD08E',
        scenarioId: '3024F-4D17AF1',
        name: "Tana",
        maxValue: 20,
        defaultValue: 20,
        segmented: false,
        color: colorOptions.purple,
        increment: 5
    },
    {
        id: 'E62F8-7F03C9C',
        scenarioId: '3024F-4D17AF1',
        name: "Iban",
        maxValue: 40,
        defaultValue: 40,
        segmented: false,
        color: colorOptions.purple,
        increment: 5
    },
    {
        id: 'F8E84-4A3DAFB',
        scenarioId: '3024F-4D17AF1',
        name: "Gale",
        maxValue: 80,
        defaultValue: 80,
        segmented: false,
        color: colorOptions.green,
        increment: 5
    },
    {
        id: 'AEF95-6C62959',
        scenarioId: '3024F-4D17AF1',
        name: "Artoria",
        maxValue: 60,
        defaultValue: 60,
        segmented: false,
        color: colorOptions.green,
        increment: 5
    },
    {
        id: '2C0B7-19D6DDD',
        scenarioId: '3024F-4D17AF1',
        name: "Lance",
        maxValue: 30,
        defaultValue: 30,
        segmented: false,
        color: colorOptions.green,
        increment: 5
    },
    {
        id: '7BD4D-3EFB240',
        scenarioId: '9C550-E80B2EC',
        name: "Ari",
        maxValue: 30,
        defaultValue: 30,
        segmented: false,
        color: colorOptions.green,
        increment: 5
    },
    {
        id: 'EBE41-CB7F460',
        scenarioId: '9C550-E80B2EC',
        name: "Artoria",
        maxValue: 60,
        defaultValue: 60,
        segmented: false,
        color: colorOptions.green,
        increment: 5
    }
];