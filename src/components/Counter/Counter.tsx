import React, {useCallback, useEffect, useState} from 'react';
import SuperButton from "../Common/SuperButton/SuperButton";
import s from "./Counter.module.css"

export type CounterPT = {
    startValue: number
    maxValue: number
    error: string
    setError: (errorType: string) => void
    setEditMode: () => void
}
const Counter: React.FC<CounterPT> =
    ({
         startValue,
         maxValue,
         error,
         setError,
         setEditMode

     }) => {
        const [counterValue, setCounterValue] = useState<number>(() => {
            const localStorageValue = localStorage.getItem("startValue")
            return localStorageValue ? +JSON.parse(localStorageValue) : startValue;
        })
        useEffect(() => {
            (counterValue >= maxValue) && setError("Max value")
        }, [counterValue, maxValue, setError])


        const incValueHandler = useCallback(() => {
            setCounterValue(counterValue + 1)
        }, [counterValue])
        const resetHandler = useCallback(() => {
            setCounterValue(startValue)
            setError("")
        }, [setCounterValue,startValue, setError])
        const openSettings = useCallback(() => {
            setEditMode()
        }, [setEditMode])
        return (
            <div className={s.counter}>
                <div className={s.content}>
                    <h1 className={error ? s.red : ""}>{counterValue}</h1>
                </div>
                <div className={s.buttonControls}>
                    <SuperButton onClick={openSettings}>🛠</SuperButton>
                    <SuperButton disabled={!!error} onClick={incValueHandler}>Inc</SuperButton>
                    <SuperButton onClick={resetHandler}>Reset</SuperButton>
                </div>
            </div>
        );
    };

export default Counter;