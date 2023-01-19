import { createAction, props } from "@ngrx/store";

export const SET_LOADING_ACTION = '[shared state] set loading spinner';

export const SET_ERROR_MESSAGE = '[shared state] set error message';

// set loading spinner action
export const setLoadingSpinner = createAction(
    SET_LOADING_ACTION,
    props<{ status: boolean }>()
);

// set error message action
export const seteErrorMessage = createAction(
    SET_ERROR_MESSAGE,
    props<{ message: string }>()
);