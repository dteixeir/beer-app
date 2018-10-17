import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { BaseController } from '../../shared/shared.module';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app/app.reducer';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent extends BaseController implements OnInit {
  constructor(
    private authService: AuthService,
    protected store: Store<fromRoot.State>
  ) {
    super(
      store
    );
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
