import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import gql from 'graphql-tag';
import {Apollo, QueryRef} from 'apollo-angular';
import { StudentDetailsService } from './../student-details.service';
import { PersonReferenceModel } from './../person-reference.model';


@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss']
})
export class MarkComponent implements OnInit {

  course=[
          {no:"1",courseno:"CS6001",coursename:"Data Structures",Mark:"85",Grade:"A"},
          {no:"2",courseno:"CS6002",coursename:"Operating System",Mark:"80",Grade:"A"}
  ];

  sessions: PersonReferenceModel[];
  queryRef: QueryRef<any>;
  marks;
  constructor(public dialog: MatDialog,private apollo: Apollo,public studentDetailsService: StudentDetailsService) { }

  ngOnInit(): void {
    const regNo: number = this.studentDetailsService.getRegisterNo();
	  const req=gql`
	  query studentRegisteredCourses($data: studentRegisteredCoursesQueryInput){
      studentRegisteredCourses(data:$data){
        cregst_id
        course_code
        reg_no
        semester
        group_ref
        session_ref
        course_list{
          course_code
          stream
          regulation
          semester
          title
          credit
          objectives      
        }
      }
    }`;
    this.queryRef = this.apollo.watchQuery({
      query: req,
      variables: {
      data: {
        Register_No: regNo
      }
    }
    });
  	this.queryRef.valueChanges.subscribe(((result: any) => {
      this.marks = JSON.parse(JSON.stringify(result.data.studentRegisteredCourses));
      console.log(this.marks);
    }));
    this.studentDetailsService.getDropDown('Session').subscribe(result => {
      this.sessions = result;
      console.log(this.sessions);
    });
  }
  editModel(){
    
  }

}
