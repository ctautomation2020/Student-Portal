import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-placements-model',
  templateUrl: './placements-model.component.html',
  styleUrls: ['./placements-model.component.scss']
})
export class PlacementsModelComponent implements OnInit {

placementsAddForm: FormGroup;

constructor(
      @Inject(MAT_DIALOG_DATA) public data: any, private apollo: Apollo, public dialogRef: MatDialogRef<PlacementsModelComponent>) {
  }

  ngOnInit(): void {
this.placementsAddForm = new FormGroup({
          Company: new FormControl("xxx", Validators.required),
          Designation: new FormControl("yyy", Validators.required),
          Joining_Date: new FormControl("yyyy", Validators.required),
          Package: new FormControl("9999999999", [Validators.required,Validators.pattern('^[0-9]{10}$')])
      });
  }

 onSubmit() {
      console.log(this.placementsAddForm.value);
  }

}
