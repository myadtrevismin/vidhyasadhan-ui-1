import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AttendanceService } from 'src/app/_services/attendance.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { LocationModel } from 'src/app/_models/location';
import { CourseService } from 'src/app/_services/course.service';
import { DemoService } from 'src/app/_services/demo.service';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AttendancemodalComponent } from '../attendancemodal/attendancemodal.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  sortoptions = [
    {id: 0, value: 'Most Recent'},
    {id: 1, value: 'Oldest'}
  ];

  dataSource: MatTableDataSource<any>;
  primary = 'primary';
  selectedValue = 0;
  selectedCourse;
  isLoading;
  courses;
  filteredCourses;

  public attendanceForm: FormGroup;
  displayedColumns: string[] = ['name', 'address', 'attendanceDate', 'isPresent', 'reason', 'edit'];

  constructor(private attendance: AttendanceService,
              private formBuilder: FormBuilder,
              private courseService: CourseService,
              private demoService: DemoService,
              private authService: AuthserviceService,
              public dialog: MatDialog) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.attendanceForm = this.formBuilder.group({
      id: ['', Validators.required],
      userId: ['', Validators.required],
      courseId: ['', Validators.required],
      attendanceDate: ['', Validators.required],
      isPresent: ['', Validators.required],
      reason: ['', Validators.required],
      remarks: ['', Validators.required],
  });

    this.loadDemos();
  }

  private loadDemos() {
    this.demoService.getAllDemosByUser(this.authService.userValue.id).subscribe(x => {
      this.courses = x;
      this.filteredCourses = x;
      if (x.length > 0) {
        this.getattendance(x[0]);
        if (this.dataSource !== undefined) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    });
  }

  displaycourse(course){
      return course.title;
  }

  getattendance(course){
    this.attendance.getattendances(course.courseId).subscribe(x => { console.log(x); this.dataSource = new MatTableDataSource(x); });
  }

  applyFilter(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource?.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateAttendance(attendance){
    const dialogRef = this.dialog.open(AttendancemodalComponent, {
      width: '450px',
      data: attendance,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null || result !== undefined){
        this.attendance.updateAttendance(result).subscribe(
          x => {
            this.loadDemos();
          }
        );
      }
    });
  }

  filterCourse(isOnline){
    this.filteredCourses = this.courses.filter(x => x.eventType === isOnline);
    if (this.filteredCourses.length > 0){
      this.getattendance(this.filteredCourses[0]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

}
