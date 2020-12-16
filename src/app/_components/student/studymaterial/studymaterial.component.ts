import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/_services/course.service';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { FileuploaderService } from 'src/app/_services/fileuploader.service';

@Component({
  selector: 'app-studymaterial',
  templateUrl: './studymaterial.component.html',
  styleUrls: ['./studymaterial.component.css']
})
export class StudymaterialComponent implements OnInit {

  constructor(private courseService: CourseService,
              private authService: AuthserviceService,
              private fileUploader: FileuploaderService) { }

  assignments;
  courses;
  filter;
  error;
  isUploaded;
  uploadedFile;
  isSuccess;
  actions = [
    { id: 1, name: 'Courses'},
    { id: 2, name: 'Materials'}
  ];
  selectedAction;

  ngOnInit(): void {
    this.courseService.getAllCoursesByUser(this.authService.userValue.id)
    .subscribe(x => this.courses = x, (error) => this.error = error);
    // this.courseService.getStudentAssignments(this.authService.userValue.id)
    // .subscribe(x => {this.assignments = x; console.log(this.assignments); },
    //   (error) => this.error = error);
    this.selectedAction = this.actions[0];
  }

  downloadFile(data) {
    const blob = new Blob([data]);
    const url = window.URL.createObjectURL(blob);
    window.open(data);
  }

  fileBrowse(files){
    this.uploadedFile = files[0];
    this.isUploaded = true;
  }

  onSubmit(assignment){
    assignment.submissionDate = new Date();
    assignment.status = 1;
    if (this.isUploaded){
      const fileToUpload =  this.uploadedFile as File;
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      this.fileUploader.uploadFile(formData).subscribe(x => {
        assignment.submissionFile = x.filepath;
        this.update(assignment);
      });
    }
    else{
      this.update(assignment);
    }
  }

  update(assignment){
    const assignmentToUpdate = {
      assignmentId: assignment.assignmentId,
      status: 1,
      submissionDate: assignment.submissionDate,
      submissionFile: assignment.submissionFile,
      userId: assignment.userId,
    };
    this.courseService.updateStudentAssignments(assignmentToUpdate).subscribe(x => {if (x >= 0){
      this.isSuccess = true;
    }}, (error) => this.isSuccess = false);
  }

  onDelete(){
    this.uploadedFile = null;
  }

}
