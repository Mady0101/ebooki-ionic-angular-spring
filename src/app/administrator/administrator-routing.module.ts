import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksManagerComponent } from '../books-manager/books-manager.component';
import { ChooseComponent } from '../choose/choose.component';
import { HomePage } from '../home/home.page';
import { UsersManagerComponent } from '../users-manager/users-manager.component';


import { AdministratorPage } from './administrator.page';

const routes: Routes = [
  {
    path: 'choose',
    component: ChooseComponent
  },
  {path:'usersManager', component:UsersManagerComponent},
  {path:'booksManager', component:BooksManagerComponent},
  {path:'home',component:HomePage},
  {path:'', redirectTo:'choose',pathMatch:'full'}
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorPageRoutingModule {}
