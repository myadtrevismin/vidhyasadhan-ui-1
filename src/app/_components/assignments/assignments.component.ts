import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { CourseService } from 'src/app/_services/course.service';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { Demo } from 'src/app/_models/demo';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private courseService: CourseService,
              private authService: AuthserviceService) { }

  displayassignments = true;
  assignmentForm;
  isLoading;
  filteredCourses;
  selectedCourse;
  selectedstudents;
  assignments = [];
  slicedAssignments;
  query;

  menuItems = [
    {id: 0, value: 'Assignment', icon: 'assignment_turned_in'},
    {id: 1, value: 'Quiz Assignment', icon: 'batch_prediction'},
    // {id: 2, value: 'Question', icon: 'help'},
    // {id: 3, value: 'Material', icon: 'menu_book'},
    {id: 2, value: 'Topic', icon: 'local_library'},
  ];

  detailsMenu = [
    {id: 0, value: 'Student', icon: 'assignment_turned_in'},
    {id: 1, value: 'Quiz Assignment', icon: 'batch_prediction'},
    // {id: 2, value: 'Question', icon: 'help'},
    // {id: 3, value: 'Material', icon: 'menu_book'},
    {id: 2, value: 'Topic', icon: 'local_library'},
  ];

  ngOnInit(): void {
    this.isLoading = true;
    this.updateList();
  }

  menuClicks(item){
    if (item.id === 0){
      this.displayassignments = false;
    }
  }

  switchMenus(){
    return this.displayassignments ? this.menuItems : this.detailsMenu;
  }

  displayCourse(loc: Demo): string {
    return loc ? loc.title : '';
  }

  updateList(){
    this.courseService.getAssignmentByTutor(this.authService.userValue.id)
    .subscribe(x => {this.assignments = x; this.slicedAssignments = x?.slice(0, 4); this.isLoading = false; },
    (error) => { this.isLoading = false; } );
  }

  gotolist(){
    this.displayassignments = true;
    this.updateList();
  }

  pagechange(event){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.assignments.length){
      endIndex = this.assignments.length;
    }

    this.slicedAssignments = this.assignments.slice(startIndex, endIndex);
  }

  eventClicked(event){
    if (event.id === 0){
      this.displayassignments = false;
    }
  }

  assignmentCreatedEvent(event){
    this.displayassignments = event;
  }

}
