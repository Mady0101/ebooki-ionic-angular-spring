import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/Models/utilisateur';
import { SharedService } from 'src/Services/shared.service';
import { UtilisateurService } from 'src/Services/utilisateur-service.service';
import { Plugins, CameraResultType} from '@capacitor/core';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';



const { Camera } = Plugins;


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor(private utilisateurService : UtilisateurService,
             private sharedService : SharedService,
             private fb:FormBuilder,
             private router : Router
             ) { }

             

            EditForm = this.fb.group({
              username : ['',Validators.required],
              password : [''],
              email : ['',[Validators.required, Validators.email]],
              birthday : ['',Validators.required],
              oldPassword : ['',Validators.required]
            })
            updateMessage : String;
            
  ngOnInit(): void {
    
  }

  private user ={} as Utilisateur;
  exp : number;
  rankcap : number;
  progress : number;
  rankName:String;
    
   

  ionViewWillEnter() {
    /*this.utilisateurService.getUserById(this.sharedService.getUserId()).subscribe(data => {
      this.user = data;
      console.log(this.user);
    })*/
    this.user=this.sharedService.getUser();
    this.exp = this.user.exp;
    this.rankName=this.user.rank.name;
    this.rankcap = this.user.rank.rankcap;
    this.progress = this.user.exp / this.user.rank.rankcap;
  }

  onSubmit():void {
    this.user.birthday=this.EditForm.get('birthday').value.split('T')[0];
    this.user.email=this.EditForm.get('email').value;
    this.user.password=this.EditForm.get('password').value;
    console.log(this.EditForm.value);
    console.log(this.user);
    this.utilisateurService.updateUserByUser(this.user, this.EditForm.get('oldPassword').value).subscribe(
      data =>{
        this.updateMessage = data.msg;
        this.sharedService.saveUser(this.user);
        console.log(this.updateMessage);
      }
    )
  
  }

  logout(){
    this.sharedService.setUserId(null);
    this.sharedService.setUsername(null);
    this.sharedService.setRoles(null);
    this.sharedService.signOut();
    this.router.navigate(["/login"]);
  }

  guestPicture : string;

  

  
  
  
 
  
    
}
