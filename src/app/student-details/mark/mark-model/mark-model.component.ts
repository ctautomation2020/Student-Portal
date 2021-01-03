import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-mark-model',
  templateUrl: './mark-model.component.html',
  styleUrls: ['./mark-model.component.scss']
})
export class MarkModelComponent implements OnInit {
  markForm: FormGroup;
 
  edit_marks=[
          {course_code:"1", course_name:"Data Structures", grade:"O"},
          {course_code:"2", course_name:"Operating System", grade:"A+"},
          {course_code:"3", course_name:"Operating System", grade:"A+"}  
  ];
  fileToUpload;
  sizeValid: boolean=false;
  typeValid: boolean=false;
  fileSrc: String = "../../../../assets/sample.pdf";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private apollo: Apollo, public dialogRef: MatDialogRef<MarkModelComponent>) {
  }

  ngOnInit(): void {
    console.log(this.data.gpa);
    this.markForm = new FormGroup({
      Gpa: new FormControl(this.data.gpa.GPA,Validators.required),
      Grade: new FormControl("O",Validators.required),
      Session_Ref: new FormControl("dddd",Validators.required),
      file: new FormControl(""),
      Gpa_ID: new FormControl(this.data.gpa.Gpa_ID)
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

  onSubmit(){
    console.log(this.markForm.value);
    console.log(this.fileToUpload);
    const req = gql `
      mutation uploadStudentGpa($data: uploadStudentGpaInput!) {
        uploadStudentGpa(data: $data)
      }`;
    this.apollo.mutate({
      mutation: req,
      variables: {
        data:{
          Gpa_ID: this.data.gpa.Gpa_ID,
          file: this.fileToUpload
        }
      },
      context: {
        useMultipart: true
      }
    }).subscribe(({ data }) => {
      console.log(data);
    });
    this.dialogRef.close(this.markForm.value); 
  }

}
