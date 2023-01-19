import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/model/posts.model";

export const ADD_POST_ACTION = '[posts page] add post';
export const UPDATE_POST_ACTION = '[posts page] update post';
export const DELETE_POST_ACTION = '[posts page] delete post';
export const LOAD_POSTS = '[posts page] load post';
export const LOAD_POST_SUCCESS = '[posts page] load post success';
export const ADD_POST_SUCCESS = '[posts page] add post success';
export const UPDATE_POST_SUCCESS = '[posts page] update post success';
export const DELETE_POST_SUCCESS = '[posts page] delete post success';

// add post action
export const addPosts = createAction(ADD_POST_ACTION, props<{ post: Post }>());

// update post action
export const updatePosts = createAction(UPDATE_POST_ACTION, props<{ post: any }>());

// delete post action
export const deletePosts = createAction(DELETE_POST_ACTION, props<{ id: string }>());

// load post action
export const loadPosts = createAction(LOAD_POSTS);

// load post success action
export const loadPostSuccess = createAction(LOAD_POST_SUCCESS, props<{ posts: Post[] }>());

// add post success action
export const addPostSuccess = createAction(ADD_POST_SUCCESS, props<{ post:Post }>());

// update post success action
export const updatePostSuccess = createAction(UPDATE_POST_SUCCESS, props<{ post: Post }>());

// delete post success action
export const deletePostSuccess = createAction(DELETE_POST_SUCCESS, props<{ id: string }>());
