import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { postEntityState, postsAdapter } from "./postEntity.state";

export const POST_ENTITY_STATE_NAME = 'post_entity'

/*
    create a selector using entity for get posts data
*/

const getPostsState = createFeatureSelector<postEntityState>(POST_ENTITY_STATE_NAME);

export const postEntitySelector = postsAdapter.getSelectors();

export const getPostEntity = createSelector(getPostsState, postEntitySelector.selectAll);

export const getPostEntities = createSelector(
    getPostsState,
    postEntitySelector.selectEntities
)


export const getPostEntityById = createSelector(
    getPostEntities,
    getCurrentRoute,
    (posts, route: RouterStateUrl) => {
        return posts ? posts[route.queryParams['postId']] : null;
    }
);

export const getCount = createSelector(getPostsState, (state) => state.count);