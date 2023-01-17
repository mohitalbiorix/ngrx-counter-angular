import { createReducer, on } from "@ngrx/store";
import { addPosts, addPostSuccess, deletePosts, updatePosts, loadPostSuccess, updatePostSuccess, deletePostSuccess } from "./posts.actions";
import { initialState } from "./posts.state";

const _postReducer = createReducer(initialState,
    /* for simple data, not api call
    on(addPosts, (state, action) => {
        let post = { ...action.post };
        post.id = (state.posts.length + 1).toString();
        return {
            ...state,
            posts: [...state.posts, post]
        };
    }),
    */

    on(addPostSuccess, (state, action) => {
        let post = { ...action.post };
         /* for simple data, not api call 
        post.id = (state.posts.length + 1).toString();
        */     
        return {
            ...state,
            posts: [...state.posts, post]
        };
    }),
    
    /* for simple data, not api call
    on(updatePosts, (state, action) => {
        const updatedPost = state.posts.map((post) => {
            return action.post.id === post.id ? action.post : post
        });
        return {
            ...state,
            posts: updatedPost
        }
    }),

    */

    on(updatePostSuccess, (state, action) => {
        const updatedPost = state.posts.map((post) => {
            return action.post.id === post.id ? action.post : post
        });
        return {
            ...state,
            posts: updatedPost
        }
    }),
    
    /*
    for simple data, not api call
    on(deletePosts, (state, action) => {
        const updatedPost = state.posts.filter((post) => {
            return post.id !== action.id
        });
        return {
            ...state,
            posts: updatedPost
        }
    }),
    */
    on(loadPostSuccess, (state, action) => {
        return {
            ...state,
            posts: action.posts
        }
    }),
    on(deletePostSuccess, (state, action) => {
        const updatedPost = state.posts.filter((post) => {
            return post.id !== action.id
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