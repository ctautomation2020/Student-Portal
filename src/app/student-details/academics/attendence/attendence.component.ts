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
  ]; 

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
  ]*/

  curMonth = 6;
  curYear = 2020;
  months = ["January","Febraury","March","April","May","June","July","August","September","October","November","December"];
  days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  presence = ['P','A','P','P','P','P','P','P','P','P','P','A','P','P','P','P','P','P','P','P','P','P','P','P','-','-','-','-','-','-','-'];
  displayValues;
  startMonth = 6;
  endMonth = 10;
  session = {reference_id: 9, description: 'December 2019 - April 2020'};
  cregst_id = 16;
  courseTitle = 'Database Management Systems';

  constructor(){}

  ngOnInit(): void {
     this.displayValues = this.getStructure()
  }

  getStructure(){
    const day = new Date(this.curYear, this.curMonth, 1).getDay()
    var matrix = [], week = []
    for(var i=0;i<day;i++) week.push(' ')
    var curDate = 0, lastDate = new Date(this.curYear, this.curMonth+1, 0).getDate()
    while(curDate < lastDate){
        week.push({date: curDate+1,presence: this.presence[curDate++]})
        if(week.length === 7){
            matrix.push(week)
            week = []
        }
    }
    if(week.length){ 
        while(week.length<7) week.push(' ')
        matrix.push(week)
    }
    return matrix
  }

  previous(){
     if(this.curMonth == this.startMonth) return;
     if(this.curMonth == 0) {
        this.curMonth = 11;
        this.curYear--;
     }
     else {
        this.curMonth--;
     }
     this.displayValues = this.getStructure()
  }
  next(){
     if(this.curMonth == this.endMonth) return;
     if(this.curMonth == 11) {
        this.curMonth = 0;
        this.curYear++;
     }
     else {
        this.curMonth++;
     }
     this.displayValues = this.getStructure()
  }

  getColor(presence): String{
     if(presence == 'P') return "rgb(12, 235, 45)";
     if(presence == 'A') return "rgb(245, 59, 65)";
     if(presence == '-') return "#e8ecea";
     return "white";
  }

}
