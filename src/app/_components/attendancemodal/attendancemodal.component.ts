import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './attendancemodal.component.html',
  styleUrls: ['./attendancemodal.component.css']
})
export class AttendancemodalComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AttendancemodalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private datePipe: DatePipe) { }

  public attendanceForm: FormGroup;

  ngOnInit(): void {
    console.log(this.data);
    this.attendanceForm = this.formBuilder.group({
      id: [this.data.id, Validators.required],
      userId: [this.data.userId, Validators.required],
      courseId: [this.data.courseId, Validators.required],
      eventCourseId: [this.data.eventCourseId, Validators.required],
      attendanceDate: [this.datePipe.transform(this.data.attendanceDate, 'yyyy-MM-dd') , Validators.required],
      isPresent: [this.data.isPresent],
      reason: [this.data.reason],
      remarks: [this.data.remarks],
    });
  }

  get f(){
    return this.attendanceForm.controls;
  }

  onNoClick(){
    this.dialogRef.close();
  }

  submittedAttendance(){
    this.dialogRef.close(this.attendanceForm.value);
  }

}
