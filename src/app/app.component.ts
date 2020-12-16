import { Component, OnInit, Injectable } from '@angular/core';
import { User } from './_models/user';
import { AuthserviceService } from './_services/authservice.service';
import { NotificationMiddlewareService } from './core/notification-middleware.service';
import {SwPush, SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'vidhyasadhan-ui';
  user: User;
  showFiller = false;

  constructor(private authService: AuthserviceService){
    this.authService.user.subscribe(x => this.user = x);
  }

  ngOnInit(){
    // this.notificationMiddleware.init();
    // this.notificationMiddleware.initialize();
    // if (this.swUpdate.isEnabled){
    //   this.notificationMiddleware.pushNotificationStatus.isSupported = true;
    // }
  }

  logout() {
    this.authService.logout();
  }

}
