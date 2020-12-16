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
  requests: DemoRequest[] = [];
  filteredRequests: DemoRequest[] = [];
  loadDemo = false;
  checked = false;
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

    this.demoService.getDemoRequests(this.authService.userValue.id).subscribe(
      x => { this.requests = x;
             this.filteredRequests = x;
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
    console.log(enrollment);
    const enrol: Enrollment = {
    eventId: enrollment.event.courseId,
    studentID: enrollment.account.id,
    enrollmentDate: new Date(),
    updateDate: new Date(),
    requestId: enrollment.requestId
    };
    this.updateEnrollment(enrol, action.id);
  }

  updateEnrollment(enrollment: Enrollment, status){
    enrollment.status = status;
    this.studentService.saveEnrollment(enrollment).subscribe(x => {
  if (x?.id > 0){
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

  filterRequests(event) {
    this.loadDemo = true;
    if (!this.checked){
     this.filteredRequests = this.requests.filter(x => x.event.eventType === 0);
   }
   else{
    this.filteredRequests = this.requests;
   }
  }
  // getAdress(day: Demo){
  //   const address = day.enrollments[0].student.addresses[0];
  //   return address.address1  + ',' + address.address2 + ',' + address.city
  // }

}
