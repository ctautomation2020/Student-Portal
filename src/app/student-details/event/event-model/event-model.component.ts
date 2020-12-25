import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Apollo} from 'apollo-angular';


@Component({
  selector: 'app-event-model',
  templateUrl: './event-model.component.html',
  styleUrls: ['./event-model.component.scss']
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
