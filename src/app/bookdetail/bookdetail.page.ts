import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/Models/book';
import { BookService } from 'src/Services/book.service';
import { CommentService } from 'src/Services/comment.service';
import { Comment } from 'src/Models/comment';
import { SubscribedBooks } from 'src/Models/subscribed-books';
import { SharedService } from 'src/Services/shared.service';
import { SubscribedBooksService } from 'src/Services/subscribed-books.service';

@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.page.html',
  styleUrls: ['./bookdetail.page.scss'],
})
export class BookdetailPage implements OnInit {

  constructor(private route : ActivatedRoute,
    private bookService : BookService,
    private commentService : CommentService,
    private sharedService : SharedService,
    private subscribedBooksService : SubscribedBooksService,
    private router : Router) { }
bookid:string;
book:Book;
content : string;
newComment : Comment;
comments : Comment[]=[];
subscription : SubscribedBooks ;
userId : number;
msg : String;

ngOnInit() {
    this.userId = this.sharedService.getUser().userId;
    this.bookid = this.route.snapshot.paramMap.get('bookid');
    this.bookService.getBook(this.bookid).subscribe(data => {
      this.book = data;
      this.bookService.updateBookVues(this.sharedService.getUser().userId,this.book).subscribe()
      })
    
    this.commentService.getAllCommentsByBook(this.bookid).subscribe(data =>
      {
        this.comments = data;
        console.log(data);
      })   
     
  }

  subscribe():void {
    this.subscription = {
      utilisateur : {
        userId : this.userId
      },
      livre : {
        livreId : parseInt(this.bookid)
      }
    }
      
      this.subscribedBooksService.subscribeBook(this.subscription).subscribe(data =>{
             this.msg = data.description  ;
            console.log(this.msg);
      })
  }

  addComment (){
    this.newComment = {utilisateur : {userId : this.sharedService.getUser().userId , username : this.sharedService.getUser().username} , livre : this.book , content : this.content}
    this.comments.push(this.newComment);
    this.commentService.addComment(this.newComment).subscribe(result => {
      console.log(result);
    })

  }

  logout(){
    this.sharedService.setUserId(null);
    this.sharedService.setUsername(null);
    this.sharedService.setRoles(null);
    this.sharedService.signOut();
    this.router.navigate(["/login"]);
  }

  deleteComment(commentId:number){
    this.commentService.deleteComment(commentId).subscribe()
  }

}
