import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookdetailPage } from './bookdetail.page';

const routes: Routes = [
  {
    path: '',
    component: BookdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookdetailPageRoutingModule {}
