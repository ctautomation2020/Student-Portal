import { Component, Inject, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import gql from 'graphql-tag';
import { StudentDetailsService } from './../student-details.service';import {Apollo, QueryRef} from 'apollo-angular';
import { PersonReferenceModel } from './../person-reference.model';
import { EventModelComponent } from './event-model/event-model.component';
import { EventModel } from './event.model';
import { AlertboxComponent } from './../../shared/alertbox/alertbox.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  events: EventModel[];
  eventType: PersonReferenceModel[];
  participationType: PersonReferenceModel[];
  queryRef: QueryRef<EventModel[], any>;
  constructor(public dialog: MatDialog,private apollo: Apollo,public studentDetailsService: StudentDetailsService) { }

  ngOnInit(): void {
    const regNo: number = this.studentDetailsService.getRegisterNo();
	  const req=gql`
	  query studentEventsParticipated($data:studentEventsParticipatedQueryInput!){
      studentEventsParticipated(data:$data) {
        Register_No
        Event_ID
        Event_Name
        Event_Type_Ref
        Participation_Type_Ref
        Team_Size
        Event_Organizer
        Event_Date
        Prize_Won_Details
        Certificate_Copy
      }
    }`;
	this.queryRef = this.apollo.watchQuery({
	  query: req,
	  variables: {
		data: {
			Register_No: regNo
		}
	}
	});
  	this.queryRef.valueChanges.subscribe(((result: any) => {
	  this.events = JSON.parse(JSON.stringify(result.data.studentEventsParticipated));
    console.log(this.events);
  }));
  this.studentDetailsService.getDropDown('Event_Type').subscribe(result => {
    this.eventType = result;
    console.log(this.eventType);
  });
  this.studentDetailsService.getDropDown('Participation_Type').subscribe(result => {
    this.participationType = result;
    console.log(this.participationType);
  });
  }
	editModel() {
		let dialogRef = this.dialog.open(EventModelComponent,{
      data: {
        eventType: this.eventType,
        participationType: this.participationType
      }
    });
  }
  deleteModel() {
		let dialogRef = this.dialog.open(AlertboxComponent);
  }
  addModel(){
    console.log("add");
  }
  

}
