import { NgClass, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgClass, HttpClientModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  asub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        this.form.value['userName'] = params['userName'];
        this.form.value['password'] = params['password'];
        NotificationService.success('Теперь вы можете войти в систему');
      }
      if (params['accessDenied']) {
        NotificationService.error(
          'Вы должны войти в систему, чтобы получить доступ к этому ресурсу'
        );
      }
      if (params['sessionFailed']) {
        NotificationService.error(
          'Произошла ошибка, перезайдите в систему'
        );
      }
    });
  }

  ngOnDestroy() {
    if (this.asub) {
      this.asub.unsubscribe();
    }
  }

  zaglushka(){
    this.router.navigate(['/selectMode']);
  }

  onSubmit() {
    //delete after
    this.zaglushka();
    return;

    if (this.form.invalid) {
      NotificationService.error('Пожалуйста, исправьте ошибки в форме');
      return;
    }

    this.form.disable();
    this.asub = this.authService.login(this.form.value).subscribe(
      (data) => {
        this.router.navigate(['/books']);
      },
      (error) => {
        NotificationService.error(error['error']['message']);
        this.form.enable();
      }
    );
  }
}
