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
    this.eventForm = new FormGroup({
          Date: new FormControl("dddd", Validators.required),
          Event_Name: new FormControl("host", Validators.required),
          Event_Type_Ref: new FormControl(111, Validators.required),
          Participation_Type_Ref: new FormControl(1223, Validators.required),
          Team_Size: new FormControl(1223, Validators.required),
          Event_Organizer:  new FormControl("hhhh", Validators.required),
          Event_Date:  new FormControl(new Date(2020,2,19), Validators.required),
          Prize_Won_Details:  new FormControl("hhhh", Validators.required)
    });
  }
onSubmit() {
    console.log(this.eventForm.value);
  }

}
