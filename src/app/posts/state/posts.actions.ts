import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/model/posts.model";

export const ADD_POST_ACTION = '[posts page] add post';
export const EDIT_POST_ACTION = '[posts page] edit post';
export const DELETE_POST_ACTION = '[posts page] delete post';
export const LOAD_POSTS = '[auth page] load post';
export const LOAD_POST_SUCCESS = '[auth page] load post success';
export const ADD_POST_SUCCESS = '[auth page] add post success';


export const addPosts = createAction(ADD_POST_ACTION, props<{ post: Post }>());

export const editPosts = createAction(EDIT_POST_ACTION, props<{ post: any }>());

export const deletePosts = createAction(DELETE_POST_ACTION, props<{ id: string }>());

export const loadPosts = createAction(LOAD_POSTS);

export const loadPostSuccess = createAction(LOAD_POST_SUCCESS, props<{ posts: Post[] }>());

export const addPostSuccess = createAction(ADD_POST_SUCCESS, props<{ post:Post }>());

