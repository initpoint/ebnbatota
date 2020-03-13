import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {LoaderComponent} from '../components/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
  declarations: [
    LoaderComponent,
  ],
  exports: [
    FormsModule,
    LoaderComponent,
  ],
  entryComponents: []
})
export class SharedModuleModule {
}
