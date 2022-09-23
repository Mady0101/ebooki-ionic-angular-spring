import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/Models/book';
import { BookService } from 'src/Services/book.service';
import { SharedService } from 'src/Services/shared.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {

  constructor(private bookService : BookService,
              private router : Router,
              private sharedService : SharedService
              ) { }

  listBooks : Book[]=[];
  listBooksMostLikes : Book[]=[];
  listBooksMostVues : Book[]=[];
  searchedItems : Book[];
  username : String;
  errorSearch : String;

  option = {
      slidesPerView:1.5,
      centeredSlides: true,
      spaceBetween: 10
      }
userId: number;
ngOnInit() {
  this.userId = this.sharedService.getUser().userId;
       this.bookService.getAllBooks().subscribe(data => {this.listBooks = data;
        this.listBooks.forEach(element =>{
          this.bookService.isLiked(this.userId,element.livreId).subscribe(
            data =>{
              element.isLiked =data;
            })
        })
      console.log(this.listBooks);})
       this.bookService.getBooksMostLikes().subscribe(data => {this.listBooksMostLikes =data;})
       this.bookService.getBooksMostVues().subscribe(data =>{this.listBooksMostVues =data;})
        this.username = this.sharedService.getUser().username;
      }


      detail(book:Book){
        console.log(this.router.url);
        this.router.navigate([this.router.url+'/bookdetail',book.livreId]);   
        }

      incrementLikes(book : Book){
           this.bookService.updateBookLikes(this.sharedService.getUser().userId,book).subscribe(
             data => {
               if(data.description == "incrementer")
               book.jaimes=book.jaimes+1;
               else
               book.jaimes=book.jaimes-1;

             }
           );
      }

      searchChange(event){
        const val=event.target.value;
        if(val && val.trim()!=''){
            this.searchedItems = this.listBooks.filter((item : Book) =>{
               return item.nom.toLowerCase().indexOf(val.toLowerCase())>-1
            })
            if(this.searchedItems.length>0)
            this.errorSearch = null;
            else
            this.errorSearch = "There's no book that matches the name you inserted";
            console.log(this.searchedItems);
        }else{
          this.searchedItems=null;
        }
      }

  logout(){
    this.sharedService.setUserId(null);
    this.sharedService.setUsername(null);
    this.sharedService.setRoles(null);
    this.sharedService.signOut();
    this.router.navigate(["/login"]);
  }

}
