import { Injectable } from '@angular/core';
import { Utilisateur } from 'src/Models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private userId : number;
  private bookid : String;
  private username : String;
  private TOKEN_KEY = 'auth-token';
  private USER_KEY ="auth-user";
  private roles : String[];

  constructor() { }

  getRoles():String[]{
    return this.roles;
  }

  setRoles(roles : String[]): void{
    this.roles = roles;
  }

  getUsername(): String{
    return this.username;
  }

  setUsername(username : String): void {
     this.username=username;
  }

  getUserId(): number {
    return this.userId
  }

  setUserId(userId : number):void {
    this.userId=userId;
  }



  getBookId(): String {
    return this.bookid
  }

  setBookId(bookId : String): void{
    this.bookid = bookId;
  } 
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(this.TOKEN_KEY);
  }

  public signOut(): void{
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.removeItem(this.USER_KEY);
  }

  public saveUser(user : Utilisateur): void{
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY,JSON.stringify(user));
  }

  public getUser(): Utilisateur{
    return JSON.parse(window.sessionStorage.getItem(this.USER_KEY));
  }
}
