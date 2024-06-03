import {Scenario} from "../lib/definitions";
import {useState, useEffect} from "react";

export default function CreateScenarioForm(props : {state: Scenario, onFinalize : (newScenData : Scenario) => void, onCancel : () => void, onDelete : () => void, isVisible: boolean, forDesktop: boolean}){
    const [workingName, updateName] = useState(props.state.name);

    useEffect(() => {
        updateName(prev => props.state.name);
    }, [props.state]);

    var workingScen = {
        id: props.state.id,
        name: workingName,
        barCount: props.state.barCount
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
                <button type='submit' className='grow bg-slate-800 text-slate-200 mx-2'>Save Changes</button><br />
                <button className='grow bg-slate-800 text-slate-200 mx-2' onClick={props.onDelete} formNoValidate>Delete</button><br />
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