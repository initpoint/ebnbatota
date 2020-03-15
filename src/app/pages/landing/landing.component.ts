import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/shared/services/auth.service';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LoginVM, SignUpVM} from 'src/app/shared/models/login.model';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {ItemsService} from '../../shared/services/Items.service';
import {Item} from '../../shared/models/items.model';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  loginVM = new LoginVM();
  signupVM = new SignUpVM();
  signupFlag = false;
  items;

  constructor(
    public auth: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private toastrService: ToastrService,
    private notifierService: NotifierService,
    public httpClient: HttpClient,
    public itemsService: ItemsService) {
  }

  ngOnInit() {
    this.itemsService.getItems().subscribe(items => {
      this.items = items;
      console.log(items);
    });
  }

  scrollTo(section02: HTMLElement) {
    // section02.scrollIntoView();
    section02.scrollIntoView({behavior: 'smooth'});
  }


  searchSubmit() {
    for (let i = 0; i < 5; i++) {
      this.itemsService.createItem(new Item("اجمد رحله 2020", "https://firebasestorage.googleapis.com/v0/b/ebn-batota.appspot.com/o/test1.jpg?alt=media&token=7c8bf342-720e-46ee-8831-6e060e4fcf62", "مخيم", "1700", 20, 5, "ابوجالوم و بير العقدة"));
    }
    this.router.navigate(['/search']);
  }

  openDetailedView(item: Item) {
    this.itemsService.currentItem = item;
    this.router.navigate(['/tour-detail', {id: item.id}]);
  }
}
