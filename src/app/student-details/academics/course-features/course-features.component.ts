import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicsModel } from '../academics.model';
import { AcademicsService } from '../academics.service';

@Component({
  selector: 'app-course-features',
  templateUrl: './course-features.component.html',
  styleUrls: ['./course-features.component.scss']
})
export class CourseFeaturesComponent implements OnInit {

  constructor(private academicsService: AcademicsService, private router: Router, private route: ActivatedRoute) { }
  
  courseTitle: string = "Course Title";
  sallot_id: number = 0;
  //session: AcademicsModel;
  session = {reference_id: 2, description: "December 2020 - April 2021", category: "Session"};
  faculty = {
	  name: "Thanasekhar B",
	  designation: "Associate Professor",
	  course: "Data Structures & Algorithms",
	  email: "thanasekhar@gmail.com",
	  mobile: "6835428909"
  }
  ngOnInit(): void {
    /* this.route.params.subscribe(params => {
     this.sallot_id = +params['sallot_id'];
     const query = {
      sallot_id: this.sallot_id
     }
     this.academicsService.getCourseDetails(query).subscribe((result: any) => {
       if(result == null) {
         this.router.navigate(['/student-details', 'academics']);
       }
       else {
         console.log(result);
         this.academicsService.getSession(result.session_ref).subscribe((session) => {
          this.session = session[0];
          })
        this.academicsService.getCourse(result.course_code).subscribe((course: any) => {
          this.courseTitle = course.title;
        })
       }
     })
    }) */
  }

}
/*
head: {
		    alignment: 'center',
			bold: true
		},
		subhead: {
			margin: [0, 6, 0, 0]
		},
		center: {
		    alignment: 'center'
		},
{
			style: 'tableExample',
			table: {
				widths: [20, '*', 35, 20,20],
				body: [
					[{text: 'Sl.No', style: 'head'}, {text: 'Question', style: ['head', 'subhead']}, {text: 'Marks',style: ['head', 'subhead']}, {text: 'CO', style: ['head', 'subhead']}, {text: 'BL', style: ['head','subhead']}],
					[{text: 'PART A (5 x 2 = 10 Marks)', alignment: 'center',
		  colSpan: 5, bold: true}, {}, {}, {}, {}],
					['1.', 'What are the different types of languages that are available in the DBMS?' ,{text: '2', style: ['center']},
					{text: '3', style: ['center']},
					{text: 'L.2', style: ['center']}],
					['2.', 'What are the different types of languages that are available in the DBMS?' ,{text: '2', style: ['center']},
					{text: '3', style: ['center']},
					{text: 'L.2', style: ['center']}],
					['3.', 'What are the different types of languages that are available in the DBMS?' ,{text: '2', style: ['center']},
					{text: '3', style: ['center']},
					{text: 'L.2', style: ['center']}],
					['4.', 'What are the different types of languages that are available in the DBMS?' ,{text: '2', style: ['center']},
					{text: '3', style: ['center']},
					{text: 'L.2', style: ['center']}],
					['5.', 'What are the different types of languages that are available in the DBMS?' ,{text: '2', style: ['center']},
					{text: '3', style: ['center']},
					{text: 'L.2', style: ['center']}]
				]
			}
		}


*/
