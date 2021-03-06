import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  AUTH_BASE_URL = 'https://accounts.spotify.com/authorize';
 
  params1={
    	"client_id": "7512dbdb534c4ca4a1b6a698caa60785",
    	"response_type": "token",
    	"redirect_uri": "http://localhost:4200/callback"
    }
  constructor() { }

  ngOnInit(): void {
  }
  
  login():void{
    const params = new URLSearchParams(this.params1);
    window.location.href=this.AUTH_BASE_URL+'?'+params;  
  }

}
