import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './nav/nav.component';
import { StudentDetailsRoutingModule } from './student-details-routing.module';
import { StudentDetailsComponent } from './student-details.component';
import { StudentComponent } from './student/student.component';
import { StudentModelComponent } from './student/student-model/student-model.component';
import { ImageModelComponent } from './student/image-model/image-model.component';
import { FamilyComponent } from './family/family.component';
import { FamilyModelComponent } from './family/family-model/family-model.component';
import { MarkComponent } from './mark/mark.component';
import { EventComponent } from './event/event.component';
import { EventModelComponent } from './event/event-model/event-model.component';

@NgModule({
  declarations: [
    NavComponent,
    StudentDetailsComponent,
    StudentComponent,
    StudentModelComponent,
    ImageModelComponent,
    FamilyComponent,
    FamilyModelComponent,
    MarkComponent,
    EventComponent,
    EventModelComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StudentDetailsRoutingModule
  ]
})
export class StudentDetailsModule{

}
