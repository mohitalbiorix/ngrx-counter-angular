import { createReducer, on } from "@ngrx/store";
import { changeChannelName, customIncrement, decrement, increment, reset } from "./counter.actions";
import { initialState } from "./counter.state";

// create counter reducer
const _counterReducer = createReducer(
    initialState,

    // increment action call
    on(increment, (state) => {
        return {
            ...state,
            counter: state.counter + 1
        };
    }),

    // decrement action call
    on(decrement, (state) => {
        return {
            ...state,
            counter: state.counter - 1
        };
    }),

     // reset action call
    on(reset, (state) => {
        return {
            ...state,
            counter: 0
        };
    }),

    // customIncrement action call
    on(customIncrement, (state, action) => {
        return {
            ...state,
            counter: state.counter + action.count
        };
    }),

    // changeChannelName action call
    on(changeChannelName, (state, action) => {
        return {
            ...state,
            channelName: 'Kapadiya Mohit D.'
        };
    })

);

export function counterReducer(state: any, action: any) {
    return _counterReducer(state, action)
}