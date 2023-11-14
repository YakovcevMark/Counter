import {AppStateT} from "../Redux/store";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');

        return serializedState
            ? JSON.parse(serializedState)
            : undefined

    } catch (err) {
        return undefined;
    }
};
export const saveState = (state:AppStateT) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};