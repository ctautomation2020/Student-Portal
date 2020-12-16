import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatMenuModule } from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import { GraphQLModule } from './graphql.module';
import { AlertboxComponent } from './alertbox/alertbox.component';
import { FilterPipe } from './student-details/filter.pipe';
import { StudentComponent } from './student-details/student/student.component';
import { StudentModelComponent} from './student-details/student/student-model/student-model.component';
import { StudentDetailsComponent } from './student-details/student-details.component'
import { StudentDetailsRoutingModule } from './student-details/student-details-routing.module';
import { FamilyComponent } from './student-details/family/family.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    AlertboxComponent,
    FilterPipe,
    StudentComponent,
    StudentModelComponent,
    StudentDetailsComponent,
    FamilyComponent
  ],
  entryComponents: [AlertboxComponent,StudentModelComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatGridListModule,
    MatTabsModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    HttpClientModule,
    StudentDetailsRoutingModule,
    MatDialogModule,
    MatDividerModule,
    GraphQLModule
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

