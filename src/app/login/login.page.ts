import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/Models/utilisateur';
import { SharedService } from 'src/Services/shared.service';
import { UtilisateurService } from 'src/Services/utilisateur-service.service';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ERole } from 'src/Models/erole';
import { Role } from 'src/Models/role';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  

  constructor(private fb: FormBuilder,
              private utilisateurServicer:UtilisateurService,
              private router : Router,
              private sharedService :SharedService,
              ) { }
              

  

  userForm = this.fb.group({
    username :  ['',Validators.required],
    password : ['',Validators.required]
  })
  notFound: boolean = false;
  loginRequest : Utilisateur;
  
  utilisateur ={
    roles : []
  } as Utilisateur;

  ngOnInit() {
  }
 

  onSubmit(){
    this.loginRequest = <Utilisateur> this.userForm.value;
     this.utilisateurServicer.login(this.loginRequest)
                                    .subscribe(
                                              data => {
                                                this.sharedService.saveToken(data.jwt);
                                               console.log(this.utilisateur);
                                               console.log(data);
                                               const role : String = "ROLE_ADMIN" ;
                                               if(data != null) {
                                                this.utilisateur.userId = data.userId;
                                                this.utilisateur.username = data.username;
                                                this.utilisateur.birthday=data.birthday;
                                                this.utilisateur.email=data.email;
                                                this.utilisateur.profile_img=data.profile_img;
                                                this.utilisateur.rank=data.rank;
                                                if(data.roles.indexOf("admin"))
                                                this.utilisateur.roles.push(role);
                                                this.utilisateur.exp=data.exp;
                                                this.sharedService.saveUser(this.utilisateur)
                                                /*this.sharedService.setUsername(data.username);
                                                this.sharedService.setUserId(data.userId);
                                                this.sharedService.setRoles(data.roles);*/
                                                 if(data.roles.indexOf(role)>-1){
                                                  this.router.navigate(['/administrator']);}
                                                 else{
                                                 this.router.navigate(['/home']);}
                                               }else{
                                                 this.notFound = true;
                                               }
                                              })

  }

}

 