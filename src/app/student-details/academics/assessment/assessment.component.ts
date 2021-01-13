import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {Apollo, QueryRef} from 'apollo-angular';
import gql from 'graphql-tag';

export interface Assessment {
  section: Section[];
  assess_num: number;
  course_code: string;
  group_ref: number;
  session_ref: number;
  entry_date: Date;
}
export interface Section {
  name: string;
  questions: Question[]
}
export interface Question {
  question_num: string;
  question_stmt: string;
  marks: number;
  blooms_level: number;
  co_num: number;
}

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
  coLevel = [
    {
      Reference_Code: 22,
      Ref_Name: '1'
    },
    {
      Reference_Code: 23,
      Ref_Name: '2'
    },
    {
      Reference_Code: 24,
      Ref_Name: '3'
    },
    {
      Reference_Code: 25,
      Ref_Name: '4'
    },
    {
      Reference_Code: 26,
      Ref_Name: '5'
    },
    {
      Reference_Code: 27,
      Ref_Name: '6'
    }

  ]
  bloomsLevel = [
    {
      Reference_Code: 16,
      Ref_Name: 'Knowledge'
    },
    {
      Reference_Code: 17,
      Ref_Name: 'Comprehension'
    },
    {
      Reference_Code: 18,
      Ref_Name: 'Application'
    },
    {
      Reference_Code: 19,
      Ref_Name: 'Analysis'
    },
    {
      Reference_Code: 20,
      Ref_Name: 'Synthesis'
    },
    {
      Reference_Code: 21,
      Ref_Name: 'Evaluation'
    }
  ]
  assessment: Assessment = {
    entry_date: new Date(),
    course_code: 'CS0078',
    session_ref: 6,
    group_ref: 2,
    assess_num: 1,
    section: [
      {

        name: 'Part A',
        questions : [
          {
            question_num : '1',
            question_stmt : "Define Exploration?",
            marks: 2,
            blooms_level: 16,
            co_num: 22
          },
          {
            question_num : '2',
            question_stmt : "Define Examination?",
            marks: 2,
            blooms_level: 17,
            co_num: 22
          },
          {
            question_num : '3',
            question_stmt : "Define Abomination?",
            marks: 2,
            blooms_level: 17,
            co_num: 22
          }
        ]

      },
      {

        name: 'Part B',
        questions : [
          {
            question_num : '4',
            question_stmt : "What is Teams?",
            marks: 5,
            blooms_level: 18,
            co_num: 22
          },
          {
            question_num : '5',
            question_stmt : "What is Management?",
            marks: 5,
            blooms_level: 19,
            co_num: 22
          },
          {
            question_num : '6',
            question_stmt : "What are the types of DBMS?",
            marks: 5,
            blooms_level: 20,
            co_num: 22
          }
        ]
      }
    ]
  }
  queryRef: QueryRef<Assessment, any>;
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {

  }
  createQuestion(questions: Question[]) {
    const question: Question = {
      question_num : '',
      question_stmt: '',
      marks: 0,
      blooms_level: 0,
      co_num: 0
    }
    questions.push(question);
  }
  createSection() {
    const section: Section = {
      name: '',
      questions: [

      ]
    }
    this.assessment.section.push(section);

  }
  deleteQuestion(questions: Question[], qId: number) {
    questions.splice(qId, 1);
    console.log(questions);
  }
  setQuestionNum(sId: number, qId: number): number {
    console.log(sId);
    if(sId === 0) {
      return qId;
    }
    let qNo = 0;
    for (let i=0;i<sId; i++) {
      qNo += this.assessment.section[i].questions.length;
    }

    return qNo + qId;

  }
  deleteSection(s:Section[], sId: number) {
    s.splice(sId, 1);
  }
  submitAssessment(): void {
    console.log(JSON.stringify(this.assessment));
    const req = gql`
      mutation createAssessment($data: custom_type!) {
        createAssessment(data: $data) {
          cassess_id
        }
      }
    `;
    this.apollo
    .mutate({
      mutation: req,
      variables: {
        data: this.assessment
      }
    }).subscribe(({ data }) => {
      console.log(data);
    });
  }
}
