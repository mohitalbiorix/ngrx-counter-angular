import { createReducer, on } from "@ngrx/store";
import { addPosts, deletePosts, editPosts, loadPostSuccess } from "./posts.actions";
import { initialState } from "./posts.state";

const _postReducer = createReducer(initialState,
    on(addPosts, (state, action) => {
        let post = { ...action.post };
        post.id = (state.posts.length + 1).toString();
        return {
            ...state,
            posts: [...state.posts, post]
        };
    }),

    on(editPosts, (state, action) => {
        const updatedPost = state.posts.map((post) => {
            return action.post.id === post.id ? action.post : post
        });
        return {
            ...state,
            posts: updatedPost
        }
    }),
    
    on(deletePosts, (state, action) => {
        const updatedPost = state.posts.filter((post) => {
            return post.id !== action.id
        });
        return {
            ...state,
            posts: updatedPost
        }
    }),
    on(loadPostSuccess, (state, action) => {
        return {
            ...state,
            posts: action.posts
        }
    })
    
)

export function postReducer(state: any, action: any) {
    return _postReducer(state, action)
}