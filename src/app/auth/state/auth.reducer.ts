import { createReducer, on } from "@ngrx/store";
import { autoLogout, loginSuccess } from "./auth.actions";
import { initialState } from "./auth.state";

// create auth reducer
const _authReducer = createReducer(
  initialState,
  
  // loginSuccess action call
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),

  // autologout action call
  on(autoLogout, (state, action) => {
    return {
      ...state,
      user: null,
    };
  })
);

export function AuthReducer(state: any, action: any) {
  return _authReducer(state, action);
}