import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SelectModePageComponent } from './components/select-mode-page/select-mode-page.component';
import { authGuard } from './shared/guards/auth.guard';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { AllCoursesPageComponent } from './components/all-courses-page/all-courses-page.component';
import { AccessDeniedPageComponent } from './components/access-denied-page/access-denied-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AllTeachersPageComponent } from './components/all-teachers-page/all-teachers-page.component';
import { MyLessonsPageComponent } from './components/my-lessons-page/my-lessons-page.component';
import { LessonPageComponent } from './components/lesson-page/lesson-page.component';
import { CourseViewComponent } from './components/views/course-view/course-view.component';
import { CourseFormComponent } from './components/forms/course-form/course-form.component';

export const routes: Routes = [

  { path: 'selectMode', component: SelectModePageComponent, canActivate: [authGuard]},
  { path: 'accesDenied', component: AccessDeniedPageComponent },

  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: '/all-teachers', pathMatch: "full" },

      { path: 'all-courses', component: AllCoursesPageComponent, canActivate: [authGuard] },
      { path: 'courses/edit/:id', component: CourseFormComponent, canActivate: [authGuard], data: { mode: 'edit' }, },
      { path: 'courses/new', component: CourseFormComponent, canActivate: [authGuard] },
      { path: 'courses/:id', component: CourseViewComponent, canActivate: [authGuard] },

      { path: 'all-teachers', component: AllTeachersPageComponent, canActivate: [authGuard]},

      { path: 'profile', component: ProfilePageComponent, canActivate: [authGuard] },
      { path: 'profile/:id', component: ProfilePageComponent, canActivate: [authGuard] },

      { path: 'my-lessons', component: MyLessonsPageComponent, canActivate: [authGuard] },
      { path: 'lessons/:id', component: LessonPageComponent, canActivate: [authGuard] },
    ]
  },

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

  { path: '**', component: NotFoundPageComponent }
  // Mode selection
];
