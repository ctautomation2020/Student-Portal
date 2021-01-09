import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicsModel } from '../academics.model';
import { AcademicsService } from '../academics.service';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss']
})

export class AssignmentListComponent implements OnInit {
  constructor(private academicsService: AcademicsService, private router: Router, private activatedRoute: ActivatedRoute) { }
  
  courseTitle: string = "Course Title";
  assignmentList: any = [
      "A1", "A2", "A3","A4"
  ];
  sallot_id: number = 0;
  //session: AcademicsModel;
  session = {reference_id: 2, description: "December 2020 - April 2021", category: "Session"};
  ngOnInit(): void {
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
