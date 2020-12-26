import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import gql from 'graphql-tag';
import {Apollo, QueryRef} from 'apollo-angular';
import { AwardsModelComponent } from './awards-model/awards-model.component';
import { Awards } from './awards.model';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {

    award=[
        {no:"1",Award_Name:"xxx1",Organizer_Name:"yyy1",Award_Type_Ref:"dd1",Award_Category_Ref:"mm1",Place_of_Event:"z1",Award_Date:"d1"},
        {no:"2",Award_Name:"xxx2",Organizer_Name:"yyy2",Award_Type_Ref:"dd2",Award_Category_Ref:"mm2",Place_of_Event:"z2",Award_Date:"d2"}
    ];

    constructor(public dialog: MatDialog,private apollo: Apollo) { }

    ngOnInit(): void {
    }

    onAddaward(){
        let dialogRef = this.dialog.open(AwardsModelComponent);
    }
    onEditAward(){
        let dialogRef = this.dialog.open(AwardsModelComponent);
    }
}
