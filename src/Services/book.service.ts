import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/Models/book';
import { ResponseEntity } from 'src/Models/response-entity';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http : HttpClient) { }

  private baseUrl : String ="http://192.168.43.206:8080/livre";

  getAllBooks() : Observable<Book[]>{
    return this.http.get<Book[]>(this.baseUrl+"/find")
  }

  addBook(book : Book):Observable<Book>{
    return this.http.post<Book>(this.baseUrl+"/add",book)
  }

  updateBook(book : Book): Observable<Book>{
    return this.http.put<Book>(this.baseUrl+"/update",book)
  }

  deleteBook(bookId : number):Observable<Book>{
    return this.http.delete<Book>(this.baseUrl+"/delete/"+bookId)
  }

  getBooksMostLikes() : Observable<Book[]>{
    return this.http.get<Book[]>(this.baseUrl+"/find/most/likes")
  }

  getBooksMostVues(): Observable<Book[]>{
    return this.http.get<Book[]>(this.baseUrl+"/find/most/vues")
  }

  isLiked(userid:number , livreid:number): Observable<boolean>{
    return this.http.get<boolean>(this.baseUrl+"/isLiked/"+userid+"/"+livreid)
  }
  isVued(userid:number , livreid:number): Observable<boolean>{
    return this.http.get<boolean>(this.baseUrl+"/isVued/"+userid+"/"+livreid)
  }

  updateBookLikes(userid:number, book : Book) : Observable<ResponseEntity>  {
    return this.http.put<ResponseEntity>(this.baseUrl+"/update/jaimes/"+userid, book)
  }

  getBook(id:String) : Observable<Book> {
    return this.http.get<Book>(this.baseUrl+"/find/"+id)
  }

  updateBookVues(userid : number, book : Book) : Observable<Book> {
    return this.http.put<Book>(this.baseUrl+"/update/vues/"+userid,book)
  }

 
}
