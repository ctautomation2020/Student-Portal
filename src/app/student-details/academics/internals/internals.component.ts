import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import gql from 'graphql-tag';
import {Apollo, QueryRef} from 'apollo-angular';
import { AcademicsModel } from '../academics.model';
import { AcademicsService } from '../academics.service';
import { StudentDetailsService } from './../../student-details.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-internals',
  templateUrl: './internals.component.html',
  styleUrls: ['./internals.component.scss']
})
export class InternalsComponent implements OnInit {

  internals = [
    {type:"Assessment",number:"1",total_marks:"60",obtained_marks:"50",weightage:"5"},
    {type:"Assignment",number:"1",total_marks:"60",obtained_marks:"40",weightage:"5"},
    {type:"Assessment",number:"2",total_marks:"60",obtained_marks:"50",weightage:"15"},
    {type:"Assignment",number:"2",total_marks:"40",obtained_marks:"35",weightage:"5"},
    {type:"Assignment",number:"3",total_marks:"60",obtained_marks:"40",weightage:"10"}
  ];
  total;

  constructor(private academicsService: AcademicsService,private apollo: Apollo, private studentDetailsService: StudentDetailsService, 
        private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  courseTitle: string;
  cregst_id: number;
  session: AcademicsModel;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.cregst_id = +params['cregst_id'];
        const query = {
          reg_no:  this.studentDetailsService.getRegisterNo(),
          cregst_id: this.cregst_id
        }
        this.academicsService.getStudentCourses(query).subscribe((result: any) => {
          if(result.length == 0) {
            this.router.navigate(['/student-details', 'academics']);
          }
          else {
            console.log(result[0])
            this.courseTitle=result[0].course_list.title
            this.academicsService.getSession(result[0].session_ref).subscribe((session: any) => {
              this.session = session[0];
              console.log(session[0])
            });
            const query2 = {
              group_ref: result[0].group_ref,
              session_ref: result[0].session_ref,
              course_code: result[0].course_code
            }          
          }
        })
      });
      this.total = this.getTotal()
  }

  getTotal(){
     let total = {
        total_marks: 0,
        obtained_marks: 0,
        weightage: 0
     }
     for(let i=0;i<this.internals.length;i++){
        total.total_marks += Number(this.internals[i].total_marks)
        total.obtained_marks += Number(this.internals[i].obtained_marks)
        total.weightage += Number(this.internals[i].weightage)
     }
     return total
  }

}
