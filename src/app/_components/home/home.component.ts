import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { first } from 'rxjs/operators';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { NotificationMiddlewareService } from 'src/app/core/notification-middleware.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
  users: User[];
  user: User;

  constructor(private userService: UserService, private authService: AuthserviceService) {
    this.authService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(users => {
        this.loading = false;
        this.users = users;
    });
}

logout(){
}

}
