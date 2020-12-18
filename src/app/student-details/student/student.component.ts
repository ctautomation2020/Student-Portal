import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import gql from 'graphql-tag';
import {Apollo, QueryRef} from 'apollo-angular';

import { StudentModelComponent } from './student-model/student-model.component';
import { StudentModel } from './student.model';
import { PersonReferenceModel } from './../person-reference.model';
import { StudentDetailsService } from './../student-details.service';

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
          Correspondance_Address
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
          NSO_NSS_YRC_Volunteer_Ref
          Hostel_Block_Room
        }
      }`;
    
    this.queryRef = this.apollo
    .watchQuery<StudentModel>({
      query: req
    });
    this.queryRef.valueChanges.subscribe(((result: any) => {
      //console.log(result.data.student);
      this.student = JSON.parse(JSON.stringify(result.data.student));
      const temp1 = parseFloat(result.data.student.DOB) / 1000;
      const myDate1 = new Date(0);
      myDate1.setUTCSeconds(temp1);
      console.log(myDate1);
      this.student.DOB = myDate1 ;

      const temp2 = parseFloat(result.data.student.Admission_Date) / 1000;
      const myDate2 = new Date(0);
      myDate2.setUTCSeconds(temp2);
      console.log(myDate2);
      this.student.Admission_Date = myDate2 ;
      console.log(this.student);

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
    this.studentDetailsService.getDropDown('CNSS/NSO/YRC_Volunteer').subscribe(result => {
      this.volunteer = result;
    });
  }
  onOpenModel() {
    let dialogRef = this.dialog.open(StudentModelComponent, { 
      data: {
        student: this.student,
        gender: this.gender,
        community: this.community
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result.DOB);
        const d = new Date(result.DOB);
        const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        const req = gql `
        mutation updatePerson($data: updatePersonInput!) {
          updatePerson(data: $data) {
            Person_ID
            Marital_Status_Ref
          }
        }`;
        this.apollo.mutate({
          mutation: req,
          variables: {
            data: {
              Person_ID: result.Person_ID,
              Prefix_Ref: result.Prefix_Ref,
              PAN_Card: result.PAN_Card,
              First_Name: result.First_Name,
              Last_Name: result.Last_Name,
              Caste: result.Caste,
              Gender_Ref: result.Gender_Ref,
              Marital_Status_Ref: result.Marital_Status_Ref,
              Community_Ref: result.Community_Ref,
              Primary_MailID: result.Primary_MailID,
              Secondary_MailID: result.Secondary_MailID,
              Aadhar_Card: result.Aadhar_Card,
              Passport_Number: result.Passport_Number,
              DOB: date,
              Primary_ContactNumber: result.Primary_ContactNumber,
              Secondary_ContactNumber: result.Secondary_ContactNumber,
              Intercom_Number: result.Intercom_Number,
              Alias_Name: result.Alias_Name,
              Address_Line1: result.Address_Line1,
              Address_Line2: result.Address_Line2,
              Address_Line3: result.Address_Line3,
              Address_Line4: result.Address_Line4,
              Room_Num: result.Room_Num
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
    return this.volunteer.filter(l => l.Ref_Code === this.student.NSO_NSS_YRC_Volunteer_Ref)[0];
  }
}