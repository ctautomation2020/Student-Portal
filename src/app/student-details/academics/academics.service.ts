import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { AcademicsModel } from './academics.model';

@Injectable({
  providedIn: 'root'
})
export class AcademicsService {
  // session: AcademicsModel;
  category = 'Session';
  constructor(private apollo: Apollo) { }
  getCourseRegisteredStudents(query: any) {
    const req = gql `
    query registered_students($data: registered_studentsQueryInput!) {
      registered_students(data: $data) {
        course_code
        reg_no
        group_ref
        session_ref
        student {
          reg_no
          name
        }
      }
    }
    `;
    return this.apollo.watchQuery({
      query: req,
      variables: {
        data: query
      }
    }).valueChanges.pipe(map((result: any) =>
    JSON.parse(JSON.stringify(result.data.registered_students))
    ));

  }
  getEvaluation(query: any) {
    const req = gql `
    query assess_evaluation($data: assess_evaluationQueryInput!) {
      assess_evaluation(data: $data) {
        question_num
        mark
      }
    }
    `;
    return this.apollo.watchQuery({
      query: req,
      variables: {
        data: query
      },
      fetchPolicy: 'no-cache'
    }).valueChanges.pipe(map((result: any) =>
    JSON.parse(JSON.stringify(result.data.assess_evaluation))
    ));
  }

  getAssessment(query: any) {
    const req = gql`
    query assessment($data: assesmentQueryInput!) {
      assessment(data: $data) {
        cassess_id
        course_code
        group_ref
        session_ref
        assess_num
        question_num
        question_stmt
        blooms_level
        co_num
        marks
        section
      }
    }`;
    return this.apollo
    .watchQuery({
      query: req,
      variables: {
        data: query
      },
      fetchPolicy: 'no-cache'
    }).valueChanges.pipe(map((result: any) =>
    JSON.parse(JSON.stringify(result.data.assessment))
    ));
  }
  getCourse(course_code: string) {
    const reqNew = gql`
          query course($data: courseQueryInput!) {
          course(data: $data) {
            course_code
            title
          }
        }
        `;
    return this.apollo
    .watchQuery<any>({
      query: reqNew,
      variables: {
        data: {
          course_code : course_code
        }
      }
    }).valueChanges.pipe(map((result: any) =>
    JSON.parse(JSON.stringify(result.data.course))
    ));
  }
  getAssessmentList(json: any) {
    const req = gql`
        query session_assessments($data: sessionQueryInput!) {
        session_assessments(data: $data)
    }
    `;
      return  this.apollo
        .watchQuery<any>({
          query: req,
          variables: {
            data: json
          },
          fetchPolicy: 'no-cache'
        }).valueChanges.pipe(map((result: any) =>
        JSON.parse(JSON.stringify(result.data.session_assessments))
        ));

  }
  getStaffDetails(json: any) {
    const req = gql`
    query staffAlloted($data: staffAllotedQueryInput){
      staffAlloted(data:$data){
        sallot_id
        staff_id
        class_room
        student_count
        person{
          First_Name
          Last_Name
          Primary_MailID
          Primary_ContactNumber
        }
      } 
    }`;
    return this.apollo.watchQuery<any>({
      query: req,
      variables: {
        data: json
      }
    }).valueChanges.pipe(map((result: any) => JSON.parse(JSON.stringify(result.data.staffAlloted))));
  }

  getStudentCourses(json){
    const req = gql`
    query studentRegisteredCourses($data: studentRegisteredCoursesQueryInput){
      studentRegisteredCourses(data:$data){
        cregst_id
        course_code
        reg_no
        semester
        group_ref
        session_ref
        course_list{
          title
        }
      }
    }`;
    
    return  this.apollo.watchQuery<any>({
      query: req,
      variables: {
        data: json
      }
    }).valueChanges.pipe(map((result: any) => JSON.parse(JSON.stringify(result.data.studentRegisteredCourses))));
  }

  getSession(reference_id: number) {
    const req = gql`
    query courseReference($data: Course_Reference_Input) {
      courseReference(data: $data) {
        reference_id
        ref_code
        description
      }
    }`;
    return this.apollo.watchQuery({
      query: req,
      variables: {
        data: {
          category: this.category,
          reference_id: reference_id
        }
      }
    }).valueChanges.pipe(map((result: any) => JSON.parse(JSON.stringify(result.data.courseReference))));
  }
}
