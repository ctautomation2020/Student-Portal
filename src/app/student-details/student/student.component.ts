import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import gql from 'graphql-tag';
import {Apollo, QueryRef} from 'apollo-angular';

import { StudentModelComponent } from './student-model/student-model.component';
import { StudentModel } from './student.model';
import { PersonReferenceModel } from './../person-reference.model';
import { StudentDetailsService } from './../student-details.service';
import { PersonModel } from './../person.model';
import { ImageModelComponent } from './image-model/image-model.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  gender: PersonReferenceModel[];
  community: PersonReferenceModel[];
  residentialType: PersonReferenceModel[];
  programme: PersonReferenceModel[];
  branch: PersonReferenceModel[];
  registrationMode: PersonReferenceModel[];
  bloodGroup: PersonReferenceModel[];
  admissionCategory: PersonReferenceModel[];
  scholarshipReceived: PersonReferenceModel[];
  volunteer: PersonReferenceModel[];
  student: StudentModel;
  facultyAdvisors: PersonModel[];
  queryRef: QueryRef<StudentModel, any>;

  constructor(public dialog: MatDialog,private apollo: Apollo,public studentDetailsService: StudentDetailsService) { }
  ngOnInit(): void {
    const id: number = this.studentDetailsService.getRegisterNo();
    console.log(id);
    const req=gql`
      query student{
        student{
          Register_No
          First_Name
          Middle_Name
          Last_Name
          Gender_Ref
          DOB
          Community_Ref
          Caste
          MailID
          Aadhar_Card
          Primary_ContactNumber
          Secondary_ContactNumber
          Address_Line1
          Address_Line2
          Address_Line3
          Address_Line4
          Correspondence_Address
          Residential_Type_Ref
          FA
          Programme_Ref
          Branch_Ref
          Registration_Mode_Ref
          Blood_Group_Ref
          GATE_Cutoff_Mark
          Admission_Date
          Admission_Category_Ref
          Scholarship_Received_Ref
          Scholarship_Details
          NSS_NSO_YRC_Volunteer_Ref
          Hostel_Block_Room
        }
      }`;
    
    this.queryRef = this.apollo
    .watchQuery<StudentModel>({
      query: req
    });
    this.queryRef.valueChanges.subscribe(((result: any) => {
      this.student = JSON.parse(JSON.stringify(result.data.student));
      const temp1 = parseFloat(result.data.student.DOB) / 1000;
      const myDate1 = new Date(0);
      myDate1.setUTCSeconds(temp1);
      //console.log(myDate1);
      this.student.DOB = myDate1 ;

      const temp2 = parseFloat(result.data.student.Admission_Date) / 1000;
      const myDate2 = new Date(0);
      myDate2.setUTCSeconds(temp2);
      //console.log(myDate2);
      this.student.Admission_Date = myDate2 ;

    }));
    this.studentDetailsService.getDropDown('Gender').subscribe(result => {
      this.gender = result;
    });
    this.studentDetailsService.getDropDown('Community').subscribe(result => {
      this.community = result;
    });
    this.studentDetailsService.getDropDown('Residential_Type').subscribe(result => {
      this.residentialType = result;
    });
    this.studentDetailsService.getDropDown('Programme').subscribe(result => {
      this.programme = result;
    });
    this.studentDetailsService.getDropDown('Branch').subscribe(result => {
      this.branch = result;
    });
    this.studentDetailsService.getDropDown('Registration_Mode').subscribe(result => {
      this.registrationMode = result;
    });
    this.studentDetailsService.getDropDown('Blood_Group').subscribe(result => {
      this.bloodGroup = result;
    });
    this.studentDetailsService.getDropDown('Admission_Category').subscribe(result => {
      this.admissionCategory = result;
    });
    this.studentDetailsService.getDropDown('Option').subscribe(result => {
      this.scholarshipReceived = result;
    });
    this.studentDetailsService.getDropDown('NSS/NSO/YRC_Volunteer').subscribe(result => {
      this.volunteer = result;
    });
    this.studentDetailsService.getFA().subscribe(result =>{
      this.facultyAdvisors=result;
    })
    
  }
  convertDate(inputDate:any){
    if(inputDate.isMomentObject){
      inputDate=inputDate._d;
    }
    const dt=new Date(inputDate);
    const date=new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()));
    return date;
  }

  onOpenModel() {
    let dialogRef = this.dialog.open(StudentModelComponent, { 
      data: {
        student: this.student,
        gender: this.gender,
        community: this.community,
        residentialType:this.residentialType,
        programme:this.programme,
        branch:this.branch,
        registrationMode:this.registrationMode,
        bloodGroup:this.bloodGroup,
        admissionCategory:this.admissionCategory,
        scholarshipReceived:this.scholarshipReceived,
        volunteer:this.volunteer,
        facultyAdvisors:this.facultyAdvisors
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        const date1=this.convertDate(result.DOB);
        const date2=this.convertDate(result.Admission_Date);
        console.log(date1);
        console.log(date2);
        const aadata=result.Aadhar_Card.toString();
        console.log(aadata);
        const req = gql `
        mutation updateStudent($data: updateStudentInput!) {
          updateStudent(data: $data) {
            Register_No
          }
        }`;
        this.apollo.mutate({
          mutation: req,
          variables: {
            data: {
              Register_No: result.Register_No,
              First_Name: result.First_Name,
              Middle_Name: result.Middle_Name,
              Last_Name: result.Last_Name,
              Gender_Ref: result.Gender_Ref,
              DOB: date1,
              Community_Ref: result.Community_Ref,
              Caste: result.Caste,
              MailID: result.MailID,
              Aadhar_Card: aadata,
              Primary_ContactNumber: result.Primary_ContactNumber,
              Secondary_ContactNumber: result.Secondary_ContactNumber,
              Address_Line1: result.Address_Line1,
              Address_Line2: result.Address_Line2,
              Address_Line3: result.Address_Line3,
              Address_Line4: result.Address_Line4,
              Correspondence_Address: result.Correspondence_Address,
              Residential_Type_Ref: result.Residential_Type_Ref,
              FA: result.FA,
              Programme_Ref: result.Programme_Ref,
              Branch_Ref: result.Branch_Ref,
              Registration_Mode_Ref: result.Registration_Mode_Ref,
              Blood_Group_Ref: result.Blood_Group_Ref,
              GATE_Cutoff_Mark: result.GATE_Cutoff_Mark,
              Admission_Date: date2,
              Admission_Category_Ref: result.Admission_Category_Ref,
              Scholarship_Received_Ref: result.Scholarship_Received_Ref,
              Scholarship_Details: result.Scholarship_Details,
              NSS_NSO_YRC_Volunteer_Ref: result.NSS_NSO_YRC_Volunteer_Ref,
              Hostel_Block_Room: result.Hostel_Block_Room
            }
          }
        }).subscribe(({ data }) => {
          console.log(data);
          this.queryRef.refetch();
        });
      }
    });
  }
  filterGender(): PersonReferenceModel {
    return this.gender.filter(l => l.Ref_Code === this.student.Gender_Ref)[0];
  }
  filterCommunity(): PersonReferenceModel {
    return this.community.filter(l => l.Ref_Code === this.student.Community_Ref)[0];
  }
  filterResidentialType(): PersonReferenceModel {
    return this.residentialType.filter(l => l.Ref_Code === this.student.Residential_Type_Ref)[0];
  }
  filterProgramme(): PersonReferenceModel {
    return this.programme.filter(l => l.Ref_Code === this.student.Programme_Ref)[0];
  }
  filterBranch(): PersonReferenceModel {
    return this.branch.filter(l => l.Ref_Code === this.student.Branch_Ref)[0];
  }
  filterRegistrationMode(): PersonReferenceModel {
    return this.registrationMode.filter(l => l.Ref_Code === this.student.Registration_Mode_Ref)[0];
  }
  filterBloodGroup(): PersonReferenceModel {
    return this.bloodGroup.filter(l => l.Ref_Code === this.student.Blood_Group_Ref)[0];
  }
  filterAdmissionCategory(): PersonReferenceModel {
    return this.admissionCategory.filter(l => l.Ref_Code === this.student.Admission_Category_Ref)[0];
  }
  filterScholarshipReceived(): PersonReferenceModel {
    return this.scholarshipReceived.filter(l => l.Ref_Code === this.student.Scholarship_Received_Ref)[0];
  }
  filterVolunteer(): PersonReferenceModel {
    return this.volunteer.filter(l => l.Ref_Code === this.student.NSS_NSO_YRC_Volunteer_Ref)[0];
  }
  openImageUpload(){
    let dialogRef = this.dialog.open(ImageModelComponent);
  }
}