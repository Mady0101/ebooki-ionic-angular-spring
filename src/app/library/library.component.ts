import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { SubscribedBooks } from 'src/Models/subscribed-books';
import { SharedService } from 'src/Services/shared.service';
import { SubscribedBooksService } from 'src/Services/subscribed-books.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {

  constructor(private subscribedBookService : SubscribedBooksService,
              private sharedService : SharedService,
              private router : Router ,
              private actionSheetController:ActionSheetController
             ) { }
 
 
   ngOnInit(): void {
    
  }

  subscribedBooks : SubscribedBooks[]=[];

  async openSheet(subscribedBook : SubscribedBooks){
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
         this.subscribedBookService.deleteSubscribedBook(subscribedBook).subscribe(
           ()=>{alert("Book Deleted succefully");}
         )
        }
      }, {
        text: 'Read Book',
        icon: 'share',
        handler: () => {
          this.readPDF(subscribedBook);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  
  readPDF(subscribedBook : SubscribedBooks){
    this.router.navigate([this.router.url+"/pdf",subscribedBook.abonneId]);
  }
  

  ionViewWillEnter() {
    this.subscribedBookService.getSubscribedBooksByUser(this.sharedService.getUser().userId).subscribe(data => {
      this.subscribedBooks=data;
      console.log(this.subscribedBooks);
    })
  }

  logout(){
    this.sharedService.setUserId(null);
    this.sharedService.setUsername(null);
    this.sharedService.setRoles(null);
    this.sharedService.signOut();
    this.router.navigate(["/login"]);
  }

}
