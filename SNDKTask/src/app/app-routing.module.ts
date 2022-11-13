import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth-layout/modules/login/login.component';
import { AuthGuardService } from './auth-layout/services/auth-guard.service';

/**
 * Routes defined with Auth guard and lazy loading approcah implemented.
 */
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth-layout/auth-layout.module').then(module => module.AuthLayoutModule)
    , component: LoginComponent
  },
  {
    path: 'task',
    loadChildren: () => import('./layout/layout.module').then(module => module.LayoutModule),
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
