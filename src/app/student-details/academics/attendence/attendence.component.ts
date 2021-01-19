import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import {Apollo, QueryRef} from 'apollo-angular';
import { AttendenceModel } from './attendence.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicsService } from '../academics.service';
import { StudentDetailsService } from './../../student-details.service';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.scss']
})
export class AttendenceComponent implements OnInit {
  months = ["January","Febraury","March","April","May","June","July","August","September","October","November","December"];
  days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  presence = ['P','A','P','P','P','P','P','P','P','P','P','A','P','P','P','P','P','P','P','P','P','P','P','P','-','-','-','-','-','-','-'];
  displayValues = [];
  startMonth: number;
  endMonth: number;
  curMonth: number;
  curYear: number;
  session;
  cregst_id: number;
  courseTitle: string;
  attendance: AttendenceModel[];
  monthAttendance: AttendenceModel[];
  queryRef: QueryRef<AttendenceModel[], any>;

  constructor(private academicsService: AcademicsService,private apollo: Apollo, private studentDetailsService: StudentDetailsService, private router: Router, private route: ActivatedRoute) { }
  

  ngOnInit(): void {
    console.log(this.presence);
     this.route.params.subscribe(params => {
      this.cregst_id = +params['cregst_id'];
      const reg_no=this.studentDetailsService.getRegisterNo();
      const query = {
        reg_no:  reg_no,
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
            let months=session[0].description.split(" ");
            console.log(months)
            this.startMonth=this.getMonth(months[0])-1
            this.curMonth=this.startMonth
            this.endMonth=this.getMonth(months[3])-1
            this.curYear=parseInt(months[1])
            
          });
          const query2 = {
            group_ref: result[0].group_ref,
            session_ref: result[0].session_ref,
            course_code: result[0].course_code,
            reg_no: reg_no
          }
          const req=gql`
          query studentAttendance($data: studentAttendanceQueryInput) {
            studentAttendance(data: $data) {
              cattend_id
              course_code
              group_ref
              session_ref
              reg_no
              date
              period
              presence
            }
          }`;
          this.queryRef = this.apollo.watchQuery({
            query: req,
            variables: {
            data: query2
          }
          });
          this.queryRef.valueChanges.subscribe(((result: any) => {
            this.attendance = JSON.parse(JSON.stringify(result.data.studentAttendance));
            console.log(this.attendance);
            while(this.curMonth != this.endMonth){
              this.displayValues.push({month: this.curMonth, year: this.curYear, values: this.getStructure()});
              this.next();
            }
            this.displayValues.push({month: this.curMonth, year: this.curYear, values: this.getStructure()});
          }));    
        }
      })
    });
  }

  getMonth(month){
    return new Date(month+'-1-01').getMonth()+1
  }

  getStructure(){
    this.filterMonth()
    let presence:any={};
    let pArray=[];
    this.monthAttendance.forEach((day) => {
       /* presence.push({
         "dt":this.convertDate(day.date).getDate(),
         "presence":day.presence
       }) */
      presence[this.convertDate(day.date).getDate()]=day.presence
    })
    for(let i=1;i<=31;i++){
      if(presence[i])
        pArray.push(presence[i])
      else
        pArray.push("-")
    }
    const day = new Date(this.curYear, this.curMonth, 1).getDay()
    var matrix = [], week = []
    for(var i=0;i<day;i++) week.push(' ')
    var curDate = 0, lastDate = new Date(this.curYear, this.curMonth+1, 0).getDate()
    while(curDate < lastDate){
         /* if(presence[curDate+1])
           week.push({date: curDate+1,presence: presence[curDate+1]})
         else
           week.push({date: curDate+1,presence: '-'})
         if(val!=null){
           week.push({date: curDate+1,presence: val.presence})
         }
         else
         week.push({date: curDate+1,presence: '-'}) */
        
        week.push({date: curDate+1,presence: pArray[curDate++]})
        if(week.length === 7){
            matrix.push(week)
            week = []
        }
    }
    if(week.length){ 
        while(week.length<7) week.push(' ')
        matrix.push(week)
    }
    console.log(matrix);
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
     //this.displayValues = this.getStructure()
  }

  getColor(presence): String{
     if(presence == 'P') return "rgb(12, 235, 45)";
     if(presence == 'A') return "rgb(245, 59, 65)";
     if(presence == '-') return "#e8ecea";
     return "white";
  }

  convertDate(inputDate){
    let day=inputDate.toString();
    let sec=parseInt(day);
    let d = new Date(sec);   
    return d
  }

  filterMonth(){
    this.monthAttendance=this.attendance.filter(l => this.convertDate(l.date).getMonth()==this.curMonth)
    console.log(this.monthAttendance);
  }

  filterDate(i:number){
    let temp=this.attendance.filter(l => this.convertDate(l.date).getDate()==i && this.convertDate(l.date).getMonth()==this.curMonth)
    return temp[0]
  }

}
