import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import gql from 'graphql-tag';
import {Apollo, QueryRef} from 'apollo-angular';
import { PlacementsModelComponent } from './placements-model/placements-model.component';
import {PlacementsModel} from './placements.model';
import { HigherstudiesModelComponent } from './higherstudies-model/higherstudies-model.component';

@Component({
  selector: 'app-placements',
  templateUrl: './placements.component.html',
  styleUrls: ['./placements.component.scss']
})
export class PlacementsComponent implements OnInit {

	placement_order=[
		{no:"1",company:"xxx1",Designation:"yyy1",Joining_Date:"dd/mm/yyyy",Package:"111111"},
		{no:"2",company:"xxx2",Designation:"yyy2",Joining_Date:"dd/mm/yyyy",Package:"111111"},
	];

	higherstudies_order=[
		{no:"1",university:"xxx1",Degree:"zzz1",specialization:"yyy1",score:"123",country:"xyz"},
		{no:"2",university:"xxx2",Degree:"zzz2",specialization:"yyy2",score:"123",country:"xyz"},
	];


   placements: boolean = false;
   higherstudies: boolean = true;

   constructor(public dialog: MatDialog,private apollo: Apollo) { }

   ngOnInit(): void {}

	onStartPlacementModel(){
		this.placements=false;
		this.higherstudies=true;
	}

	onStartHigherStudiesModel(){
		this.placements=true;
		this.higherstudies=false;
	}

	onAddPlacements(){
		let dialogRef = this.dialog.open(PlacementsModelComponent);
	}

	onEditPlacements(){
		let dialogRef = this.dialog.open(PlacementsModelComponent);
	}

	onAddstudies(){
		let dialogRef = this.dialog.open(HigherstudiesModelComponent);
	}

	onEditstudies(){
		let dialogRef = this.dialog.open(HigherstudiesModelComponent);
	}
}
