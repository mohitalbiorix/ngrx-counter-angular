import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/model/posts.model";

/*
    Update post success action using entity
*/

export const UPDATE_POST_ENTITY_SUCCESS = '[posts page] update post entity success';

export const updateEntityPostSuccess = createAction(
  UPDATE_POST_ENTITY_SUCCESS,
  props<{ post: Update<Post> }>()
);