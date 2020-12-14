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
    query login($data: credentialQueryInput!) {
      login(data: $data) {
        token
      }
    }
    `;
    this.apollo
      .watchQuery({
        query: req,
        variables: {
          data: {
            Username: this.loginForm.value.uname,
            Password: this.loginForm.value.password
          }
        }
      }).valueChanges.subscribe((result: any) => {
        console.log(result.data.login.token);
        localStorage.setItem('token', result.data.login.token );
        this.route.navigateByUrl('person-details');
    });
  }
}
