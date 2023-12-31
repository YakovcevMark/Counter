import {applyMiddleware, combineReducers, createStore} from "redux";
import {counterReducer} from "./counterReducer";
import thunk from "redux-thunk";
import {loadState, saveState} from "../utils/localStorageUtils";

const rootReducer = combineReducers({
    counter: counterReducer
})
export const store = createStore(
    rootReducer,
    loadState(),
    applyMiddleware(thunk)
)
store.subscribe(() => {
    saveState({
        counter: store.getState().counter
    })
})
export type AppStateT = ReturnType<typeof rootReducer>
