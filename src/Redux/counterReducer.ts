const initialState = {
    counterValue: 0,
    maxValue: 0,
    startValue: 0,
    editMode: false,
    error: ""
}
export type InitialStateT = typeof initialState
export const counterReducer = (state: InitialStateT = initialState, action: ActionsT): InitialStateT => {
    switch (action.type) {

        case "SET_EDIT_MODE":
            return {...state, editMode: action.v}

        case "SET_COUNTER_VALUE":
            return {...state, counterValue: action.v}

        case "SET_ERROR_VALUE":
            return {...state, error: action.v}

        case "SET_MAX_VALUE":
            return {...state, maxValue: action.v}

        case "SET_START_VALUE":
            return {...state, startValue: action.v}
        default:
            return state
    }
}

type ActionsT =
    ReturnType<typeof setMaxValue> |
    ReturnType<typeof setStartValue> |
    ReturnType<typeof setCounterValue> |
    ReturnType<typeof setErrorValue> |
    ReturnType<typeof setEditMode>
export const setMaxValue = (v: number) =>
    ({type: "SET_MAX_VALUE", v} as const)
export const setStartValue = (v: number) =>
    ({type: "SET_START_VALUE", v} as const)
export const setCounterValue = (v: number) =>
    ({type: "SET_COUNTER_VALUE", v} as const)
export const setErrorValue = (v: string) =>
    ({type: "SET_ERROR_VALUE", v} as const)
export const setEditMode = (v: boolean) =>
    ({type: "SET_EDIT_MODE", v} as const)