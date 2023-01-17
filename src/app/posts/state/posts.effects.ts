import { Injectable } from "@angular/core";
import { createEffect, ofType } from "@ngrx/effects";
import { Actions } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { exhaustMap, map, mergeMap } from "rxjs";
import { PostsService } from "src/app/service/posts.service";
import { AppState } from "src/app/store/app.state";
import { setLoadingSpinner } from "src/app/store/shared/shared.action";
import { addPosts, addPostSuccess, loadPosts, loadPostSuccess } from "./posts.actions";

@Injectable()
export class PostEffects {

    constructor(private actions$: Actions,
                private postService: PostsService,
                private store: Store<AppState>) { }

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
                        return addPostSuccess({ post })
                    })
                )
            })
        )
    })
   
}