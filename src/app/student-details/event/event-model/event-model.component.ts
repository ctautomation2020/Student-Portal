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
  EventForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private apollo: Apollo,public dialogRef: MatDialogRef<EventModelComponent>) {
  }
  ngOnInit(): void {
    this.EventForm = new FormGroup({
          Organisation: new FormControl("host", Validators.required),
          Date: new FormControl("dddd", Validators.required),
          Place: new FormControl("yyyy", Validators.required),
          Prize: new FormControl("9999999999", [Validators.required,Validators.pattern('^[0-9]{10}$')]),
    });
  }
onSubmit() {
    console.log(this.EventForm.value);
  }

}
