import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AddUser } from 'src/Models/add-user';
import { LoginResponse } from 'src/Models/login-response';
import { Rank } from 'src/Models/rank';
import { ResponseEntity } from 'src/Models/response-entity';
import { SignUpRequest } from 'src/Models/sign-up-request';
import { Utilisateur } from 'src/Models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http:HttpClient) { }

  baseUrl : String = "http://192.168.43.206:8080/utilisateur" ;
 

  login(loginRequest : Utilisateur):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.baseUrl+"/auth/login",loginRequest)
  }

  signUp(user : SignUpRequest): Observable<any>{
    return this.http.post<any>(this.baseUrl+"/auth/signup",user )
  }
  
  add(user:AddUser): Observable<ResponseEntity>{
    return this.http.post<ResponseEntity>(this.baseUrl+"/add",user)
  }

  getUserById(userId : number): Observable<Utilisateur>{
    return this.http.get<Utilisateur>(this.baseUrl+"/find/"+userId)
  }

  updateUserByUser(userUpdate : Utilisateur , oldPasswordOfUser : String): Observable<any>{
    return this.http.put<any>(this.baseUrl+"/updateByUser",{user : userUpdate ,oldPassword: oldPasswordOfUser})
  }
  
  updateUserByAdmin(user : AddUser , userid:number): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(this.baseUrl+"/updateByAdmin/"+userid,user)
  }

  getRank(rankId : number): Observable<Rank>{
    return this.http.get<Rank>(this.baseUrl+"/find/rank/"+rankId)
  }


  updateUserExp(user : Utilisateur): Observable<Utilisateur>{
    return this.http.put<Utilisateur>(this.baseUrl+"/update/exp",user)
  }

  getAllUsers():Observable<Utilisateur[]>{
    return this.http.get<Utilisateur[]>(this.baseUrl+"/find")
  }

  deleteUser(userid : number):Observable<any>{
    return this.http.delete<any>(this.baseUrl+"/delete/"+userid)
  }
  
}
