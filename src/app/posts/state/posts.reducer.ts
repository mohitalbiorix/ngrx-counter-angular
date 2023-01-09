import { createReducer, on } from "@ngrx/store";
import { ADD_POST, EDIT_POST } from "./posts.actions";
import { initialState } from "./posts.state";

const _postReducer = createReducer(initialState,
    on(ADD_POST, (state, action) => {
        let post = { ...action.post };
        post.id = (state.posts.length + 1).toString();
        return {
            ...state,
            posts: [...state.posts, post]
        };
    }),

    on(EDIT_POST, (state, action) => {
        const updatedPost = state.posts.map((post) => {
            return action.post.id === post.id ? action.post : post
        });
        return {
            ...state,
            posts: updatedPost
        }
    })
    
)

export function postReducer(state: any, action: any) {
    return _postReducer(state, action)
}