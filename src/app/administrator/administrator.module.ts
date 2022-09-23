import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministratorPageRoutingModule } from './administrator-routing.module';

import { AdministratorPage } from './administrator.page';
import { ChooseComponent } from '../choose/choose.component';
import { UsersManagerComponent } from '../users-manager/users-manager.component';
import { PopoverComponent } from '../users-manager/popover/popover.component';
import { PopoverUpdateComponent } from '../users-manager/popover-update/popover-update.component';
import { PopoverAddUserComponent } from '../users-manager/popover-add-user/popover-add-user.component';
import { BooksManagerComponent } from '../books-manager/books-manager.component';
import { PopoverBookdetailsComponent } from '../books-manager/popover-bookdetails/popover-bookdetails.component';
import { PopoverUpdateBookComponent } from '../books-manager/popover-update-book/popover-update-book.component';
import { PopoverAddBookComponent } from '../books-manager/popover-add-book/popover-add-book.component';
import { HomePage } from '../home/home.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministratorPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdministratorPage, ChooseComponent, UsersManagerComponent,
    PopoverAddUserComponent, PopoverComponent, PopoverUpdateComponent,
  BooksManagerComponent,PopoverBookdetailsComponent, PopoverUpdateBookComponent,
PopoverAddBookComponent,HomePage]
})
export class AdministratorPageModule {}
