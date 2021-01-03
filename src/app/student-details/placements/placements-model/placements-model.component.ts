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
  selector: 'app-placements-model',
  templateUrl: './placements-model.component.html',
  styleUrls: ['./placements-model.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class PlacementsModelComponent implements OnInit {

  placementsForm: FormGroup;
  fileSrc: String = "../../../../assets/sample.pdf";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private apollo: Apollo, public dialogRef: MatDialogRef<PlacementsModelComponent>) {}

  ngOnInit(): void {
    this.placementsForm = new FormGroup({
      Company: new FormControl(this.data.placement!=null?this.data.placement.Company:"", Validators.required),
      Package: new FormControl(this.data.placement!=null?this.data.placement.Package:"", Validators.required),
      Location: new FormControl(this.data.placement!=null?this.data.placement.Location:"", Validators.required),
      Designation: new FormControl(this.data.placement!=null?this.data.placement.Designation:"", Validators.required),
      Appointment_OrderNum: new FormControl(this.data.placement!=null?this.data.placement.Appointment_OrderNum:"", Validators.required),
      Appointment_Letter_IssueDate: new FormControl(this.data.placement!=null?this.convertDate(this.data.placement.Appointment_Letter_IssueDate):"", Validators.required),
      Appointment_Order_Copy: new FormControl(this.data.placement!=null?this.data.placement.Appointment_Order_Copy:""),
      Joining_Date: new FormControl(this.data.placement!=null?this.convertDate(this.data.placement.Joining_Date):"", Validators.required),
      Placement_Type_Ref: new FormControl(this.data.placement!=null?this.data.placement.Placement_Type_Ref:"", Validators.required)
    });
  }

  onSubmit() {
    console.log(this.placementsForm.value);
    this.dialogRef.close(this.placementsForm.value);
  }
  convertDate(edate){
    const myDate = new Date(0);
    const temp = parseFloat(edate) / 1000;
    myDate.setUTCSeconds(temp);
    return myDate;
  }

}
