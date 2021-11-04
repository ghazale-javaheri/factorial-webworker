import {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.css'

const worker = new Worker('/factor.worker.js');

const App = () => {
    // States
    const [number, setNumber] = useState('');
    const [numberList, setNumberList] = useState([]);
    const [saved_list, setSavedLsit] = useState([]);
    const [progress, setProgress] = useState(0);
    // Callbacks
    const addNumberList = () => {
        const numberToAdd = +number
        if (Number.isFinite(numberToAdd)) {
            setNumberList([...numberList, numberToAdd])
            setNumber('');
            worker.postMessage({ type: 'UPDATE', payload: numberToAdd });
        }
    }

    useEffect(() => {
        const listener = ({ data: { type, payload } }) => {
            console.log(type, payload, type === 'UPDATE_SUCCESS');
            if (type === 'UPDATE_SUCCESS'){
                setSavedLsit(l=>[...l, payload ]) ;
            }
            if (type === 'UPDATE_Progress'){
                setProgress(payload)
            }

        };
        worker.addEventListener('message', listener);
        return () => worker.removeEventListener('message', listener);
    }, [number]);

    return (
        <div>
            <h1 className={styles.appTitle}>
                Factorial!
            </h1>
            <br />
            <label htmlFor="number">Enter a number from 0 to 9999</label>
            <input
                className={styles.numberInput}
                type="text"
                id="number"
                value={number}
                onChange={(event) => {
                    let v=event.target.value.replace(/[^\d]/, '').slice(0, 4)
                    setNumber(v)
                }}
            />
            <br />
            <button disabled={number.length === 0} onClick={addNumberList}>Add For Calculation</button>
            <hr />
            <h2>Output</h2>
            <ul>
                {numberList.map(
                    (num, index) => <li key={index} className={styles.listItem}>
                        <strong>Result of {num}! is:</strong>
                        <br />
                        <code>{saved_list?.[index]? saved_list?.[index].slice(0, 200)+'...': 'loading...'}</code>
                        {saved_list?.[index] ?<button className={styles.smallButton} onClick={() => {
                            navigator.clipboard.writeText(saved_list?.[index])
                        }}>Copy</button>
                            : <progress id="file" max="100" value={progress[num] ? progress[num] :0}> 70% </progress>

                        }
                    </li>
                )}
            </ul>
        </div>
    );
}

export default App;
