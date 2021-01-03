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

  higherStudiesForm: FormGroup;
  fileSrc: String = "../../../../assets/sample.pdf";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private apollo: Apollo, public dialogRef: MatDialogRef<HigherstudiesModelComponent>) {
  }

  ngOnInit(): void {
    this.higherStudiesForm = new FormGroup({
      University: new FormControl(this.data.higherstudy!=null?this.data.higherstudy.University:"", Validators.required),
      Degree: new FormControl(this.data.higherstudy!=null?this.data.higherstudy.Degree:"", Validators.required),
      Specialization: new FormControl(this.data.higherstudy!=null?this.data.higherstudy.Specialization:"", Validators.required),
      Admission_Mode_Ref: new FormControl(this.data.higherstudy!=null?this.data.higherstudy.Admission_Mode_Ref:"", Validators.required),
      Score: new FormControl(this.data.higherstudy!=null?this.data.higherstudy.Score:"", Validators.required),
      Country: new FormControl(this.data.higherstudy!=null?this.data.higherstudy.Country:"", Validators.required),
      Location: new FormControl(this.data.higherstudy!=null?this.data.higherstudy.Location:"", Validators.required),
      LOR_Details: new FormControl(this.data.higherstudy!=null?this.data.higherstudy.LOR_Details:"", Validators.required),
      Score_Card_Copy: new FormControl(this.data.higherstudy!=null?this.data.higherstudy.Score_Card_Copy:"") 
    });
  }

  onSubmit() {
      console.log(this.higherStudiesForm.value);
      this.dialogRef.close(this.higherStudiesForm.value);
  }

}
