import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-family-model',
  templateUrl: './family-model.component.html',
  styleUrls: ['./family-model.component.scss']
})

export class FamilyModelComponent implements OnInit {
  familyForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private apollo: Apollo,public dialogRef: MatDialogRef<FamilyModelComponent>) {
  }

  ngOnInit(): void {
    this.familyForm = new FormGroup({
      Father_Name: new FormControl("Name1", Validators.required),
      Mother_Name: new FormControl("Name2", Validators.required),
      Father_ContactNumber: new FormControl("9999999999", [Validators.required,Validators.pattern('^[0-9]{10}$')]),
      Mother_ContactNumber: new FormControl("8888888888", [Validators.required,Validators.pattern('^[0-9]{10}$')]),
      Father_MailID: new FormControl("father@email.com",Validators.email),
      Mother_MailID: new FormControl("mother@email.com",Validators.email),
      Father_Occupation: new FormControl("O1", Validators.required),
      Mother_Occupation: new FormControl("O2", Validators.required),
      Father_Affilation: new FormControl("Affilation", Validators.required),
      Mother_Affilation: new FormControl("Affilation", Validators.required),
      Father_Company: new FormControl(),
      Mother_Company: new FormControl(),
      Parents_Annual_Income: new FormControl(),
      Local_Guardian_Name: new FormControl("Name3", Validators.required),
      Local_Guardian_Address: new FormControl(),
      Local_Guardian_Contact_Number: new FormControl("7777777777", [Validators.required,Validators.pattern('^[0-9]{10}$')])
    });
  }
  onSubmit() {
    console.log(this.familyForm.value);
    //this.dialogRef.close(this.studentForm.value);
  }

}
