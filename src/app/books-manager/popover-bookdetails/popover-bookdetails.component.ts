import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Book } from 'src/Models/book';

@Component({
  selector: 'app-popover-bookdetails',
  templateUrl: './popover-bookdetails.component.html',
  styleUrls: ['./popover-bookdetails.component.scss'],
})
export class PopoverBookdetailsComponent implements OnInit {

  book : Book;
  public keepOriginalOrder = (a, b) => a.key
  constructor(private navParams:NavParams) { }

  ngOnInit() {
    this.book = this.navParams.get('bookInfos');
  }

}
