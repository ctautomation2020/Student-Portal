import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-student-model',
  templateUrl: './student-model.component.html',
  styleUrls: ['./student-model.component.scss']
})
export class StudentModelComponent implements OnInit {
  studentForm: FormGroup;
  gender = [
    {Ref_Code:66,Ref_Name:"Male"},
    {Ref_Code:67,Ref_Name:"Female"}
  ]
  community = [
    {Category: "Community", Ref_Code: 5, Ref_Name: "Backward Community"},
    {Category: "Community", Ref_Code: 6, Ref_Name: "Most Backward Classes"},
    {Category: "Community", Ref_Code: 7, Ref_Name: "Denotified Communities"},
    {Category: "Community", Ref_Code: 8, Ref_Name: "Scheduled Castes"},
    {Category: "Community", Ref_Code: 9, Ref_Name: "Scheduled Tribes"},
    {Category: "Community", Ref_Code: 10, Ref_Name: "Backward Classes Muslims"},
    {Category: "Community", Ref_Code: 11, Ref_Name: "Others"}
  ]
  residentialtype = [
    {Category: 'Residential', Ref_Code: 96, Ref_Name: "Hostel"},
    {Category: 'Residential', Ref_Code: 97, Ref_Name: "Day Scholar"},
    {Category: 'Residential', Ref_Code: 98, Ref_Name: "PG Accomodation"}, 
  ]
  facultyadvisor = [
    {Category: 'facultyadvisor', Ref_Code: 5001, Ref_Name: "Ms.Dhanalaxmi"},
    {Category: 'facultyadvisor', Ref_Code: 5002, Ref_Name: "Ms.Cinu"},
    {Category: 'facultyadvisor', Ref_Code: 5003, Ref_Name: "Dr.Valliammai"},
    {Category: 'facultyadvisor', Ref_Code: 5004, Ref_Name: "Dr.Neelavathy"}
  ]
  programme = [
    {Category: "programme", Ref_Code: 99, Ref_Name: "B.E"},
    {Category: "programme", Ref_Code: 100, Ref_Name: "M.E"}
  ]
  branch = [
    {Category: "branch", Ref_Code: 26, Ref_Name: "CSE"}
  ]
  registration = [
    {Category: "registration", Ref_Code: 88, Ref_Name: "Full Time"},
    {Category: "registration", Ref_Code: 89, Ref_Name: "Part Time"}
  ]
  bloodgroup = [
    {Category: "bloodgroup", Ref_Code: 121, Ref_Name: "O+ve"},
    {Category: "bloodgroup", Ref_Code: 122, Ref_Name: "A+ve"},
    {Category: "bloodgroup", Ref_Code: 123, Ref_Name: "A-ve"},
    {Category: "bloodgroup", Ref_Code: 124, Ref_Name: "AB-ve"},
    {Category: "bloodgroup", Ref_Code: 125, Ref_Name: "O-ve"},
    {Category: "bloodgroup", Ref_Code: 126, Ref_Name: "B+ve"},
    {Category: "bloodgroup", Ref_Code: 127, Ref_Name: "B-ve"},
    {Category: "bloodgroup", Ref_Code: 128, Ref_Name: "AB+ve"},
  ]
  admission = [
    {Category: "admission", Ref_Code: 90, Ref_Name: "Counselling"},
    {Category: "admission", Ref_Code: 91, Ref_Name: "Sports"},
    {Category: "admission", Ref_Code: 92, Ref_Name: "NRI"},
    {Category: "admission", Ref_Code: 93, Ref_Name: "Founders Quota"},
    {Category: "admission", Ref_Code: 94, Ref_Name: "Industrial Consortium"},
    {Category: "admission", Ref_Code: 95, Ref_Name: "Others"}
  ]
  scholarship = [
    {Category: "scholarship", Ref_Code: 86, Ref_Name: "Yes"},
    {Category: "scholarship", Ref_Code: 87, Ref_Name: "No"}
  ]
  volunteer = [
    {Category: "volunteer", Ref_Code: 129, Ref_Name: "NSS"},
    {Category: "volunteer", Ref_Code: 130, Ref_Name: "NSO"},
    {Category: "volunteer", Ref_Code: 131, Ref_Name: "YRC"}
  ]
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private apollo: Apollo,public dialogRef: MatDialogRef<StudentModelComponent>) {
  }

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      First_Name: new FormControl("Sivaganesh", Validators.required),
      Middle_Name: new FormControl(),
      Last_Name: new FormControl("B", Validators.required),
      Gender_Ref: new FormControl(66,Validators.required),
      DOB: new FormControl(new Date(2000,2,19), Validators.required),
      Community_Ref: new FormControl(11,Validators.required),
      Caste: new FormControl("caste", Validators.required),
      MailID: new FormControl("sivaganeshb193@gmail.com",Validators.email),
      Aadhar_Card: new FormControl("999988887777", [Validators.required, Validators.pattern('^[0-9]{12}$')]),
      PAN_Card: new FormControl("BNZAA2318J", [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]),
      Passport_Number: new FormControl("ABC1DE45", [Validators.required, Validators.pattern('^[A-Z0-9]{8}$')]),
      Primary_ContactNumber: new FormControl("8105101571", [Validators.required,Validators.pattern('^[0-9]{10}$')]),
      Secondary_ContactNumber: new FormControl("8778280542",[Validators.required,Validators.pattern('^[0-9]{10}$')]),
      Address_Line1: new FormControl("line1", Validators.required),
      Address_Line2: new FormControl("line2", Validators.required),
      Address_Line3: new FormControl("line3", Validators.required),
      Address_Line4: new FormControl("635109", [Validators.required, Validators.pattern('^[0-9]{6}$')]),
      Correspondance_Address: new FormControl("lines",Validators.required),
      Residential_Type_Ref: new FormControl(96,Validators.required),
      FA: new FormControl(5002,Validators.required),
      Programme_Ref: new FormControl(100,Validators.required),
      Branch_Ref: new FormControl(26,Validators.required),
      Registration_Mode_Ref: new FormControl(88,Validators.required),
      Blood_Group_Ref: new FormControl(121,Validators.required),
      GATE_Cutoff_Mark: new FormControl("197",[Validators.required,Validators.max(1000)]),
      Admission_Date: new FormControl(new Date(2000,7,14),Validators.required),
      Admission_Category_Ref: new FormControl(90,Validators.required),
      Scholarship_Received_Ref: new FormControl(86,Validators.required),
      Scholarship_Details: new FormControl("MITAA"),
      NSO_NSS_YRC_Volunteer_Ref: new FormControl(129,Validators.required),
      Hostel_Block_Room: new FormControl("3019",Validators.required)
    });
  }
  onSubmit() {
    console.log(this.studentForm.value);
    //this.dialogRef.close(this.studentForm.value);
  }

}
