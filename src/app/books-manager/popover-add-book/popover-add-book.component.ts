import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, PopoverController } from '@ionic/angular';
import { Book } from 'src/Models/book';
import { AuteurService } from 'src/Services/auteur.service';
import { BookService } from 'src/Services/book.service';
import { ThemeService } from 'src/Services/theme.service';

@Component({
  selector: 'app-popover-add-book',
  templateUrl: './popover-add-book.component.html',
  styleUrls: ['./popover-add-book.component.scss'],
})
export class PopoverAddBookComponent implements OnInit {

  constructor(private fb : FormBuilder, private alertController:AlertController,
    private popoverController:PopoverController , private auteurService:AuteurService, private themeService:ThemeService) { }
  AddForm : any;
  
  addedbook :Book = { 
    "nom" : '',
    "theme" : {
        
        "nom" : ""
    },
    "auteur" : {
        
        "nom" : ""
    },

    "vues" : 0,
    "jaimes" : 0,
    "img" : "",
    "pdf" : ""
  } 


  ngOnInit() {
    this.AddForm = this.fb.group({
      Name : ['',Validators.required],
      Author : ['',Validators.required],
      Theme : ['',Validators.required],
      Vues : [0,[Validators.required,Validators.min(0)]],
      Likes : [0,[Validators.required,Validators.min(0)]],
      Pdf : ['',Validators.required],
      Img : ['',Validators.required]
   })
  }

  async onSubmit(){
    
    const alert = await this.alertController.create({
      header: 'Update '+this.AddForm.get('Name').value,
      message: 'Do you agree to update the book '+this.AddForm.get('Name').value+' ?',
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
            this.addedbook.nom = this.AddForm.get('Name').value;
            this.addedbook.auteur.nom = this.AddForm.get('Author').value;
            this.auteurService.addAuteur(this.addedbook.auteur).subscribe(data => {
              this.addedbook.auteur = data;
            })
            this.addedbook.theme.nom = this.AddForm.get('Theme').value;
            this.themeService.addTheme(this.addedbook.theme).subscribe(data => {
              this.addedbook.theme = data;
            })
            this.addedbook.vues = this.AddForm.get('Vues').value;
            this.addedbook.jaimes = this.AddForm.get('Likes').value;
            this.addedbook.pdf = this.AddForm.get('Pdf').value;
            this.addedbook.img = this.AddForm.get('Img').value;
            this.popoverController.dismiss({
              "addedbook":  this.addedbook,
            })
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
