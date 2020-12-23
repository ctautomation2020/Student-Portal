import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentDetailsComponent} from './student-details.component';
import { StudentComponent } from './../student-details/student/student.component';
import { FamilyComponent } from './family/family.component';

const routes: Routes = [
  {
    path: '',
    component: StudentDetailsComponent,
    children: [
      {
        path: 'student',
        component: StudentComponent
      },
      {
        path:'family',
        component: FamilyComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
export class StudentDetailsRoutingModule {

}
