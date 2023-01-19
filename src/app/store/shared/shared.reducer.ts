import { createReducer, on } from "@ngrx/store";
import { seteErrorMessage, setLoadingSpinner } from "./shared.action";
import { initialState } from "./shared.state";

const _sharedReducer = createReducer(
  initialState,

  // setLoadingSpinner reducer
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  }),

  // seteErrorMessage reducer
  on(seteErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    };
  })
);

export function SharedReducer(state: any, action: any) {
    return _sharedReducer(state, action);
}