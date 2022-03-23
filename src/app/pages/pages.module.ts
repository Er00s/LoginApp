import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

import { PagesRoutingModule } from './pages-routing.module';
import { ItemsListComponent } from './items-list/items-list.component';
import { PagesComponent } from './pages.component';
import { NewItemComponent } from './new-item/new-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
      ItemsListComponent, 
      PagesComponent, 
      NewItemComponent],
  exports: [
      ItemsListComponent,
      PagesComponent,
      NewItemComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    FontAwesomeModule,
    InfiniteScrollModule,
  ],
})
export class PagesModule {}
