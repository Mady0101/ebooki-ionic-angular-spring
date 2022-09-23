import {  Component,OnDestroy,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { SubscribedBooks } from 'src/Models/subscribed-books';
import { Utilisateur } from 'src/Models/utilisateur';

import { BookService } from 'src/Services/book.service';
import { SharedService } from 'src/Services/shared.service';
import { SubscribedBooksService } from 'src/Services/subscribed-books.service';
import { UtilisateurService } from 'src/Services/utilisateur-service.service';


@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
})
export class PDFComponent implements OnInit {



  
  pageVariable : number=1 ;
  pdfSrc :String ;
  zoom: number=1;
  bookmarked = "bookNotMarked";
  subscribedBook : SubscribedBooks;
  pageBooked : number ;
  completion : number;
  pdfLength : number;
  timer : number;
  interval : any;
  finished : boolean;
  exp : number =0;
  user = {} as Utilisateur;
  constructor( private bookService : BookService,
               private route : ActivatedRoute,
               private subscribedService : SubscribedBooksService,
               private sharedService : SharedService,
               private utilisateurService : UtilisateurService,
               private alertController : AlertController,
               private router : Router) { }
             
   ngOnInit(){} 
               
   ionViewWillEnter() {

    this.user = this.sharedService.getUser();
    this.subscribedService.getSubscribedBookById(parseInt(this.route.snapshot.paramMap.get('abonnerid'))).subscribe(
      data => {
        this.subscribedBook=data;
        this.pdfSrc = data.livre.pdf;
        
      }
    )

  }

  ionViewDidEnter(){
    this.interval=setInterval(()=> {
      this.subscribedBook.timer = this.subscribedBook.timer+1;
      this.exp=this.exp+1;
    },1000);
  }

  ionViewWillLeave(){
    if(this.interval)
    clearInterval(this.interval);
    this.subscribedService.updateSubscribedBook(this.subscribedBook).subscribe()
    this.utilisateurService.updateUserExp({
      userId: this.user.userId,
      exp : this.exp + this.user.exp,
      rank : this.user.rank
    }).subscribe(()=>{
    this.user.exp = this.user.exp + this.exp;
    if (this.user.exp >= this.user.rank.rankcap && this.user.rank.name != "Expert"){
      this.utilisateurService.getRank(this.user.rank.nextRankId).subscribe(data=>{
        this.user.rank = data;
        this.user.exp = this.user.exp + this.exp;
        this.sharedService.saveUser(this.user);
      })
    }else{
      this.user.exp = this.user.exp + this.exp;
      this.sharedService.saveUser(this.user); }
  })
  }
  
  async onError(error: any) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: "Sorry but the PDF of this book does not exist !",
      buttons:  [
        {
          text: 'Confirm',
          role: 'Confirm',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
  })
  await alert.present();

}

  forwardPage():void{
    this.pageVariable = this.pageVariable +1;
    if(this.subscribedBook.pageMarked == this.pageVariable)
    this.bookmarked = "bookMarked";
    else
    this.bookmarked = "bookNotMarked";
  }

  backwardPage():void{
    this.pageVariable = this.pageVariable -1;
    if(this.subscribedBook.pageMarked == this.pageVariable)
    this.bookmarked = "bookMarked";
    else
    this.bookmarked = "bookNotMarked";
  }

  zoomin(){
    this.zoom = this.zoom+0.1;
  }
  zoomout(){
    this.zoom = this.zoom-0.1;
  }

  bookedPage(){
    if(this.bookmarked == "bookNotMarked"){
    this.bookmarked = "bookMarked"
    this.subscribedBook.pageMarked = this.pageVariable;
    this.subscribedBook.completion = (this.subscribedBook.pageMarked)/this.pdfLength
    if (this.subscribedBook.completion==1 ){
      if(this.subscribedBook.finished==false && this.subscribedBook.timer> 7200){
      this.utilisateurService.updateUserExp( {
        userId: this.user.userId,
        exp : this.user.exp+500,
        rank : this.user.rank
      }).subscribe(()=>{
        this.user.exp = this.user.exp + this.exp;
        this.sharedService.saveUser(this.user);
      })}
      this.subscribedBook.finished=true;
  }}
    else{
    this.bookmarked = "bookNotMarked";
    this.subscribedBook.pageMarked = 0 ;
    this.subscribedBook.completion=0;
  }
  }


  gotoMarkedPage(){
    this.pageVariable = this.subscribedBook.pageMarked;
    this.bookmarked = "bookMarked";
  }

  afterLoadComplete(pdf: PDFDocumentProxy) { this.pdfLength=pdf.numPages; 
  console.log(pdf.getData());
  }

  logout(){
    this.sharedService.setUserId(null);
    this.sharedService.setUsername(null);
    this.sharedService.setRoles(null);
    this.sharedService.signOut();
    this.router.navigate(["/login"]);
  }
   

}
