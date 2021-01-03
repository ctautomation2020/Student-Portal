import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
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
  selector: 'app-awards-model',
  templateUrl: './awards-model.component.html',
  styleUrls: ['./awards-model.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class AwardsModelComponent implements OnInit {

  awardsForm: FormGroup;
  fileToUpload;
  sizeValid: boolean=false;
  typeValid: boolean=false;
  fileSrc: String = "../../../../assets/sample.pdf";
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any, private apollo: Apollo, public dialogRef: MatDialogRef<AwardsModelComponent>) {
  }
  ngOnInit(): void {
    this.awardsForm = new FormGroup({
      Award_Name: new FormControl(this.data.award!=null?this.data.award.Award_Name:"", Validators.required),
      Organizer_Name: new FormControl(this.data.award!=null?this.data.award.Organizer_Name:"", Validators.required),
      Award_Type_Ref: new FormControl(this.data.award!=null?this.data.award.Award_Type_Ref:"", Validators.required),
      Award_Category_Ref: new FormControl(this.data.award!=null?this.data.award.Award_Category_Ref:"", Validators.required),
      Place_of_Event: new FormControl(this.data.award!=null?this.data.award.Place_of_Event:"", Validators.required),
      Award_Date: new FormControl(this.data.award!=null?this.convertDate(this.data.award.Award_Date):"", Validators.required),
      Certificate_Copy: new FormControl(this.data.award!=null?this.data.award.Certificate_Copy:""),
      file: new FormControl("")
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      this.fileToUpload=event.target.files[0];
      const ftype=this.fileToUpload.type.slice(-3);
      const fsize=Math.floor(this.fileToUpload.size/1024);
      this.typeValid=ftype=="pdf"?true:false;
      this.sizeValid=fsize<=1024?true:false;
    }
  }

  onSubmit() {
    console.log(this.awardsForm.value);
    console.log(this.fileToUpload);
    const req = gql `
      mutation uploadStudentAward($data: uploadStudentAwardInput!) {
        uploadStudentAward(data: $data)
      }`;
    this.apollo.mutate({
      mutation: req,
      variables: {
        data:{
          Award_ID: this.data.award.Award_ID,
          file: this.fileToUpload
        }
      },
      context: {
        useMultipart: true
      }
    }).subscribe(({ data }) => {
      console.log(data);
    });
    this.dialogRef.close(this.awardsForm.value);
  }

  convertDate(edate){
    const myDate = new Date(0);
    const temp = parseFloat(edate) / 1000;
    myDate.setUTCSeconds(temp);
    return myDate;
  }


}
