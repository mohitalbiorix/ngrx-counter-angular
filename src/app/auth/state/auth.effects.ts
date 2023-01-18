import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { createEffect } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { AuthService } from 'src/app/service/auth.service';
import { autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess } from './auth.actions';
import { exhaustMap, map, catchError, tap, mergeMap  } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { seteErrorMessage, setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store: Store<AppState>,
        private router: Router,
        private toastr: ToastrService
    ) { }

    /*  For login  */
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService.login(action.email, action.password).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        this.store.dispatch(seteErrorMessage({ message: '' }));
                        const user = this.authService.formatUser(data);
                        this.authService.setUserInLocalStorage(user);
                        this.toastr.success('Login Successfully!')
                        return loginSuccess({ user, redirect: true });
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

    // We can use multiple actions at a time, instead of single in ofType arrays
    loginRedirect$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(...[loginSuccess, signupSuccess]),
                tap((action) => {
                    if (action.redirect) {
                        this.router.navigate(['/']);
                    }
                })
            )
        },
        { dispatch: false }
    )

    /*  For signUp   */
    signup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signupStart),
            exhaustMap((action) => {
                return this.authService.signUp(action.email, action.password).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        this.store.dispatch(seteErrorMessage({ message: '' }));
                        const user = this.authService.formatUser(data);
                        this.authService.setUserInLocalStorage(user);
                        this.toastr.success('Create User Successfully!')
                        return signupSuccess({ user, redirect: true });
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

    /*
            signupRedirect$ = createEffect(
                () => {
                    return this.actions$.pipe(
                        ofType(signupSuccess),
                        tap((action) => {
                            this.router.navigate(['/'])
                        })
                    )
                },
                { dispatch: false }
            )
    */

   /*  for autologin */
    autoLogin$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(autoLogin),
                mergeMap((action) => {
                    const user: any = this.authService.getUserFromLocalStorage();
                    return of(loginSuccess({ user, redirect: false }))
                })
            );
        }
    );

    /* for logout */
    logout$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(autoLogout),
                map((action) => {
                    this.authService.logout();
                    this.router.navigate(['auth'])
                })
            );
        },
        { dispatch: false }
    );

    
    
}