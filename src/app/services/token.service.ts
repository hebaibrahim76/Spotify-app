import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private path='https://api.spotify.com/v1/me';
  constructor(private http:HttpClient) { }
  

  getToken():Observable<any>{
    return this.http.get(this.path)

}

}
