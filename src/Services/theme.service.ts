import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from 'src/Models/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http : HttpClient) { }
  private baseUrl : String ="http://192.168.43.206:8080/theme";

  addTheme(theme : Theme):Observable<Theme>{
    return this.http.post<Theme>(this.baseUrl+"/add",theme)
  }

  findByName(name:String):Observable<Theme>{
    return this.http.get<Theme>(this.baseUrl+"/find/"+name)
  }
}
