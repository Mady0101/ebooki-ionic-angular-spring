import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, PopoverController } from '@ionic/angular';
import { AddUser } from 'src/Models/add-user';
import { ERole } from 'src/Models/erole';
import { Utilisateur } from 'src/Models/utilisateur';
import { UtilisateurService } from 'src/Services/utilisateur-service.service';

@Component({
  selector: 'app-popover-add-user',
  templateUrl: './popover-add-user.component.html',
  styleUrls: ['./popover-add-user.component.scss'],
})
export class PopoverAddUserComponent implements OnInit {

  constructor(private fb:FormBuilder, private alertController:AlertController,
     private utilisateurService : UtilisateurService, private popoverController : PopoverController) { }
  addForm : FormGroup;
  addedUser ={
    roles:[]
  } as AddUser;
  errorMsg : String;
  ngOnInit() {
    this.addForm = this.fb.group({
    username : ['',Validators.required],
    password : ['',Validators.required],
    email : ['',[Validators.required, Validators.email]],
    birthday : ['',Validators.required],
    exp : [0,Validators.min(0)],
    type : ['',Validators.required]
 })}

 async onSubmit(){
   const alert = await this.alertController.create({
    header: 'Add new User',
    message: 'Do you agree to add the user '+this.addForm.controls.username.value+' ?',
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
          this.addedUser.username = this.addForm.get('username').value;
          this.addedUser.password = this.addForm.get('password').value;
          this.addedUser.exp = this.addForm.get('exp').value;
          this.addedUser.roles.push(this.addForm.get('type').value);
          this.addedUser.email = this.addForm.get('email').value;
          this.addedUser.birthday = this.addForm.get('birthday').value.split('T')[0];
          this.utilisateurService.add(this.addedUser).subscribe(data => {
            if (data.description== "User registered successfully!")
            this.popoverController.dismiss({
              "addedUser": this.addedUser,
            });
            else
            this.errorMsg = data.description;
          })
          console.log(this.addedUser);
          
          console.log('Confirm Okay');
        }
      }
    ]
  });

  await alert.present();
 }

}
