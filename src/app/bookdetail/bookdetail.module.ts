import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookdetailPageRoutingModule } from './bookdetail-routing.module';

import { BookdetailPage } from './bookdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookdetailPageRoutingModule
  ],
  declarations: [BookdetailPage]
})
export class BookdetailPageModule {}
