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
  selector: 'app-internshipedit-model',
  templateUrl: './internshipedit-model.component.html',
  styleUrls: ['./internshipedit-model.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class InternshipeditModelComponent implements OnInit {
  internshipeditForm: FormGroup;
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any, private apollo: Apollo,public dialogRef: MatDialogRef<InternshipeditModelComponent>) {
    }
    ngOnInit(): void {
      this.internshipeditForm = new FormGroup({
            Company: new FormControl("xxx", Validators.required),
            Title: new FormControl("yyy", Validators.required),
            Start_Date:new FormControl("d1", Validators.required),
            End_Date: new FormControl("d2", Validators.required),
            Stipend:  new FormControl("11111", Validators.required),
      });
    }
    onSubmit() {
        console.log(this.internshipeditForm.value);
    }
}
