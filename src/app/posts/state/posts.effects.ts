import { Injectable } from "@angular/core";
import { createEffect, ofType } from "@ngrx/effects";
import { Actions } from '@ngrx/effects';
import { exhaustMap, map } from "rxjs";
import { PostsService } from "src/app/service/posts.service";
import { loadPosts, loadPostSuccess } from "./posts.actions";

@Injectable()
export class PostEffects {

    constructor(private actions$: Actions,
                private postService: PostsService) { }

    loadData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadPosts),
            exhaustMap((action) => {
                return this.postService.getPosts().pipe(
                    map((posts) => {
                        return loadPostSuccess({ posts })
                    })
                )
            })
        )
    })
}