import { createAction, props } from "@ngrx/store";

// increment counter action
export const increment = createAction('increment');

// decrement counter action
export const decrement = createAction('decrement');

// rest counter action
export const reset = createAction('reset');

// increment counter based on user input action
export const customIncrement = createAction('customIncrement', props<{ count: number }>());

// change channelName action
export const changeChannelName = createAction('changeChannelName');