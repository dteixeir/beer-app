import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { BaseController } from '@shared/baseClasses';

import { State } from '@fromAuth';
import { AuthService } from '../auth.service';
import * as fromRoot from '../../app/store/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent extends BaseController<State> implements OnInit {
  constructor(
    private authService: AuthService,
    protected store: Store<State>
  ) {
    super(store);
  }

  ngOnInit(): void {
    this.authService.baseInit();
    this.authService.logout();

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }
}
