import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor() { }
  getCurrentQueryParameters(delimiter = '#') {
    
    const currentLocation = String(window.location).split(delimiter)[1];
    const params = new URLSearchParams(currentLocation);
    return params;
  }
  ngOnInit(): void {
    const currentQueryParameters = this.getCurrentQueryParameters('#');
    const accessToken = currentQueryParameters.get('access_token');
    localStorage.setItem('access_token', accessToken);
    
    $.ajax({
      type:'GET',
      url: 'https://api.spotify.com/v1/me',
      headers: {
          'Authorization': 'Bearer ' + accessToken
      },
      success: function(response) {
          window.location.href='/search'
      },
      error: function(error){
        console.log(error);
      }
  })
  }

}
