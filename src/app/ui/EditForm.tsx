'use client'

import {Bar, ColorBlock} from '@/app/lib/definitions';
import {BarDisplay} from '@/app/ui/BarDisplay';
import {useState, useEffect} from 'react';
import {colorList} from '@/app/lib/color_options';

export default function EditForm(props: {state : Bar, scenarioId : string, onFinalize : (newBarData : Bar) => void, onCancel : () => void, onDelete : () => void, isVisible: boolean}) {
    const [workingName, updateName] = useState(props.state.name);
    const [workingDefault, updateDefault] = useState(props.state.defaultValue);
    const [workingMax, updateMax] = useState(props.state.maxValue);
    const [workingColor, updateColor] = useState(props.state.color);
    const [workingSegmented, updateSegmented] = useState(props.state.segmented);
    const [workingIncrement, updateIncrement] = useState(props.state.increment);

    useEffect(() => {
        updateName(prev => props.state.name);
        updateDefault(prev => props.state.defaultValue);
        updateMax(prev => props.state.maxValue);
        updateColor(prev => props.state.color);
        updateSegmented(prev => props.state.segmented);
        updateIncrement(prev => props.state.increment);
    }, [props.state]);

    var workingBar = {
        id: props.state.id,
        scenarioId : props.scenarioId,
        name: workingName,
        defaultValue: workingDefault,
        maxValue: workingMax,
        color: workingColor,
        segmented: workingSegmented,
        increment: workingIncrement
    }


    const onNameChange = (event : React.ChangeEvent) => {
        if(event.target == null){
            throw Error('Internal form error.');
        }
        var targetElem = event.target as HTMLInputElement;
        if(Number.isNaN(targetElem.value)){
            throw Error('Please input a number.');
        }
        updateName(prev => targetElem.value);
    }

    const onDefValChange = (event : React.ChangeEvent) => {
        if(event.target == null){
            throw Error('Internal form error.');
        }
        var targetElem = event.target as HTMLInputElement;
        if(Number.isNaN(targetElem.value)){
            throw Error('Please input a number.');
        }
        updateDefault(prev => Number(targetElem.value));
    }

    const onMaxValChange = (event : React.ChangeEvent) => {
        if(event.target == null){
            throw Error('Internal form error.');
        }
        var targetElem = event.target as HTMLInputElement;
        if(Number.isNaN(targetElem.value)){
            throw Error('Please input a positive number.');
        }
        updateMax(prev => Number(targetElem.value));
    }

    const onColorChange = (event : React.MouseEvent) => {
        if(event.target == null){
            throw Error('Internal form error.');
        }
        var targetElem = event.target as HTMLInputElement;

        // find the selected color block
        var targetColor = {} as ColorBlock;
        var findResult = colorList.find((item) => {return (item.name === targetElem.value)});
        if(findResult == undefined){
            return
        }else{
            targetColor = findResult as ColorBlock;
        }
        
        updateColor(prev => targetColor);
    }

    const onSegChange = (event : React.MouseEvent) => {
        if(event.target == null){
            throw Error('Internal form error.');
        }
        var targetElem = event.target as HTMLInputElement;
        updateSegmented(prevBarState => targetElem.checked);
    }

    const onIncrementChange = (event : React.ChangeEvent) => {
        if(event.target == null){
            throw Error('Internal form error.');
        }
        var targetElem = event.target as HTMLInputElement;
        if(Number.isNaN(targetElem.value)){
            throw Error('Please input a positive number.');
        }
        updateIncrement(prev => Number(targetElem.value));
    }

    return (
        <dialog id="editModal" className={`tw-dark flex flex-col bg-slate-700 m-2 ${(props.isVisible) ? 'block' : 'hidden'}`}>
            <BarDisplay barData={workingBar} barValue={workingDefault} />

            <form onSubmit={() => {props.onFinalize(workingBar)}} method='dialog'>
                <div className='flex flex-col'>
                    <label htmlFor='barName' className='text-slate-200'>Name</label>
                    <input id='barName' type='text' onChange={onNameChange} className='bg-stone-800 text-slate-200' value={workingName}></input>
                </div><br />

                <div className='flex flex-row px-2'>
                    <div className='flex flex-col'>
                        <label htmlFor='defaultVal' className='text-slate-200 mx-2'>Default Value</label>
                        <input id='defaultVal' type='number' onChange={onDefValChange} className='bg-stone-800 text-slate-200' value={workingDefault}></input>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='maxVal' className='text-slate-200 mx-2'>Maximum Value</label>
                        <input id='maxVal' type='number' onChange={onMaxValChange} className='bg-stone-800 text-slate-200' value={workingMax}></input>
                    </div>
                </div><br />

                <input id='segmented' type='checkbox' defaultChecked={workingSegmented} onClick={onSegChange}></input>
                <label htmlFor='segmented' className='text-slate-200'>Segmented</label><br />
                
                <label htmlFor='colorOptions' className='text-slate-200'>Color</label>
                <div id='colorOptions' className='grid grid-cols-4 md:grid-cols-6 p-2'>
                    {colorList.map((option : ColorBlock) => {
                        return <>
                            <input type='radio' className='sr-only' id={`edit${option.name}`} value={option.name} key={option.name} onClick={onColorChange}></input>
                            <label htmlFor={`edit${option.name}`} className={`w-20 h-20 m-2 border-2 border-stone-200 ${option.fillColor} ${option.hiddenTextColor} ${(option.name === workingColor.name) ? 'border-2 border-stone-200' : ''}`}>{option.name}</label>
                        </>
                    })}
                </div><br />

                <div className='flex flex-col'>
                <label htmlFor='increm' className='text-slate-200'>Increment</label>
                <input id='increm' type='number' onChange={onIncrementChange} className='bg-stone-800 text-slate-200' value={workingIncrement}></input>
                </div><br />

                <div className='flex flex-row'>
                    <button type='submit' className='grow bg-slate-800 text-slate-200 mx-2'>Save Changes</button><br />
                    <button className='grow bg-slate-800 text-slate-200 mx-2' onClick={props.onDelete} formNoValidate>Delete</button><br />
                    <button className='grow bg-slate-800 text-slate-200 mx-2' onClick={props.onCancel} formNoValidate>Cancel</button><br />
                </div>
            </form>
        </dialog>
    );
}

export function EditFormDesktop(props: {state : Bar, scenarioId : string, onFinalize : (newBarData : Bar) => void, onCancel : () => void, onDelete : () => void, isVisible: boolean}) {
    const [workingName, updateName] = useState(props.state.name);
    const [workingDefault, updateDefault] = useState(props.state.defaultValue);
    const [workingMax, updateMax] = useState(props.state.maxValue);
    const [workingColor, updateColor] = useState(props.state.color);
    const [workingSegmented, updateSegmented] = useState(props.state.segmented);
    const [workingIncrement, updateIncrement] = useState(props.state.increment);

    useEffect(() => {
        updateName(prev => props.state.name);
        updateDefault(prev => props.state.defaultValue);
        updateMax(prev => props.state.maxValue);
        updateColor(prev => props.state.color);
        updateSegmented(prev => props.state.segmented);
        updateIncrement(prev => props.state.increment);
    }, [props.state]);

    var workingBar = {
        id: props.state.id,
        scenarioId : props.scenarioId,
        name: workingName,
        defaultValue: workingDefault,
        maxValue: workingMax,
        color: workingColor,
        segmented: workingSegmented,
        increment: workingIncrement
    }


    const onNameChange = (event : React.ChangeEvent) => {
        if(event.target == null){
            throw Error('Internal form error.');
        }
        var targetElem = event.target as HTMLInputElement;
        if(Number.isNaN(targetElem.value)){
            throw Error('Please input a number.');
        }
        updateName(prev => targetElem.value);
    }

    const onDefValChange = (event : React.ChangeEvent) => {
        if(event.target == null){
            throw Error('Internal form error.');
        }
        var targetElem = event.target as HTMLInputElement;
        if(Number.isNaN(targetElem.value)){
            throw Error('Please input a number.');
        }
        updateDefault(prev => Number(targetElem.value));
    }

    const onMaxValChange = (event : React.ChangeEvent) => {
        if(event.target == null){
            throw Error('Internal form error.');
        }
        var targetElem = event.target as HTMLInputElement;
        if(Number.isNaN(targetElem.value)){
            throw Error('Please input a positive number.');
        }
        updateMax(prev => Number(targetElem.value));
    }

    const onColorChange = (event : React.MouseEvent) => {
        if(event.target == null){
            throw Error('Internal form error.');
        }
        var targetElem = event.target as HTMLInputElement;

        // find the selected color block
        var targetColor = {} as ColorBlock;
        var findResult = colorList.find((item) => {return (item.name === targetElem.value)});
        if(findResult == undefined){
            return
        }else{
            targetColor = findResult as ColorBlock;
        }
        
        updateColor(prev => targetColor);
    }

    const onSegChange = (event : React.MouseEvent) => {
        if(event.target == null){
            throw Error('Internal form error.');
        }
        var targetElem = event.target as HTMLInputElement;
        updateSegmented(prevBarState => targetElem.checked);
    }

    const onIncrementChange = (event : React.ChangeEvent) => {
        if(event.target == null){
            throw Error('Internal form error.');
        }
        var targetElem = event.target as HTMLInputElement;
        if(Number.isNaN(targetElem.value)){
            throw Error('Please input a positive number.');
        }
        updateIncrement(prev => Number(targetElem.value));
    }

    return (
        <div id="editModalDsk" className={`tw-dark flex flex-col bg-slate-700 m-2 ${(props.isVisible) ? 'block' : 'hidden'}`}>
            <BarDisplay barData={workingBar} barValue={workingDefault} />

            <form onSubmit={() => {props.onFinalize(workingBar)}} method='dialog'>
                <div className='flex flex-col'>
                    <label htmlFor='barNameDsk' className='text-slate-200'>Name</label>
                    <input id='barNameDsk' type='text' onChange={onNameChange} className='bg-stone-800 text-slate-200' value={workingName}></input>
                </div><br />

                <div className='flex flex-row px-2'>
                    <div className='flex flex-col'>
                        <label htmlFor='defaultValDsk' className='text-slate-200 mx-2'>Default Value</label>
                        <input id='defaultValDsk' type='number' onChange={onDefValChange} className='bg-stone-800 text-slate-200' value={workingDefault}></input>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='maxValDsk' className='text-slate-200 mx-2'>Maximum Value</label>
                        <input id='maxValDsk' type='number' onChange={onMaxValChange} className='bg-stone-800 text-slate-200' value={workingMax}></input>
                    </div>
                </div><br />

                <input id='segmentedDsk' type='checkbox' defaultChecked={workingSegmented} onClick={onSegChange}></input>
                <label htmlFor='segmentedDsk' className='text-slate-200'>Segmented</label><br />
                
                <label htmlFor='colorOptionsDsk' className='text-slate-200'>Color</label>
                <div id='Dsk' className='grid grid-cols-4 md:grid-cols-6 p-2'>
                    {colorList.map((option : ColorBlock) => {
                        return <>
                            <input type='radio' className='sr-only' id={`edit${option.name}Dsk`} value={option.name} key={option.name} onClick={onColorChange}></input>
                            <label htmlFor={`edit${option.name}Dsk`} className={`w-20 h-20 m-2 border-2 border-stone-200 ${option.fillColor} ${option.hiddenTextColor} ${(option.name === workingColor.name) ? 'border-2 border-stone-200' : ''}`}>{option.name}</label>
                        </>
                    })}
                </div><br />

                <div className='flex flex-col'>
                <label htmlFor='incremDsk' className='text-slate-200'>Increment</label>
                <input id='incremDsk' type='number' onChange={onIncrementChange} className='bg-stone-800 text-slate-200' value={workingIncrement}></input>
                </div><br />

                <div className='flex flex-row'>
                    <button type='submit' className='grow bg-slate-800 text-slate-200 mx-2'>Save Changes</button><br />
                    <button className='grow bg-slate-800 text-slate-200 mx-2' onClick={props.onDelete} formNoValidate>Delete</button><br />
                    <button className='grow bg-slate-800 text-slate-200 mx-2' onClick={props.onCancel} formNoValidate>Cancel</button><br />
                </div>
            </form>
        </div>
    );
}