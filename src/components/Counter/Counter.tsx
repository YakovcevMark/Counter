import React, {useCallback, useEffect} from 'react';
import SuperButton from "../Common/SuperButton/SuperButton";
import s from "./Counter.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppStateT} from "../../Redux/store";
import {setCounterValue, setEditMode, setErrorValue} from "../../Redux/counterReducer";

export type CounterPT = {}
const Counter: React.FC<CounterPT> =
    () => {
        const counterValue = useSelector<AppStateT, number>(state => state.counter.counterValue)
        const startValue = useSelector<AppStateT, number>(state => state.counter.startValue)
        const maxValue = useSelector<AppStateT, number>(state => state.counter.maxValue)
        const error = useSelector<AppStateT, string>(state => state.counter.error)
        const dispatch = useDispatch()

        useEffect(() => {
            counterValue >= maxValue
                ? dispatch(setErrorValue("Max value"))
                : dispatch(setErrorValue(""))
        }, [counterValue, maxValue, dispatch])

        useEffect(() => {
            dispatch(setCounterValue(startValue))
        },[dispatch,startValue])

        const incValueHandler = useCallback(() => {
            dispatch(setCounterValue(counterValue + 1))
        }, [dispatch, counterValue])

        const resetHandler = useCallback(() => {
            dispatch(setCounterValue(startValue))
            dispatch(setErrorValue(""))
        }, [dispatch, startValue])

        const openSettings = useCallback(() => {
            dispatch(setEditMode(true))
        }, [dispatch])

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