import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { signupStart } from '../state/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm! : FormGroup;
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.initSignupform()
  }

  initSignupform(){
    this.signUpForm = new FormGroup({
      firstame: new FormControl('', [Validators.required]),
      lastame: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSignUpSubmit(){
    this.signUpForm.markAllAsTouched();
    if(!this.signUpForm.valid){
      return;
    }
    const signupData = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    };
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(signupStart({ email: signupData.email, password: signupData.password }));
  }

}
