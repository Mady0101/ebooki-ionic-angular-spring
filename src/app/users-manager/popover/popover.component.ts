import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Utilisateur } from 'src/Models/utilisateur';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

 user : Utilisateur;
 public keepOriginalOrder = (a, b) => a.key

  constructor(private navParams : NavParams) { 
    
  }

  ngOnInit() {
    this.user = this.navParams.get('userInfos');
  }

}
