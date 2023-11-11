import React, {useCallback, useState} from 'react';
import './App.css';
import Counter from "./components/Counter/Counter";
import Settings from "./components/Settings/Settings";

function App() {
    const [maxValue, setMaxValue] = useState<number>(() => {
        const localStorageValue = localStorage.getItem("maxValue")
        return localStorageValue ? +JSON.parse(localStorageValue) : 5;
    })
    const [startValue, setStartValue] = useState<number>(() => {
        const localStorageValue = localStorage.getItem("startValue")
        return localStorageValue ? +JSON.parse(localStorageValue) : 0;
    })
    const [editMode, setEditMode] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const setErrorHandler = useCallback((errorType:string) => {
        setError(errorType)
    },[setError])
    const setEditModeHandler = useCallback(() => {
        setEditMode(!editMode)
    },[editMode])
    const setMaxValueHandler = useCallback((maxValue:number) => {
        localStorage.setItem("maxValue",JSON.stringify(maxValue))
        setMaxValue(maxValue)
    },[setMaxValue])
    const setStartValueHandler = useCallback((startValue:number) => {
        localStorage.setItem("startValue",JSON.stringify(startValue))
        setStartValue(startValue)
    },[setStartValue])
    return <div className="App">
        {editMode
            ? <Settings startValue={startValue}
                        setStartValue={setStartValueHandler}
                        maxValue={maxValue}
                        setMaxValue={setMaxValueHandler}
                        error={error}
                        setError={setErrorHandler}
                        setEditMode={setEditModeHandler}
            />
            : <Counter startValue={startValue}
                       maxValue={maxValue}
                       error={error}
                       setError={setErrorHandler}
                       setEditMode={setEditModeHandler}
            />
        }
    </div>
}


export default App;
