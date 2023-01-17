import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { exhaustMap, Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { getToken } from '../auth/state/auth.selector';
import { Router } from '@angular/router';

@Injectable()
export class AuthtokenInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(getToken).pipe(
      exhaustMap((token)=>{
        if(!token){
          return next.handle(request);
        }
        let modifireReq = request.clone({
          params: request.params.append('auth', token)
        })
        return next.handle(modifireReq)
      })
    )
  }
}
