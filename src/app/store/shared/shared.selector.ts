import { createFeatureSelector, createSelector } from "@ngrx/store"
import { SharedState } from "./shared.state"

export const SHARED_STATE_NAME = "shared"

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

/**
 * getLoading, getErrorMessage => shared selector
 */

// if showLoading is true , return true otherwise false
export const getLoading = createSelector(getSharedState, (state) => {
    return state.showLoading;
})

// return errormessage
export const getErrorMessage = createSelector(getSharedState, (state) => {
    return state.errorMessage;
})