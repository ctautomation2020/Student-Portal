import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Apollo} from 'apollo-angular';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-event-model',
  templateUrl: './event-model.component.html',
  styleUrls: ['./event-model.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class EventModelComponent implements OnInit {
  eventForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private apollo: Apollo,public dialogRef: MatDialogRef<EventModelComponent>) {
  }
  ngOnInit(): void {
    console.log(this.data.event);
    this.eventForm = new FormGroup({
      Event_Name: new FormControl(this.data.event.Event_Name, Validators.required),
      Event_Type_Ref: new FormControl(this.data.event.Event_Type_Ref, Validators.required),
      Participation_Type_Ref: new FormControl(this.data.event.Participation_Type_Ref, Validators.required),
      Team_Size: new FormControl(this.data.event.Team_Size, Validators.required),
      Event_Organizer:  new FormControl(this.data.event.Event_Organizer, Validators.required),
      Event_Date:  new FormControl(this.convertDate(this.data.event.Event_Date), Validators.required),
      Prize_Won_Details:  new FormControl(this.data.event.Prize_Won_Details, Validators.required)
    });
  }
  onSubmit() {
      console.log(this.eventForm.value);
      this.dialogRef.close(this.eventForm.value); 
  }
  
  convertDate(edate){
    const myDate = new Date(0);
    const temp = parseFloat(edate) / 1000;
    myDate.setUTCSeconds(temp);
    return myDate;
  }

}
