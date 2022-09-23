import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorPage } from '../administrator/administrator.page';

import { BookListComponent } from '../book-list/book-list.component';
import { BookdetailPage } from '../bookdetail/bookdetail.page';
import { LibraryComponent } from '../library/library.component';
import { PDFComponent } from '../pdf/pdf.component';
import { ProfileComponent } from '../profile/profile.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children:[
      {path: 'booklist/bookdetail/:bookid' , component:BookdetailPage },
      {path: 'booklist' , component:BookListComponent},
      {path: 'library' , component:LibraryComponent},
      {path: 'library/pdf/:abonnerid' , component:PDFComponent},
      {path: 'profile' , component:ProfileComponent},
      {path: '' , redirectTo:'booklist' , pathMatch:'full'}
      ]                                             
  },
  {
    path:'', redirectTo:'tabs' , pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
