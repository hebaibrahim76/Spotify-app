import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http:HttpClient) { }
  

  getAlbumResult(id:string):Observable<any>{
    return this.http.get(`https://api.spotify.com/v1/artists/${id}/albums`)

  }
  getNPAlbumResult(url:string):Observable<any>{
    return this.http.get(url)

  }

}
