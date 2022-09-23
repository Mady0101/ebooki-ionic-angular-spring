import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseEntity } from 'src/Models/response-entity';
import { SubscribedBooks } from 'src/Models/subscribed-books';

@Injectable({
  providedIn: 'root'
})
export class SubscribedBooksService {

  constructor(private http : HttpClient) { }

  private baseUrl : String ="http://192.168.43.206:8080/abonner";

  subscribeBook(subscribedBook : SubscribedBooks):Observable<ResponseEntity>{
    return this.http.post<ResponseEntity>(this.baseUrl+"/add",subscribedBook)
  }

  getSubscribedBooksByUser(userid:number):Observable<SubscribedBooks[]>{
    return this.http.get<SubscribedBooks[]>(this.baseUrl+"/find/user/"+userid)
  }

  getSubscribedBookById(aboonerId:number):Observable<SubscribedBooks>{
    return this.http.get<SubscribedBooks>(this.baseUrl+"/find/"+aboonerId)
  }

  getMarker(abonnerid:number):Observable<SubscribedBooks>{
    return this.http.get<SubscribedBooks>(this.baseUrl+"/get/Marker/"+abonnerid)
  }

  setMarker(subscribedBook : SubscribedBooks):Observable<SubscribedBooks>{
    return this.http.put<SubscribedBooks>(this.baseUrl+"/update/Marker",subscribedBook )
  }

  updateSubscribedBook(subscribedBook : SubscribedBooks):Observable<SubscribedBooks>{
    return this.http.put<SubscribedBooks>(this.baseUrl+"/update",subscribedBook)
  }

  deleteSubscribedBook(subscribedBook : SubscribedBooks):Observable<SubscribedBooks>{
    return this.http.delete<SubscribedBooks>(this.baseUrl+"/delete/"+subscribedBook.abonneId)
  }

}
