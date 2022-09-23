import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Utilisateur } from 'src/Models/utilisateur';
import { SharedService } from 'src/Services/shared.service';
import { UtilisateurService } from 'src/Services/utilisateur-service.service';
import { PopoverAddUserComponent } from './popover-add-user/popover-add-user.component';
import { PopoverUpdateComponent } from './popover-update/popover-update.component';
import { PopoverComponent } from './popover/popover.component';

@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.scss'],
})
export class UsersManagerComponent implements OnInit {
  searchedItems: Utilisateur[];

  constructor(private utilisateurService : UtilisateurService,
              private popoverController : PopoverController,
              private alertController : AlertController,
              private router : Router,
              private sharedService : SharedService) { }

  listUsers : Utilisateur[] = []

  ngOnInit() {
     this.utilisateurService.getAllUsers().subscribe(data => {
       this.listUsers=data;
     })
  }

  async openPopover(ev : any , user : Utilisateur){
       const popover = await this.popoverController.create({
         component: PopoverComponent,
         event : ev,
         componentProps : {userInfos : user}
       })
       return await popover.present()
  }

  searchChange(event){
    const val=event.target.value;
    if(val && val.trim()!=''){
        this.searchedItems = this.listUsers.filter((item : Utilisateur) =>{
           return item.username.toLowerCase().indexOf(val.toLowerCase())>-1
        })
        console.log(this.searchedItems);
    }else{
      this.searchedItems=null;
    }
  }

  async delete(user : Utilisateur){
    const alert = await this.alertController.create({
      header: 'Deleter '+user.username,
      message: 'Do you agree to delete the user '+user.username+' ?',
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
            this.utilisateurService.deleteUser(user.userId).subscribe()
            const index = this.listUsers.indexOf(user);
            if(index > -1){
              this.listUsers.splice(index,1);
            }
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async update(ev:any , user:Utilisateur){
    const popover = await this.popoverController.create({
      component: PopoverUpdateComponent,
      event : ev,
      componentProps : {userInfos : user}
    })
    popover.onDidDismiss().then(returnedData =>{if(returnedData.role!="backdrop"){
      const updatedUser : Utilisateur = returnedData.data.updatedUser;
      const index = this.listUsers.indexOf(user);
      this.listUsers[index]= updatedUser;}
      else console.log("popover was dismissed directly");
       })
    return await popover.present()
  }

  async addUser(){
    const popover = await this.popoverController.create({
      component: PopoverAddUserComponent,
    })
    popover.onDidDismiss().then(returnedData =>{
      if(returnedData.role!="backdrop"){
      const addedUser  = returnedData.data.addedUser;
      this.listUsers.push(addedUser);}
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
