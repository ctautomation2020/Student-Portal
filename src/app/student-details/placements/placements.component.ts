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
  placementOpen: boolean = true;
  pColor: string = "#0f5b99";
  hColor: String = "#1982e4";
  
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
    this.placementOpen = true;
    this.pColor = "#0f5b99";
    this.hColor = "#1982e4";
	}

	higherStudiesModel(){
		this.placementOpen = false;
    this.hColor = "#0f5b99";
    this.pColor = "#1982e4";
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
    let placement=this.placements.filter((q) => q.Placement_ID === id)
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
    const dialogRef = this.dialog.open(AlertboxComponent);
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
    const dialogRef = this.dialog.open(HigherstudiesModelComponent,{
      data:{
        higherstudy: null,
        admissionMode: this.admissionMode
      }
    });
    dialogRef.afterClosed().subscribe(result => {
			if (result) {
        const req = gql `
				mutation createStudentHigherStudy($data: createStudentHigherStudyInput!){
          createStudentHigherStudy(data:$data){
            HigherStudies_ID
          }
        }`;
				this.apollo.mutate({
					mutation: req,
					variables: {
						data: {
              University: result.University,
              Degree: result.Degree,
              Specialization: result.Specialization,
              Admission_Mode_Ref: result.Admission_Mode_Ref,
              Score: parseFloat(result.Score),
              Country: result.Country,
              Location: result.Location,
              LOR_Details: result.LOR_Details,
              Score_Card_Copy: ""         
						}
					}
				}).subscribe(({ data }) => {
					console.log(data);
					this.queryRef2.refetch();
				});
			} 
		});
	}
	editHigherStudies(id:number){
    let higherstudy=this.higherStudies.filter((q) => q.HigherStudies_ID === id)
    const dialogRef = this.dialog.open(HigherstudiesModelComponent,{
      data:{
        higherstudy: higherstudy[0],
        admissionMode: this.admissionMode
      }
    });
    dialogRef.afterClosed().subscribe(result => {
			if (result) {
        const req = gql `
				mutation updateStudentHigherStudy($data: updateStudentHigherStudyInput!){
          updateStudentHigherStudy(data:$data){
            HigherStudies_ID
          }
        }`;
				this.apollo.mutate({
					mutation: req,
					variables: {
						data: {
              HigherStudies_ID: id,
              University: result.University,
              Degree: result.Degree,
              Specialization: result.Specialization,
              Admission_Mode_Ref: result.Admission_Mode_Ref,
              Score: parseFloat(result.Score),
              Country: result.Country,
              Location: result.Location,
              LOR_Details: result.LOR_Details           
						}
					}
				}).subscribe(({ data }) => {
					console.log(data);
					this.queryRef2.refetch();
				});
			} 
		});
  }
  deleteHigherStudies(id:number){
    const dialogRef = this.dialog.open(AlertboxComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        const req = gql `
        mutation deleteStudentHigherStudy($data: deleteStudentHigherStudyInput!){
          deleteStudentHigherStudy(data:$data){
            HigherStudies_ID
          }
        }`;
        this.apollo.mutate({
        mutation: req,
        variables: {
          data: {
            HigherStudies_ID: id
          }
        }}).subscribe(({ data }) => {
          this.queryRef2.refetch();
        });
      }
    });
  }

  filterAdmissionMode(stype): PersonReferenceModel {
    return this.admissionMode.filter(l => l.Ref_Code === stype)[0];
  }
  filterPlacementType(stype): PersonReferenceModel {
    return this.placementType.filter(l => l.Ref_Code === stype)[0];
  }
  
}
