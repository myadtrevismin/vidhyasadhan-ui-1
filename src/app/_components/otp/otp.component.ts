import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  constructor(private authService: AuthserviceService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder ) { }

  phone: number;
  phoneForm: FormGroup;
  submitted;
  loading;
  returnUrl;
  useremail;
  error;
  tokenMessage;
  resend = true;
  otpcode = [
    {name: 'key1', value: null},
    {name: 'key2', value: null},
    {name: 'key3', value: null},
    {name: 'key4', value: null},
    {name: 'key5', value: null}
  ];

  ngOnInit(): void {
    // tslint:disable-next-line: no-string-literal
    this.useremail = this.route.snapshot.queryParams['email'];
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/vs';
    this.phoneForm = this.fb.group({
      phone: ['', Validators.required]
    });
  }

  entervalue(event){
    const el = event.srcElement;
    console.log(event);
    const tidx = +(el.getAttribute('tabindex')) + 1,
    elements = document.getElementsByTagName('input');

    for (let i = elements.length; i--;) {
        const tidx2 = elements[i].getAttribute('tabindex');
        if (Number(tidx2) === tidx) { elements[i].focus(); }
    }
  }

  onSubmit(){
    let finalcode = '';
    this.submitted = true;
    this.otpcode.forEach(x => {finalcode += x.value; } );
    this.authService.verifyotp(this.useremail, finalcode).subscribe(
      x => {
        if (x){
          this.router.navigate([this.returnUrl]);
        }
        else{
          this.error = 'Invalid token code';
        }
        this.submitted = false;
      },
      (error) => {
        this.error = 'Invalid token code';
        this.submitted = false;
      }
    );
  }

  sendOtp(){
    this.submitted = true;
    if (this.phoneForm.valid){
      this.loading = true;
      this.authService.sendOtp(this.phoneForm.value).pipe(first())
      .subscribe({
        next: () => {
          this.resend = false;
          this.submitted = false;
        },
        error: error => {
          this.error = error;
          this.loading = false;
          this.submitted = false;
        }
      });
    }
  }

  resendcode(){
    this.authService.resendotp(this.authService.userValue.email).subscribe(x => {
      if (x){
          this.tokenMessage = 'Resent Code Succesfully';
      }
    }, (error) => {
      this.error = error;
    });
  }

}
