import { Component, OnInit, Input } from '@angular/core';
import { Demo, Enrollment } from 'src/app/_models/demo';
import { DemoService } from 'src/app/_services/demo.service';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { StudentService } from 'src/app/_services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertboxComponent } from '../alertbox/alertbox.component';
import { DemoRequest } from 'src/app/_models/demorequest';

@Component({
  selector: 'app-demolist',
  templateUrl: './demolist.component.html',
  styleUrls: ['./demolist.component.css']
})
export class DemolistComponent implements OnInit {

  selectedAction ;
  isOnline = false;
  demos: Demo[] = [];
  demoRequests: DemoRequest[] = [];
  loadDemo = false;
  actions = [
    {id: 1, action : 'Accept', icon: 'check_circle', color: 'primary', title: 'List View'},
    {id: 2, action : 'Reject', icon: 'cancel', color: 'warn', title: 'List View'},
    {id: 3, action : 'Re-Schedule', icon: 'alt_route', color: 'accent', title: 'List View'},
  ];

  actionIcons = [
    {id: 0, action : 'clicklist', icon: 'view_list', title: 'List View'},
    {id: 1, action : 'clickdemo', icon: 'view_module', title: 'Demo View'},
    {id: 2, action : 'clickmap', icon: 'map', title: 'Map View'},
  ];

  @Input()
  demoId;


  constructor(private demoService: DemoService,
              private authService: AuthserviceService,
              private studentService: StudentService,
              private snackBar: MatSnackBar,
              private alertcomponent: AlertboxComponent) { }


  ngOnInit(): void {
    this.selectedAction = this.actionIcons[0];
    // this.demoService.getAllDemosByUser(this.authService.userValue.id)
    // .subscribe(x => this.demos = x, (error) => console.log(error));

    this.demoService.getDemoRequests({tutorId: this.authService.userValue.id}).subscribe(
      x => { this.demoRequests = x;
             this.loadDemo = true;
      }, (error) => console.log(error)
    );
  }

  getDaywithFormat(day: Demo){
    const setDate = new Date(day.startDate);
    if (setDate){
      return setDate.getDay();
    }
  }

  changeSelected(e, action, enrollment){
    const enrol: Enrollment = {
    courseID: enrollment.course.courseId,
    studentID: enrollment.student.id,
    };
    this.updateEnrollment(enrol, action.id);
  }

  updateEnrollment(enrollment: Enrollment, status){
    enrollment.status = status;
    this.studentService.updateEnrollment(enrollment).subscribe(x => {
  if (x >= 0){
    this.openSnackBar('Notified Student', null);
  }
  else{
    this.openSnackBar('Unable to Complete', 1);
  }
}, (error) => {
  this.openSnackBar(error, 1);
});
  }

  openSnackBar(alert, error) {
    this.snackBar.openFromComponent(AlertboxComponent, {
      duration: 5 * 1000,
      data: { message: alert }
    });
  }
  // getAdress(day: Demo){
  //   const address = day.enrollments[0].student.addresses[0];
  //   return address.address1  + ',' + address.address2 + ',' + address.city
  // }

}
