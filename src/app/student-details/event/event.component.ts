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
  convertDate(inputDate:any){
    if(inputDate.isMomentObject){
      inputDate=inputDate._d;
    }
    const dt=new Date(inputDate);
    const date=new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()));
    return date;
  }

	editModel(id:number) {
    const event=this.events.filter((q) => q.Event_ID === id)
    const dialogRef = this.dialog.open(EventModelComponent,{
      data:{
        event: event[0],
        eventType: this.eventType,
        participationType: this.participationType
      }
    });
    dialogRef.afterClosed().subscribe(result => {
			if (result) {
        const date=this.convertDate(result.Event_Date);
        console.log(result);
        const req = gql `
				mutation updateEventParticipated($data:updateEventParticipatedInput!){
          updateEventParticipated(data: $data){
            Event_ID
          }
        }`;
				this.apollo.mutate({
					mutation: req,
					variables: {
						data: {
              Event_ID: id,
              Event_Type_Ref: result.Event_Type_Ref,
              Participation_Type_Ref: result.Participation_Type_Ref,
              Team_Size: result.Team_Size,
              Event_Organizer: result.Event_Organizer,
              Event_Name: result.Event_Name,
              Event_Date: date,
              Prize_Won_Details: result.Prize_Won_Details
						}
					}
				}).subscribe(({ data }) => {
					console.log(data);
					this.queryRef.refetch();
				});
			} 
		});
  }
  deleteModel(id: number): void {
    const dialogDeleteRef = this.dialog.open(AlertboxComponent);
    dialogDeleteRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        const req = gql `
        mutation deleteEventParticipated($data: deleteEventParticipatedInput!){
          deleteEventParticipated(data:$data){
            Event_ID
          }
        }`;
        this.apollo.mutate({
        mutation: req,
        variables: {
          data: {
            Event_ID: id
          }
        }}).subscribe(({ data }) => {
          this.queryRef.refetch();
        });
      }
    });
  }

  addModel(){
    const dialogRef = this.dialog.open(EventModelComponent);
    console.log("add");
  }
  filterEventType(etype): PersonReferenceModel {
    return this.eventType.filter(l => l.Ref_Code === etype)[0];
  }
  filterParticipationType(ptype): PersonReferenceModel {
    return this.participationType.filter(l => l.Ref_Code === ptype)[0];
  }
}
