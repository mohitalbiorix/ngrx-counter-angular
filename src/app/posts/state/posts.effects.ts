import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { createEffect, ofType } from "@ngrx/effects";
import { Actions } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { exhaustMap, map, mergeMap, switchMap } from "rxjs";
import { PostsService } from "src/app/service/posts.service";
import { AppState } from "src/app/store/app.state";
import { setLoadingSpinner } from "src/app/store/shared/shared.action";
import { addPosts, addPostSuccess, deletePosts, deletePostSuccess, loadPosts, loadPostSuccess, updatePosts, updatePostSuccess } from "./posts.actions";

@Injectable()
export class PostEffects {

    constructor(private actions$: Actions,
                private postService: PostsService,
                private store: Store<AppState>,
                private router: Router) { }

    loadData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadPosts),
            exhaustMap((action) => {
                return this.postService.getPosts().pipe(
                    map((posts) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        return loadPostSuccess({ posts })
                    })
                )
            })
        )
    })

    addPosts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addPosts),
            mergeMap((action) => {
                return this.postService.addPosts(action.post).pipe(
                    map((data) => {
                        const post = { ...action.post, id: data.name };
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        this.router.navigate(['/post/post-list']);
                        return addPostSuccess({ post })
                    })
                )
            })
        )
    })

    updatePosts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updatePosts),
            switchMap((action) => {
                return this.postService.updatePosts(action.post).pipe(
                    map((post: any) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        this.router.navigate(['/post/post-list']);
                        return updatePostSuccess({ post: action.post })
                    })
                )
            })
        )
    })

    deletePosts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deletePosts),
            switchMap((action) => {
                return this.postService.deletePosts(action.id).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        return deletePostSuccess({ id: action.id })
                    })
                )
            })
        )
    })
   
}