import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { ItemsListComponent } from './items-list/items-list.component';
import { NewItemComponent } from './new-item/new-item.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: 'main',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'itemslist',
        component: ItemsListComponent,
        data: { title: 'itemslist' },
      },
      {
        path: 'newitem',
        component: NewItemComponent,
        data: { title: 'newitem' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
