import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm! : FormGroup;
  constructor() { }

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
  }

}
