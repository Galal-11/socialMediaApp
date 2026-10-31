import { authGuard } from './core/auth/guard/auth-guard';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ProfileComponent } from './features/profile/profile.component';
import { TimelineComponent } from './features/timeline/timeline.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { ForgetPasswordComponent } from './features/forget-password/forget-password.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { FeedComponent } from './features/feed/feed.component';
import { guestGuard } from './core/auth/guard/guest-guard';
import { DetailsComponent } from './features/details/details.component';
import { SettingComponent } from './features/setting/setting.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    canActivate: [guestGuard],
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'login' },
      { path: 'register', component: RegisterComponent, title: 'register' },
      { path: 'forget', component: ForgetPasswordComponent, title: 'forgetPassword' },
    ],
  },
  {
    path: '',
    canActivate: [authGuard],
    component: MainLayoutComponent,
    children: [
      // { path: 'feed', component: FeedComponent, title: 'feed' },
      { path: 'profile', component: ProfileComponent, title: 'profile' },
      { path: 'timeline', component: TimelineComponent, title: 'timeline' },
      { path: 'notifications', component: NotificationsComponent, title: 'notifications' },
      { path: 'setting', component: SettingComponent, title: 'notifications' },
      { path: 'change', component: ChangePasswordComponent, title: 'changePassword' },
      { path: 'details/:id', component: DetailsComponent, title: 'postDetails' },
    ],
  },
  {
    path: 'notfound',
    component: NotfoundComponent,
  },
  {
    path: '**',
    redirectTo: 'notfound',
  },
];
