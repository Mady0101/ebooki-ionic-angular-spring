import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auteur } from 'src/Models/auteur';

@Injectable({
  providedIn: 'root'
})
export class AuteurService {

  constructor(private http : HttpClient) { }
  private baseUrl : String ="http://192.168.43.206:8080/auteur";

  addAuteur(auteur : Auteur):Observable<Auteur>{
    return this.http.post<Auteur>(this.baseUrl+"/add",auteur)
  }

  findByName(name : String):Observable<Auteur>{
    return this.http.get<Auteur>(this.baseUrl+"/find/"+name)
  }



}
