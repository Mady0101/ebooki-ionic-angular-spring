import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavParams, PopoverController } from '@ionic/angular';
import { Book } from 'src/Models/book';
import { BookService } from 'src/Services/book.service';

@Component({
  selector: 'app-popover-update-book',
  templateUrl: './popover-update-book.component.html',
  styleUrls: ['./popover-update-book.component.scss'],
})
export class PopoverUpdateBookComponent implements OnInit {

  constructor(private fb : FormBuilder, private navParams:NavParams,
    private bookService:BookService, private alertController:AlertController,
    private popoverController:PopoverController) { }
  UpdateForm : any;
  updatedbook ={} as Book;
  book ={} as Book;


  ngOnInit() {
    this.updatedbook = this.navParams.get('bookInfos');
    this.UpdateForm = this.fb.group({
      Name : [this.updatedbook.nom,Validators.required],
      Author : [this.updatedbook.auteur.nom,Validators.required],
      Theme : [this.updatedbook.theme.nom,Validators.required],
      Vues : [this.updatedbook.vues,[Validators.required,Validators.min(0)]],
      Likes : [this.updatedbook.jaimes,[Validators.required,Validators.min(0)]],
      Pdf : [this.updatedbook.pdf,Validators.required],
      Img : [this.updatedbook.img,Validators.required]
   })
  }

  async onSubmit(){
    
    const alert = await this.alertController.create({
      header: 'Update '+this.updatedbook.nom,
      message: 'Do you agree to update the book '+this.updatedbook.nom+' ?',
      buttons:  [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Agree',
          handler: () => {
            this.updatedbook.nom = this.UpdateForm.get('Name').value;
    this.updatedbook.auteur.nom = this.UpdateForm.get('Author').value;
    this.updatedbook.theme.nom = this.UpdateForm.get('Theme').value;
    this.updatedbook.vues = this.UpdateForm.get('Vues').value;
    this.updatedbook.jaimes = this.UpdateForm.get('Likes').value;
    this.updatedbook.pdf = this.UpdateForm.get('Pdf').value;
    this.updatedbook.img = this.UpdateForm.get('Img').value;
            this.popoverController.dismiss({
              "updatedBook":  this.updatedbook,
            })
            this.bookService.updateBook(this.updatedbook).subscribe()
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
