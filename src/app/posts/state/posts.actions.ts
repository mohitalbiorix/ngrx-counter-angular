import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/model/posts.model";

export const ADD_POST_ACTION = '[posts page] add post';

export const EDIT_POST_ACTION = '[posts page] edit post';

export const DELETE_POST_ACTION = '[posts page] delete post';

export const ADD_POST = createAction('ADD_POST_ACTION', props<{ post: Post }>());

export const EDIT_POST = createAction('EDIT_POST_ACTION', props<{ post: any }>());

export const DELETE_POST = createAction('DELETE_POST_ACTION', props<{ id: string }>());