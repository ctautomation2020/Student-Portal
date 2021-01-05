import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { StudentDetailsService } from './../../student-details.service';
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
  fileToUpload;
  sizeValid: boolean=false;
  typeValid: boolean=false;
  fileSrc: String;
  today = new Date();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private apollo: Apollo,public dialogRef: MatDialogRef<EventModelComponent>,public studentDetailsService: StudentDetailsService) {
  }
  ngOnInit(): void {
    console.log(this.data.event);
    const baseURL=this.studentDetailsService.getURL();
    // if(this.data.event!=null){
    //   this.fileSrc=baseURL+this.data.event.Certificate_Copy;
    // }
    this.eventForm = new FormGroup({
      Event_Name: new FormControl(this.data.event!=null?this.data.event.Event_Name:"", Validators.required),
      Event_Type_Ref: new FormControl(this.data.event!=null?this.data.event.Event_Type_Ref:"", Validators.required),
      Participation_Type_Ref: new FormControl(this.data.event!=null?this.data.event.Participation_Type_Ref:"", Validators.required),
      Team_Size: new FormControl(this.data.event!=null?this.data.event.Team_Size:"", Validators.required),
      Event_Organizer:  new FormControl(this.data.event!=null?this.data.event.Event_Organizer:"", Validators.required),
      Event_Date:  new FormControl(this.data.event!=null?this.convertDate(this.data.event.Event_Date):"", Validators.required),
      Prize_Won_Details:  new FormControl(this.data.event!=null?this.data.event.Prize_Won_Details:"", Validators.required),
      file: new FormControl("")
    });
  }
  onFileChange(event) {
    if(event.target.files && event.target.files.length) {
      this.fileToUpload=event.target.files[0];
      const ftype=this.fileToUpload.type.slice(-3);
      const fsize=Math.floor(this.fileToUpload.size/1024);
      this.typeValid=ftype=="pdf"?true:false;
      this.sizeValid=fsize<=1024?true:false;
    }
  }

  onSubmit() {
    console.log(this.eventForm.value);
    console.log(this.fileToUpload);
    const req = gql `
      mutation uploadEventParticipated($data: uploadEventParticipatedInput!) {
        uploadEventParticipated(data: $data)
      }`;
    this.apollo.mutate({
      mutation: req,
      variables: {
        data:{
          Event_ID: this.data.event.Event_ID,
          file: this.fileToUpload
        }
      },
      context: {
        useMultipart: true
      }
    }).subscribe(({ data }) => {
      console.log(data);
    });
    console.log("Uploaded Certificate");
    this.dialogRef.close(this.eventForm.value); 
  }
  convertDate(edate){
    const myDate = new Date(0);
    const temp = parseFloat(edate) / 1000;
    myDate.setUTCSeconds(temp);
    return myDate;
  }

}
