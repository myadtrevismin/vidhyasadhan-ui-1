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
  passwordForm: FormGroup;
  loading = false;
  loadforgot = false;
  submitted = false;
  passwordsubmitted = false;
  returnUrl: string;
  isAlert = false;
  error = '';
  isTutor = true;
  username;
  isForgot = false;
  forgotMessage;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthserviceService
  ) {
    console.log(this.authService.userValue);
    if (this.authService.userValue) {
      this.router.navigate(['/vs']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.passwordForm = this.formBuilder.group({
      username: [this.f.username.value, Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/vs';
  }

  get f() {
    return this.loginForm.controls;
  }

  get p() {
    return this.passwordForm.controls;
  }


  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value, this.isTutor ? 1 : 2)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: error => {
          this.error = 'Please Check your Password or Email to Confirm';
          this.loading = false;
        }
      });
  }

  onpasswordSubmit(){
    this.passwordsubmitted = true;

    this.loadforgot = true;
    if (this.passwordForm.valid){
      const forgotModel = {
        email : this.p.username.value,
        password : this.p.password.value,
        confirmPassword: this.p.confirmPassword.value,
      };
      this.authService.forgotpassword(forgotModel).subscribe(x => {
        if (x){
          this.forgotMessage = true;
        }
        else{
          this.error = 'Unable to Reset Password';
        }
        this.loadforgot = false;
      }, (error) => {
        this.loadforgot = false;
        this.error = error;
      });
    }

  }

  forgotClick(e){
    e.preventDefault();
    this.isForgot = !this.isForgot;
  }

}
