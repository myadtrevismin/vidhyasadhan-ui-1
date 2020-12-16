import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { IsMatch } from 'src/app/_helpers/fieldmatcher';
import { User } from 'src/app/_models/user';
import { handleException } from 'src/app/_helpers/vsexception';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { Customvalidators } from 'src/app/_helpers/customvalidators';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  isAlert = '';
  error = '';
  isTutor = true;
  success;

  tiles: Tile[] = [
    {text: 'One', cols: 2, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 2, rows: 1, color: 'lightgreen'},
  ];

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public authService: AuthserviceService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    const dat = this.route.url.subscribe(
      x => {this.isTutor = x[1].path === 'tutor'; }
    );
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: [ null, Validators.compose([
        Validators.required,
        Customvalidators.patternValidator(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, { isInvalid: true }),
        // Customvalidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // Customvalidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        Validators.minLength(8)])
     ],
      role: [''],
      confirmPassword: [''],
    }, {validator: IsMatch('password', 'confirmPassword') });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(){
    this.error = null;
    this.submitted = true;
    if (this.registerForm.invalid){
      return;
    }

    const regUser: any = {
       firstName : this.f.firstName.value,
       lastName: this.f.lastName.value,
       email: this.f.email.value,
       password: this.f.password.value,
       phone: this.f.phone.value,
       username: this.f.email.value,
       confirmPassword: this.f.confirmPassword.value,
       acceptTerms: true,
       title: this.isTutor ? 'tutor' : 'student',
       role: this.isTutor ? 1 : 2,
    };

    this.loading = true;
    this.userService.register(regUser)
    .subscribe(data => {
      this.alertService.success(data.message, this.options);
      this.router.navigate(['login']);
      this.loading = false;
     }, error => {this.alertService.error(error, this.options); this.loading = false; });

  }

  registered(){
    this.success = null;
    this.registerForm.reset();
  }

}


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
