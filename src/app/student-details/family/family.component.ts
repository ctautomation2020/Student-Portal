import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import gql from 'graphql-tag';
import {Apollo, QueryRef} from 'apollo-angular';
import { FamilyModelComponent } from './family-model/family-model.component';
import { FamilyModel } from './family.model';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {
	community;
	caste;
	student;
	gender;
	queryRef: QueryRef<FamilyModel>; 

  constructor(public dialog: MatDialog,private apollo: Apollo) { }

  ngOnInit(): void {
  }
	onOpenModel() {
		let dialogRef = this.dialog.open(FamilyModelComponent/* , { 
			data: {
				student: this.student,
				gender: this.gender,
				community: this.community
			}
		} */);
		/* dialogRef.afterClosed().subscribe(result => {
			if (result) {
				console.log(result.DOB);
				const d = new Date(result.DOB);
				const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
				const req = gql `
				mutation updatePerson($data: updatePersonInput!) {
					updatePerson(data: $data) {
						Person_ID
						Marital_Status_Ref
					}
				}`;
				this.apollo.mutate({
					mutation: req,
					variables: {
						data: {
							Person_ID: result.Person_ID,
							Prefix_Ref: result.Prefix_Ref,
							PAN_Card: result.PAN_Card,
							First_Name: result.First_Name,
							Last_Name: result.Last_Name,
							Caste: result.Caste,
							Gender_Ref: result.Gender_Ref,
							Marital_Status_Ref: result.Marital_Status_Ref,
							Community_Ref: result.Community_Ref,
							Primary_MailID: result.Primary_MailID,
							Secondary_MailID: result.Secondary_MailID,
							Aadhar_Card: result.Aadhar_Card,
							Passport_Number: result.Passport_Number,
							DOB: date,
							Primary_ContactNumber: result.Primary_ContactNumber,
							Secondary_ContactNumber: result.Secondary_ContactNumber,
							Intercom_Number: result.Intercom_Number,
							Alias_Name: result.Alias_Name,
							Address_Line1: result.Address_Line1,
							Address_Line2: result.Address_Line2,
							Address_Line3: result.Address_Line3,
							Address_Line4: result.Address_Line4,
							Room_Num: result.Room_Num
						}
					}
				}).subscribe(({ data }) => {
					console.log(data);
					this.queryRef.refetch();
				});
			} 
		});*/
	}

}
