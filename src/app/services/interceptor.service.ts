import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  token:string;
  
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token=localStorage.getItem('access_token');
   if (this.token) {
    req=req.clone({
      headers:new HttpHeaders({
     
        'Accept': 'application/json',
        Authorization: `Bearer ${this.token}`
      })
    })
 }

 return next.handle(req).pipe(
   catchError((error) => {
     if (error instanceof HttpErrorResponse) {
         if (error.status === 401) { //unauthorized
         window.location.href='/login'
      }
      if(error.error.error.message=='invalid id'){
        window.location.href='/search'
      }
      if (error.status === 0) {
        console.error('An error occurred:', error.error);
        alert('Client-side/Network Error');
      } else {
        // backend problem
        console.error(`Backend returned code ${error.status}, body was: `, error.error);
        alert(error.error.error.message);
          
      }
     
   }
   return throwError(error);
 })
  )
 
  }

  
  }

