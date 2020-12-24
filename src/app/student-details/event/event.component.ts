import { Component, Inject, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import gql from 'graphql-tag';
import {Apollo, QueryRef} from 'apollo-angular';
import { EventModelComponent } from './event-model/event-model.component';
import { EventModel } from './event.model';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
 
  constructor(public dialog: MatDialog,private apollo: Apollo) { }

  ngOnInit(): void {
  }
	onOpenModel() {
		let dialogRef = this.dialog.open(EventModelComponent);
             }


}
