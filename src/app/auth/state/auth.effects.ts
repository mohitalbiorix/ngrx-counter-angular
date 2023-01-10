import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { createEffect } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { AuthService } from 'src/app/service/auth.service';
import { loginStart, loginSuccess } from './auth.actions';
import { exhaustMap, map, catchError  } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { seteErrorMessage, setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { of } from 'rxjs';


@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store: Store<AppState>
    ) { }

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService.login(action.email, action.password).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        this.store.dispatch(seteErrorMessage({ message: '' }));
                        const user = this.authService.formatUser(data);
                        return loginSuccess({ user });
                    }),
                    catchError((errRes) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        const errorMessage = this.authService.getErrorMessage(
                            errRes.error.error.message
                        );
                        return of(seteErrorMessage({ message: errorMessage }));
                    })
                );
            })
        );
    });

}