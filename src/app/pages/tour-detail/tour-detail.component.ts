import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/shared/services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LoginVM, SignUpVM} from 'src/app/shared/models/login.model';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {ItemsService} from '../../shared/services/Items.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})
export class TourDetailComponent implements OnInit {
  loginVM = new LoginVM();
  signupVM = new SignUpVM();
  signupFlag = false;
  selectedItem;

  constructor(
    public auth: AuthService,
    private router: ActivatedRoute,
    private jwtHelper: JwtHelperService,
    private toastrService: ToastrService,
    private notifierService: NotifierService,
    public httpClient: HttpClient,
    public itemsService: ItemsService) {
  }

  ngOnInit() {

    this.selectedItem = this.router.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        console.log("+params.get('id')");
        console.log(+params.get('id'));
        return this.itemsService.currentItem || this.itemsService.getItem(+params.get('id'));
      })
    );
  }
}
