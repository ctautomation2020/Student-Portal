import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import gql from 'graphql-tag';
import {Apollo, QueryRef} from 'apollo-angular';
import { InternshipModelComponent } from './internship-model/internship-model.component';
import { InternshipModel } from './internship.model';
import { InternshipeditModelComponent } from './internshipedit-model/internshipedit-model.component';


@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.scss']
})
export class InternshipComponent implements OnInit {

intern=[
        {no:"1",company:"xxx1",Title:"yyy1",Start_date:"dd/mm/yyyy",End_date:"dd/mm/yyyy",Stipend:"111111"},
        {no:"2",company:"xxx2",Title:"yyy2",Start_date:"dd/mm/yyyy",End_date:"dd/mm/yyyy",Stipend:"111111"},
];

  constructor(public dialog: MatDialog,private apollo: Apollo) { }

  ngOnInit(): void {
  }
	onOpenModel() {
		let dialogRef = this.dialog.open(InternshipModelComponent);
             }

	onEditModel() {
		let dialogRef = this.dialog.open(InternshipeditModelComponent);
             }


}
