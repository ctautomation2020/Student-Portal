import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-higherstudies-model',
  templateUrl: './higherstudies-model.component.html',
  styleUrls: ['./higherstudies-model.component.scss']
})
export class HigherstudiesModelComponent implements OnInit {

higherstudiesAddForm: FormGroup;

constructor(
      @Inject(MAT_DIALOG_DATA) public data: any, private apollo: Apollo, public dialogRef: MatDialogRef<HigherstudiesModelComponent>) {
  }

  ngOnInit(): void {
this.higherstudiesAddForm = new FormGroup({
          University: new FormControl("xxx", Validators.required),
          Degree: new FormControl("yyy", Validators.required),
          Specialization: new FormControl("yyy", Validators.required),
          Score: new FormControl("123", [Validators.required,Validators.pattern('^[0-9]{3}$')]),
          Country: new FormControl("xyz", Validators.required)
      });

  }

 onSubmit() {
      console.log(this.higherstudiesAddForm.value);
  }

}
