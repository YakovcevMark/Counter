import React, {ChangeEvent, useCallback, useEffect} from 'react';
import {CounterPT} from "../Counter/Counter";
import s from "./Settings.module.css";
import SuperButton from "../Common/SuperButton/SuperButton";

type SettingsPT = CounterPT & {
    setStartValue: (value: number) => void
    setMaxValue: (value: number) => void
}
const Settings: React.FC<SettingsPT> =
    ({
         startValue,
         maxValue,
         error,
         setError,
         setEditMode,
         setMaxValue,
         setStartValue

     }) => {

        const setSettings = useCallback(() => {
            setEditMode()
        }, [setEditMode])
        useEffect(() => {
            if (maxValue < startValue) {
                setError("Start value can't be bigger then max value")
            } else if (maxValue === startValue) {
                setError("Max value can't equal start value")
            } else {
                setError("")
            }
        },[maxValue,startValue,setError])

        const maxValueChanger = (e: ChangeEvent<HTMLInputElement>) => {
            setMaxValue(+e.currentTarget.value)

        }
        const startValueChanger = (e: ChangeEvent<HTMLInputElement>) => {
            setStartValue(+e.currentTarget.value)
        }
        return (
            <div className={s.counter}>
                <div className={s.content}>
                    <div className={s.item}>
                        <h3 className={error ? s.red : ""}>Start value:</h3>
                        <input type="number"
                               value={startValue}
                               onChange={startValueChanger}/>
                    </div>
                    <div className={s.item}>
                        <h3 className={error ? s.red : ""}>Max value:</h3>
                        <input type="number"
                               value={maxValue}
                               onChange={maxValueChanger}/>
                    </div>
                    <div>
                        {error && <span className={s.showError}>{error}</span>}
                    </div>
                </div>
                <div className={s.buttonControls}>
                    <SuperButton disabled={!!error} onClick={setSettings}>Set</SuperButton>
                </div>
            </div>
        );
    };
export default Settings;