import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentDetailsComponent} from './student-details.component';
import { StudentComponent } from './../student-details/student/student.component';
import { FamilyComponent } from './family/family.component';
import { MarkComponent } from './mark/mark.component';
import { EventComponent } from './event/event.component';
import { InternshipComponent } from './internship/internship.component';

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
      },
      {
        path:'mark',
        component: MarkComponent
      },
      {
        path:'event',
        component: EventComponent
      },
      {
        path:'internship',
        component: InternshipComponent
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
