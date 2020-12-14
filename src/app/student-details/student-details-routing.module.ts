import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentDetailsComponent} from './student-details.component';
import { StudentComponent } from './../student-details/student/student.component';

import {AuthGuard} from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'student-details',
    component: StudentDetailsComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'student',
        component: StudentComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  //providers: [AuthGuard]
  })
export class StudentDetailsRoutingModule {

}
