import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customvalidators } from 'src/app/_helpers/customvalidators';
import { IsMatch } from 'src/app/_helpers/fieldmatcher';
import { AuthserviceService } from 'src/app/_services/authservice.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private authService: AuthserviceService,
              private router: ActivatedRoute) { }

  isTutor;
  passwordForm: FormGroup;
  passwordsubmitted;
  loadforgot;
  error;
  success;
  token;

  ngOnInit(): void {
    this.token = this.router.snapshot.queryParams.token;

    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.compose([
        Validators.required,
        Customvalidators.patternValidator(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, { isInvalid: true }),
        Validators.minLength(8)])],
      confirmPassword: ['', Validators.required]
    }, {validator: IsMatch('password', 'confirmPassword') });
  }

  get p(){
    return this.passwordForm.controls;
  }

  onpasswordSubmit() {
    this.passwordsubmitted = true;

    this.loadforgot = true;
    console.log(this.token);
    if (this.passwordForm.valid){
      const forgotModel = {
        token : this.token,
        password : this.p.password.value,
        confirmPassword: this.p.confirmPassword.value,
      };
      this.authService.resetpassword(forgotModel).subscribe(x => {
        this.success = x.message;
        this.loadforgot = false;
      }, (error) => {
        this.loadforgot = false;
        this.error = error;
      });
    }
  }
}
