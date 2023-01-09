import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { createEffect } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { AuthService } from 'src/app/service/auth.service';
import { loginStart, loginSuccess } from './auth.actions';
import { exhaustMap, map } from 'rxjs/operators';


@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) { }

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService.login(action.email, action.password).pipe(
                    map((data) => {
                        return loginSuccess();
                    })
                );
            })
        );
    });

}