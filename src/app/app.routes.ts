import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SelectModePageComponent } from './components/select-mode-page/select-mode-page.component';
import { authGuard } from './shared/guards/auth.guard';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { AllCoursesPageComponent } from './components/all-courses-page/all-courses-page.component';

export const routes: Routes = [
  {

    // Auth routes
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'register', component: RegisterPageComponent },
      { path: 'login', component: LoginPageComponent },
    ],
  },

  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: '/books', pathMatch: "full" },

      { path: 'all-courses', component: AllCoursesPageComponent, canActivate: [authGuard], canActivateChild: [authGuard] },

      //{ path: 'accesDenied', component: AccessDeniedPageComponent },
    ]
  },

  // Mode selection
  { path: 'selectMode', component: SelectModePageComponent, canActivate: [authGuard]},
];
