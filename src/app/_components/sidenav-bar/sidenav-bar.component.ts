import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-bar',
  templateUrl: './sidenav-bar.component.html',
  styleUrls: ['./sidenav-bar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SidenavBarComponent implements OnInit {
  user;
  IsOpened;
  loginType;

  @ViewChild('drawer', { static: false })
  drawer: MatSidenav;
  isExpanded;

  constructor(public authService: AuthserviceService, private route: ActivatedRoute, private router: Router) {
    this.authService.user.subscribe(x => this.user = x);
    this.authService.loginuser.subscribe(x => {this.loginType = x; console.log(this.loginType); } );
   }

  studentnavs = [
    {route : 'classroom', icon: 'class', title: 'My Classrom'},
    {route : 'tutors', icon: 'assignment', title: 'Tutors'},
    {route : 'profile', icon: 'person_outline', title: 'My Profile'},
    {route : 'earnings', icon: 'account_balance', title: 'My Earnings'},
    {route : 'credits', icon: 'connect_without_contact', title: 'My Referrals'},
  ];

  tutornavs = [
    {route : 'classroom', icon: 'class', title: 'My Classrom'},
    {route : 'demos', icon: 'assignment', title: 'Demo Requests'},
    {route : 'profile', icon: 'person_outline', title: 'My Profile'},
    {route : 'earnings', icon: 'account_balance', title: 'My Earnings'},
    {route :  'credits', icon: 'connect_without_contact', title: 'My Referrals'},
  ];

  ngOnInit(): void {
    this.IsOpened = this.isAuthenticated ? true : false;
  }

  isAuthenticated(){
    return this.user;
  }

  navigate(card, sidenav){
    sidenav.close();
    console.log(card);
    console.log(this.route);
    this.router.navigate(['..', card.route], { relativeTo: this.route });
  }


}
