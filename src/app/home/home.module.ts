import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { BookListComponent } from '../book-list/book-list.component';
import { BookdetailPage } from '../bookdetail/bookdetail.page';
import { LibraryComponent } from '../library/library.component';
import { ProfileComponent } from '../profile/profile.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PDFComponent } from '../pdf/pdf.component';



@NgModule({
  imports: [
    
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PdfViewerModule,
    ReactiveFormsModule
  ],
  declarations: [HomePage , BookListComponent , BookdetailPage , LibraryComponent, ProfileComponent, PDFComponent]
})
export class HomePageModule {}
