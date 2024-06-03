'use client'

import {Bar, ColorBlock} from '@/app/lib/definitions';
import {useState} from 'react';

export function BarList(props : {bars : Bar[], onSelect : (bar : Bar) => void}){
    return (props.bars.length > 0) ? (
        <div className='flex flex-col'>
            {props.bars.map((bar : Bar) => (
                <BarCard key={bar.id} barData={bar} onSelect={props.onSelect} />
            ))}
        </div>
    ) : (
        <p>This scenario has no bars... yet.</p>
    );
}

export function BarCard(props : {barData : Bar, onSelect : (bar: Bar) => void}){
    const [barValue, setBarValue] = useState(props.barData.defaultValue);

    const decrement = () => {
        setBarValue(prev => Math.max(prev - props.barData.increment, 0));
    }
    const empty = () => {
        setBarValue(prev => 0);
    }
    const fill = () => {
        setBarValue(prev => props.barData.maxValue);
    }
    const increment = () => {
        setBarValue(prev => Math.min(prev + props.barData.increment, props.barData.maxValue));
    }
    const selectCard = (event : React.MouseEvent) => {
        props.onSelect(props.barData);
    }

    return (
        <div className='flex flex-col p-4 md:p-8 m-2 md:m-4 bg-slate-700'>
            <div className='flex flex-row'>
                <h2 className='grow mx-2 w-5/6'>{props.barData.name}</h2>
                <button className='grow bg-slate-800 text-slate-200 mx-2 w-1/6' onClick={selectCard}>Edit</button>
            </div>
            <BarDisplay barData={props.barData} barValue={barValue} />
            <p>{barValue}/{props.barData.maxValue}</p>
            <div className='flex flex-row'>
                <button id='incrementDown' className='grow bg-stone-800 mx-2' onClick={decrement}>Decrement</button>
                <button id='emptyBar' className='grow bg-stone-800 mx-2' onClick={empty}>Empty</button>
                <button id='fillBar' className='grow bg-stone-800 mx-2' onClick={fill}>Fill</button>
                <button id='incrementUp' className='grow bg-stone-800 mx-2' onClick={increment}>Increment</button>
            </div>
        </div>
    );
}

export function BarDisplay(props : { barData : Bar, barValue: number }) {
    var segments = []
    for(var i=0; i<props.barData.maxValue; i++){
        segments.push(
            <div className={`grow ${(props.barData.segmented) ? 'border-2  border-stone-200' : ''} ${(i < props.barValue) ? props.barData.color.fillColor : props.barData.color.bgColor}`}></div>
        );
    }

    return (
        <div className={`h-8 flex flex-row ${(props.barData.segmented) ? '' : 'border-2  border-stone-200'}`}>{segments}</div>
    );
}