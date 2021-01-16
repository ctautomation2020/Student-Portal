import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AcademicsComponent } from "./academics.component";
import { AssessmentListComponent } from "./assessment-list/assessment-list.component";
import { AssessmentComponent } from "./assessment/assessment.component";
import { AttendenceComponent } from "./attendence/attendence.component";
import { ViewAttendenceComponent } from "./attendence/view-attendence/view-attendence.component";
import { CourseFeaturesComponent } from "./course-features/course-features.component";
import { CourseListComponent } from "./course-list/course-list.component";
import { SessionComponent } from "./session/session.component";
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';

const routes: Routes =  [
  {
    path: '',
    component: AcademicsComponent,
    children: [
      {
        path: '',
        component: SessionComponent
      },
      {
        path: 'course-list/:reference_id',
        component: CourseListComponent
      },
      {
        path: 'course-features/:cregst_id',
        component: CourseFeaturesComponent
      },
      {
        path: 'assessment-list/:cregst_id',
        component: AssessmentListComponent
      },
      {
        path: 'assessment/:sallot_id',
        component: AssessmentComponent
      },
      {
        path: 'assessment/:assess_num/:cregst_id',
        component: AssessmentComponent
      },
      {
        path: 'attendence',
        component: AttendenceComponent
      },
      {
        path: 'attendence/view-attendence',
        component: ViewAttendenceComponent
      },
      {
        path: 'assignment-list/:cregst_id',
        component: AssignmentListComponent
      },
      {
        path: 'assignment/:assign_num/:sallot_id',
        component: AssignmentComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicsRoutingModule {

}
