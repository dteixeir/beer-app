import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromUI from '@shared/ui';
import { BaseController } from '@shared/baseClasses';

import { State } from '../store';
import { AuthService } from '../auth.service';

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
    this.authService.init();
    this.authService.logout();

    this.isLoading$ = this.store.select(fromUI.getIsLoading);
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }
}
