import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/_services/authservice.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private authService: AuthserviceService,
              private router: ActivatedRoute) { }

  isTutor;
  passwordForm: FormGroup;
  passwordsubmitted;
  loadforgot;
  error;
  success;

  ngOnInit(): void {
    const role = this.router.snapshot.queryParams.role;
    this.isTutor = role === 'tutor';
    this.passwordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  get p(){
    return this.passwordForm.controls;
  }

  onpasswordSubmit() {
    this.passwordsubmitted = true;

    this.loadforgot = true;
    if (this.passwordForm.valid){
      this.authService.forgotpassword(this.passwordForm.value).subscribe(x => {
        this.success = x.message;
        this.loadforgot = false;
      }, (error) => {
        this.loadforgot = false;
        this.error = error;
      });
    }
  }
}
