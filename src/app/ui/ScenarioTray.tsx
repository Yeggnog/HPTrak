'use client'

import {Bar, Scenario} from '@/app/lib/definitions';
import {BarList} from '@/app/ui/BarDisplay';
import CreateForm from '@/app/ui/CreateForm';
import {CreateFormDesktop} from '@/app/ui/CreateForm';
import EditForm from '@/app/ui/EditForm';
import {EditFormDesktop} from '@/app/ui/EditForm';
import {useState} from 'react';

export default function ScenarioTray(props: {id: string, scenario : Scenario, bars : Bar[]}){
    const [createVisible, updateCreateVisibility] = useState(false);
    const [editVisible, updateEditVisibility] = useState(false);
    const [workingBars, updateBars] = useState(props.bars);
    const [selectedBar, updateSelected] = useState(props.bars[0]);

    const openCreateModal = () => {
        if(editVisible){
            updateEditVisibility(prev => false);
        }
        updateCreateVisibility(prev => true);
    }
    const closeCreateModal = () => {
        updateCreateVisibility(prev => false);
    }
    const onSubmitCreateForm = (formBar : Bar) => {
        createBar(formBar);
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
    const onSubmitEditForm = (formBar : Bar) => {
        editBar(formBar);
        closeEditModal();
    }

    const selectBar = (bar : Bar) => {
        updateSelected(bar);
        openEditModal();
    }
    const createBar = (newBar : Bar) => {
        // validate and add to array
        var postAppend = workingBars;
        postAppend.push(newBar);
        updateBars(prev => postAppend);
    }
    const editBar = (newBar : Bar) => {
        // validate and find bar
        var barIndex = findBar(newBar);
        if(barIndex == -1){
            console.error('Could not find the selected bar.');
        }else{
            var postEdit = workingBars;
            postEdit[barIndex] = newBar;
            updateBars(prev => postEdit);
        }
    }
    function findBar(bar : Bar){
        for(var i=0; i<workingBars.length; i++){
            var foundBar = workingBars[i];
            if(foundBar.id == bar.id){
                return i;
            }
        }
        return -1;
    }
    const onDeleteBar = () => {
         // validate and find bar
         var barIndex = findBar(selectedBar);
         if(barIndex == -1){
             console.error('Could not find the selected bar.');
         }else{
             //updateSelected(prev => workingBars[Math.max(barIndex-1, 0)]);
             updateBars(prev => {
                var result = prev.filter((item) => {return item.id != selectedBar.id});
                console.log(result);
                return result;
            });
         }
    }


    // TODO: Add / Edit functionality is still being weird
    return (
        <>
        <div className='flex flex-col bg-slate-900 m-2 md:hidden'>
            <CreateForm scenarioId={props.id} onFinalize={onSubmitCreateForm} onCancel={closeCreateModal} isVisible={createVisible} />
            <EditForm state={selectedBar} scenarioId={props.id} onFinalize={onSubmitEditForm} onCancel={closeEditModal} onDelete={onDeleteBar} isVisible={editVisible} />
        </div>

        <div className='flex flex-row'>
            <div className='flex flex-col bg-slate-900 m-2 md:w-1/2'>
                <h1>{props.scenario.name}</h1>
                <div className='flex flex-row'>
                    <button id='createButton' className='grow bg-stone-800 mx-2' onClick={openCreateModal}>New Bar</button>
                </div>
                <BarList bars={workingBars} onSelect={selectBar} />
            </div>

            <div className='flex flex-col bg-slate-900 m-2 hidden md:block'>
                <CreateFormDesktop scenarioId={props.id} onFinalize={onSubmitCreateForm} onCancel={closeCreateModal} isVisible={createVisible} />
                <EditFormDesktop state={selectedBar} scenarioId={props.id} onFinalize={onSubmitEditForm} onCancel={closeEditModal} onDelete={onDeleteBar} isVisible={editVisible} />
            </div>
        </div>
        </>
    );
}