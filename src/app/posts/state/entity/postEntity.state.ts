import { Post } from "src/app/model/posts.model";
import { EntityState, createEntityAdapter } from '@ngrx/entity';

/*
    create a state using entity
*/


export interface postEntityState extends EntityState<Post> { };

export const postsAdapter = createEntityAdapter<Post>();

export const initialPostEntityState: postEntityState = postsAdapter.getInitialState();
