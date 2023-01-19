import { Post } from "src/app/model/posts.model";
import { EntityState, createEntityAdapter } from '@ngrx/entity';

/*
    create a state using entity
*/


export interface postEntityState extends EntityState<Post> {
    count: number
};

export const postsAdapter = createEntityAdapter<Post>({
    sortComparer: sortByName,
});

export const initialPostEntityState: postEntityState = postsAdapter.getInitialState({
    count: 0
});

/* sort function (based on column) */
export function sortByName(a: any, b: Post): number {
    const compare = a.title.localeCompare(b.title);
    return compare;
}
