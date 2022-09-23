import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/Models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http : HttpClient) { }

  private baseUrl : String ="http://192.168.43.206:8080/comment";

  getAllCommentsByBook(livreId : String): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseUrl+"/find/"+livreId)
  }

  addComment(comment : Comment) : Observable<Comment> {
    return this.http.post<Comment>(this.baseUrl+"/add",comment)
  }

  deleteComment(commentId:number) : Observable<Comment> {
    return this.http.delete<Comment>(this.baseUrl+"/delete/"+commentId)
  }
}
