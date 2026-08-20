import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Profile } from './components/profile/profile';
import { authGuard } from './auth.guard'

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: "Home",
  },
  {
    path: 'login',
    component: Login,
    title: "Login",
  },
  {
    path: 'profile',
    component: Profile,
    title: "Profile",
    canActivate: [authGuard],
  },
];
