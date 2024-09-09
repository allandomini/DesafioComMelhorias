import { Routes } from '@angular/router';
import { LoginPageComponent } from './Componnets/login-page/login-page.component';
import { PrincipalComponent } from './Componnets/principal/principal.component';

export const routes: Routes = [
  { path: '', title: 'Login', component: LoginPageComponent },
  { path: 'DashBoard', title: 'Dashboard', component: PrincipalComponent },
];
