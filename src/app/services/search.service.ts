import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }
  

  getSearchResult(searchtext:string):Observable<any>{
    return this.http.get('https://api.spotify.com/v1/search?q='+searchtext+'&type=artist')

}
  getNPSearchResult(url:string):Observable<any>{
    return this.http.get(url)
  }
 
}
