import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user.model";

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAIL = '[auth page] login fail';
export const SIGNUP_START = '[auth page] signup start';
export const SIGNUP_SUCCESS = '[auth page] signup success';
export const AUTO_LOGIN = '[auth page] auto login';
export const AUTO_LOGOUT = '[auth page] auto logout';

// login start action
export const loginStart = createAction(
    LOGIN_START, props<{ email: string, password: string }>());

// login success action
export const loginSuccess = createAction(
    LOGIN_SUCCESS, props<{ user: User, redirect: boolean }>());

// signup start action
export const signupStart = createAction(
    SIGNUP_START, props<{ email: string, password: string }>());

// signup success action
export const signupSuccess = createAction(
    SIGNUP_SUCCESS, props<{ user: User, redirect: boolean }>());

// autologin action
export const autoLogin = createAction(AUTO_LOGIN);

// autologout action
export const autoLogout = createAction(AUTO_LOGOUT);

// dummy action
export const dummyAction = createAction('[dummy action]');