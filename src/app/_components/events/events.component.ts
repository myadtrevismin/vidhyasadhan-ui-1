import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { DemoService } from 'src/app/_services/demo.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private authService: AuthserviceService,
              private demoService: DemoService, public alertService: AlertService) { }

  create = false;
  tutions;
  demos;
  events;
  isLoading;

  ngOnInit(): void {
    this.isLoading = true;
    this.getDemos();
  }

  getDemos(){
    this.demoService.getAllDemosByUser(this.authService.userValue.id).subscribe(
      x => {
        this.events = x;
        this.isLoading = false;
        this.tutions = x.filter(y => !y.isDemo);
        this.demos = x.filter(y => y.isDemo);
      }, (error) => {
        this.alertService.error('Error Loading Events');
        this.isLoading = false;
      }
    );
  }


  returnClicked(event){
    this.getDemos();
    event === true ? this.create = false : this.create = true;
  }

}
