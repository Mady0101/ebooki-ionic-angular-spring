import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/Services/shared.service';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.scss'],
})
export class ChooseComponent implements OnInit {

  constructor(private router:Router,private sharedService : SharedService) { }

  ngOnInit() {}

  goToUsersManager(){
    console.log(this.router.url);
    this.router.navigate(['administrator/usersManager']);
  }
  goToBookManager(){
    this.router.navigate(['/administrator/booksManager']);
  }
  goToHome(){
    this.router.navigate(['/home']);
  }

  logout(){
    this.sharedService.setUserId(null);
    this.sharedService.setUsername(null);
    this.sharedService.setRoles(null);
    this.sharedService.signOut();
    this.router.navigate(["/login"]);
  }

}
