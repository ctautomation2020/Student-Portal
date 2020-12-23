import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './auth/admin.guard';
import { StudentGuard } from './auth/student.guard';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [StudentGuard]
  },
  {
    path: 'student-details',
    loadChildren: () => import('./student-details/student-details.module').then(m => m.StudentDetailsModule),
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
