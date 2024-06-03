import {Scenario, Bar} from '@/app/lib/definitions';
import {scenarios, bars} from './test_data.js';

export async function fetchScenarios() {
    console.log('Fetching all scenario data...');
    return scenarios;
}

export async function fetchScenario(scenarioId : string) {
    console.log('Fetching specific scenario data...');
    var selectedScenario  = {} as Scenario;
    for(var i=0; i<scenarios.length; i++){
        var scen = scenarios[i];
        if(scen.id == scenarioId){
            selectedScenario = scen;
            return selectedScenario;
        }
    }
    throw new Error('Scenario not found.');
}

// TODO: This should be a server action
export async function fetchBars(scenarioId : string) {
    console.log('Fetching bar data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // get the selected scenario (if it exists)
    try {
        var selectedScenario = await fetchScenario(scenarioId);
    } catch(error) {
        console.error(error);
        return [];
    }
    
    // source bars from the scenario
    return bars.filter((bar : Bar) => {return bar.scenarioId == scenarioId});
}
