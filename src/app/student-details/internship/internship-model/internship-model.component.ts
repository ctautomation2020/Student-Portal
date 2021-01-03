import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Apollo} from 'apollo-angular';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import gql from 'graphql-tag';

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
  selector: 'app-internship-model',
  templateUrl: './internship-model.component.html',
  styleUrls: ['./internship-model.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class InternshipModelComponent implements OnInit {
  internshipForm: FormGroup;
  fileToUpload;
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any, private apollo: Apollo, public dialogRef: MatDialogRef<InternshipModelComponent>) {
  }
  ngOnInit(): void {
    this.internshipForm = new FormGroup({
      Company: new FormControl(this.data.internship!=null?this.data.internship.Company:"", Validators.required),
      Title: new FormControl(this.data.internship!=null?this.data.internship.Title:"", Validators.required),
      Address: new FormControl(this.data.internship!=null?this.data.internship.Address:"", Validators.required),
      Start_Date: new FormControl(this.data.internship!=null?this.convertDate(this.data.internship.Start_Date):"", Validators.required),
      End_Date: new FormControl(this.data.internship!=null?this.convertDate(this.data.internship.End_Date):"", Validators.required),
      Stiphend_Option_Ref: new FormControl(this.data.internship!=null?this.data.internship.Stiphend_Option_Ref:"", Validators.required),
      Stiphend_Amount: new FormControl(this.data.internship!=null?this.data.internship.Stiphend_Amount:"", Validators.required),
      Selection_Mode_Ref: new FormControl(this.data.internship!=null?this.data.internship.Selection_Mode_Ref:"", Validators.required),
      file: new FormControl("")
    });
  }
  onFileChange(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      this.fileToUpload=event.target.files[0];
    }
  }

  onSubmit() {
    console.log(this.internshipForm.value);
    console.log(this.fileToUpload);
    const req = gql `
      mutation uploadStudentInternship($data: uploadStudentInternshipInput!){
        uploadStudentInternship(data: $data)
      }`;
    this.apollo.mutate({
      mutation: req,
      variables: {
        data:{
          Internship_ID: this.data.internship.Internship_ID,
          file: this.fileToUpload
        }
      },
      context: {
        useMultipart: true
      }
    }).subscribe(({ data }) => {
      console.log(data);
    });
    this.dialogRef.close(this.internshipForm.value); 
  }

  convertDate(edate){
    const myDate = new Date(0);
    const temp = parseFloat(edate) / 1000;
    myDate.setUTCSeconds(temp);
    return myDate;
  }
}
