import { createReducer, on } from "@ngrx/store";
import { addPostSuccess, deletePostSuccess, loadPostSuccess } from "../posts.actions";
import { updateEntityPostSuccess } from "./postEntity.action";
import { initialPostEntityState, postsAdapter } from "./postEntity.state";

const _postEntityReducer = createReducer(initialPostEntityState,

    /*
        add post success reducer using entity
    */
    on(addPostSuccess, (state, action) => {
        return postsAdapter.addOne(action.post, {
            ...state,
            count: state.count + 1
        });
    }),

    /*
        update post success reducer using entity
    */
    on(updateEntityPostSuccess, (state, action) => {
        return postsAdapter.updateOne(action.post, state);
    }),

    /*
        delete post success reducer using entity
    */
    on(deletePostSuccess, (state, { id }) => {
        return postsAdapter.removeOne(id, state);
    }),

    /*
        load post success reducer using entity
    */
    on(loadPostSuccess, (state, action) => {
        return postsAdapter.setAll(action.posts, {
            ...state,
            count: state.count + 1
        })
    }),

)

export function postEntityReducer(state: any, action: any) {
    return _postEntityReducer(state, action)
}