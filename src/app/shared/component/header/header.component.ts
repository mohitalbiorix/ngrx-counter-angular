import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { autoLogout } from 'src/app/auth/state/auth.actions';
import { isAuthenticated } from 'src/app/auth/state/auth.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticate$! : Observable<boolean>

  constructor(
    private store:Store<AppState>,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isAuthenticate$ = this.store.select(isAuthenticated);
  }

  // user logout action
  userLogout() {
    this.store.dispatch(autoLogout())
    this.toastr.success('LogOut Successfully!')
  }
  
}
