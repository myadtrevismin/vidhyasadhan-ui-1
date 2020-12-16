import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { DemoService } from 'src/app/_services/demo.service';
import * as moment from 'moment';

@Component({
  selector: 'app-eventslist',
  templateUrl: './eventslist.component.html',
  styleUrls: ['./eventslist.component.css']
})
export class EventslistComponent implements OnInit {

  constructor(public authService: AuthserviceService,
              private demoService: DemoService, ) { }

  @Input() tutions;
  @Input() demos;
  splitTutions;
  splitDemos;
  filter1;
  filter2;
  month = new Date();
  @Output() returnEvent = new EventEmitter<boolean>();
  selectedDemo;

  ngOnInit(): void {
    this.filterEvents();
  }

  filterEvents(){
    this.splitTutions =  this.tutions;
    this.splitDemos = this.demos;
    this.splitDemos = this.demos.filter(x => ((new Date(x.startDate).getMonth() === this.month.getMonth())
     && (new Date(x.startDate).getFullYear() === this.month.getFullYear())) || ((new Date(x.endDate).getMonth() === this.month.getMonth())
     && (new Date(x.endDate).getFullYear() === this.month.getFullYear())));
    this.splitTutions = this.tutions.filter(x => ((new Date(x.startDate).getMonth() === this.month.getMonth())
    && (new Date(x.startDate).getFullYear() === this.month.getFullYear())) || ((new Date(x.endDate).getMonth() === this.month.getMonth())
    && (new Date(x.endDate).getFullYear() === this.month.getFullYear())));
  }

  nextClick(side){
    if (side === 'left'){
      this.month = moment(this.month).subtract('1', 'month').toDate() ;
    }
    else{
      this.month = moment(this.month).add('1', 'month').toDate() ;
    }
    this.filterEvents();
  }

  addEvent(){
    this.returnEvent.emit(false);
  }

  accessreturnValue(event){
    this.filterEvents();
    if (event){
      this.selectedDemo = null;
    }
  }
}
