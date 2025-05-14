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
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-register-page',
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgClass, HttpClientModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  asub: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup(
      {
        userName: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.asub) {
      this.asub.unsubscribe();
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.form.invalid) {
      NotificationService.error('Пожалуйста, исправьте ошибки в форме');
      return;
    }
    this.form.disable();
    this.asub = this.authService.register(this.form.value).subscribe(
      (data) => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true,
            userName: this.form.value['userName'],
            password: this.form.value['password'],
          },
        });
      },
      (error) => {
        NotificationService.error(error['error']['message']);
        this.form.enable();
      }
    );
  }
}
