import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SelectModePageComponent } from './components/select-mode-page/select-mode-page.component';
import { TEACHER_ROUTES } from '../routes/teacher.routes';
import { STUDENT_ROUTES } from '../routes/student.routes';

export const routes: Routes = [
  {
    // route consts
    ...TEACHER_ROUTES,
    ...STUDENT_ROUTES,

    // Auth routes
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'register', component: RegisterPageComponent },
      { path: 'login', component: LoginPageComponent },
    ],
  },

  // Mode selection
  { path: 'selectMode', component: SelectModePageComponent },
];
