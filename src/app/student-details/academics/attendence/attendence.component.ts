import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { AttendenceModel } from './attendence.model';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.scss']
})
export class AttendenceComponent implements OnInit {
  /*
  attendence: AttendenceModel[] = [
    {
      cattend_id: 1,
      course_code: 'CS7207',
      reg_no: 2017503037,
      date: new Date('12/12/2020'),
      presence: 'present'
    },
    {
      cattend_id: 2,
      course_code: 'CS7207',
      reg_no: 2017503537,
      date: new Date('12/12/2020'),
      presence: 'present'
    },
    {
      cattend_id: 3,
      course_code: 'CS7207',
      reg_no: 2017503027,
      date: new Date('12/12/2020'),
      presence: 'absent'
    },
    {
      cattend_id: 4,
      course_code: 'CS7207',
      reg_no: 2017503047,
      date: new Date('12/12/2020'),
      presence: 'absent'
    }
  ]; */

  attendence = [
    {
      date: new Date('08/12/2020'),
      course_code: 'CS7207',
    },
    {
      date: new Date('09/12/2020'),
      course_code: 'CS7207',
    },
    {
      date: new Date('10/12/2020'),
      course_code: 'CS7207',
    },
    {
      date: new Date('11/12/2020'),
      course_code: 'CS7207',
    }
  ]

  constructor(){}

  ngOnInit(): void {
  }
  onCreateAttendence() {

  }

}
