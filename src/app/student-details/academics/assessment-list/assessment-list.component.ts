import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicsModel } from '../academics.model';
import { AcademicsService } from '../academics.service';
import { StudentDetailsService } from './../../student-details.service';

@Component({
  selector: 'app-assessment-list',
  templateUrl: './assessment-list.component.html',
  styleUrls: ['./assessment-list.component.scss']
})

export class AssessmentListComponent implements OnInit {
  constructor(private academicsService: AcademicsService, private studentDetailsService: StudentDetailsService, private router: Router, private route: ActivatedRoute) { }
  courseTitle: string;
  assessList: any;
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
          this.academicsService.getAssessmentList(query2).subscribe((assessList: any) => {
            this.assessList = assessList;
            console.log(assessList)
          });
        }
      })
    });
    /* this.activatedRoute.params.subscribe(params => {
     this.sallot_id = +params['sallot_id'];
     const query = {
      sallot_id: this.sallot_id
     }
     this.academicsService.getCourseDetails(query).subscribe((result: any) => {
       if(result == null) {
         this.router.navigate(['/person-details', 'academics']);
       }
       else {
         console.log(result);

        this.academicsService.getSession(result.session_ref).subscribe((session) => {
          this.session = session[0];
        })
        this.academicsService.getCourse(result.course_code).subscribe((course: any) => {
          this.courseTitle = course.title;
        })
        const newQuery = {
          session_ref: result.session_ref,
          group_ref: result.group_ref,
          course_code: result.course_code
        }
        this.academicsService.getAssessmentList(newQuery).subscribe((assessList: any) => {
          this.assessList = assessList.sort();
        });
       }
     })
    }) */
  }
}
