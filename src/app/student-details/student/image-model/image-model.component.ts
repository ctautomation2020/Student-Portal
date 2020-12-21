import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-model',
  templateUrl: './image-model.component.html',
  styleUrls: ['./image-model.component.scss']
})
export class ImageModelComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ImageModelComponent>) { }
  imageForm: FormGroup;

  ngOnInit(): void {
    this.imageForm = new FormGroup({
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    })
  }
  
  imageSrc: string;
  get f(){
    return this.imageForm.controls;
  }
   
  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        this.imageForm.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
  }
   
  submit(){
    console.log(this.imageForm.value);
    /* this.http.post('http://localhost:8001/upload.php', this.myForm.value)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      }) */
  }

}
