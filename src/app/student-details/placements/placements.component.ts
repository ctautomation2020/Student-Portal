import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import gql from 'graphql-tag';
import {Apollo, QueryRef} from 'apollo-angular';
import { StudentDetailsService } from './../student-details.service';
import { PersonReferenceModel } from './../person-reference.model';

import {PlacementsModel} from './placements.model';
import { PlacementsModelComponent } from './placements-model/placements-model.component';
import { HigherStudiesModel } from './higherstudies.model';
import { HigherstudiesModelComponent } from './higherstudies-model/higherstudies-model.component';
import { AlertboxComponent } from './../../shared/alertbox/alertbox.component';


@Component({
  selector: 'app-placements',
  templateUrl: './placements.component.html',
  styleUrls: ['./placements.component.scss']
})
export class PlacementsComponent implements OnInit {
  placements: PlacementsModel[];
  placementType: PersonReferenceModel[];
  queryRef1: QueryRef<PlacementsModel[], any>;
  higherStudies: HigherStudiesModel[];
  admissionMode: PersonReferenceModel[];
  queryRef2: QueryRef<HigherStudiesModel[], any>;
  val: boolean = true;

	higherstudies_order=[
		{no:"1",university:"xxx1",Degree:"zzz1",specialization:"yyy1",score:"123",country:"xyz"},
		{no:"2",university:"xxx2",Degree:"zzz2",specialization:"yyy2",score:"123",country:"xyz"},
	];
  
  constructor(public dialog: MatDialog,private apollo: Apollo,public studentDetailsService: StudentDetailsService) { }

  convertDate(inputDate:any){
    if(inputDate.isMomentObject){
      inputDate=inputDate._d;
    }
    const dt=new Date(inputDate);
    const date=new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()));
    return date;
  }

  ngOnInit(): void {
    const regNo: number = this.studentDetailsService.getRegisterNo();
    const req1=gql`
	  query studentPlacements($data:studentPlacementsQueryInput!){
      studentPlacements(data:$data) {
        Placement_ID
        Register_No
        Company
        Package
        Appointment_Order_Copy
        Location
        Designation
        Appointment_OrderNum
        Appointment_Letter_IssueDate
        Joining_Date
        Placement_Type_Ref
      }
    }`;
    this.queryRef1 = this.apollo.watchQuery({
      query: req1,
      variables: {
      data: {
        Register_No: regNo
      }
    }
    });
  	this.queryRef1.valueChanges.subscribe(((result: any) => {
      this.placements = JSON.parse(JSON.stringify(result.data.studentPlacements));
      console.log(this.placements);
    }));
    this.studentDetailsService.getDropDown('Placement_Type').subscribe(result => {
      this.placementType = result;
      console.log(this.placementType);
    });
    const req2=gql`
	  query studentHigherStudies($data:studentHigherStudiesQueryInput!){
      studentHigherStudies(data:$data) {
        HigherStudies_ID
        Register_No
        University
        Degree
        Specialization
        Admission_Mode_Ref
        Score
        Country
        Location
        LOR_Details
        Score_Card_Copy
      }
    }`;
    this.queryRef2 = this.apollo.watchQuery({
      query: req2,
      variables: {
      data: {
        Register_No: regNo
      }
    }
    });
  	this.queryRef2.valueChanges.subscribe(((result: any) => {
      this.higherStudies = JSON.parse(JSON.stringify(result.data.studentHigherStudies));
      console.log(this.higherStudies);
    }));
    this.studentDetailsService.getDropDown('Admission_Mode').subscribe(result => {
      this.admissionMode = result;
      console.log(this.admissionMode);
    });
    
  }

	placementsModel(){
		this.val=true;
	}

	higherStudiesModel(){
		this.val=false;
	}

	createPlacement(){
    const dialogRef = this.dialog.open(PlacementsModelComponent,{
      data:{
        placement: null,
        placementType: this.placementType
      }
    });
    dialogRef.afterClosed().subscribe(result => {
			if (result) {
        const date1=this.convertDate(result.Appointment_Letter_IssueDate);
        const date2=this.convertDate(result.Joining_Date);
        const req = gql `
				mutation createStudentPlacement($data: createStudentPlacementInput!){
          createStudentPlacement(data:$data){
            Placement_ID
          }
        }`;
				this.apollo.mutate({
					mutation: req,
					variables: {
						data: {
              Company: result.Company,
              Package: parseFloat(result.Package),
              Appointment_Order_Copy: "",
              Location: result.Location,
              Designation: result.Designation,
              Appointment_OrderNum: result.Appointment_OrderNum,
              Appointment_Letter_IssueDate: date1,
              Joining_Date: date2,
              Placement_Type_Ref: result.Placement_Type_Ref
						}
					}
				}).subscribe(({ data }) => {
					console.log(data);
					this.queryRef1.refetch();
				});
			} 
		});
  }
	editPlacement(id:number){
    const placement=this.placements.filter((q) => q.Placement_ID === id)
    console.log(placement[0]);
    const dialogRef = this.dialog.open(PlacementsModelComponent,{
      data:{
        placement: placement[0],
        placementType: this.placementType
      }
    });
    dialogRef.afterClosed().subscribe(result => {
			if (result) {
        const date1=this.convertDate(result.Appointment_Letter_IssueDate);
        const date2=this.convertDate(result.Joining_Date);
        const req = gql `
				mutation updateStudentPlacement($data: updateStudentPlacementInput!){
          updateStudentPlacement(data:$data){
            Placement_ID
          }
        }`;
				this.apollo.mutate({
					mutation: req,
					variables: {
						data: {
              Placement_ID: id,
              Company: result.Company,
              Package: parseFloat(result.Package),
              Appointment_Order_Copy: "",
              Location: result.Location,
              Designation: result.Designation,
              Appointment_OrderNum: result.Appointment_OrderNum,
              Appointment_Letter_IssueDate: date1,
              Joining_Date: date2,
              Placement_Type_Ref: result.Placement_Type_Ref
						}
					}
				}).subscribe(({ data }) => {
					console.log(data);
					this.queryRef1.refetch();
				});
			} 
		});
  }
  deletePlacement(id:number){
    let dialogRef = this.dialog.open(AlertboxComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        const req = gql `
        mutation deleteStudentPlacement($data: deleteStudentPlacementInput!){
          deleteStudentPlacement(data:$data){
            Placement_ID
          }
        }`;
        this.apollo.mutate({
        mutation: req,
        variables: {
          data: {
            Placement_ID: id
          }
        }}).subscribe(({ data }) => {
          this.queryRef1.refetch();
        });
      }
    });
  }

	createHigherStudies(){
		let dialogRef = this.dialog.open(HigherstudiesModelComponent);
	}
	editHigherStudies(){
		let dialogRef = this.dialog.open(HigherstudiesModelComponent);
  }
  deleteHigherStudies(){
    let dialogRef = this.dialog.open(AlertboxComponent);
  }

  filterAdmissionMode(stype): PersonReferenceModel {
    return this.admissionMode.filter(l => l.Ref_Code === stype)[0];
  }
  filterPlacementType(stype): PersonReferenceModel {
    return this.placementType.filter(l => l.Ref_Code === stype)[0];
  }
  
}
