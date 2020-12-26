import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-awards-model',
  templateUrl: './awards-model.component.html',
  styleUrls: ['./awards-model.component.scss']
})
export class AwardsModelComponent implements OnInit {

  awardsForm: FormGroup;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any, private apollo: Apollo, public dialogRef: MatDialogRef<AwardsModelComponent>) {
  }
  ngOnInit(): void {
    this.awardsForm = new FormGroup({
          Award_Name: new FormControl("xxx", Validators.required),
          Organizer_Name: new FormControl("yyy", Validators.required),
          Award_Type_Ref: new FormControl("yyyy", Validators.required),
          Award_Category_Ref: new FormControl("yyyy", Validators.required),
          Award_Date: new FormControl("yyyy", Validators.required),
          Place_of_Event: new FormControl("xyz", Validators.required)
      });
  }

onSubmit() {
      console.log(this.awardsForm.value);
  }


}
