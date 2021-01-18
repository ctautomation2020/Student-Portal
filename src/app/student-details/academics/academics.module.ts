import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { AcademicsRoutingModule } from "./academics-routing.module";
import { AcademicsComponent } from "./academics.component";
import { AssessmentListComponent } from "./assessment-list/assessment-list.component";
import { AssessmentComponent } from "./assessment/assessment.component";
import { AssignmentComponent } from "./assignment/assignment.component";
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { AttendenceComponent } from "./attendence/attendence.component";
import { CourseFeaturesComponent } from "./course-features/course-features.component";
import { CourseListComponent } from "./course-list/course-list.component";
import { SessionComponent } from './session/session.component';

@NgModule({
  declarations: [
    AcademicsComponent,
    CourseListComponent,
    AssignmentComponent,
    AttendenceComponent,
    AssessmentComponent,
    AssessmentListComponent,
    CourseFeaturesComponent,
    SessionComponent,
    AssignmentListComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AcademicsRoutingModule
  ]
})
export class AcademicsModule {

}
