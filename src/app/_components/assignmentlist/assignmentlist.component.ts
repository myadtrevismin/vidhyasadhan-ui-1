import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CourseService } from 'src/app/_services/course.service';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-assignmentlist',
  templateUrl: './assignmentlist.component.html',
  styleUrls: ['./assignmentlist.component.css']
})
export class AssignmentlistComponent implements OnInit, AfterViewInit {

  constructor(private courseService: CourseService,
              private authService: AuthserviceService) { }

  @Input()
  assignments;

  @Input()
  filter;

  filteredCourses;
  selectedCourse;
  selectedstudents;

  success;
  error;

  displayedColumns: string[] = ['select', 'title', 'grade', 'created', 'subject', 'topic', 'points', 'attachment'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.assignments);
    this.courseService.getAllCoursesByUser(this.authService.userValue.id)
    .subscribe(x => this.filteredCourses = x);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pagechange(event){

  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  downloadFile(file){
    if (file?.length > 0) {
      window.open(file);
    }
  }

  addAssignments(){
    if (this.selection.selected.length > 0){
      const saveassignments = [];
      this.selectedstudents.forEach(student => {
        this.selection.selected.forEach(x => {
          saveassignments.push({
            assignmentId: x.assignmentId,
            studentId: student.id,
            courseId: this.selectedCourse.courseId,
            creationDate: new Date(),
          });
        });
      });
      this.courseService.addstudentstoassignment(saveassignments)
      .subscribe(x => {
        this.success = true;
        this.selectedCourse = null;
        this.selectedstudents = null;
      }, (error) => {
        this.error = error;
      });
    }
  }
}
