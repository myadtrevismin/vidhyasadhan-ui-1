import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/_services/course.service';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { FileuploaderService } from 'src/app/_services/fileuploader.service';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-student-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class StudentAssignmentsComponent implements OnInit {

  assignments;
  courses;
  filter;
  error;
  isUploaded;
  uploadedFile;
  isSuccess;
  selectdetail = false;
  splitAssignments;
  month = new Date();
  public assignmentFormForm: FormGroup;
  public submitted = false;
  files = [];
  uploadedFilePath;

  constructor(private courseService: CourseService,
              private authService: AuthserviceService,
              private fileUploader: FileuploaderService,
              private studentService: StudentService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterassignments();
    this.assignmentForm();
  }

  assignmentForm(){
    this.assignmentFormForm = this.fb.group({
      id: [{
        value: 0,
        disabled: true
      }],
      assignmentId : [{
        value: '',
        disabled: true
      }],
      courseId : [{
        value: '',
        disabled: true
      }],
      status : [{
        value: '',
        disabled: true
      }],
      dueDate: [{
        value: '',
        disabled: true
      }],
      submissionDate : [{
        value: '',
        disabled: true
      }],
      submissionFile : [''],
      assignmentFile: [''],
      userId : [{
        value: '',
        disabled: true
      }],
      subject: [{
        value: '',
        disabled: true
      }],
      title: [{
        value: '',
        disabled: true
      }],
      topic: [{
        value: '',
        disabled: true
      }],
      grade: [{
        value: '',
        disabled: true
      }],
      tutor: [{
        value: '',
        disabled: true
      }],
      points: [{
        value: '',
        disabled: true
      }],
      instructions: [{
        value: '',
        disabled: true
      }]
      });
  }

  filterassignments(){
    this.courseService.getStudentAssignments(this.authService.userValue.id)
    .subscribe(x => {this.assignments = x;
                     this.splitAssignments = x?.filter(y => new Date(y.assignment.dueDate).getMonth() === this.month.getMonth() &&
                     new Date(y.assignment.dueDate).getFullYear() === this.month.getFullYear()); },
      (error) => this.error = error);
  }

  downloadFile() {
   // const blob = new Blob([data]);
   // const url = window.URL.createObjectURL(blob);
    window.open(this.f.assignmentFile.value);
  }

  get f() { return this.assignmentFormForm.controls; }

  fileBrowse(files){
    this.uploadedFile = files[0];
    this.isUploaded = true;
  }

  viewDetails(assignment){
    this.selectdetail = !this.selectdetail;
    this.assignmentFormForm.patchValue({
      id: assignment.id,
      assignmentId : assignment.assignmentId,
      dueDate: assignment.assignment.dueDate,
      courseId: assignment.courseId,
      submissionDate : new Date(),
      assignmentFile : assignment.assignment.assignmentFile,
      userId : this.authService.userValue.id,
      subject: assignment.assignment.subject,
      title: assignment.assignment.title,
      topic: assignment.assignment.topic,
      grade: assignment.assignment.grade,
      tutor: assignment.assignment.account?.firstName + ' ' + assignment.assignment.account?.lastName,
      points: assignment.assignment.points,
      instructions: assignment.assignment.instructions
    });
  }

  onSubmit(){
    if (this.files.length > 0){
      const fileToUpload =  this.files[0] as File;
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      this.fileUploader.uploadFile(formData).subscribe(x => {
        this.update(x.filepath);
        this.filterassignments();
      });
    }
  }

  update(filePath){
    const assignmentToUpdate = {
      id: this.f.id.value,
      assignmentId: this.f.assignmentId.value,
      status: 1,
      submissionDate: new Date(),
      submissionFile: filePath,
      studentId: this.f.userId.value,
      courseId: this.f.courseId.value
    };
    this.courseService.updateStudentAssignments(assignmentToUpdate).subscribe(x => {if (x.id > 0){
      this.isSuccess = true;
    }}, (error) => this.isSuccess = false);
  }

  onDelete(){
    this.uploadedFile = null;
  }

  nextClick(side){
    if (side === 'left'){
      this.month = moment(this.month).subtract('1', 'month').toDate() ;
    }
    else{
      this.month = moment(this.month).add('1', 'month').toDate() ;
    }
    this.filterassignments();
  }

  dropped(files) {
    this.prepareFilesList(files);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      this.uploadedFilePath = e.target.result;
    };
    reader.readAsDataURL(files[0]);
    this.uploadFilesSimulator(0);
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  filesBrowse(files) {
    this.prepareFilesList(files);
  }

  deletefiles(){
    this.files = [];
    this.assignmentFormForm.controls.submissionFile.patchValue('');
  }


}
