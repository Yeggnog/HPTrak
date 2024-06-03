'use client'

import Link from 'next/link';
import {Scenario} from '@/app/lib/definitions';
import {useState} from 'react';
import CreateScenarioForm from '@/app/ui/CreateScenarioForm';
import EditScenarioForm from '@/app/ui/EditScenarioForm';

export default function ScenarioList(props : {scenarios : Scenario[]}){
    const [createVisible, updateCreateVisibility] = useState(false);
    const [editVisible, updateEditVisibility] = useState(false);
    const [workingScenarios, updateScenarios] = useState(props.scenarios);
    const [selectedScen, updateSelected] = useState(props.scenarios[0]);

    const openCreateModal = () => {
        if(editVisible){
            updateEditVisibility(prev => false);
        }
        updateCreateVisibility(prev => true);
    }
    const closeCreateModal = () => {
        updateCreateVisibility(prev => false);
    }
    const onSubmitCreateForm = (formScen : Scenario) => {
        createScenario(formScen);
        closeCreateModal();
    }

    const openEditModal = () => {
        if(createVisible){
            updateCreateVisibility(prev => false);
        }
        updateEditVisibility(prev => true);
    }
    const closeEditModal = () => {
        updateEditVisibility(prev => false);
    }
    const onSubmitEditForm = (formScen : Scenario) => {
        editScenario(formScen);
        closeEditModal();
    }

    const selectScenario = (scen : Scenario) => {
        updateSelected(scen);
        openEditModal();
    }
    const createScenario = (newScen : Scenario) => {
        // validate and add to array
        var postAppend = workingScenarios;
        postAppend.push(newScen);
        updateScenarios(prev => postAppend);
    }
    const editScenario = (newScen : Scenario) => {
        // validate and find bar
        var barIndex = findScenario(newScen);
        if(barIndex == -1){
            console.error('Could not find the selected scenario.');
        }else{
            var postEdit = workingScenarios;
            postEdit[barIndex] = newScen;
            updateScenarios(prev => postEdit);
        }
    }
    function findScenario(bar : Scenario){
        for(var i=0; i<workingScenarios.length; i++){
            var foundBar = workingScenarios[i];
            if(foundBar.id == bar.id){
                return i;
            }
        }
        return -1;
    }
    const onDeleteBar = () => {
         // validate and find bar
         var barIndex = findScenario(selectedScen);
         if(barIndex == -1){
             console.error('Could not find the selected scenario.');
         }else{
             updateScenarios(prev => {
                var result = prev.filter((item) => {return item.id != selectedScen.id});
                console.log(result);
                return result;
            });
         }
    }

    return (
        <div className="flex flex-col min-h-screen items-left">
            <div className='flex flex-col bg-slate-900 m-2 md:hidden'>
                <CreateScenarioForm onFinalize={onSubmitCreateForm} onCancel={closeCreateModal} isVisible={createVisible} forDesktop={false} />
                <EditScenarioForm state={selectedScen} onFinalize={onSubmitEditForm} onCancel={closeEditModal} onDelete={onDeleteBar} isVisible={editVisible} forDesktop={false} />
            </div>
            <button id='createScenario' onClick={openCreateModal} className='bg-stone-800 mx-2 h-8'>New Scenario</button>
            <div className='grow h-5/6 flex flex-row'>
                <div className='flex flex-col bg-slate-900 m-2'>
                    {(workingScenarios.length > 0) ?
                    (workingScenarios.map((scenario : Scenario) => (
                        <ScenarioCard scenario={scenario} onSelect={selectScenario} />
                    ))) :
                    (<p>You haven't created any scenarios... yet.</p>)
                    }
                </div>
                <div className='flex flex-col bg-slate-900 m-2 hidden md:block'>
                    <CreateScenarioForm onFinalize={onSubmitCreateForm} onCancel={closeCreateModal} isVisible={createVisible} forDesktop={true} />
                    <EditScenarioForm state={selectedScen} onFinalize={onSubmitEditForm} onCancel={closeEditModal} onDelete={onDeleteBar} isVisible={editVisible} forDesktop={true} />
                </div>
            </div>
        </div>
    );
}

export function ScenarioCard(props : {scenario : Scenario, onSelect : (scenario : Scenario) => void}){
    const selectCard = (event : React.MouseEvent) => {
        props.onSelect(props.scenario);
    }

    return (
        <div
        key = {props.scenario.name}
        className='m-2 bg-stone-800'
        >
            <div className='flex flex-row m-2'>
                <Link href = {`scenario/${props.scenario.id}`} className='grow m-2'>{props.scenario.name}</Link>
                <button id={`editScen${props.scenario.id}`} onClick={selectCard} className='grow m-2 bg-stone-600'>Edit</button>
            </div>
            <h2>{props.scenario.barCount} Bars</h2>
        </div>
    );
}