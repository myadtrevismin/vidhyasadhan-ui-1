import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              public authservice: AuthserviceService,
              private router: Router) { }

  user: {
    userId: '',
    token: ''
  };
  success;
  isResend;
  error;

  authUser: User;

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('id');
    console.log(token);
    this.authservice.confirmEmail(token).subscribe(x =>  this.success = true, (error) => this.success = false);
    //this.router.navigate(['/login'];
  }

  confirmEmail(){
    this.authservice.reConfirm(this.authUser).subscribe(x => this.isResend = x);
  }

}
