import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/shared/services/auth.service';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LoginVM, SignUpVM} from 'src/app/shared/models/login.model';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  loginVM = new LoginVM();
  signupVM = new SignUpVM();
  signupFlag = false;

  constructor(
    public auth: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private toastrService: ToastrService,
    private notifierService: NotifierService,
    public httpClient: HttpClient) {
  }

  ngOnInit() {
    this.notifierService.show({type: 'success', message: 'hey there'});
  }

  login(email?, pass?) {
    // handle the demo login
    if (email && pass) {
      this.loginVM.email = email;
      this.loginVM.password = pass;
    }

    const body = new FormData();
    body.append('username', this.loginVM.email);
    body.append('password', this.loginVM.password);
    this.httpClient.post('https://tmclassanalysis-staging.herokuapp.com/api-token-auth/', body).subscribe(res => {
      localStorage.setItem('token', res['token']);
      localStorage.setItem('email', this.loginVM.email);
      this.toastrService.success('Login Successful. Loading User Data...');
      this.auth.updateCurrentUser().subscribe(() => {
        this.router.navigate(['/main']);
      });
    }, error => this.toastrService.error(error['message']));
  }

  signup() {
    const body = new FormData();
    body.append('first_name', this.signupVM.first_name);
    body.append('last_name', this.signupVM.last_name);
    body.append('email', this.signupVM.email);
    body.append('password', this.signupVM.password);
    this.httpClient.post('https://tmclassanalysis-staging.herokuapp.com/register/signup-api/',
      body).subscribe(res => {
      this.auth.createUser({
        firstName: this.signupVM.first_name,
        lastName: this.signupVM.last_name,
        email: this.signupVM.email
      }).then(() => {
        this.login(this.signupVM.email, this.signupVM.password);
      });
    }, error => this.toastrService.error(error['message']));
  }
}
