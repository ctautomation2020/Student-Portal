import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Apollo, QueryRef} from 'apollo-angular';
import gql from 'graphql-tag';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor( private apollo: Apollo, public route: Router) { }
  loginForm: FormGroup;
  hide: boolean = true;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      uname: new FormControl('', []),
      password: new FormControl('', [])
    });
  }
  onLogin() {
    console.log(this.loginForm.value.uname);
    const req = gql`
    query student_auth_login($data: user_infoQueryInput!){
      student_auth_login(data:$data){
        token
        Register_No
        user_role
      }
    }`;
    this.apollo
      .watchQuery({
        query: req,
        variables: {
          data: {
            username: parseInt(this.loginForm.value.uname),
            password: this.loginForm.value.password
          }
        }
      }).valueChanges.subscribe((result: any) => {
        localStorage.setItem('token', result.data.student_auth_login.token );
        localStorage.setItem('regno', result.data.student_auth_login.Register_No);
        localStorage.setItem('urole', result.data.student_auth_login.user_role);
        this.route.navigateByUrl('student-details/student');
    });
  }
}
