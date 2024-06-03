import {Scenario} from "../lib/definitions";
import {useState, useEffect} from "react";

// currently uses UUID v4 due to not needing v7 features
function generateUUID(){
    var uuid = self.crypto.randomUUID();
    console.log('Generated uuid '+uuid);
    return uuid;
}

export default function CreateScenarioForm(props : {onFinalize : (newScenData : Scenario) => void, onCancel : () => void, isVisible: boolean, forDesktop: boolean}){
    const [workingId, updateId] = useState('Dummy');
    const [workingName, updateName] = useState('Character A');

    useEffect(() => {
        if(props.isVisible){
            // only generate the uuid once per activation
            updateId(generateUUID());
        }
    }, [props.isVisible]);

    var workingScen = {
        id: workingId,
        name: workingName,
        barCount: 0
    }

    const onNameChange = (event : React.ChangeEvent) => {
        if(event.target == null){
            throw Error('Internal form error.');
        }
        var targetElem = event.target as HTMLInputElement;
        updateName(prev => targetElem.value);
    }

    var formContent = (
        <form onSubmit={() => {props.onFinalize(workingScen)}} method='dialog'>
            <div className='flex flex-col'>
                <label htmlFor='barName' className='text-slate-200'>Name</label>
                <input id='barName' type='text' onChange={onNameChange} className='bg-stone-800 text-slate-200' value={workingName}></input>
            </div><br />

            <div className='flex flex-row'>
                <button type='submit' className='grow bg-slate-800 text-slate-200 mx-2'>Create Bar</button><br />
                <button className='grow bg-slate-800 text-slate-200 mx-2' onClick={props.onCancel} formNoValidate>Cancel</button><br />
            </div>
        </form>
    );

    // dynamically make it a modal or a sidebar depending on format
    return (props.forDesktop) ? (
        <div id="createModalDsk" className={`tw-dark flex flex-col bg-slate-700 m-2 ${(props.isVisible) ? 'block' : 'hidden'}`}>
            {formContent}
        </div>
    ) : (
        <dialog id="createModal" className={`tw-dark flex flex-col bg-slate-700 m-2 ${(props.isVisible) ? 'block' : 'hidden'}`}>
            {formContent}
        </dialog>
    );
}