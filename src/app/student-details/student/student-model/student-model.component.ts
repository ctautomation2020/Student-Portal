import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-student-model',
  templateUrl: './student-model.component.html',
  styleUrls: ['./student-model.component.scss']
})
export class StudentModelComponent implements OnInit {
  studentForm: FormGroup;
  facultyadvisor = [
    {Category: 'facultyadvisor', Ref_Code: 5001, Ref_Name: "Ms.Dhanalaxmi"},
    {Category: 'facultyadvisor', Ref_Code: 5002, Ref_Name: "Ms.Cinu"},
    {Category: 'facultyadvisor', Ref_Code: 5003, Ref_Name: "Dr.Valliammai"},
    {Category: 'facultyadvisor', Ref_Code: 5004, Ref_Name: "Dr.Neelavathy"}
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
    console.log(this.data);
    this.studentForm = new FormGroup({
      First_Name: new FormControl(this.data.student.First_Name, Validators.required),
      Middle_Name: new FormControl(this.data.student.Middle_Name),
      Last_Name: new FormControl(this.data.student.Last_Name, Validators.required),
      Gender_Ref: new FormControl(this.data.student.Gender_Ref,Validators.required),
      DOB: new FormControl(this.data.student.DOB, Validators.required),
      Community_Ref: new FormControl(this.data.student.Community_Ref,Validators.required),
      Caste: new FormControl(this.data.student.Caste, Validators.required),
      MailID: new FormControl(this.data.student.MailID,Validators.email),
      Aadhar_Card: new FormControl(this.data.student.Aadhar_Card, [Validators.required, Validators.pattern('^[0-9]{12}$')]),
      Primary_ContactNumber: new FormControl(this.data.student.Primary_ContactNumber, [Validators.required,Validators.pattern('^[0-9]{10}$')]),
      Secondary_ContactNumber: new FormControl(this.data.student.Secondary_ContactNumber,[Validators.required,Validators.pattern('^[0-9]{10}$')]),
      Address_Line1: new FormControl(this.data.student.Address_Line1, Validators.required),
      Address_Line2: new FormControl(this.data.student.Address_Line2, Validators.required),
      Address_Line3: new FormControl(this.data.student.Address_Line3, Validators.required),
      Address_Line4: new FormControl(this.data.student.Address_Line4, [Validators.required, Validators.pattern('^[0-9]{6}$')]),
      isSame:new FormControl(),      
      Correspondance_Address: new FormControl(this.data.student.Correspondance_Address,Validators.required),
      Residential_Type_Ref: new FormControl(this.data.student.Residential_Type_Ref,Validators.required),
      FA: new FormControl(this.data.student.FA,Validators.required),
      Programme_Ref: new FormControl(this.data.student.Programme_Ref,Validators.required),
      Branch_Ref: new FormControl(this.data.student.Branch_Ref,Validators.required),
      Registration_Mode_Ref: new FormControl(this.data.student.Registration_Mode_Ref,Validators.required),
      Blood_Group_Ref: new FormControl(this.data.student.Blood_Group_Ref,Validators.required),
      GATE_Cutoff_Mark: new FormControl(this.data.student.GATE_Cutoff_Mark,[Validators.required,Validators.max(1000)]),
      Admission_Date: new FormControl(this.data.student.Admission_Date,Validators.required),
      Admission_Category_Ref: new FormControl(this.data.student.Admission_Category_Ref,Validators.required),
      Scholarship_Received_Ref: new FormControl(this.data.student.Scholarship_Received_Ref,Validators.required),
      Scholarship_Details: new FormControl(this.data.student.Scholarship_Details),
      NSO_NSS_YRC_Volunteer_Ref: new FormControl(131,Validators.required),
      Hostel_Block_Room: new FormControl(this.data.student.Hostel_Block_Room)
    });
    console.log(this.studentForm);
  }
  onSubmit() {
    console.log(this.studentForm.value);
    //this.dialogRef.close(this.studentForm.value);
  }
  cbox(){
    var cval=!(this.studentForm.value.isSame);
    var forms=this.studentForm.value;
    if(cval){
      this.studentForm.controls.Correspondance_Address.setValue(forms.Address_Line1+", "+forms.Address_Line2+", "+forms.Address_Line3+", "+forms.Address_Line4);
    }
    else{
      this.studentForm.controls.Correspondance_Address.setValue("");
    }
  }
}
