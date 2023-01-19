import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AuthState } from "./auth.state"

export const AUTH_STATE_NAME = 'auth'

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

/**
 * isAuthenticated, getToken => auth selectors
 */

// if user is authenticate, then return true othrwise return false
export const isAuthenticated = createSelector(getAuthState, (state) => {
    return state.user ? true : false;
});

// if user get token, then return true othrwise return false
export const getToken = createSelector(getAuthState, (state)=>{
    return state.user ? state.user.authToken : null;
})