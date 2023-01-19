import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { AuthResponseData } from '../model/authResponseData.model';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  timeoutInterval: any

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  // login action
  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIRBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  // signup action
  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIRBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  // formatuser action that return user's data
  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000)
    const user = new User(data.email, data.idToken, data.localId, expirationDate);
    return user;
  }

  // return error message based on condition
  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
          return 'Email already exist';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }

  // set userData in localStorage
  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user))
  }

  // session expired based on timeout
  runTimeOutInterval(user: User) {
    const todayDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = todayDate - expirationDate;
    // this.timeoutInterval = setTimeout(() => {
    //   this.store.dispatch(autoLogout())
    // }, timeInterval)
  }

  // get userData from localStorage
  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(
        userData.email,
        userData.token,
        userData.localId,
        expirationDate);
      this.runTimeOutInterval(user);
      return user;
    }
    return null;
  }

  // user logout action
  logout() {
    localStorage.removeItem('userData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }

  /*
      UserName for login:
      Email: test@test.com
      Password: 123456

  */
}
