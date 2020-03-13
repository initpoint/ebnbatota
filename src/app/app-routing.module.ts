import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingComponent} from './pages/landing/landing.component';
import {TourDetailComponent} from './pages/tour-detail/tour-detail.component';
import {SearchComponent} from './pages/search/search.component';
import {CompanyProfileComponent} from './pages/company-profile/company-profile.component';


const routes: Routes = [
  {path: 'landing', component: LandingComponent},
  {path: 'tour-detail', component: TourDetailComponent},
  {path: 'search', component: SearchComponent},
  {path: 'company-profile', component: CompanyProfileComponent},
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {path: '**', redirectTo: '/landing', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
