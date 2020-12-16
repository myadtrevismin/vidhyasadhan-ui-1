import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Assignment, StudentAssignment
} from 'src/app/_models/assignment';
import { CourseService } from 'src/app/_services/course.service';
import { FileuploaderService } from 'src/app/_services/fileuploader.service';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { Demo } from 'src/app/_models/demo';
import { StaticdataService } from 'src/app/_services/staticdata.service';
import { StaticData } from 'src/app/_models/static';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-assignmentdetail',
  templateUrl: './assignmentdetail.component.html',
  styleUrls: ['./assignmentdetail.component.css']
})
export class AssignmentdetailComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private courseService: CourseService,
              private authService: AuthserviceService,
              private fileUploader: FileuploaderService,
              private staticdataService: StaticdataService,
              public alertService: AlertService) {}

  public assignmentForm: FormGroup;
  public submitted = false;
  success = null;
  files: any[] = [];
  imagepath;
  uploadedFile;
  staticData: StaticData;
  levels;
  subjects;

  @Input()
  course: Demo;

  @Input()
  students: any[] = [];

  @Output()
  assignmentCreated = new EventEmitter<boolean>();


  menuItems = [{
      id: 0,
      value: 'Assignment',
      icon: 'assignment_turned_in'
    },
    {
      id: 0,
      value: 'Quiz Assignment',
      icon: 'batch_prediction'
    },
    {
      id: 0,
      value: 'Question',
      icon: 'help'
    },
    {
      id: 0,
      value: 'Material',
      icon: 'menu_book'
    },
    {
      id: 0,
      value: 'Topic',
      icon: 'local_library'
    },
  ];

  ngOnInit(): void {
    this.assignmentForm = this.formBuilder.group({
      title: ['', Validators.required],
      topic: ['', Validators.required],
      subject: ['', Validators.required],
      grade: ['', Validators.required],
      points: ['', Validators.required],
      dueDate: ['', Validators.required],
      instructions: [''],
      assignmentFile: ['', Validators.required],
    });

    this.staticdataService.getStaticDataSets()
      .subscribe(x => {
        this.staticData = x;
        this.levels = this.staticData.groups;
        this.subjects = x.subjects.filter((thing, i, arr) => arr.findIndex(t => t.name === thing.name) === i);
      });
  }

  get f() {
    return this.assignmentForm.controls;
  }

  dropped(files) {
    this.prepareFilesList(files);
  }

  fileBrowse(files) {
    this.prepareFilesList(files);
  }

  onSubmit() {
    this.submitted = true;
    if (this.assignmentForm.valid) {
      const assignment: Assignment = {
        title: this.f.title.value,
        topic: this.f.topic.value,
        instructorId: this.authService.userValue.id,
        subject: this.f.subject.value,
        grade: this.f.grade.value,
        points: this.f.points.value,
        startDate: new Date(),
        dueDate: this.f.dueDate.value,
        instructions: this.f.instructions.value,
        assignmentFile: null,
        questionSetId: 0,
        courseId: this.course?.courseId,
        studentAssignments: null,
      };

      this.uploadFile(this.files).then(event => {
        assignment.assignmentFile = event.filepath;
        this.courseService.createAssignment(assignment).subscribe(x => {
          if (x.assignmentId >= 0){
            this.success = 'Created Assignment Succesfully';
            this.assignmentCancelled();
          }
          else{
            this.success = 'Unable to Create Assignment at this time';
          }
        }, (error) => {
          this.alertService.error('Unable to Create Assignment at this time');
        });
    });
    }
  }

  getStudentAssignments(){
    const studentsList: StudentAssignment[] = [];
    this.students.forEach(x => {
      if (x !== null){
        const assignment: StudentAssignment = { userId : x.id };
        studentsList.push(assignment);
      }
    });
    return studentsList;
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    console.log(this.files[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagepath = e.target.result;
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

  uploadFile(files) {
    if (files.length === 0) {
      return;
    }

    const fileToUpload =  files[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.fileUploader.uploadFile(formData)
      .toPromise();
  }

  assignmentCancelled(){
    this.assignmentCreated.emit(true);
  }

}
