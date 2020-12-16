import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserService
} from 'src/app/_services/user.service';
import {
  User
} from 'src/app/_models/user';
import * as moment from 'moment';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  DemomodelComponent
} from '../demomodel/demomodel.component';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { DemoService } from 'src/app/_services/demo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertboxComponent } from '../alertbox/alertbox.component';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from 'src/app/_services/student.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css']
})
export class TutorsComponent implements OnInit {

  public tutors: any;
  weekArray: string[] = [];
  public slicedTutors: any;
  public searchForm: FormGroup;
  query1;
  query2;
  query3;
  demos;
  disableDemo = false;
  demoDisabled = false;
  classDisabled = false;

  constructor(private userservice: UserService,
              public dialog: MatDialog,
              private authService: AuthserviceService,
              private demoService: DemoService,
              private _snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private studentService: StudentService,
              private alertService: AlertService) {}

  ngOnInit(): void {
    this.createForm();

    this.userservice.getUserByRole(1).subscribe(x => {
      this.tutors = x;
      this.sliceTutors(x);
    },
    (error) => this.alertService.error(error));

    this.studentService.getEnrollmentsbyStudent(this.authService.userValue.id).subscribe(x => {
      this.demos = x.filter(y => y.event.isDemo);
    });

    this.loadRequests();

    const weekarrays = moment.weekdays();
    weekarrays.join('-');
    this.weekArray.push('Monday to Thursday');
    this.weekArray.push('Friday');
    this.weekArray.push('Saturday, Sunday');
  }

  private loadRequests() {
    this.studentService.getRequestsbyStudent(this.authService.userValue.id).subscribe(x => {
      const today = new Date();
      let demoCount = 0;
      x.forEach(element => {
        const requestDate = new Date(element.date);
        if (element?.event?.isDemo === true && requestDate.getMonth() === today.getMonth() &&
          requestDate.getFullYear() === today.getFullYear()) {
          demoCount++;
        }
      });
      this.disableDemo = demoCount > 2;
    });
  }

  get f() { return this.searchForm.controls; }

  sliceTutors(tutors){
    this.slicedTutors = tutors?.slice(0, 4);
  }

  createForm(){
    this.searchForm = this.formBuilder.group({
      location : null,
      subject : null,
      tutor: null,
      indicator: null
      });
  }

  bookClass(e, tutor, type) {
    this.selectDemo(e, tutor, type);
  }

  selectDemo(e, tutor, type) {
    if ((type === true && this.demoDisabled) || (type === false && this.classDisabled)){
      return;
    }
    const tutordialog =   this.dialog.open(DemomodelComponent, {
      width: '350px',
      data: {
        tutorinfo: tutor,
        student:  this.authService.userValue,
        courses: tutor.events?.filter(x => x.isDemo === type),
        type
      }
    });
    tutordialog.afterClosed().subscribe(result => {
      if (result !== null){
        this.demoService.requestDemo(result).subscribe(
          x => {
            this._snackBar.openFromComponent(AlertboxComponent, {
              duration: 5000,
              data: { message: x?.requestId > 0  ? 'Request Sent to Tutor' : 'Unable to Send Request'},
            });
            this.loadRequests();
          });
        }
      });
  }

  pagechange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.tutors.length){
      endIndex = this.tutors.length;
    }

    this.slicedTutors = this.tutors.slice(startIndex, endIndex);
  }

  filterItem(){
    let filteredItems = this.tutors;
    if (this.f.location.value !== null &&  this.f.location.value !== undefined){
      const keys = 'address1,city,pincode';
      filteredItems = filteredItems.filter(item =>
        item.address?.address1.toLowerCase().includes(this.f.location.value.toLowerCase())
        || item.address?.city.toLowerCase().includes(this.f.location.value.toLowerCase())
        || item.address?.pincode.toLowerCase().includes(this.f.location.value.toLowerCase()));
    }
    if (this.f.subject.value !== null && this.f.subject.value !== undefined){
      const keys = 'subjects, level';
      filteredItems = filteredItems.filter(item =>
        item.accountDetails.subjects.toLowerCase().includes(this.f.subject.value.toLowerCase())
        || item.accountDetails.level.toLowerCase().includes(this.f.subject.value.toLowerCase()));
    }
    if (this.f.tutor.value !== null && this.f.tutor.value !== undefined){
      const keys = 'name';
      filteredItems = filteredItems.filter(item =>
        item.name?.toLowerCase().includes(this.f.tutor.value.toLowerCase()));
    }
    this.slicedTutors = filteredItems.slice(0, 4);
  }

  getDisabled(tutor, item){
    if (item){
      const demos = tutor.events?.filter(x => x.isDemo === true);
      this.demoDisabled = !(demos?.length > 0 && !this.disableDemo);
      return this.demoDisabled;
    }
    else{
      const classes = tutor.events?.filter(x => x.isDemo === false);
      this.classDisabled = !(classes?.length > 0);
      return this.classDisabled;
    }
  }

}
