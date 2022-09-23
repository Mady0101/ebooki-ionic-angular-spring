import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Book } from 'src/Models/book';
import { BookService } from 'src/Services/book.service';
import { SharedService } from 'src/Services/shared.service';
import { PopoverAddBookComponent } from './popover-add-book/popover-add-book.component';
import { PopoverBookdetailsComponent } from './popover-bookdetails/popover-bookdetails.component';
import { PopoverUpdateBookComponent } from './popover-update-book/popover-update-book.component';


@Component({
  selector: 'app-books-manager',
  templateUrl: './books-manager.component.html',
  styleUrls: ['./books-manager.component.scss'],
})
export class BooksManagerComponent implements OnInit {

  constructor(private bookService:BookService,private alertController:AlertController,
    private popoverController:PopoverController, private sharedService : SharedService,
    private router:Router) { }
  listbooks : Book[]=[];
  searchedItems : Book[];

  ngOnInit() {
    this.bookService.getAllBooks().subscribe(data=>{
      this.listbooks = data;
    })
  }

  searchChange(event){
    const val=event.target.value;
    if(val && val.trim()!=''){
        this.searchedItems = this.listbooks.filter((item : Book) =>{
           return item.nom.toLowerCase().indexOf(val.toLowerCase())>-1
        })
        console.log(this.searchedItems);
    }else{
      this.searchedItems=null;
    }
  }

  async delete(book : Book){
    const alert = await this.alertController.create({
      header: 'Deleter '+book.nom,
      message: 'Do you agree to delete the book '+book.nom+' ?',
      buttons:  [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.bookService.deleteBook(book.livreId).subscribe()
            const index = this.listbooks.indexOf(book);
            if(index > -1){
              this.listbooks.splice(index,1);
            }
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async openPopover(ev:any,book:Book){
    const popover = await this.popoverController.create({
      component: PopoverBookdetailsComponent,
      event : ev,
      componentProps : {bookInfos : book}
    })
    return await popover.present()
  }

  async update(ev:any , book:Book){
    const popover = await this.popoverController.create({
      component: PopoverUpdateBookComponent,
      event : ev,
      componentProps : {bookInfos : book}
    })
    popover.onDidDismiss().then(returnedData =>{if(returnedData.role!="backdrop"){
      const updatedbook : Book = returnedData.data.updatedBook;
      const index = this.listbooks.indexOf(book);
      this.listbooks[index]= updatedbook;}
      else console.log("popover was dismissed directly");
       })
    return await popover.present()
  }


  async addbook(){
    const popover = await this.popoverController.create({
      component: PopoverAddBookComponent,
    })
    popover.onDidDismiss().then(returnedData =>{
      if(returnedData.role!="backdrop"){
      const addedbook  = returnedData.data.addedbook;
      this.bookService.addBook(addedbook).subscribe()
      this.listbooks.push(addedbook);
    }
      else console.log("popover was dismissed directly");
       })
    return await popover.present()
  }

  logout(){
    this.sharedService.setUserId(null);
    this.sharedService.setUsername(null);
    this.sharedService.setRoles(null);
    this.sharedService.signOut();
    this.router.navigate(["/login"]);
  }

}
