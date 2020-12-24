import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import gql from 'graphql-tag';
import {Apollo, QueryRef} from 'apollo-angular';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss']
})
export class MarkComponent implements OnInit {

  course=[
          {no:"1",courseno:"CS6001",coursename:"Data Structures",Mark:"85",Grade:"A"},
          {no:"2",courseno:"CS6002",coursename:"Operating System",Mark:"80",Grade:"A"}
  ];

  constructor(public dialog: MatDialog,private apollo: Apollo) { }

  ngOnInit(): void {
  }

}
