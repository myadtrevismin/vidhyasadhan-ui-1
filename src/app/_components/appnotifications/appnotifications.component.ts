import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { StaticdataService } from 'src/app/_services/staticdata.service';

@Component({
  selector: 'app-appnotifications',
  templateUrl: './appnotifications.component.html',
  styleUrls: ['./appnotifications.component.css']
})
export class AppnotificationsComponent implements OnInit {

  constructor(public authService: AuthserviceService, private staticService: StaticdataService) { }

  notifications = [];

  ngOnInit(): void {
    if (this.authService.userValue.id){
      this.staticService.getNotifications(this.authService.userValue.id).subscribe(
        x => this.notifications = x
      );
    }
  }

}
