import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { AcademicsModel, Assessment, Question, Section  } from '../academics.model';
import { AcademicsService } from '../academics.service';
@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})

export class AssessmentComponent implements OnInit {
  sallot_id: number;
  courseTitle: string;
    sections:any[] = [];
    sectionsJSON:any;

    questCount:any = 0;
    qmarks:any = 1;
    sect_name:any = "";
    total:number[] = [];

    blooms_level:string[] = ["1","2","3"];
    co_num:string[] = ["1","2","3"];

    constructor(private apollo: Apollo,private academicsService: AcademicsService, private activatedRoute: ActivatedRoute, private router: Router) {

    }

    createQuestion(mark:number = 0){
        return { question_num:"", question_stmt:"", blooms_level:"1", co_num:"1", marks:+mark };
    }
    resetSection(){
        this.questCount = 0;
        this.sect_name = null;
        this.qmarks = 1;
    }
    addSection(name:string, count:number, qtype:string, mark:number){
        if(!count || count == 0 || !name || name == "") return; // Alert User

        let questions:any[] = [];
        for(let i = 0; i < count; i++){
            if(qtype == "E"){
                questions.push(this.createQuestion(mark));
                questions.push(this.createQuestion(mark));
            }
            else questions.push(this.createQuestion(mark));
        }

        this.sections.push({
            currentQuest:-1,
            numQuestFlag:false,
            name:name,
            type:qtype,
            section_mark:+mark,
            questions: questions,
            q_num: (qtype == 'E') ? (questions.length)/2 : questions.length }
        );

        this.total.push(+count);

        this.resetSection();
    }
    getQuestNumber(i:number){
        return Math.round(i / 2);
    }
    getCharacter(i:number){
        return String.fromCharCode(97 + (i % 2));
    }
    updateSectionName(section:number, value:string){
        this.sections[section].name = value;
    }
    showConfirmSign(section:number){
        this.sections[section].numQuestFlag = true;
    }
    removeSection(section:number){
        this.total.splice(section,1);
        this.sections.splice(section,1);
        this.resetSection();
    }
    updateNumQuestions(section:number,qtype:string){
        this.sections[section].q_num = (qtype == 'E') ?
            (this.sections[section].questions.length)/2 :
            this.sections[section].questions.length;
    }
    updateSectionMark(section:number,value:number){
        this.sections[section].section_mark = +value;
        for(let ques of this.sections[section].questions){
            ques.marks = +value;
        }
    }
    addQuestions(section:number, count:number, start:number = 0, qtype:string, qmark:number){
        if(qtype == 'E') start /= 2;
        if(count <= start) return; // Alert User

        for(let i = start; i < count; i++){
            if(qtype == 'E'){
                this.sections[section].questions.push(this.createQuestion(qmark));
                this.sections[section].questions.push(this.createQuestion(qmark));
            }
            else this.sections[section].questions.push(this.createQuestion(qmark));
        }
        this.sections[section].numQuestFlag = false;
        this.updateNumQuestions(section,qtype);

        this.total[section] += (count - start);
        console.log(this.total);
    }
    makeEditable(section:number, ques:any){
        for(let sect of this.sections){
            if(sect != section) sect.currentQuest = -1;
        }
        if(section != -1)this.sections[section].currentQuest = ques;
    }
    updateQuestion(section:number, index:number, value:string){
        this.sections[section].questions[index].question_stmt = value;
    }
    changeQType(section:number, ques:number, value:string){
        this.sections[section].questions[ques].blooms_level = value;
    }
    changeQCO(section:number, ques:number, value:string){
        this.sections[section].questions[ques].co_num = value;
    }
    saveChanges(event:any){
        if(!event.target.closest('.edit-icon, .quest-textarea')){
            for(let section of this.sections){
                section.currentQuest = -1;
            }
        }
    }
    deleteQuestion(section:number, quest:number, qtype:string){
        if(qtype == 'E'){
            if(quest % 2 == 0) this.sections[section].questions.splice(quest,2);
            else this.sections[section].questions.splice(quest-1,2);
        }
        else this.sections[section].questions.splice(quest,1);
        this.updateNumQuestions(section,qtype);

        this.total[section] -= 1;
        console.log(this.total);
    }
    getRemainingSectionQuestionCount(section:number){
        let sum = 0;
        if(section != 0){
            for(let i = 0; i < section; i++) sum += this.total[i];
        }
        return sum;
    }
    changeSectionsArrayToJSON(){
        let qnum:number = 1;
        let count:number = 0;

        for(let section of this.sections){
            for(let ques of section.questions){
                if(section.type == 'E'){
                    ques.question_num = qnum + this.getCharacter(count);
                    count++;
                    if(count % 2 == 0) { count = 0; qnum++; }
                }
                else ques.question_num = "" + qnum++;
            }
            delete section.currentQuest;
            delete section.numQuestFlag;
        }
        this.sectionsJSON = {
            "section": this.sections
        };
        console.log(this.sectionsJSON);
    }
    changeJSONToSectionsArray(){
        for(let section of this.sectionsJSON["section"]){
            section.currentQuest = -1;
            section.numQuestFlag = false;
        }
        this.sections = this.sectionsJSON["section"];
        console.log(this.sections);
    }
    showQuestions(){
        this.changeSectionsArrayToJSON(); // Create Assessment
        this.changeJSONToSectionsArray(); // Edit Assessment
    }
    ngOnInit(): void {
      let assessment: Assessment = {
        course_code: '',
        group_ref: 0,
        session_ref: 0,
        assess_num: 0,
        entry_date: new Date(),
        section: []
      };
        /*
        this.sections = [
             {
                 currentQuest:-1,
                 numQuestFlag:false,
                 name:"Part - A",
                 type:"E",
                 section_mark:3,
                 questions: [
                     { question_num:"1a", question_stmt:"What is the difference between MySQL and MongoDB?", blooms_level:"2", co_num:"2", marks:3 },
                     { question_num:"1b", question_stmt:"What are the different types of Normalization?", blooms_level:"1", co_num:"3", marks:3 }
                 ],
                 q_num:2
             }
         ];
        */
       this.activatedRoute.params.subscribe(params => {
        this.sallot_id = +params['sallot_id'];
        const assess_num = +params['assess_num'];
        const query = {
         sallot_id: this.sallot_id
        }
        this.academicsService.getCourseDetails(query).subscribe((result: any) => {
          if(result == null) {
            this.router.navigate(['/person-details', 'academics']);
          }
          else {

            if(assess_num) {
              const new_query = {
                assess_num: assess_num,
                course_code: result.course_code,
                session_ref: result.session_ref,
                group_ref: result.group_ref
              }
              this.academicsService.getAssignment(new_query).subscribe((assessment_questions: any) => {
                if(assessment_questions.length == 0) {
                  this.router.navigate(['/person-details', 'academics', 'assignment-list', this.sallot_id]);
                }

                var groupByName: any;
                const groupBy = (array: any, key: any) => {
                  // Return the end result
                  return array.reduce((result: any, currentValue: any) => {
                    // If an array already present for key, push it to the array. Else create an array and push the object
                    (result[currentValue[key]] = result[currentValue[key]] || []).push(
                      currentValue
                    );
                    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
                    return result;
                  }, {}); // empty object is the initial value for result object
                };
                /*
                sections = [ { name: , }, {}, {}]

                */
                const sections = groupBy(assessment_questions, 'section');
                assessment = {
                  course_code: new_query.course_code,
                  group_ref: new_query.group_ref,
                  session_ref: new_query.session_ref,
                  assess_num: assess_num,
                  entry_date: new Date(),
                  section: []
                }
                Object.keys(sections).forEach(function(key) {
                  console.log(sections);
                  const str = sections[key][0].question_num;
                  console.log(str);
                  const alpha = str.charAt(str.length - 1);
                  let section: Section = {
                    name: key,
                    section_mark: sections[key][0].marks,
                    type: alpha == "a" || alpha == "b" ? "E": "F",
                    q_num: sections[key].length,
                    questions: []
                  }
                  for(let q of sections[key]) {
                    const question: Question = {
                      question_num: q.question_num,
                      question_stmt: q.question_stmt,
                      marks: q.marks,
                      blooms_level: q.blooms_level,
                      co_num: q.co_num
                    }
                    section.questions.push(question);
                  }
                  assessment.section.push(section);
              });
              console.log(JSON.stringify(assessment));
              this.sectionsJSON = assessment;
              this.changeJSONToSectionsArray();

              });

            }
            else {

              assessment.course_code = result.course_code;
              assessment.entry_date = new Date();
              assessment.group_ref = result.group_ref;
              assessment.session_ref =  result.session_ref;
            }
            this.academicsService.getCourse(result.course_code).subscribe((course: any) => {
              this.courseTitle = course.title;
            });

          }
        });
      });


    }
}
