import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AlertController, NavParams, PopoverController } from '@ionic/angular';
import { AddUser } from 'src/Models/add-user';
import { Utilisateur } from 'src/Models/utilisateur';
import { UtilisateurService } from 'src/Services/utilisateur-service.service';

@Component({
  selector: 'app-popover-update',
  templateUrl: './popover-update.component.html',
  styleUrls: ['./popover-update.component.scss'],
})
export class PopoverUpdateComponent implements OnInit {

  constructor(private fb : FormBuilder,
              private navParams : NavParams,
              private alertController : AlertController,
              private popoverController : PopoverController,
              private utilisateurService : UtilisateurService) {}

  UpdateForm : FormGroup;
  user ={} as Utilisateur;
  updateUser ={
    roles:[]
  } as AddUser
  errorMsg : String;
  

  ngOnInit() {
    this.user = this.navParams.get('userInfos');
    this.UpdateForm = this.fb.group({
      userId : [this.user.userId],
      username : [this.user.username,Validators.required],
      password : [this.user.password,Validators.required],
      email : [this.user.email,[Validators.required, Validators.email]],
      birthday : [this.user.birthday,Validators.required],
      exp : [this.user.exp,[Validators.required,Validators.min(0)]],
      type : [this.user.roles,Validators.required],
      img : [this.user.profile_img]
   })
    
  }

  testValidators(){
    Object.keys(this.UpdateForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.UpdateForm.get(key).errors;
      if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
            });
          }
        });
  }


  async onSubmit(){
    const alert = await this.alertController.create({
      header: 'Update '+this.user.username,
      message: 'Do you agree to update the user '+this.user.username+' ?',
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
            this.updateUser.username = this.UpdateForm.get('username').value;
          this.updateUser.password = this.UpdateForm.get('password').value;
          this.updateUser.exp = this.UpdateForm.get('exp').value;
          this.updateUser.roles.push(this.UpdateForm.get('type').value);
          this.updateUser.email = this.UpdateForm.get('email').value;
          this.updateUser.birthday = this.UpdateForm.get('birthday').value.split('T')[0];
          console.log(this.updateUser);
            this.utilisateurService.updateUserByAdmin(this.updateUser,this.user.userId).subscribe(data =>{
              if(data.description == "User updated successfully!")
              this.popoverController.dismiss({
                "updatedUser": <Utilisateur> this.UpdateForm.value,
              });
               else
              this.errorMsg = data.description;
            })
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();

  }
   
}
