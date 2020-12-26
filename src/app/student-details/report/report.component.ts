import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
	selector: 'app-report',
	templateUrl: './report.component.html',
	styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	student = {
		name: 'Sivaganesh',
		regno: '2018503557'
	}
	
	course = [
		{no:"1",courseno:"CS6001",coursename:"Data Structures",Mark:"85",Grade:"A"},
		{no:"2",courseno:"CS6002",coursename:"Operating Systems",Mark:"90",Grade:"A+"},
		{no:"3",courseno:"CS6003",coursename:"Computer Networks",Mark:"70",Grade:"B+"},
		{no:"4",courseno:"CS6004",coursename:"DBMS",Mark:"80",Grade:"A"}
	];

	@ViewChild("report", { static: false }) report: ElementRef;

	downloadAsPDF() {
		const doc = new jsPDF();
	
		const specialElementHandlers = {
		  "#editor": function(element, renderer) {
			return true;
		  }
		};
	
		const content = this.report.nativeElement;
	
		/* doc.fromHTML(content.innerHTML, 15, 15, {
		  width: 190,
		  elementHandlers: specialElementHandlers
		}); 
		doc.html(content.innerHTML, {
			//width: 190,
			//elementHandlers: specialElementHandlers
		  })*/
		doc.text("Text", 15, 15);  
	
		doc.save("report.pdf");
	  }
}
