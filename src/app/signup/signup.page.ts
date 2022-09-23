import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignUpRequest } from 'src/Models/sign-up-request';
import { Utilisateur } from 'src/Models/utilisateur';
import { UtilisateurService } from 'src/Services/utilisateur-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private fb:FormBuilder, private utilisateurService : UtilisateurService) { }

  private user ={} as SignUpRequest ;
  msg : String;

  SignUpForm = this.fb.group({
    username : ['',Validators.required],
    password : ['',Validators.required],
    email : ['',[Validators.required, Validators.email]],
    birthday : ['',Validators.required]
  })

  ngOnInit() {
  }

  onSubmit(){
    this.user.birthday=this.SignUpForm.get('birthday').value.split('T')[0];
    this.user.username=this.SignUpForm.get('username').value;
    this.user.password=this.SignUpForm.get('password').value;
    this.user.email=this.SignUpForm.get('email').value;
    console.log(this.user);
    this.utilisateurService.signUp(this.user).subscribe(data => {
      this.msg = data.msg;
      console.log(data);
    });
  }

}
