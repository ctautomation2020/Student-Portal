import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import gql from 'graphql-tag';
import {Apollo, QueryRef} from 'apollo-angular';
import { StudentDetailsService } from './../student-details.service';
import { PersonReferenceModel } from './../person-reference.model';
import { MarkModelComponent } from './mark-model/mark-model.component';


@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss']
})
export class MarkComponent implements OnInit {

  sems: Array<number>;
  currentSem: number;
  sessions: PersonReferenceModel[];
  queryRef1: QueryRef<any>;
  queryRef2: QueryRef<any>;
  marks;
  semMarks;
  gpas;
  constructor(public dialog: MatDialog,private apollo: Apollo,public studentDetailsService: StudentDetailsService) { }

  ngOnInit(): void {
    const regNo: number = this.studentDetailsService.getRegisterNo();
	  const req1=gql`
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
    this.queryRef1 = this.apollo.watchQuery({
      query: req1,
      variables: {
      data: {
        Register_No: regNo
      }
    }
    });
  	this.queryRef1.valueChanges.subscribe(((result: any) => {
      this.marks = JSON.parse(JSON.stringify(result.data.studentRegisteredCourses));
      this.sems= new Array;
      for(let subj of this.marks){
        if(!this.sems.includes(subj.semester))
          this.sems.push(subj.semester);
      }
    }));
    const req2=gql`
	  query studentGpas($data:studentGpasQueryInput!){
      studentGpas(data:$data){
        Gpa_ID
        Register_No
        Semester
        GPA
        Grade_Sheet
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
      this.gpas = JSON.parse(JSON.stringify(result.data.studentGpas));
      console.log(this.gpas);

    }));
    this.studentDetailsService.getDropDown('Session').subscribe(result => {
      this.sessions = result;
      console.log(this.sessions);
    });
  }
  editModel(){
    const dialogRef = this.dialog.open(MarkModelComponent,{
      data:{
        currentSem: this.currentSem,
        gpa: this.filterGpa()
      }
    });
    dialogRef.afterClosed().subscribe(result => {
			if (result) {
        console.log(result);
        const req = gql `
				mutation updateStudentGpa($data: updateStudentGpaInput!){
          updateStudentGpa(data:$data){
            Gpa_ID
          }
        }`;
				this.apollo.mutate({
					mutation: req,
					variables: {
						data: {
              Gpa_ID: result.Gpa_ID,
              GPA: parseFloat(result.Gpa)
						}
					}
				}).subscribe(({ data }) => {
					console.log(data);
					this.queryRef2.refetch();
				});
			} 
		});
  }
  
  semFilter(semester){
    this.semMarks=this.marks.filter(l => l.semester === semester);
    this.currentSem=semester;
    console.log(this.semMarks);
  }

  filterGpa(){
    return this.gpas.filter(l => l.Semester === this.currentSem)[0];
  }
}
