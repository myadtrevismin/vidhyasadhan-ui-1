import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemoRequest } from 'src/app/_models/demorequest';

@Component({
  selector: 'app-demomodel',
  templateUrl: './demomodel.component.html',
  styleUrls: ['./demomodel.component.css']
})
export class DemomodelComponent implements OnInit {

  availableslots = ['10:00 AM to 11:00 AM', '11:00 AM to 12:00 PM', '4:00 PM to 5:00 PM'];
  selectedValue;
  selectedDate;
  viewDate;
  events = [];
  demomodelForm: FormGroup;
  public submitted = false;

  constructor(public dialogRef: MatDialogRef<DemomodelComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.viewDate = new Date();

    this.demomodelForm = this.formBuilder.group({
      demo: [null, Validators.required],
      subject: ['', Validators.required],
      message: [''],
      });
  }

  onSubmit(){
    this.submitted = true;
    if (this.demomodelForm.valid) {
      const demoreq: DemoRequest = {
         tutorId: this.data.tutorinfo.id,
         date: this.f.demo.value.startDate,
         studentId:  this.data.student.id,
         slot: this.f.demo.value.courseId,
         subject : this.f.subject.value,
         message : this.f.message.value
      };
      this.dialogRef.close(demoreq);
     }
  }

  get f() { return this.demomodelForm.controls; }

  onClose(){
    this.dialogRef.close(null);
  }

}
