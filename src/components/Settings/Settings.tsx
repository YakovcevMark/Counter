import React, {ChangeEvent, useCallback, useEffect} from 'react';
import s from "./Settings.module.css";
import SuperButton from "../Common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStateT} from "../../Redux/store";
import {setEditMode, setErrorValue, setMaxValue, setStartValue} from "../../Redux/counterReducer";

type SettingsPT = {}
const Settings: React.FC<SettingsPT> =
    () => {
        const startValue = useSelector<AppStateT, number>(state => state.counter.startValue)
        const maxValue = useSelector<AppStateT, number>(state => state.counter.maxValue)
        const error = useSelector<AppStateT, string>(state => state.counter.error)
        const dispatch = useDispatch()

        const setSettings = useCallback(() => {
            dispatch(setEditMode(false))
        }, [dispatch])

        useEffect(() => {
            maxValue < startValue ?
                dispatch(setErrorValue("Start value can't be bigger then max value"))
                : maxValue === startValue ?
                    dispatch(setErrorValue("Max value can't equal start value"))
                    : dispatch(setErrorValue(""))
        }, [dispatch, startValue, maxValue])

        const maxValueChanger = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(setMaxValue(+e.currentTarget.value))
        }

        const startValueChanger = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(setStartValue(+e.currentTarget.value))
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