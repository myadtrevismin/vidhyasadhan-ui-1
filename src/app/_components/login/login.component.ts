import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  first
} from 'rxjs/operators';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  AuthserviceService
} from 'src/app/_services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  isAlert = false;
  error = '';
  isTutor = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthserviceService
  ) {
    if (this.authService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value, this.isTutor)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['authenticate'], {queryParams: { returnUrl : this.returnUrl, email: this.f.username.value}});
        },
        error: error => {
          this.error = 'Please Check your Password or Email to Confirm';
          this.loading = false;
        }
      });
  }

}
