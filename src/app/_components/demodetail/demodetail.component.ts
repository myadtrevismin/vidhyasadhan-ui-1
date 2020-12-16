import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  DemoService
} from 'src/app/_services/demo.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-demodetail',
  templateUrl: './demodetail.component.html',
  styleUrls: ['./demodetail.component.css']
})
export class DemodetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private demoService: DemoService) {}

  @Input()
  course;

  @Output() listView = new EventEmitter<boolean>();

  demo;
  enrollments: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'email', 'phone'];


  ngOnInit(): void {
    console.log(this.course);
    this.demo = this.course;
    const enrollmentarray = [];
    this.demo?.enrollments?.forEach(e => {
        enrollmentarray.push({
          name : e.account.firstName + ' ' + e.account.lastName,
          email: e.account.email,
          phone: e.account.phone
        });
      });
    this.enrollments = new MatTableDataSource(enrollmentarray);
  }

  returnToList(){
    this.listView.emit(true);
  }

}
