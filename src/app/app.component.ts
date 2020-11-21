import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.module';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromUI from '@shared/ui';
import { AuthService } from '@fromAuth';

import * as fromRoot from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  title = 'angular6-redux';
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    protected store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.authService.initAuthListner();
    // this.userService.checkForUser();

    this.isLoading$ = this.store.select(fromUI.getIsLoading);
  }
}
