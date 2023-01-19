import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { PostState } from "./posts.state";

const getPostsState = createFeatureSelector<PostState>('posts');

export const POST_STATE_NAME = 'posts'

/**
 * getPosts, getPostById => post selectors
 */
export const getPosts = createSelector(getPostsState, (state) => {
    return state.posts;
})


/* 
    * Manage by angular router, not ngrx router
    export const getPostById = createSelector(getPostsState, (state: any, props: any) => {
        return state.posts.find((data:any)=>data.id === props.postId)
})  */

// create selector that get post based on id
export const getPostById = createSelector(
    getPosts,
    getCurrentRoute,
    (posts, route: RouterStateUrl) => {
        return posts ? posts.find((post) => post.id === route.queryParams['postId']) : null;
    }
);