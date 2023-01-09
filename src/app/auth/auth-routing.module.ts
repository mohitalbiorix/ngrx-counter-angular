import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthReducer } from './state/auth.reducer';
import { AUTH_STATE_NAME } from './state/auth.selector';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signUp',
        component: SignUpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
